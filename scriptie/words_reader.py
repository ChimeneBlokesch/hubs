import re


def read_words(file):
    """
    Read signal words from a file. Each word is on a separate line.
    Return a list with all these words in regex format.
    """

    # Open the file and read the lines
    with open(file, 'r') as f:
        lines = f.readlines()

    # Remove the trailing newline character from each line
    lines = [line.rstrip() for line in lines]

    # Remove parentheses and the words inside them
    lines = [re.sub(r'\(.*\)', '', line) for line in lines]

    # ... -> .*
    lines = [line.replace('...', '.*') for line in lines]

    lines = [r"\b" + line + r"\b" for line in lines]

    return lines
