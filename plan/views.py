
import re
from django.contrib.auth.views import PasswordChangeView
from django.http.response import HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect, render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.views.decorators.csrf import csrf_protect
from plan.forms import RegistrationForm, EditProfileForm,PasswordChangingForm
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
import uuid
from plan.models import Chart
from django.urls import reverse_lazy
from rest_framework import status
from rest_framework.decorators import api_view
from plan.serializers import chartserialize
import requests

# Create your views here.


def home(request):
    return render(request, "accounts/home.html")





def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            profile = form.save(commit=False)
            profile.user = request.user
            profile.save()
            return redirect('/account/')
    else:
        form = RegistrationForm()

        args = {'form': form}
        return render(request, 'accounts/reg_form.html', args)


def view_profile(request):
    args = {'user': request.user}
    return render(request, 'accounts/profile.html', args)


class PasswordsChangeView(PasswordChangeView):
    form_class = PasswordChangingForm
    success_url = reverse_lazy('project5daytrack:password_success')



def password_success(request):
    args = {'user': request.user}
    return render(request,'accounts/password_success.html', args)


def edit_profile(request):
    if request.method == 'POST':
        form = EditProfileForm(request.POST, instance=request.user)

        if form.is_valid():
            form.save()
            return redirect('/account/profile/')
    else:
        form = EditProfileForm(instance=request.user)
        args = {'form': form}
        return render(request, "accounts/edit_profile.html", args)


@api_view([ "POST"])
def delrec(request):
    print(request.method)
    data = request.data
    print(data)
    if Chart.objects.filter(id=data['id']).exists():
        Chart.objects.all().filter(id= data['id']).delete()
        return Response("Deleted")
    else:
        return Response("Missing")

    

