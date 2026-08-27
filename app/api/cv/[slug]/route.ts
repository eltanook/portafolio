import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

// Valid CV slugs (prevent directory traversal)
const VALID_SLUGS = new Set([
  "cv",
  "cv-en",
  "cv-data",
  "cv-data-en",
  "cv-general",
  "cv-general-en",
])

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  if (!VALID_SLUGS.has(slug)) {
    return new NextResponse("Not found", { status: 404 })
  }

  const filePath = path.join(process.cwd(), "content", "cvs", `${slug}.md`)

  let markdown: string
  try {
    markdown = await fs.readFile(filePath, "utf-8")
  } catch {
    return new NextResponse("CV not found", { status: 404 })
  }

  // Convert markdown to HTML (handles the HTML tags already in the files)
  const htmlBody = convertMarkdownToHtml(markdown)

  const lang = slug.endsWith("-en") ? "en" : "es"
  const isData = slug.includes("data")
  const title = lang === "en"
    ? `Tomás Ignacio Nadal — ${isData ? "Data Scientist" : "Software Engineer"} Resume`
    : `Tomás Ignacio Nadal — CV ${isData ? "Data Scientist" : "Full Stack"}`

  const html = buildHtmlPage(htmlBody, title, lang)

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Allow iframe embedding from same origin
      "X-Frame-Options": "SAMEORIGIN",
    },
  })
}

// ─── Minimal Markdown → HTML converter ──────────────────────────────────────
// Handles the specific subset used in the CV files:
// headings (h1-h3), bold (**text**), italic (*text*), lists, paragraphs,
// inline HTML (kept as-is), horizontal rules.

function convertMarkdownToHtml(md: string): string {
  const lines = md.split("\n")
  const output: string[] = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Blank line — close open list
    if (line.trim() === "") {
      if (inList) { output.push("</ul>"); inList = false }
      output.push("")
      continue
    }

    // Raw HTML lines (keep as-is)
    if (line.trimStart().startsWith("<") && !line.trimStart().startsWith("<strong") && !line.trimStart().startsWith("<em")) {
      if (inList) { output.push("</ul>"); inList = false }
      output.push(line)
      continue
    }

    // H1
    if (line.startsWith("# ")) {
      if (inList) { output.push("</ul>"); inList = false }
      output.push(`<h1>${inlineFormat(line.slice(2))}</h1>`)
      continue
    }

    // H2
    if (line.startsWith("## ")) {
      if (inList) { output.push("</ul>"); inList = false }
      output.push(`<h2>${inlineFormat(line.slice(3))}</h2>`)
      continue
    }

    // H3
    if (line.startsWith("### ")) {
      if (inList) { output.push("</ul>"); inList = false }
      output.push(`<h3>${inlineFormat(line.slice(4))}</h3>`)
      continue
    }

    // List item
    if (line.startsWith("- ")) {
      if (!inList) { output.push("<ul>"); inList = true }
      output.push(`<li>${inlineFormat(line.slice(2))}</li>`)
      continue
    }

    // Horizontal rule
    if (/^-{3,}$/.test(line.trim())) {
      if (inList) { output.push("</ul>"); inList = false }
      output.push("<hr>")
      continue
    }

    // Regular paragraph
    if (inList) { output.push("</ul>"); inList = false }
    output.push(`<p>${inlineFormat(line)}</p>`)
  }

  if (inList) output.push("</ul>")

  return output.join("\n")
}

function inlineFormat(text: string): string {
  // Bold + italic: ***text***
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
  // Bold: **text**
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  // Italic: *text*
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>")
  // Inline code: `text`
  text = text.replace(/`(.+?)`/g, "<code>$1</code>")
  // Markdown links: [text](url)
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>')
  return text
}

// ─── HTML Page Template (matches generate_pdf.py Harvard style) ───────────────

