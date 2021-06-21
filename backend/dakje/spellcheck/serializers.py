from bospell.text import Text
from rest_framework import serializers


class SpanSerializer(serializers.Serializer):
    start = serializers.IntegerField()
    end = serializers.IntegerField()


class SuggestionsSerializer(serializers.Serializer):
    candidates = serializers.ListField(child=serializers.CharField(max_length=30))
    span = SpanSerializer()


class ProcessedSerializer(serializers.Serializer):
    text = serializers.CharField()
    suggestions = SuggestionsSerializer(many=True)


class TextSerializer(serializers.Serializer):
    content = serializers.CharField()

    def create(self, validated_data):
        return Text(**validated_data)
