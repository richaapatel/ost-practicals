from django.shortcuts import render, redirect

from .forms import ContactForm
from .models import ContactMessage


def home(request):

    if request.method == 'POST':

        form = ContactForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('home')

    else:
        form = ContactForm()

    return render(request, 'home.html', {
        'form': form
    })


def messages(request):

    contact_messages = ContactMessage.objects.all().order_by('-sent_at')

    return render(request, 'messages.html', {
        'messages': contact_messages
    })