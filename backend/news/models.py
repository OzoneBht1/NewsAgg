from django.db import models
from account.models import UserProfile

# Create your models here.


class News(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=300)

    image = models.ImageField(
        upload_to='posts_images/', default='posts_images/default-image.png', max_length=500)
    author = models.CharField(max_length=150)
    summary = models.TextField(max_length=300)
    content = models.TextField()
    created = models.CharField(max_length=150)
    created_ad = models.DateField(auto_now_add=True, blank=True, null=True)
    source = models.CharField(max_length=200)

    def __str__(self):
        return f"{str(self.id)} News ID"


class Comment(models.Model):
    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="comments")
    news = models.ForeignKey(
        News, on_delete=models.CASCADE, related_name="comments")
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.news}: {self.comment}:{self.id}'
