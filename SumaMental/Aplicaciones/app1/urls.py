from django.urls import path

from Aplicaciones.app1.views.principal.views import PrincipalView, ResultView

app_name = "principal"

urlpatterns = [
    # Principal
    path("", PrincipalView.as_view(), name="home"),
    path("resultado/", ResultView.as_view(), name="result"),
]
