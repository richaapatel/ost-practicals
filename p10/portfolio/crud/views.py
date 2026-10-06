from django.shortcuts import render, redirect, get_object_or_404
from .models import Project
from .forms import ProjectForm

def project_list(request):
    projects = Project.objects.all().order_by('-created_at')
    return render(request, 'crud/project_list.html', {'projects': projects})

def project_create(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('project_list')
    else:
        form = ProjectForm()
    return render(request, 'crud/project_form.html', {'form': form, 'title': 'Add Project'})

def project_update(request, pk):
    project = get_object_or_404(Project, pk=pk)
    if request.method == 'POST':
        form = ProjectForm(request.POST, instance=project)
        if form.is_valid():
            form.save()
            return redirect('project_list')
    else:
        form = ProjectForm(instance=project)
    return render(request, 'crud/project_form.html', {'form': form, 'title': 'Update Project'})

def project_delete(request, pk):
    project = get_object_or_404(Project, pk=pk)
    if request.method == 'POST':
        project.delete()
        return redirect('project_list')
    return render(request, 'crud/project_confirm_delete.html', {'project': project})
