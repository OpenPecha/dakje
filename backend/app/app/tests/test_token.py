from fastapi.testclient import TestClient

from app.main import app




def test_tokenizer(client):
    data = {
    "content": "སྟོན་ཀ་ཤར་སོང་།"
    }
    expected_data = [
            {
                "form": "སྟོན་ཀ་",
                "pos": "NOUN"
            },
            {
                "form": "ཤར་",
                "pos": "VERB"
            },
            {
                "form": "སོང་",
                "pos": "VERB"
            },
            {
                "form": "།",
                "pos": ""
            }
        ]
    response = client.post("/api/token", json=data)
    assert response.status_code == 200
    assert response.json() == expected_data