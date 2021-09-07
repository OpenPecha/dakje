from pydantic import BaseModel


class Text(BaseModel):
    content: str


class Token(BaseModel):
    form: str
    pos: str


class Sentence(BaseModel):
    sentence_lenght: int
    verb_per_sentence: int
