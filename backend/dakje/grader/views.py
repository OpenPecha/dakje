from botok.tokenizers.wordtokenizer import WordTokenizer
from rest_framework import views
from rest_framework.response import Response

from .serializers import TokensSerializer


class TokensView(views.APIView):
    """
    API endpoint for segmenting a text.
    """

    def post(self, request):
        print(request.data)
        if request.data.get("content", ""):
            text = request.data.get("content", "")
            word_tokenizer = WordTokenizer()
            tokens = word_tokenizer.tokenize(text)
            token_list = []
            for token in tokens:
                cur_token = {
                    "text": token.text,
                    "pos": token.pos,
                }
                token_list.append(cur_token)
            data = {
                "tokens": token_list,
            }
            print(data)
            result = TokensSerializer(data).data
            return Response(result)
