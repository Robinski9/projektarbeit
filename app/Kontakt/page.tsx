// app/page.tsx
export default function HomePage() {
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, repudiandae! ".repeat(8);

  return (
    <main className="max-w-5xl mx-auto relative z-0">
      {/* Hero / first full screen */}
      <section className="h-screen flex items-center justify-center ">
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mockup — Kontakt</h1>
          <p className="text-slate-600">Scroll nach unten, um das Navbar-Verhalten zu prüfen.</p>
        </div>
      </section>

      {/* mehrere große Content-Sections */}
      {Array.from({ length: 8 }).map((_, i) => (
        <section
          key={i}
          className={`min-h-[80vh] flex items-center ${
            i % 2 === 0 ? "bg-lime-600" : "bg-lime-500"
          }`}
        >
          <div className="p-8 md:p-16">
            <h2 className="text-2xl font-semibold mb-4">Section {i + 1}</h2>
            <p className="text-slate-700 leading-relaxed">{lorem}</p>
          </div>
        </section>
      ))}

      {/* Footer damit Seite nicht abrupt endet */}
      <footer className="h-40 flex items-center justify-center bg-white">
        <p className="text-slate-500">Footer / Ende der Demo</p>
      </footer>
    </main>
  );
}