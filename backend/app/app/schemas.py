from pydantic import BaseModel, validator
from typing import List


class Span(BaseModel):
    start: int
    end: int

    @validator("*")
    def span_must_not_be_neg(cls, v):
        if v < 0:
            raise ValueError("span shouldn't be negative")
        return v

    @validator("end")
    def end_must_not_be_less_than_start(cls, v, values, **kwargs):
        if "start" in values and v < values["start"]:
            raise ValueError("Span end must not be less than start")
        return v


class Text(BaseModel):
    content: str


class WordToken(BaseModel):
    form: str
    pos: str


class Sentence(BaseModel):
    content: str
    length: int
    verbs: int
    span: Span

class WordAndSentenceTokens(BaseModel):
    words: List[WordToken]
    sentences: List[Sentence]
