# Generated by Django 3.1.5 on 2021-03-19 02:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sandbox', '0003_dummyproducts'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='DummyProducts',
            new_name='DummyProduct',
        ),
    ]