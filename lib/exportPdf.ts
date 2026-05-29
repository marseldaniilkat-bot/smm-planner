import domtoimage from "dom-to-image";

export const exportCalendarToPDF =
  async () => {

    const calendar =
      document.getElementById(
        "calendar-export"
      );

    if (!calendar) return;

    const dataUrl =
      await domtoimage.toPng(
        calendar
      );

    const link =
      document.createElement(
        "a"
      );

    link.download =
      "content-plan.png";

    link.href =
      dataUrl;

    link.click();
  };