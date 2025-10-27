// lib/generateLines.ts
export interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function generateLines(w: number, h: number): Line[] {
  const cx = w / 2;
  const cy = h / 2;

  const iconSize = Math.min(w, h) * 0.08;
  const half = iconSize / 2;
  const margin = iconSize * 0.7;
  const lineSpacing = iconSize * 0.1;
  const sides = ["top", "bottom", "left", "right"] as const;

  const newLines: Line[] = [];
  const degToRad = (deg: number) => (deg * Math.PI) / 180;

  // --- Intersection detection ---
  const linesIntersect = (l1: Line, l2: Line) => {
    const det =
      (l2.x2 - l2.x1) * (l1.y2 - l1.y1) -
      (l2.y2 - l2.y1) * (l1.x2 - l1.x1);
    if (Math.abs(det) < 1e-6) return false; // parallel

    const lambda =
      ((l2.y2 - l2.y1) * (l2.x2 - l1.x1) +
        (l2.x1 - l2.x2) * (l2.y2 - l1.y1)) /
      det;
    const gamma =
      ((l1.y1 - l1.y2) * (l2.x2 - l1.x1) +
        (l1.x2 - l1.x1) * (l2.y2 - l1.y1)) /
      det;

    if (lambda > 0 && lambda < 1 && gamma > 0 && gamma < 1) return true;

    // near-overlap check
    const dist = (x: number, y: number, l: Line) => {
      const A = l.y2 - l.y1;
      const B = l.x1 - l.x2;
      const C = l.x2 * l.y1 - l.x1 * l.y2;
      return Math.abs(A * x + B * y + C) / Math.sqrt(A * A + B * B);
    };

    const threshold = 8;
    if (
      dist(l1.x1, l1.y1, l2) < threshold ||
      dist(l1.x2, l1.y2, l2) < threshold ||
      dist(l2.x1, l2.y1, l1) < threshold ||
      dist(l2.x2, l2.y2, l1) < threshold
    )
      return true;

    return false;
  };

  // --- Empty space preference ---
  const crowdingScore = (x: number, y: number, angleDeg: number) => {
    const angleRad = degToRad(angleDeg);
    let score = 0;
    const radius = Math.min(w, h) * 0.25;

    newLines.forEach((l) => {
      const dx = (l.x1 + l.x2) / 2 - x;
      const dy = (l.y1 + l.y2) / 2 - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        const dir = Math.atan2(dy, dx);
        const diff = Math.abs(
          ((angleRad - dir + Math.PI) % (2 * Math.PI)) - Math.PI
        );
        if (diff < Math.PI / 4) score += 1 - dist / radius;
      }
    });

    return score;
  };

  // --- Line generation ---
  sides.forEach((side) => {
    const linesPerSide = Math.floor(iconSize / lineSpacing);

    for (let i = 0; i < linesPerSide; i++) {
      const offset = -half + (i + 0.5) * lineSpacing;
      const perpendicularJitter = lineSpacing * 3;
      const perpendicularOffset = (Math.random() - 0.5) * perpendicularJitter;
      const length =
        side === "left" || side === "right" ? w * 0.35 : h * 0.35;
      const finalLength = length * (0.6 + Math.random() * 0.4);

      let x1 = cx;
      let y1 = cy;
      let angleOptions: number[] = [];

      switch (side) {
        case "top":
          x1 = cx + offset;
          y1 = cy - half - margin + perpendicularOffset;
          angleOptions = [-90, -45, -135];
          break;
        case "bottom":
          x1 = cx + offset;
          y1 = cy + half + margin + perpendicularOffset;
          angleOptions = [90, 45, 135];
          break;
        case "left":
          x1 = cx - half - margin + perpendicularOffset;
          y1 = cy + offset;
          angleOptions = [180, 135, -135];
          break;
        case "right":
          x1 = cx + half + margin + perpendicularOffset;
          y1 = cy + offset;
          angleOptions = [0, 45, -45];
          break;
      }

      const bestAngle = angleOptions
        .map((ang) => ({ ang, score: crowdingScore(x1, y1, ang) }))
        .sort((a, b) => a.score - b.score)[0].ang;

      const angle = degToRad(bestAngle);
      const x2 = x1 + Math.cos(angle) * finalLength;
      const y2 = y1 + Math.sin(angle) * finalLength;
      const newLine = { x1, y1, x2, y2 };

      if (!newLines.some((l) => linesIntersect(l, newLine)))
        newLines.push(newLine);
    }
  });

  return newLines;
}
