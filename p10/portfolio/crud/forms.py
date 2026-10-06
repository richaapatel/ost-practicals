from django import forms
from .models import Item

class ItemForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = ['name', 'description']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Enter item name'}),
            'description': forms.Textarea(attrs={'class': 'form-input', 'placeholder': 'Enter description', 'rows': 4}),
        }