function buildHtmlPage(body: string, title: string, lang: string): string {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
  @page {
    size: A4;
    margin: 0.35in 0.35in;
  }
  * { box-sizing: border-box; }
  body {
    font-family: "Garamond", "Times New Roman", Times, serif;
    font-size: 10.5pt;
    line-height: 1.35;
    color: #000000;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  h1 {
    font-size: 20pt;
    font-weight: bold;
    text-align: center;
    margin-top: 0;
    margin-bottom: 4px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .contact-info {
    text-align: center;
    font-size: 9pt;
    margin-top: 0;
    margin-bottom: 12px;
    color: #111111;
  }
  .contact-info a {
    color: #000000;
    text-decoration: none;
  }
  h2 {
    font-size: 11.5pt;
    font-weight: bold;
    text-transform: uppercase;
    border-bottom: 0.75pt solid #000000;
    margin-top: 14px;
    margin-bottom: 8px;
    padding-bottom: 1.5px;
    letter-spacing: 0.75px;
  }
  h3 {
    font-size: 10.5pt;
    font-weight: normal;
    margin-top: 8px;
    margin-bottom: 1px;
    display: block;
  }
  h3 strong { font-weight: bold; }
  h3 em { font-style: italic; }
  .date {
    float: right;
    font-weight: normal;
    font-style: normal;
    font-size: 10pt;
    color: #000000;
  }
  h3 + p {
    margin-top: 0px;
    margin-bottom: 4px;
    font-size: 9.5pt;
    color: #222222;
  }
  h3 + p em { font-style: italic; }
  p {
    margin-top: 0;
    margin-bottom: 6px;
    text-align: justify;
  }
  ul {
    margin-top: 2px;
    margin-bottom: 6px;
    padding-left: 18px;
  }
  li {
    margin-bottom: 2.5px;
    text-align: justify;
  }
  h2 + ul {
    list-style-type: none;
    padding-left: 0;
  }
  h2 + ul li {
    margin-bottom: 4px;
    text-align: left;
  }
  li strong { font-weight: bold; }
  hr {
    border: none;
    border-top: 0.5pt solid #cccccc;
    margin: 8px 0;
  }
  code {
    font-family: monospace;
    font-size: 9pt;
  }

  /* ── Screen-only: A4 page shadow ── */
  @media screen {
    body {
      background: #f0f0f0;
      display: flex;
      justify-content: center;
      overflow-x: hidden;
    }
    .cv-wrapper {
      transform-origin: top center;
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .cv-page {
      background: #ffffff;
      width: 210mm; /* A4 width */
      min-height: 297mm; /* A4 height */
      margin: 0;
      padding: 0.89cm 0.89cm; /* 0.35in equivalent */
      box-shadow: 0 4px 24px rgba(0,0,0,0.12);
      box-sizing: border-box;
    }
  }

  /* ── Print: remove shadows ── */
  @media print {
    body { background: #fff; padding: 0; margin: 0; display: block; }
    .cv-wrapper { display: block; width: auto; transform: none !important; height: auto !important; margin: 0 !important; }
    .cv-page { box-shadow: none; padding: 0; margin: 0; width: auto; min-height: auto; }
  }
</style>
</head>
<body>
  <div class="cv-wrapper" id="cv-wrapper">
    <div class="cv-page" id="cv-page">
      ${body}
    </div>
  </div>
  <script>
    function scalePage() {
      const wrapper = document.getElementById('cv-wrapper');
      const page = document.getElementById('cv-page');
      if (!wrapper || !page) return;
      
      // Skip scaling when printing
      if (window.matchMedia('print').matches) {
        wrapper.style.transform = 'none';
        wrapper.style.height = 'auto';
        wrapper.style.margin = '0';
        return;
      }
      
      const screenWidth = window.innerWidth;
      // 210mm is approx 794px at 96dpi
      const pageWidth = page.offsetWidth || 794; 
      
      // The modal in the parent already has padding on mobile (p-4 = 16px).
      // We can use 0 extra margin here on small screens to maximize space.
      const margin = screenWidth < 850 ? 0 : 64; 
      
      if (screenWidth < pageWidth + margin) {
        const scale = (screenWidth - margin) / pageWidth;
        wrapper.style.transform = \`scale(\${scale})\`;
        wrapper.style.height = \`\${page.offsetHeight * scale}px\`;
        wrapper.style.marginTop = \`\${margin / 2}px\`;
        wrapper.style.marginBottom = \`\${margin / 2}px\`;
      } else {
        wrapper.style.transform = 'none';
        wrapper.style.height = 'auto';
        wrapper.style.marginTop = '2rem';
        wrapper.style.marginBottom = '2rem';
      }
    }

    window.addEventListener('resize', scalePage);
    window.addEventListener('load', scalePage);
    
    // Also scale when fonts are loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scalePage);
    }
  </script>
</body>
</html>`
}
