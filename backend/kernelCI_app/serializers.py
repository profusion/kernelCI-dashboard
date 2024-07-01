from rest_framework import serializers
from kernelCI_app.models import Checkouts


class CheckoutsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkouts
        fields = [
            'field_timestamp', 'id', 'origin', 'tree_name',
            'git_repository_url', 'git_commit_hash', 'git_commit_name',
            'git_repository_branch', 'patchset_files', 'patchset_hash',
            'message_id', 'comment', 'start_time', 'contacts',
            'log_url', 'log_excerpt', 'valid', 'misc'
        ]
