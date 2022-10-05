import re
from app.schemas import Text, Sentence, Span

from botok.tokenizers.sentencetokenizer import sentence_tokenizer
from botok.tokenizers.wordtokenizer import WordTokenizer

from fastapi import APIRouter

from typing import List

router = APIRouter()

def get_sentence_content(sentence_token):
    """Extrac sentence string from list of token in present in sentence

    Args:
        sentence_token (tuple): contains length of sentence and list of all the token in sentence

    Returns:
        str: setence string
    """
    sentence_content = ''
    for word in sentence_token[1]:
        sentence_content += word.text
    return sentence_content

def get_number_of_verb(sentence_token):
    """Return number of verbs in sentence

    Args:
        sentence_token (tuple): contains length of sentence and list of all the token in sentence

    Returns:
        int: number of verb in sentence
    """
    number_of_verb = 0
    for word in sentence_token[1]:
        if word.pos == 'VERB':
            number_of_verb += 1
    return number_of_verb

def get_sentence_span(sentence_content, text_content):
    """return sentence starting and ending locations of the sentence in text

    Args:
        sentence_content (str): sentence string
        text_content (str): text in which text is present

    Returns:
        span object: span object containing attribute as start and end denoting the location of sentence in text
    """
    sentence_pattern = re.search(sentence_content, text_content)
    sentence_start = sentence_pattern.start()
    sentence_end = sentence_pattern.end()
    span = Span(start=sentence_start, end=sentence_end)
    return span

def parse_sentence_token(sentence_token, text_content):
    """Sentence informations are formatted as Sentence object and returned

    Args:
        sentence_token (tuple): contains length of sentence and list of all the token in sentence
        text_content (str): Text content

    Returns:
        obj: Sentence object containing attribute such as content, length, verbs, span
    """
    sentence_content = get_sentence_content(sentence_token)
    sentence_length = sentence_token[0]
    number_of_verb = get_number_of_verb(sentence_token)
    sentence_span = get_sentence_span(sentence_content, text_content)
    sentence = Sentence(
        content = sentence_content,
        length = sentence_length,
        verbs = number_of_verb,
        span = sentence_span
    )
    return sentence

def update_text_content(sentence, text_content):
    """Once sentence is parse from text, it's content are replaced as
    $ so that we won't get confuse finding sentence span of repeated sentence later

    Args:
        sentence (obj): sentence object
        text_content (str): text content

    Returns:
        str: updated text content
    """
    sentence_content = sentence.content
    replacement_sentence = '$' * len(sentence_content)
    text_content = re.sub(sentence_content, replacement_sentence, text_content, 1)
    return text_content

def get_sentences(text_content, word_tokens) -> List[Sentence]:
    """Return list of sentence object

    Args:
        text_content (str): text content

    Returns:
        list: list of sentence object
    """
    sentence_token_list = sentence_tokenizer(word_tokens)
    sentences = []
    for sentence_token in sentence_token_list:
        sentence = parse_sentence_token(sentence_token, text_content)
        text_content = update_text_content(sentence, text_content)
        sentences.append(sentence)
    return sentences

@router.post("/sentence", response_model=List[Sentence])
def sentence_segmentation(text: Text):
    sentences = []
    text_content = text.content
    word_tokenizer = WordTokenizer()
    tokens = word_tokenizer.tokenize(text_content)
    sentences = get_sentences(text_content, tokens)
    return sentences