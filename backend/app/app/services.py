from typing import Iterator, List

from botok import Token, WordTokenizer
from botok.text.modify import is_mistake
from symspellpy import SymSpell, Verbosity

from . import schemas
from .config import settings

WT = WordTokenizer()

sym_spell = SymSpell()
sym_spell.load_dictionary(settings.DICTIONARY_PATH, term_index=0, count_index=1)


def tokenize(text) -> List[Token]:
    tokens = WT.tokenize(text)
    return tokens


def classify_non_word(tokens: List[Token]) -> Iterator[schemas.ClassifiedWord]:
    for token in tokens:
        classified_word = schemas.ClassifiedWord(form=token.text)
        if is_mistake(token):
            classified_word.is_word = False
        yield classified_word


def get_suggestions(none_word: str) -> List[str]:
    suggestions = sym_spell.lookup(none_word, Verbosity.CLOSEST, max_edit_distance=2)
    suggested_words = []
    for i, suggestion in enumerate(suggestions):
        if i > settings.SUGGESTIONS_LIMIT:
            break
        suggested_words.append(suggestion.term)
    return suggested_words
