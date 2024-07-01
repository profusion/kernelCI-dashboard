from django.http import JsonResponse
from django.views import View

from kernelCI_app.models import Checkouts
from kernelCI_app.serializers import CheckoutsSerializer


class TreeView(View):

    def get(self, _):
        checkouts = Checkouts.objects.order_by('-field_timestamp')[:10]
        serializer = CheckoutsSerializer(checkouts, many=True)
        return JsonResponse(serializer.data, safe=False)
