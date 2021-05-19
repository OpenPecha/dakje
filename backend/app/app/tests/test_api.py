from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_spellcheck_sentence():
    response = client.post(
        "/api/sentences/check",
        headers={
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        },
        json={"text": "འཁོར་ཡུl"},
    )
    assert response.json() == {
        "words": [
            {"form": "བཀྲ་ཤི་", "suggestions": ["བཀྲ་ཤིས"]},
            {"form": "ཀྱི་", "suggestions": []},
            {"form": "འཁོར་ཡུ", "suggestions": ["འཁོར་ཡུག", "འཁོར་ཡུལ", "འཁོར་ཡུན"]},
            {"form": "།", "suggestions": []},
        ]
    }


def test_spellcheck_word():
    response = client.post(
        "/api/words/check",
        headers={
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        },
        json={"form": "འཁོར་ཡུ"},
    )

    assert response.json() == {
        "form": "འཁོར་ཡུ",
        "suggestions": ["འཁོར་ཡུག", "འཁོར་ཡུལ", "འཁོར་ཡུན"],
    }
