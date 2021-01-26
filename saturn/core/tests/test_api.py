def test_dummy_api_get(client):
    resp = client.get('/api/')
    assert resp.status_code == 200
