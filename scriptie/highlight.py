from typing import Tuple
from io import BytesIO
import os
import argparse
import re
import fitz

from words_reader import read_words


def extract_info(input_file: str):
    """
    Extracts file info
    """
    # Open the PDF
    pdfDoc = fitz.open(input_file)
    output = {
        "File": input_file, "Encrypted": ("True" if pdfDoc.isEncrypted else "False")
    }
    # If PDF is encrypted the file metadata cannot be extracted
    if not pdfDoc.isEncrypted:
        for key, value in pdfDoc.metadata.items():
            output[key] = value
    # To Display File Info
    print("## File Information ##################################################")
    print("\n".join("{}:{}".format(i, j) for i, j in output.items()))
    print("######################################################################")
    return True, output


def search_for_text(lines, search_str):
    """
    Search for the search string within the document lines
    """
    for line in lines:
        # Find all matches within one line
        results = re.findall(search_str, line, re.IGNORECASE)
        # In case multiple matches within one line
        for result in results:
            yield result


def frame_matching_data(page, matched_values):
    """
    frames matching values
    """
    matches_found = 0
    # Loop throughout matching values
    for val in matched_values:
        matches_found += 1
        matching_val_area = page.searchFor(val)
        for area in matching_val_area:
            if isinstance(area, fitz.fitz.Rect):
                # Draw a rectangle around matched values
                annot = page.addRectAnnot(area)
                # , fill = fitz.utils.getColor('black')
                annot.setColors(stroke=fitz.utils.getColor('red'))
                # If you want to remove matched data
                #page.addFreetextAnnot(area, ' ')
                annot.update()
    return matches_found


def highlight_matching_data(page, search_str, matched_values, type, color):
    """
    Highlight matching values
    """
    matches_found = 0
    # Loop throughout matching values
    for val in matched_values:
        matches_found += 1
        matching_val_area = []
        if len(val.split(" ")) > 1:
            matching_val_area = page.search_for(val)
        else:
            # get rect for all words
            content_of_page = page.get_text("words", sort=False)
            for word in content_of_page:
                if word[4] == val:
                    matching_val_area.append(fitz.Rect(word[0], word[1],
                                                       word[2], word[3]))

        highlight = None
        if type == 'Highlight':
            highlight = page.add_highlight_annot(matching_val_area)
        elif type == 'Squiggly':
            highlight = page.add_squiggly_annot(matching_val_area)
        elif type == 'Underline':
            highlight = page.add_underline_annot(matching_val_area)
        elif type == 'Strikeout':
            highlight = page.add_strikeout_annot(matching_val_area)
        else:
            highlight = page.add_highlight_annot(matching_val_area)
        # To change the highlight colar
        # highlight.setColors({"stroke":(0,0,1),"fill":(0.75,0.8,0.95) })
        # highlight.setColors(stroke = fitz.utils.getColor('white'), fill = fitz.utils.getColor('red'))
        highlight.set_colors(stroke=fitz.utils.getColor(color))
        highlight.update()
    return matches_found


def process_data(input_file: str, output_file: str, search_str: str, color: str, pages: Tuple = None, action: str = 'Highlight'):
    """
    Process the pages of the PDF File
    """
    # Open the PDF
    pdfDoc = fitz.open(input_file)
    # Save the generated PDF to memory buffer
    output_buffer = BytesIO()
    total_matches = 0

    # Iterate through pages
    for pg in range(pdfDoc.page_count):
        # If required for specific pages
        if pages:
            if str(pg) not in pages:
                continue
        # Select the page
        page = pdfDoc[pg]
        # Get Matching Data
        # Split page by lines
        page_lines = page.get_text("text").split('\n')
        matched_values = search_for_text(page_lines, search_str)
        if matched_values:
            if action == 'Frame':
                matches_found = frame_matching_data(page, matched_values)
            elif action in ('Highlight', 'Squiggly', 'Underline', 'Strikeout'):
                matches_found = highlight_matching_data(
                    page, search_str, matched_values, action, color)
            else:
                matches_found = highlight_matching_data(
                    page, search_str, matched_values, 'Highlight', color)
            total_matches += matches_found
    # print(f"{total_matches} Match(es) Found of Search String {search_str} In Input File: {input_file}")
    # Save to output
    pdfDoc.save(output_buffer)
    pdfDoc.close()
    # Save the output buffer to the output file
    with open(output_file, mode='wb') as f:
        f.write(output_buffer.getbuffer())


if __name__ == "__main__":
    input_file = "Projectplan.pdf"
    signal_words = read_words("words_signal.txt")
    forbidden_words = read_words("words_forbidden.txt")
    redundant_words = read_words("words_redundant.txt")
    output_file = "output.pdf"
    pdfDoc = fitz.open(input_file)
    pdfDoc.save(output_file)
    pdfDoc.close()

    for (lines, color, action) in [
        (signal_words, 'yellow', 'Highlight'),
        (forbidden_words, 'pink', 'Highlight'),
        (redundant_words, 'red', 'Strikeout')
    ]:
        for word in lines:
            process_data(output_file, output_file, word,
                         color, action=action)
