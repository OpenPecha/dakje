from dataclasses import dataclass
from typing import List

from botok import Token, WordTokenizer
from botok.text.modify import is_mistake
from django.conf import settings
from symspellpy import SymSpell, Verbosity

WT = WordTokenizer()

sym_spell = SymSpell()
sym_spell.load_dictionary(settings.DICTIONARY_PATH, term_index=0, count_index=1)


def get_sugggestions(token: Token, n: int):
    suggestions = sym_spell.lookup(token.text, Verbosity.CLOSEST, max_edit_distance=2)
    suggested_words = []
    for i, suggestion in enumerate(suggestions):
        if i > 5:
            break
        suggested_words.append(suggestion.term)
    return suggested_words


@dataclass
class Span:
    start: int
    end: int


@dataclass
class Suggestions:
    candidates: List[str]
    span: Span


class Text:
    def __init__(self, content="", **kwargs):
        self.content = content
        self.tokens = WT.tokenize(self.content)
        self.suggestions = []

    def correct(self):
        if self.suggestions:
            pass

        print(self.tokens)

        for token in self.tokens:
            if is_mistake(token):
                suggestions = get_sugggestions(token, 5)
                span = Span(start=token.start, end=token.start + token.len)
                self.suggestions.append(Suggestions(candidates=suggestions, span=span))