@api_view(["GET", "POST"])
def charts(request):
    data = request.data
    print(data)

    if request.method == 'GET':
        data = request.data

        current_user = request.user.id

        chart = Chart.objects.all().filter(userid=current_user)

        serializer = chartserialize(chart, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        data = request.data

        if Chart.objects.filter(graphid=data['graphid']).exists():
            
            chart_to_update = Chart.objects.filter(graphid=data['graphid']).update(graphid=data.get("graphid"), title=data.get(
                "title"), data=data.get("data"))
            return Response(data['graphid'], status=status.HTTP_201_CREATED)
        else:
      
            chart_to_save = Chart(graphid=data.get("graphid"), title=data.get(
                "title"), data=data.get("data"), userid=request.user)
            chart_to_save.save()
            return Response(chart_to_save.graphid, status=status.HTTP_201_CREATED)


class BarData(APIView):

    authentication_classes = []
    permission_classes = []
    idNum = 0
    rgbl = 0

    def get(self, request, format=None):

        qs_count = User.objects.all().count()

        Title = "Bar Graph"
        labels = {"Max", "Eman", "Sally", "Raf", "Estee", "James", "Lucas"}
        bartype = "bar"

        label_title = "Label"
        yaxis_title = "Y-Axis"
        xaxis_title = "X-Axis"
        hoverbordercolor = ['#ea9999', '#f9cb9c', '#ffe599',
                            '#b6d7a8', '#a2c4c9', '#9fc5e9', '#bfa7d6', '#d5a6bd']
        hoverborderwidth = 5
        borderWidth = 1
        background_colors = ["#f4cccc", "#fce5cd", "#fff2cc",
                             "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"]
        border_colors = ["#f4cccc", "#fce5cd", "#fff2cc",
                         "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"]
        items = [qs_count, 10, 20, 30, 40, 50, 60, ]

        data = {
            "type": bartype,
            "graphid": uuid.uuid4(),
            "title": Title,
            "labels": labels,
            "default_data": items,
            "yaxis_title": yaxis_title,
            "xaxis_title": xaxis_title,
            "label_title": label_title,
            "backgroundColor": background_colors,
            "borderColor": border_colors,
            "borderwidth": borderWidth,
            "hoverborderwidth": hoverborderwidth,
            "hoverBorderColor": hoverbordercolor,



        }

        return Response(data)


class lineData(APIView):

    authentication_classes = []
    permission_classes = []
    idNum = 0
    rgbl = 0

    def get(self, request, format=None):

        qs_count = User.objects.all().count()

        Title = "Line Graph"
        labels = {"Max", "Eman", "Sally", "Raf", "Estee", "James", "Lucas"}
        linetype = "line"
        label_title = "Label"
        yaxis_title = "Y-Axis"
        xaxis_title = "X-Axis"
        hoverbordercolor = ['#ea9999', '#f9cb9c', '#ffe599',
                            '#b6d7a8', '#a2c4c9', '#9fc5e9', '#bfa7d6', '#d5a6bd']
        hoverborderwidth = 1
        borderWidth = 1
        background_colors = ["#f4cccc", "#fce5cd", "#fff2cc",
                             "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"]
        line_Color = "#f4cccc"
        items = [qs_count, 10, 20, 30, 40, 50, 60, ]
        line_tension = 0.5
        line_fill = 'false'

        data = {


            'type': linetype,
            "line_tension": line_tension,
            "line_fill": line_fill,
            "graphid": uuid.uuid4(),
            "title": Title,
            "labels": labels,
            "default_data": items,
            "yaxis_title": yaxis_title,
            "xaxis_title": xaxis_title,
            "label_title": label_title,
            "backgroundColor": background_colors,
            "lineColor": line_Color,
            "borderwidth": borderWidth,
            "hoverborderwidth": hoverborderwidth,
            "hoverBorderColor": hoverbordercolor,
            "fill_color": line_Color,


        }

        return Response(data)


class radarData(APIView):

    authentication_classes = []
    permission_classes = []
    idNum = 0
    rgbl = 0

    def get(self, request, format=None):

        qs_count = User.objects.all().count()

        Title = "Radar Graph"
        labels = {"Max", "Eman", "Sally", "Raf", "Estee", "James", "Lucas"}
        radartype = "radar"
        label_title = "My Dataset"
        pointbackgroundColor = ['#ea9999', '#f9cb9c', '#ffe599',
                                '#b6d7a8', '#a2c4c9', '#9fc5e9', '#bfa7d6', '#d5a6bd']
        pointhoverborderColor = ['#ea9999', '#f9cb9c', '#ffe599',
                                 '#b6d7a8', '#a2c4c9', '#9fc5e9', '#bfa7d6', '#d5a6bd']
        background_colors = '#b6d7a8'
        border_colors = ["#f4cccc"]
        items = [qs_count, 10, 20, 30, 40, 50, 60, ]
        line_fill = 'true'
        data = {


            'type': radartype,
            "line_fill": line_fill,
            "graphid": uuid.uuid4(),
            "title": Title,
            "labels": labels,
            "default_data": items,
            "label_title": label_title,
            "pointbackgroundColor": pointbackgroundColor,
            "backgroundColor": background_colors,
            "borderColor": border_colors,
            "pointhoverborderColor": pointhoverborderColor,



        }

        return Response(data)


class doughnutData(APIView):

    authentication_classes = []
    permission_classes = []
    idNum = 0
    rgbl = 0

    def get(self, request, format=None):

        qs_count = User.objects.all().count()

        Title = "Doughnut Graph"
        labels = {"Max", "Eman", "Sally", "Raf", "Estee", "James", "Lucas"}
        doughnuttype = "doughnut"
        label_title = "My Dataset"
        borderRadius = 2
        borderWidth = 2
        hoverOffset = 100
        background_colors = ['#ea9999', '#f9cb9c', '#ffe599',
                             '#b6d7a8', '#a2c4c9', '#9fc5e9', '#bfa7d6', '#d5a6bd']
        border_colors = ["#fff"]
        items = [qs_count, 10, 20, 30, 40, 50, 60, ]
        data = {


            'type': doughnuttype,
            "graphid": uuid.uuid4(),
            "title": Title,
            "labels": labels,
            "borderRadius": borderRadius,
            'borderWidth': borderWidth,
            'hoverOffset': hoverOffset,
            "default_data": items,
            "label_title": label_title,
            "backgroundColor": background_colors,
            "borderColor": border_colors,



        }

        return Response(data)
