import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportCalendarToPDF =
  async () => {

    const calendar =
      document.getElementById(
        "calendar-export"
      );

    if (!calendar) return;

    const canvas =
      await html2canvas(
        calendar,
        {
          backgroundColor:
            "#f6f3f1",

          useCORS: true,

          foreignObjectRendering: false,
        }
      );

    const imageData =
      canvas.toDataURL(
        "image/png"
      );

    const pdf =
      new jsPDF(
        "landscape",
        "px",
        "a4"
      );

    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (
        canvas.height *
        pdfWidth
      ) / canvas.width;

    pdf.addImage(
      imageData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      "content-plan.pdf"
    );
  };