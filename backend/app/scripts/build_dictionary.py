import argparse
import logging
import re
from pathlib import Path

_re_word = re.compile(r"^\S+")
_re_freq = re.compile(r"\d+$")


def parse_word(text):
    word_match = _re_word.search(text)
    word = word_match.group(0) if word_match else ""
    freq_match = _re_freq.search(text)
    freq = freq_match.group(0) if freq_match else 0
    return word, freq


def parse_words(fn):
    logging.info(f"\tparsing {fn.name}...")
    for line in fn.read_text().splitlines():
        if not line or line.startswith("#"):
            continue
        word, freq = parse_word(line)
        print(word, freq)
        yield word, freq


def build_dictionary(path, delimiter):
    logging.info("Building dictionary...")
    path = Path(path)
    dictionary = ""
    for fn in path.iterdir():
        for word, freq in parse_words(fn):
            dictionary += f"{word}{delimiter}{freq}\n"
    return dictionary


def save_dictionary(dictionary, name, path):
    path = Path(path)
    path.mkdir(exist_ok=True, parents=True)
    dict_fn = path / f"{name}.txt"
    dict_fn.write_text(dictionary)
    logging.info(f"Dictionary saved at {dict_fn}")
    return dict_fn


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="building dictionary from botok-data")
    parser.add_argument("path", type=str, help="path to dictionary words files")
    parser.add_argument(
        "--name", "-n", type=str, help="name of the dictionary", default="general"
    )
    parser.add_argument(
        "--output",
        "-o",
        type=str,
        help="path to save the dictionary",
        default="./data/dictionary",
    )
    parser.add_argument(
        "--delimiter", "-d", type=str, help="path to save the dictionary", default=" "
    )
    args = parser.parse_args()

    dictionary = build_dictionary(args.path, args.delimiter)
    dictionary_fn = save_dictionary(dictionary, args.name, args.output)
