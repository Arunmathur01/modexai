import { getModel } from "../config/llm.model.js"

import { generatePpt } from "../utilis/genrateppt.js"
import { getFroms3 } from "../utilis/getFroms3.js"
import { uploadToS3 } from "../utilis/uploadToS3.js"

export const pptAgent = async (state) => {

    try {

        const llm = await getModel("ppt")

        const prompt = `You are the ModeXAI PPT Presentation Writer.

Your job is to transform the user's request into a professional, well-structured presentation that can be directly converted into a PowerPoint (PPTX).

Analyze the user's request and create appropriate presentation content without changing the user's core intent.

PRESENTATION STRUCTURE:

1. title
   - Main presentation title.

2. subtitle
   - Short descriptive subtitle.
   - If not appropriate, use an empty string.

3. slides
   - Divide the presentation into logical slides.
   - Each slide must contain:
     - title
     - content
     - bulletPoints
     - numberedPoints
     - notes

4. conclusion
   - Summarize the key points of the presentation.

5. references
   - Include references only if the user provides or requests them.
   - Otherwise return an empty array.

CONTENT RULES:

- Make the presentation professional, clear and engaging.
- Keep each slide concise and readable.
- Do not put large paragraphs on slides.
- Use bullet points whenever possible.
- Use numbered points when explaining steps, processes or sequences.
- Each slide should focus on one main idea.
- Organize slides in a logical order.
- Start with an introduction and end with a conclusion when appropriate.
- Preserve important technical terms, names, numbers and facts from the user's request.
- If the user requests a technical presentation, include architecture, workflow, technologies or examples when relevant.
- If the user requests a business presentation, use a professional business structure.
- If the user requests an academic presentation, use an academic structure.
- If the user requests a project presentation, include problem, solution, features, technologies, architecture, workflow and conclusion when relevant.
- If the user requests a tutorial, organize the slides as sequential steps.
- Do not add unsupported facts.
- Do not unnecessarily repeat information.
- Do not include Markdown.
- Do not include code fences.
- Return ONLY valid JSON.

SLIDE RULES:

- Keep slide titles short.
- Keep bullet points concise.
- Prefer 3-6 bullet points per slide.
- Avoid overcrowding slides.
- Use notes for additional explanation that does not need to appear directly on the slide.
- Create as many slides as necessary to properly cover the user's request.
- Do not create unnecessary slides just to increase the slide count.

OUTPUT FORMAT:

{
  "title": "Presentation Title",
  "subtitle": "Presentation Subtitle",
  "slides": [
    {
      "title": "Slide Title",
      "content": "Short slide description",
      "bulletPoints": [
        "Point 1",
        "Point 2",
        "Point 3"
      ],
      "numberedPoints": [
        "Step 1",
        "Step 2"
      ],
      "notes": "Additional speaker notes for this slide."
    }
  ],
  "conclusion": "Presentation conclusion",
  "references": [
    "Reference 1",
    "Reference 2"
  ]
}

USER REQUEST:
${state.prompt}`

        const res = await llm.invoke(prompt)

        const data = JSON.parse(res.content)

        const pptBuffer = await generatePpt(data)

        const filename = `ppt-${Date.now()}.pptx`

        const buffer = pptBuffer

        const contentType =
            "application/vnd.openxmlformats-officedocument.presentationml.presentation"

        const uploadResult = await uploadToS3(
            filename,
            buffer,
            contentType
        )

        const downloadUrl = await getFroms3(
            filename,
            24 * 60 * 60
        )

        return {
            ...state,
            aiResponse: `## PPT Generated

**${data.title}**

[Download PPT](${downloadUrl})

Link expires in 24 hours`
        }

    } catch (error) {

        console.error("========== PPT AGENT ERROR ==========")
        console.error(error)

        return {
            ...state,
            aiResponse: "Failed to generate PPT."
        }

    }
}