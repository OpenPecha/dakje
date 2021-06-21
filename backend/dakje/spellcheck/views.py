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
            text.correct()
            data = {"text": text.content, "suggestions": text.suggestions}
            result = ProcessedSerializer(data).data
            return Response(result)
