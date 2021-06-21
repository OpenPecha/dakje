from dakje.spellcheck.views import SpellcheckView
from dakje.users import views as users_views
from django.conf import settings
from django.urls import path
from rest_framework.routers import DefaultRouter, SimpleRouter

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter


router.register(r"users", users_views.UserViewSet)
router.register(r"groups", users_views.GroupViewSet)

app_name = "api"
urlpatterns = router.urls

# register non viewset
urlpatterns += [path("spellcheck/", SpellcheckView.as_view())]
