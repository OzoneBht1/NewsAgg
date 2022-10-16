from django.contrib import admin
from django.urls import path, include
from . import views

app_name = 'news'


urlpatterns = [
    path('newslist/', views.NewsListApi.as_view(), name='newsList'),
    path('ekanscraper/', views.scraperEkantipur, name='ekanscraper'),
    path('onlinekhabarscraper/', views.scraper_onlinekhabar, name='online-khabar'),
    path('nagarikscraper/', views.nagarik_scraper, name='nagarik-scraper'),
    path('newslist/', views.NewsListApi.as_view(), name='newsList'),
    path('newslist/<int:pk>/', views.NewsDetailApi.as_view(), name='newsDetail'),
    path('comments/list', views.CommentsListApi.as_view(), name="newsList"),
    path('comments/create/<int:pk>',
         views.CommentCreateApi.as_view(), name='newsCreate'),
    path('comments/update/<int:pk>',
         views.CommentUpdateApi.as_view(), name='newsUpdate'),

]
