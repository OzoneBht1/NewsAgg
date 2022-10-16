from rest_framework import permissions
from .models import News, Comment


class IsTheCommentAuthor(permissions.DjangoModelPermissions):

    def has_permission(self, request, view):
        if request.user.id == Comment.objects.get(id=view.kwargs['pk']).user.id:
            return True
