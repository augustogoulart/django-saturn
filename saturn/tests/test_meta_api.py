import json

import pytest

from saturn.admin import site as saturn_admin
from saturn.models import TheModel

saturn_admin.register([TheModel])


def test_meta_field_exists(db, client):
    TheModel.objects.create(field='Some Text')
    response = client.get('/saturn/api/saturn/themodel/')
    json_response = json.loads(response.content)
    assert json_response[1]['meta']
