from typing import List, Optional

from pydantic import BaseModel


class Sentence(BaseModel):
    text: str


class Word(BaseModel):
    form: str


class NoneWord(BaseModel):
    form: str


class CheckedWord(BaseModel):
    form: str
    suggestions: Optional[List] = []


class CheckedSentence(BaseModel):
    words: List[CheckedWord]


class ClassifiedWord(BaseModel):
    form: str
    is_word: Optional[bool] = True
