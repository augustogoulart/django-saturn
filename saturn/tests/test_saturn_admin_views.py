import json

import pytest

from saturn.admin import site as saturn_admin
from saturn.models import TheModel

saturn_admin.register([TheModel])


@pytest.mark.parametrize("field", [
    b'id', b'listDisplay', b'field'
])
def test_changelist_api_view(db, client, field):
    TheModel.objects.create(field='Some Text')
    response = client.get('/saturn/api/saturn/themodel/')
    assert field in response.content


@pytest.mark.parametrize("fields", [
    'meta'
])
def test_model_meta_api_view(db, client, fields):
    """
    Test we can retrieve meta information about the model's instance.
    """
    TheModel.objects.create(field='Some Text')
    response = client.get('/saturn/api/saturn/themodel/1/change/')
    content = json.loads(response.content)
    assert content[fields]
