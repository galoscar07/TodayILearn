# -*- coding: utf-8 -*-
# Generated by Django 1.11.14 on 2018-07-19 15:05
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('polls', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tvshow',
            name='watchers',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='episode',
            name='episodeDescription',
            field=models.CharField(max_length=200, verbose_name='Episode Description'),
        ),
        migrations.AlterField(
            model_name='episode',
            name='episodeName',
            field=models.CharField(max_length=100, verbose_name='Episode Name'),
        ),
        migrations.AlterField(
            model_name='episode',
            name='episodeNumber',
            field=models.IntegerField(default=0, verbose_name='Episode Number'),
        ),
        migrations.AlterField(
            model_name='episode',
            name='viewedEpisode',
            field=models.BooleanField(default=False, verbose_name='Watched'),
        ),
        migrations.AlterField(
            model_name='series',
            name='nameSeries',
            field=models.CharField(max_length=100, verbose_name='Series Name'),
        ),
        migrations.AlterField(
            model_name='series',
            name='numberSeries',
            field=models.IntegerField(default=0, verbose_name='Series Number'),
        ),
        migrations.AlterField(
            model_name='tvshow',
            name='apparitionDate',
            field=models.DateField(verbose_name='Aired Date'),
        ),
        migrations.AlterField(
            model_name='tvshow',
            name='endDate',
            field=models.DateField(verbose_name='Ended Date'),
        ),
        migrations.AlterField(
            model_name='tvshow',
            name='episodeDuration',
            field=models.IntegerField(default=0, verbose_name='Duration Episode (minutes)'),
        ),
        migrations.AlterField(
            model_name='tvshow',
            name='genreTvShow',
            field=models.CharField(max_length=100, verbose_name='Genre'),
        ),
        migrations.AlterField(
            model_name='tvshow',
            name='nameTvShow',
            field=models.CharField(max_length=50, verbose_name='Show name'),
        ),
        migrations.AlterField(
            model_name='tvshow',
            name='shortDescription',
            field=models.CharField(max_length=200, verbose_name='Short Description'),
        ),
    ]
