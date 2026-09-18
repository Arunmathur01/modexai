import PDFDocument from "pdfkit";

export const generatePdf = async (data) => {
  return new Promise((resolve, reject) => {
    try {
    const doc = new PDFDocument({
  size: "A4",
  margin: 50,
  bufferPages: true,

  // Reserve space for footer
  margins: {
    top: 50,
    left: 50,
    right: 50,
    bottom: 90,
  },
});

      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));

      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });

      doc.on("error", reject);

      // =========================
      // TITLE
      // =========================

      if (data.title) {
        doc
          .font("Helvetica-Bold")
          .fontSize(24)
          .fillColor("#111827")
          .text(data.title, {
            align: "center",
          });

        doc.moveDown(0.5);
      }

      // =========================
      // SUBTITLE
      // =========================

      if (data.subtitle) {
        doc
          .font("Helvetica")
          .fontSize(14)
          .fillColor("#6B7280")
          .text(data.subtitle, {
            align: "center",
          });

        doc.moveDown(1.5);
      }

      // =========================
      // INTRODUCTION
      // =========================

      if (data.introduction) {
        doc
          .font("Helvetica-Bold")
          .fontSize(16)
          .fillColor("#111827")
          .text("Introduction");

        doc.moveDown(0.5);

        doc
          .font("Helvetica")
          .fontSize(11)
          .fillColor("#374151")
          .text(data.introduction, {
            align: "justify",
            lineGap: 3,
          });

        doc.moveDown(1);
      }

      // =========================
      // SECTIONS
      // =========================

      if (Array.isArray(data.sections)) {
        data.sections.forEach((section) => {
          if (section.heading) {
            doc
              .font("Helvetica-Bold")
              .fontSize(16)
              .fillColor("#111827")
              .text(section.heading);

            doc.moveDown(0.5);
          }

          if (section.content) {
            doc
              .font("Helvetica")
              .fontSize(11)
              .fillColor("#374151")
              .text(section.content, {
                align: "justify",
                lineGap: 3,
              });

            doc.moveDown(0.7);
          }

          // Bullet Points
          if (
            Array.isArray(section.bulletPoints) &&
            section.bulletPoints.length > 0
          ) {
            section.bulletPoints.forEach((point) => {
              doc
                .font("Helvetica")
                .fontSize(11)
                .fillColor("#374151")
                .text(`• ${point}`, {
                  indent: 15,
                  lineGap: 2,
                });
            });

            doc.moveDown(0.7);
          }

          // =========================
          // SUBSECTIONS
          // =========================

          if (Array.isArray(section.subsections)) {
            section.subsections.forEach((subsection) => {
              if (subsection.heading) {
                doc
                  .font("Helvetica-Bold")
                  .fontSize(13)
                  .fillColor("#1F2937")
                  .text(subsection.heading);

                doc.moveDown(0.3);
              }

              if (subsection.content) {
                doc
                  .font("Helvetica")
                  .fontSize(11)
                  .fillColor("#374151")
                  .text(subsection.content, {
                    align: "justify",
                    lineGap: 3,
                  });

                doc.moveDown(0.5);
              }

              // Subsection Bullet Points
              if (
                Array.isArray(subsection.bulletPoints) &&
                subsection.bulletPoints.length > 0
              ) {
                subsection.bulletPoints.forEach((point) => {
                  doc
                    .font("Helvetica")
                    .fontSize(11)
                    .fillColor("#374151")
                    .text(`• ${point}`, {
                      indent: 20,
                      lineGap: 2,
                    });
                });

                doc.moveDown(0.5);
              }

              // Numbered Points
              if (
                Array.isArray(subsection.numberedPoints) &&
                subsection.numberedPoints.length > 0
              ) {
                subsection.numberedPoints.forEach((point, index) => {
                  doc
                    .font("Helvetica")
                    .fontSize(11)
                    .fillColor("#374151")
                    .text(`${index + 1}. ${point}`, {
                      indent: 20,
                      lineGap: 2,
                    });
                });

                doc.moveDown(0.5);
              }
            });
          }

          doc.moveDown(1);
        });
      }

      // =========================
      // CONCLUSION
      // =========================

      if (data.conclusion) {
        doc
          .font("Helvetica-Bold")
          .fontSize(16)
          .fillColor("#111827")
          .text("Conclusion");

        doc.moveDown(0.5);

        doc
          .font("Helvetica")
          .fontSize(11)
          .fillColor("#374151")
          .text(data.conclusion, {
            align: "justify",
            lineGap: 3,
          });

        doc.moveDown(1);
      }

      // =========================
      // REFERENCES
      // =========================

      if (
        Array.isArray(data.references) &&
        data.references.length > 0
      ) {
        doc
          .font("Helvetica-Bold")
          .fontSize(16)
          .fillColor("#111827")
          .text("References");

        doc.moveDown(0.5);

        data.references.forEach((reference, index) => {
          doc
            .font("Helvetica")
            .fontSize(10)
            .fillColor("#374151")
            .text(`${index + 1}. ${reference}`, {
              lineGap: 2,
            });
        });
      }

     // =====================================================
// FOOTER
// =====================================================

const range = doc.bufferedPageRange();

for (
  let i = range.start;
  i < range.start + range.count;
  i++
) {
  doc.switchToPage(i);

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  // Footer position
  const lineY = pageHeight - 55;
  const footerY = pageHeight - 45;

  // Temporarily remove bottom margin
  // so footer NEVER creates another page
  const originalBottomMargin = doc.page.margins.bottom;
  doc.page.margins.bottom = 0;

  // Footer line
  doc
    .save()
    .moveTo(50, lineY)
    .lineTo(pageWidth - 50, lineY)
    .lineWidth(0.5)
    .strokeColor("#E5E7EB")
    .stroke()
    .restore();

  // ModeXAI
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor("#6B7280")
    .text("ModeXAI", 50, footerY, {
      width: 120,
      height: 12,
      lineBreak: false,
    });

  // Page number
  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#6B7280")
    .text(
      `Page ${i + 1} of ${range.count}`,
      pageWidth - 170,
      footerY,
      {
        width: 120,
        height: 12,
        align: "right",
        lineBreak: false,
      }
    );

  // Restore original margin
  doc.page.margins.bottom = originalBottomMargin;
}

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};