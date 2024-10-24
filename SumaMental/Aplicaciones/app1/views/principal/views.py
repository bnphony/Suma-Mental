from typing import Any, Dict

from django.db import models
from django.http import HttpResponse, JsonResponse
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import CreateView, ListView, TemplateView

from Aplicaciones.app1.funciones import generate_numbers


class PrincipalView(TemplateView):

    template_name = "principal/inicio.html"

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):

        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data: Dict[str, Any] = {}
        try:
            action = request.POST["action"]
            if action == "generate_sums":
                data = []
                numbers = request.POST["inputNumbers"]
                digits = request.POST["inputDigits"]
                rounds = request.POST["selectRounds"]
                for i in range(int(rounds)):
                    data.append(generate_numbers(int(numbers), int(digits)))
            else:
                data["error"] = "Error! Incorrect option"
        except Exception as e:
            data["error"] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        direcciones = [
            {
                "url": reverse_lazy("principal:home"),
                "name": "Inicio",
                "current": "active",
            },
        ]
        context["breads"] = direcciones
        return context


class ResultView(TemplateView):
    template_name = "principal/resultado.html"

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        direcciones = [
            {
                "url": reverse_lazy("principal:home"),
                "name": "Inicio",
                "current": "",
            },
            {
                "url": reverse_lazy("principal:result"),
                "name": "Resultados",
                "current": "active",
            },
        ]
        context["breads"] = direcciones
        return context
