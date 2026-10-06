from django import forms
from .models import Project

class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['title', 'description', 'technology']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. Student Management System'}),
            'description': forms.Textarea(attrs={'class': 'form-input', 'placeholder': 'Brief description of the project', 'rows': 4}),
            'technology': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. Python, Django, SQLite'}),
        }
