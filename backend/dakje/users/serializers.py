from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]

        extra_kwargs = {
            "url": {"view_name": "user-detail", "lookup_field": "username"},
            "groups": {"view_name": "group-detail"},
        }


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]

        extra_kwargs = {"url": {"view_name": "group-detail"}}
