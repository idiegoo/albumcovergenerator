import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export function printDocument(albumName: string, inputRef: HTMLDivElement) {
  html2canvas(inputRef,
    {
      scale: 4, // Determina la calidad
      scrollX: 0,
      scrollY: -scrollY, //-window.scrollY antes del cambio
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      // Capturar el tamaño exacto del contenedor del album
      const width = inputRef.offsetWidth;
      const height = inputRef.offsetHeight;
      const pdf = new jsPDF({
        orientation: width > height ? "l" : "p",
        unit: "mm",
        format: [width, height],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      pdf.save(`${albumName}.pdf`);
    });
};