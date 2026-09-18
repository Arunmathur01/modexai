import pptxgen from "pptxgenjs";

export const generatePpt = async (data, filename) => {
  try {
    const pptx = new pptxgen();

    // ==========================================
    // PRESENTATION SETTINGS
    // ==========================================

    pptx.layout = "LAYOUT_WIDE";
    pptx.author = "ModeXAI";
    pptx.subject = data.title || "ModeXAI Presentation";
    pptx.title = data.title || "Presentation";
    pptx.company = "ModeXAI";
    pptx.lang = "en-US";

    pptx.theme = {
      headFontFace: "Aptos Display",
      bodyFontFace: "Aptos",
      lang: "en-US",
    };

    // ==========================================
    // TITLE SLIDE
    // ==========================================

    let slide = pptx.addSlide();

    slide.background = {
      color: "111827",
    };

    slide.addText(data.title || "Presentation", {
      x: 1,
      y: 2,
      w: 11.3,
      h: 1,
      fontFace: "Aptos Display",
      fontSize: 32,
      bold: true,
      color: "FFFFFF",
      align: "center",
      margin: 0,
    });

    if (data.subtitle) {
      slide.addText(data.subtitle, {
        x: 1.5,
        y: 3.15,
        w: 10.3,
        h: 0.6,
        fontSize: 18,
        color: "D1D5DB",
        align: "center",
        margin: 0,
      });
    }

    // ==========================================
    // SLIDE TITLE
    // ==========================================

    const addSlideTitle = (slide, title) => {
      slide.addText(title || "Untitled", {
        x: 0.6,
        y: 0.4,
        w: 12.1,
        h: 0.6,
        fontFace: "Aptos Display",
        fontSize: 26,
        bold: true,
        color: "111827",
        margin: 0,
      });

      slide.addShape(pptx.ShapeType.line, {
        x: 0.6,
        y: 1.1,
        w: 12.1,
        h: 0,
        line: {
          color: "D1D5DB",
          width: 1,
        },
      });
    };

    // ==========================================
    // BULLET POINTS
    // ==========================================

    const addBulletPoints = (slide, points, startY = 2) => {
      if (!Array.isArray(points) || points.length === 0) {
        return;
      }

      const text = points.map((point) => ({
        text: point,
        options: {
          bullet: {
            indent: 18,
          },
          hanging: 5,
          breakLine: true,
        },
      }));

      slide.addText(text, {
        x: 0.9,
        y: startY,
        w: 11.3,
        h: 4.5,
        fontSize: 18,
        color: "374151",
        valign: "top",
        margin: 0.05,
        paraSpaceAfterPt: 12,
        fit: "shrink",
      });
    };

    // ==========================================
    // NUMBERED POINTS
    // ==========================================

    const addNumberedPoints = (slide, points, startY = 2) => {
      if (!Array.isArray(points) || points.length === 0) {
        return;
      }

      const text = points.map((point, index) => ({
        text: point,
        options: {
          bullet: {
            type: "number",
            startAt: index + 1,
            indent: 18,
          },
          hanging: 5,
          breakLine: true,
        },
      }));

      slide.addText(text, {
        x: 0.9,
        y: startY,
        w: 11.3,
        h: 4.5,
        fontSize: 18,
        color: "374151",
        valign: "top",
        margin: 0.05,
        paraSpaceAfterPt: 12,
        fit: "shrink",
      });
    };

    // ==========================================
    // CONTENT SLIDES
    // ==========================================

    if (Array.isArray(data.slides)) {
      data.slides.forEach((slideData) => {
        slide = pptx.addSlide();

        slide.background = {
          color: "FFFFFF",
        };

        addSlideTitle(slide, slideData.title);

        let currentY = 1.45;

        // Content
        if (slideData.content) {
          slide.addText(slideData.content, {
            x: 0.8,
            y: currentY,
            w: 11.4,
            h: 1,
            fontSize: 17,
            color: "4B5563",
            margin: 0,
            fit: "shrink",
          });

          currentY += 1.15;
        }

        // Bullet points
        if (
          Array.isArray(slideData.bulletPoints) &&
          slideData.bulletPoints.length > 0
        ) {
          addBulletPoints(
            slide,
            slideData.bulletPoints,
            currentY
          );

          currentY += Math.min(
            slideData.bulletPoints.length * 0.55,
            3
          );
        }

        // Numbered points
        if (
          Array.isArray(slideData.numberedPoints) &&
          slideData.numberedPoints.length > 0
        ) {
          addNumberedPoints(
            slide,
            slideData.numberedPoints,
            currentY
          );
        }

        // Speaker notes
        if (slideData.notes) {
          slide.addNotes(slideData.notes);
        }
      });
    }

    // ==========================================
    // CONCLUSION
    // ==========================================

    if (data.conclusion) {
      slide = pptx.addSlide();

      slide.background = {
        color: "111827",
      };

      slide.addText("Conclusion", {
        x: 0.8,
        y: 0.8,
        w: 11.7,
        h: 0.7,
        fontSize: 28,
        bold: true,
        color: "FFFFFF",
        align: "center",
        margin: 0,
      });

      slide.addText(data.conclusion, {
        x: 1.2,
        y: 2.2,
        w: 10.8,
        h: 2.5,
        fontSize: 20,
        color: "E5E7EB",
        align: "center",
        valign: "mid",
        margin: 0.1,
        fit: "shrink",
      });
    }

    // ==========================================
    // REFERENCES
    // ==========================================

    if (
      Array.isArray(data.references) &&
      data.references.length > 0
    ) {
      slide = pptx.addSlide();

      addSlideTitle(slide, "References");

      const references = data.references.map(
        (reference, index) => ({
          text: reference,
          options: {
            bullet: {
              type: "number",
              startAt: index + 1,
            },
            breakLine: true,
          },
        })
      );

      slide.addText(references, {
        x: 0.9,
        y: 1.6,
        w: 11.2,
        h: 4.8,
        fontSize: 17,
        color: "374151",
        margin: 0.05,
        paraSpaceAfterPt: 12,
        fit: "shrink",
      });
    }

    // ==========================================
    // ADD MODEXAI FOOTER TO EVERY SLIDE
    // ==========================================

    const totalSlides = pptx._slides.length;

    pptx._slides.forEach((slide, index) => {

      // Footer line
      slide.addShape(pptx.ShapeType.line, {
        x: 0.6,
        y: 6.85,
        w: 12.1,
        h: 0,
        line: {
          color: "E5E7EB",
          width: 0.7,
        },
      });

      // ModeXAI
      slide.addText("ModeXAI", {
        x: 0.6,
        y: 6.95,
        w: 2,
        h: 0.25,
        fontFace: "Aptos",
        fontSize: 9,
        bold: true,
        color: "6B7280",
        margin: 0,
      });

      // Slide number
      slide.addText(`${index + 1} / ${totalSlides}`, {
        x: 10.8,
        y: 6.95,
        w: 1.9,
        h: 0.25,
        fontFace: "Aptos",
        fontSize: 9,
        color: "6B7280",
        align: "right",
        margin: 0,
      });
    });

    // ==========================================
    // GENERATE PPT BUFFER
    // ==========================================

    const pptBuffer = await pptx.write({
      outputType: "nodebuffer",
    });

    console.log("PPT generated successfully:", filename);
    console.log("PPT buffer size:", pptBuffer.length);

    return pptBuffer;

  } catch (error) {
    console.error("========== PPT GENERATION ERROR ==========");
    console.error(error);

    throw error;
  }
};