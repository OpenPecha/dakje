from app.schemas import Text, WordToken, WordAndSentenceTokens
from app.routes.sentence import get_sentences

from botok.tokenizers.wordtokenizer import WordTokenizer

from fastapi import APIRouter

from typing import List

router = APIRouter()

word_tokenizer = WordTokenizer()

def get_word_tokens(tokens) -> List[WordToken]:
    word_tokens  = []
    for token in tokens:
        word_token = WordToken(form=token.text, pos=token.pos)
        word_tokens.append(word_token)
    return word_tokens

@router.post("/tokenize", response_model=WordAndSentenceTokens)
def tokenize_text(text: Text):
    tokens = word_tokenizer.tokenize(text.content)
    words = get_word_tokens(tokens)
    sentences = get_sentences(text.content, tokens)

    word_and_sentences_tokens = WordAndSentenceTokens(
        words=words,
        sentences=sentences
    )

    return word_and_sentences_tokens
