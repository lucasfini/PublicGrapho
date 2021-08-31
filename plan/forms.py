from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, PasswordChangeForm


class RegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True, max_length=254, help_text="Enter a valid Email")
    first_name = forms.CharField(max_length=30, required=False, help_text="Optional")
    last_name = forms.CharField(max_length=30, required=False, help_text="Optional")

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'email',
            'password1',
            'password2'
        )

    def save(self, commit=True):
        user = super(RegistrationForm, self).save(commit=False)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.email = self.cleaned_data['email']

        if commit:
            user.save()

        return user


class EditProfileForm(UserChangeForm):

    email = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'type': 'input'}),max_length=30)
    first_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'type': 'input'}),max_length=30)
    last_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'type': 'input'}),max_length=30)


    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name'
        )


class PasswordChangingForm(PasswordChangeForm):
    old_password = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control','type':'password'}),required=True)
    new_password1= forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control','type':'password'}),max_length=30)
    new_password2 = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control','type':'password'}),max_length=30)

    class Meta:
        model = User
        fields = (
            'old_password'
            'new_password1',
            'new_password2'
        )