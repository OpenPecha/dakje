import botok
from botok import WordTokenizer
from botok.text.modify import *
from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class textParams(BaseModel):
    text: str

@app.get("/")
def read_root():
    in_str = "ལེ གས། བཀྲ་ཤིས་མཐའི་ ༆ ཤི་བཀྲ་ཤིས་  tr བདེ་་ལེ གས། བཀྲ་ཤིས་བདེ་ལེགས་༡༢༣ཀཀ། མཐའི་རྒྱ་མཚོར་གནས་པའི་ཉས་ཆུ་འཐུང་།། །།མཁའ།" #testing
    WT = WordTokenizer()
    tokens = WT.tokenize(in_str)
    return tokens


@app.post("/tokens/")
async def tokens(params: textParams):
    WT = WordTokenizer()
    tokens = WT.tokenize(params.text)

    filtered = []
    for token in tokens:
        current = {}
        if (is_mistake(token)):
            current = {
                "text": token.text,
                "isWord": "false",
            }
        else:
            current = {
                "text": token.text,
                "isWord": "true",
            }
        filtered.append(current)

    return filtered
