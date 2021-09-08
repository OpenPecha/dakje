from fastapi.testclient import TestClient

from app.main import app




def test_sentence_tokenizer(client):
    data = {
    "content": "སྟོན་ཀ་ཤར་སོང་། རི་ལུང་ཐམས་ཅད་ནི་གསེར་གྱི་མདོག་ལྟ་བུ་ཞིག་རེད། ང་ཚོའི་རུ་བ་སྟོན་མཚེར་དུ་སྤོས། སྟོན་མཚེར་ན་རྩྭ་ཧ་ཅང་འཐུག། ཟོག་ལུག་རྣམས་རྩྭ་ནང་དུ་ནུབ་འགྲོ། "
    }
    expected_data = [
    {
        "content": "སྟོན་ཀ་ཤར་སོང་། ",
        "length": 4,
        "verbs": 2,
        "span": {
        "start": 0,
        "end": 16
        }
    },
    {
        "content": "རི་ལུང་ཐམས་ཅད་ནི་གསེར་གྱི་མདོག་ལྟ་བུ་ཞིག་རེད། ",
        "length": 10,
        "verbs": 1,
        "span": {
        "start": 16,
        "end": 62
        }
    },
    {
        "content": "ང་ཚོའི་རུ་བ་སྟོན་མཚེར་དུ་སྤོས། སྟོན་མཚེར་ན་རྩྭ་ཧ་ཅང་འཐུག། ཟོག་ལུག་རྣམས་རྩྭ་ནང་དུ་ནུབ་འགྲོ། ",
        "length": 23,
        "verbs": 1,
        "span": {
        "start": 62,
        "end": 153
        }
    }
    ]
    response = client.post("/api/sentence", json=data)
    assert response.status_code == 200
    assert response.json() == expected_data