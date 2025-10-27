"use client";

import React from "react";
import TextBox from "@/components/TextBox";

export default function ExamplePage() {
  return (
    <div>
      <h1>TextBox Beispielseite</h1>

      <TextBox>
        <h2>Überschrift</h2>
        <p>
          Dies ist ein normaler Absatz innerhalb der TextBox. Du kannst{" "}
          <span>einige Wörter kursiv</span> schreiben oder{" "}
          <span>fett hervorheben</span>.
        </p>
      </TextBox>

      <TextBox>
        <p>
          Hier ist noch ein längerer Text, der über mehrere Zeilen geht, damit
          man den Effekt der dynamischen Höhe sehen kann. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Duis dapibus rutrum facilisis.
          Curabitur blandit tempus porttitor. Integer posuere erat a ante
          venenatis dapibus posuere velit aliquet. Donec ullamcorper nulla non
          metus auctor fringilla. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </p>
      </TextBox>

      <TextBox>
        <h3>Noch eine Überschrift</h3>
        <p>
          Mischung aus verschiedenen Stilen: kursiv, fett, normale Schrift. Du
          kannst beliebige HTML-Elemente verwenden, z. B. Links hier.
        </p>
      </TextBox>

      <TextBox>
        <p>
          Sehr langer Text zum Testen des Scrollens der Seite. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet,
          nisi ac volutpat mollis, ligula ex venenatis nulla, nec fermentum
          justo sapien nec justo. Donec bibendum, ipsum a fermentum laoreet,
          sapien justo bibendum sapien, non facilisis lorem nulla ut mauris.
          Aliquam erat volutpat. Sed vel nunc eget lorem ultricies dictum. Nam
          eget nisl non purus tincidunt elementum. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Fusce sit amet urna ut purus elementum
          tincidunt. Vivamus laoreet, urna eget lacinia hendrerit, sapien nulla
          dignissim ligula, vitae egestas dolor sapien et ligula.
        </p>
      </TextBox>
    </div>
  );
}
