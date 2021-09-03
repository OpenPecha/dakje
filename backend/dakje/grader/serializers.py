from rest_framework import serializers


class TokensSerializer(serializers.Serializer):
    tokens = serializers.ListField(child=serializers.DictField())
