#!/usr/bin/env python3
import os
import sys
from datetime import datetime
import pdfplumber
from pypdf import PdfReader

import sys

if len(sys.argv) < 2:
    print("Usage: python pdf_to_md.py <path_to_pdf>")
    sys.exit(1)

PDF_PATH = sys.argv[1]
OUTPUT_DIR = os.path.dirname(PDF_PATH)
BASE_NAME = os.path.splitext(os.path.basename(PDF_PATH))[0]
IMAGES_DIR = os.path.join(OUTPUT_DIR, f"{BASE_NAME}_images")
MD_PATH = os.path.join(OUTPUT_DIR, f"{BASE_NAME}.md")

os.makedirs(IMAGES_DIR, exist_ok=True)

reader = PdfReader(PDF_PATH)
meta = reader.metadata
page_count = len(reader.pages)

title = meta.get("/Title", "") or BASE_NAME
author = meta.get("/Author", "") or ""

frontmatter = f"""---
source: {os.path.basename(PDF_PATH)}
source_url: {PDF_PATH}
pages: {page_count}
title: {title}
author: {author}
extracted: {datetime.now().isoformat()}
---
"""

markdown_content = [frontmatter]
markdown_content.append(f"# {title}\n")


def extract_images_from_page(page, page_num, images_dir, base_name):
    """Extract images from PDF page using pypdf"""
    extracted = []
    if "/XObject" in page["/Resources"]:
        xobjects = page["/Resources"]["/XObject"]
        for obj_name in xobjects:
            obj = xobjects[obj_name]
            if obj["/Subtype"] == "/Image":
                try:
                    data = obj.get_data()
                    ext = "/DCTDecode" in obj if "jpg" else "png"
                    img_name = f"{base_name}_p{page_num}_{obj_name[1:]}.png"
                    img_path = os.path.join(images_dir, img_name)
                    with open(img_path, "wb") as f:
                        f.write(data)
                    extracted.append(img_name)
                except Exception as e:
                    pass
    return extracted


with pdfplumber.open(PDF_PATH) as pdf:
    for i, page in enumerate(pdf.pages):
        page_num = i + 1
        if page_num % 50 == 0:
            print(f"Processing page {page_num}/{page_count}...")

        markdown_content.append(f"\n## Page {page_num}\n")

        text = page.extract_text()
        if text:
            lines = text.split("\n")
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                if len(line) < 100 and line.isupper():
                    markdown_content.append(f"### {line}\n")
                elif line.endswith(":") and len(line) < 80:
                    markdown_content.append(f"**{line}**\n")
                elif line.startswith(("- ", "* ", "• ")):
                    markdown_content.append(f"{line}\n")
                elif len(line) > 2 and line[0].isdigit() and line[1] == ".":
                    markdown_content.append(f"{line}\n")
                else:
                    markdown_content.append(f"{line}\n")

        tables = page.extract_tables()
        if tables:
            for table_idx, table in enumerate(tables):
                if table and len(table) > 1:
                    markdown_content.append(f"\n*Table on page {page_num}*\n")
                    header = table[0]
                    rows = table[1:]

                    col_widths = [
                        max(len(str(row[i] or "")) for row in [header] + rows)
                        for i in range(len(header))
                    ]

                    header_row = (
                        "|"
                        + "|".join(
                            str(h or "").ljust(w) for h, w in zip(header, col_widths)
                        )
                        + "|"
                    )
                    separator = "|" + "|".join("-" * w for w in col_widths) + "|"

                    markdown_content.append(header_row + "\n")
                    markdown_content.append(separator + "\n")

                    for row in rows:
                        row_str = (
                            "|"
                            + "|".join(
                                str(cell or "").ljust(w)
                                for cell, w in zip(row, col_widths)
                            )
                            + "|"
                        )
                        markdown_content.append(row_str + "\n")

with open(MD_PATH, "w", encoding="utf-8") as f:
    f.write("".join(markdown_content))

print(f"\nDone! Created:")
print(f"  - {MD_PATH}")
print(f"  - {IMAGES_DIR}/ (images not extracted - PDF uses embedded fonts)")
print(f"\nMarkdown file size: {os.path.getsize(MD_PATH):,} bytes")
