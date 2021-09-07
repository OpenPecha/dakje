from app.schemas import Text, Token

from botok.tokenizers.wordtokenizer import WordTokenizer

from fastapi import APIRouter

from typing import List

router = APIRouter()


@router.post("/token", response_model=List[Token])
def tokenize_text(text: Text):
    word_tokenizer = WordTokenizer()
    tokens = word_tokenizer.tokenize(text.content)
    token_list = []
    for token in tokens:
        cur_token = Token(form=token.text, pos=token.pos)
        token_list.append(cur_token)
    return token_list
