from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.json()

def test_filter_tokens():
    response = client.post(
        "/tokens/",
        headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept" },
        json={ "text": "testགས" }
    )
    assert response.json() == [
        {"text": "test", "isWord": "false"},
        {"text": "ག", "isWord": "true"},
        {"text": "ས", "isWord": "true"},
    ]