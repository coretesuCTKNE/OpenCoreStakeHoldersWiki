---
name: pdf-to-markdown
description: |
  Transform PDFs into Markdown format with proper formatting, tables, and image handling. Use when user wants to convert, transform, export, or convert a PDF to markdown (.md) format - handles text extraction with headings/lists, converts tables to markdown tables, and extracts images to a folder with markdown references. Trigger phrases: "pdf to markdown", "transform pdf", "convert pdf to md", "pdf to md", "export pdf to markdown".
compatibility:
  - pdfplumber
  - pypdf
  - PIL
---

# PDF to Markdown Converter

## Overview

This skill transforms PDFs into Markdown files with:
- Text extraction with proper headings, lists, and formatting
- Table extraction converted to Markdown tables
- Image extraction saved to a folder with markdown image references
- YAML frontmatter with metadata

## Prerequisites

Required libraries:
```bash
pip install pdfplumber pypdf pillow
```

## Workflow

### Step 1: Validate PDF exists
Verify the PDF file exists and is readable.

### Step 2: Determine output paths
- Output markdown file: `<pdf_name>.md` in same directory as PDF
- Images folder: `<pdf_name>_images/` in same directory

### Step 3: Extract metadata
Get from PDF:
- Page count
- Title (if available)
- Author (if available)

### Step 4: Extract and process content

For each page:
1. Extract text with layout
2. Extract tables
3. Extract images

### Step 5: Convert text to markdown

Heading detection heuristics:
- Large bold text at top of page → H1
- Smaller bold text → H2/H3
- Lines ending with colon followed by content → bold headers
- Bullet points → markdown lists (- or *)
- Numbered items → ordered lists (1., 2., etc.)
- Paragraphs → regular text with proper line breaks

### Step 6: Convert tables to markdown

For each table found:
- Use table headers as markdown table header row
- Pad cells to align columns
- Handle empty cells with empty string

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Step 7: Extract images

Save each image to the images folder:
- Filename: `<pdf_name>_image_<page_num>_<index>.<ext>`
- Add markdown image reference after the paragraph where it appears

### Step 8: Write markdown file

Structure:
```markdown
---
source: <filename>
source_url: <path>
pages: <n>
title: <title>
author: <author>
extracted: <timestamp>
---

# <Title or filename>

<Page 1 content>

## Page 2

<Page 2 content>

![Image description](../<pdf_name>_images/image_file.png)
```

## Output

Creates:
1. `<filename>.md` - The markdown output
2. `<filename>_images/` - Folder containing extracted images

## Usage

```
User: "transform this PDF to markdown" / "convert report.pdf to md"
→ Validate PDF → Extract content → Convert to markdown → Save files
```

## Error Handling

- If PDF is password protected: Error "PDF is encrypted. Please provide decrypted PDF."
- If PDF has no text (scanned): Warn "PDF appears to be scanned. Text extraction may be poor. Consider OCR."
- If no tables/images found: Continue with text only
