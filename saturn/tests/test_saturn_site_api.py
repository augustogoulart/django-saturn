from saturn.sites import SaturnSite

saturn_site = SaturnSite()


def test_index_view(rf):
    """
    Site's index view must return 200.
    """
    request = rf.get('/')
    response = saturn_site.index(request)
    assert response.status_code == 200


def test_registered_models_api(client):
    """
    Lists all the models registered with SaturnSite.
    """
    response = client.get('/saturn/api/site/registered/')
    assert response.status_code == 200
