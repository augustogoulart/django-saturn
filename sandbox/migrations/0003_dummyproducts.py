# Generated by Django 3.1.5 on 2021-03-19 01:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sandbox', '0002_auto_20210315_0307'),
    ]

    operations = [
        migrations.CreateModel(
            name='DummyProducts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('price', models.IntegerField()),
            ],
        ),
    ]