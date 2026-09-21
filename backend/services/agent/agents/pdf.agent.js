import { getModel } from "../config/llm.model.js"
import { generatePdf } from "../utilis/generatepdf.js"
import { getFroms3 } from "../utilis/getFroms3.js"
import { uploadToS3 } from "../utilis/uploadToS3.js"
import deductCredits from "../utilis/creditdeduction.js";
export const pdfAgent = async (state) => {

    try {

        const llm= await getModel("pdf")
        const prompt = `You are the ModeXAI PDF Document Writer.

Your job is to transform the user's request into a professional, well-structured document that can be directly converted into a PDF using PDFKit.

Analyze the user's request and create appropriate content without changing the user's core intent.

DOCUMENT STRUCTURE:

1. title
   - Main document title.

2. subtitle
   - Short descriptive subtitle.
   - If not appropriate, use an empty string.

3. introduction
   - Brief introduction explaining the topic.

4. sections
   - Divide the document into logical sections.
   - Each section must contain:
     - heading
     - optional description
     - content
     - subsections

5. subsections
   - Each subsection must contain:
     - heading
     - content
     - optional bullet points

6. conclusion
   - Summarize the important points when appropriate.

7. references
   - Include references only if the user provides or requests them.
   - Otherwise return an empty array.

CONTENT RULES:

- Make the document professional and readable.
- Use clear headings and subheadings.
- Keep paragraphs reasonably short.
- Use bullet points when they improve readability.
- Use numbered lists when order or steps are important.
- Do not unnecessarily repeat information.
- Preserve important technical terms, names, numbers and facts from the user's request.
- If the user requests a report, create a report-style structure.
- If the user requests notes, create a notes-style structure.
- If the user requests a tutorial, organize it into logical steps.
- If the user requests a resume/CV, use an appropriate resume structure.
- If the user requests an academic document, use an academic structure.
- If the user requests a business document, use a professional business structure.
- If the request requires tables, create structured table data.
- Do not add unsupported facts.
- Do not include Markdown.
- Do not include code fences.
- Return ONLY valid JSON.

OUTPUT FORMAT:

{
  "title": "Document Title",
  "subtitle": "Document Subtitle",
  "introduction": "Introduction text",
  "sections": [
    {
      "heading": "Section Heading",
      "content": "Section content",
      "subsections": [
        {
          "heading": "Subsection Heading",
          "content": "Subsection content",
          "bulletPoints": [
            "Point 1",
            "Point 2"
          ],
          "numberedPoints": [
            "Step 1",
            "Step 2"
          ]
        }
      ],
      "bulletPoints": [
        "Point 1",
        "Point 2"
      ]
    }
  ],
  "conclusion": "Conclusion text",
  "references": [
    "Reference 1"
  ]
}

USER REQUEST:
${state.prompt}`

        const res = await llm.invoke(prompt)

        const data=JSON.parse(res.content)
         await deductCredits(state.userId,"pdf")

        const pdfBuffer = await generatePdf(data);

        const filename=`pdf-${Date.now()}.pdf`

        const buffer=pdfBuffer;

        const contentType="application/pdf"
   
        const uploadResult = await uploadToS3(
            filename,
            buffer,
            contentType
        );
   
        const downloadUrl = await getFroms3(
            filename,
            24 * 60 * 60
        );
   
       return {
    ...state,
    aiResponse: `## PDF Generated

**${data.title}**

[Download PDF](${downloadUrl})

Link expires in 24 hours`
}

    } catch (error) {

        console.error("========== PDF AGENT ERROR ==========")
        console.error(error)

        return {
            ...state,
            aiResponse: "Failed to generate PDF."
        }

    }
}