import pytest

from saturn.admin import site as saturn_admin
from saturn.models import TheModel

saturn_admin.register([TheModel])


@pytest.mark.parametrize("field", [
    b'id', b'listDisplay', b'field'
])
def test_changelist_view(db, client, field):
    TheModel.objects.create(field='Some Text')
    response = client.get('/saturn/api/saturn/themodel/')
    print(response.content)
    assert field in response.content
