from django.contrib import admin
from news.models import News, Comment

# Register your models here.


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    model = News
    list_display = ('author', 'summary',
                    'created', 'created_ad', 'source')
    list_filter = ('author', 'created', 'created_ad')


admin.site.register(Comment)
