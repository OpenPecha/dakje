from rest_framework import views
from rest_framework.response import Response

from .serializers import ProcessedSerializer, TextSerializer


class SpellcheckView(views.APIView):
    """
    API endpoint for spell checking a text.
    """

    def post(self, request):
        serializer = TextSerializer(data=request.data)
        if serializer.is_valid():
            text = serializer.save()
            data = {
                "text": text.content,
                "tokens": [token.text for token in text.tokens],
                "suggestions": text.suggestions,
            }
            print(data)
            result = ProcessedSerializer(data).data
            return Response(result)
