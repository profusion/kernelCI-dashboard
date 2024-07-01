from django.db import models


class Tests(models.Model):
    field_timestamp = models.DateTimeField(db_column='_timestamp', blank=True, null=True)
    build_id = models.TextField()
    id = models.TextField(primary_key=True)
    origin = models.TextField()
    environment_comment = models.TextField(blank=True, null=True)
    environment_misc = models.JSONField(blank=True, null=True)
    path = models.TextField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    log_url = models.TextField(blank=True, null=True)
    log_excerpt = models.CharField(max_length=16384, blank=True, null=True)
    status = models.TextField(blank=True, null=True)  # This field type is a guess.
    waived = models.BooleanField(blank=True, null=True)
    start_time = models.DateTimeField(blank=True, null=True)
    duration = models.FloatField(blank=True, null=True)
    output_files = models.JSONField(blank=True, null=True)
    misc = models.JSONField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tests'


class Issues(models.Model):
    field_timestamp = models.DateTimeField(db_column='_timestamp', blank=True, null=True)
    id = models.TextField(primary_key=True)
    version = models.IntegerField()
    origin = models.TextField()
    report_url = models.TextField(blank=True, null=True)
    report_subject = models.TextField(blank=True, null=True)
    culprit_code = models.BooleanField(blank=True, null=True)
    culprit_tool = models.BooleanField(blank=True, null=True)
    culprit_harness = models.BooleanField(blank=True, null=True)
    build_valid = models.BooleanField(blank=True, null=True)
    test_status = models.TextField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    misc = models.JSONField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'issues'
        unique_together = (('id', 'version'),)


class Incidents(models.Model):
    field_timestamp = models.DateTimeField(db_column='_timestamp', blank=True, null=True)
    id = models.TextField(primary_key=True)
    origin = models.TextField()
    issue_id = models.TextField()
    issue_version = models.IntegerField()
    build_id = models.TextField(blank=True, null=True)
    test_id = models.TextField(blank=True, null=True)
    present = models.BooleanField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    misc = models.JSONField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'incidents'


class Checkouts(models.Model):
    field_timestamp = models.DateTimeField(db_column='_timestamp', blank=True, null=True)
    id = models.TextField(primary_key=True)
    origin = models.TextField()
    tree_name = models.TextField(blank=True, null=True)
    git_repository_url = models.TextField(blank=True, null=True)
    git_commit_hash = models.TextField(blank=True, null=True)
    git_commit_name = models.TextField(blank=True, null=True)
    git_repository_branch = models.TextField(blank=True, null=True)
    patchset_files = models.JSONField(blank=True, null=True)
    patchset_hash = models.TextField(blank=True, null=True)
    message_id = models.TextField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    start_time = models.DateTimeField(blank=True, null=True)
    contacts = models.JSONField(blank=True, null=True)
    log_url = models.TextField(blank=True, null=True)
    log_excerpt = models.CharField(max_length=16384, blank=True, null=True)
    valid = models.BooleanField(blank=True, null=True)
    misc = models.JSONField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'checkouts'


class Builds(models.Model):
    field_timestamp = models.DateTimeField(db_column='_timestamp', blank=True, null=True)
    checkout_id = models.TextField()
    id = models.TextField(primary_key=True)
    origin = models.TextField()
    comment = models.TextField(blank=True, null=True)
    start_time = models.DateTimeField(blank=True, null=True)
    duration = models.FloatField(blank=True, null=True)
    architecture = models.TextField(blank=True, null=True)
    command = models.TextField(blank=True, null=True)
    compiler = models.TextField(blank=True, null=True)
    input_files = models.JSONField(blank=True, null=True)
    output_files = models.JSONField(blank=True, null=True)
    config_name = models.TextField(blank=True, null=True)
    config_url = models.TextField(blank=True, null=True)
    log_url = models.TextField(blank=True, null=True)
    log_excerpt = models.CharField(max_length=16384, blank=True, null=True)
    valid = models.BooleanField(blank=True, null=True)
    misc = models.JSONField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'builds'
