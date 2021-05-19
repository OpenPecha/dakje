from fastapi import APIRouter

from . import schemas
from .services import classify_non_word, get_suggestions, tokenize

router = APIRouter()


@router.post("/sentences/check", response_model=schemas.CheckedSentence)
async def spellcheck_sentence(sentence: schemas.Sentence):
    tokens = tokenize(sentence.text)
    checked_words = []
    for classified_word in classify_non_word(tokens):
        checked_word = schemas.CheckedWord(form=classified_word.form)
        if not classified_word.is_word:
            checked_word.suggestions = get_suggestions(classified_word.form)
        checked_words.append(checked_word)
    return schemas.CheckedSentence(words=checked_words)


@router.post("/words/check", response_model=schemas.CheckedWord)
async def spellcheck_word(word: schemas.Word):
    suggestions = get_suggestions(word.form)
    return schemas.CheckedWord(form=word.form, suggestions=suggestions)
