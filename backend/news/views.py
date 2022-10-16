from django.shortcuts import render, HttpResponse
import requests
from bs4 import BeautifulSoup
from rest_framework import generics
from .models import News, Comment
from .serializers import CommentSerializer, NewsSerializer
import time
from rest_framework import generics
from rest_framework import authentication, permissions
from rest_framework import filters
from .permissions import IsTheCommentAuthor
import urllib.request
import tempfile
from io import BytesIO
from django.core import files
from datetime import datetime, timedelta


def scraperEkantipur(request):
    '''
    This code scrapes the latest news section from the homepage of https://ekantipur.com/
    '''
    while True:
        try:
            html = requests.get('https://ekantipur.com/').text
            break

        except:
            print("Connection to the homepage failed, retrying in 15 seconds....")
            time.sleep(15)

    soup = BeautifulSoup(html, 'html.parser')
    news_list = soup.find(
        'section', class_='main-news layout3').find_all('article')
    # Storing all the individual top news seperated in 'article' sections
    title_links = []

    title_links = [news.find('h1') for news in news_list if news != None]
    # links containing title with <a> tag to the detail page

    titles = [link.find('a').text for link in title_links if link]

    detail_links = [link.find('a')['href'] for link in title_links if link]
    # this contains the individual links to detail page of all main news
    summaries = [news.find('p')
                 for news in news_list if news is not None]
    summary = [x for x in summaries if x]
    # this list consists of summaries from other sections apart from the top news.

    for y in summary:
        if y.parent.parent.get('class')[0] != 'main-news':
            y.decompose()

    summ = [x.text for x in summary if x]
    final_list = [x for x in summ if x != '']
    contentsLst, authors, timePublished, images = newsDetailEkantipur(
        detail_links)
    # obtaining the important fields from inside the detail page
    contentsLst = []

    for content in contentsLst:
        contentsStr = ""
        for each in content:
            contentsStr += each.text + "\n\n"
        contentsLst.append(contentsStr)

    imageIds = [link.split('/')[7].split('.')[0] for link in detail_links]
    # getting the unique id of images

    # '../media/posts_images/{imageIds[i]}.jpg'

    # get or create method, if the model doesn't exist, it will create
    for i in range(len(images)):
        try:
            news = News.objects.get(title=titles[i])
        except:

            response = requests.get(images[i], stream=True)

            if response.status_code != requests.codes.ok:
                continue
            filename = f"{imageIds[i]}.jpg"

            fp = BytesIO()
            fp.write(response.content)

            news = News(title=titles[i], summary=final_list[i], content=contentsLst[i],
                        author=authors[i], created=timePublished[i], source="Ekantipur")

            news.save()
            news.image.save(filename, files.File(fp))

        # Write image block to temporary file

    return HttpResponse("Fetched")


def newsDetailEkantipur(detail_links):

    authors = []
    summaries = []
    contentsLst = []
    timePublished = []
    images = []
    for link in detail_links:

        while True:
            try:
                html = requests.get(link).text
                break

            except:
                print("Connection Failed, Retrying in 15 seconds....")
                time.sleep(15)

        soup = BeautifulSoup(html, 'html.parser')
        mainNews = soup.find('div', class_='col-xs-10 col-sm-10 col-md-10')
        author = mainNews.find('span', class_="author").text
        contentList = mainNews.find_all('p')
        timee = mainNews.find('time').text
        imageSrc = mainNews.find('figure')
        if imageSrc:
            image = imageSrc.find('img')['data-src']

            images.append(image)
        authors.append(author)
        timePublished.append(timee)
        contentsLst.append(contentList)

    return contentsLst, authors, timePublished, images


def scraper_onlinekhabar(request):
    while True:
        try:
            html = requests.get('https://www.onlinekhabar.com/').text
            break

        except:
            print("Connect to the homepage failed, retrying in 15 seconds....")
            time.sleep(15)

    soup = BeautifulSoup(html, 'html.parser')
    news_list = soup.find_all(
        'section', class_='ok-bises')

    child_div = [news.find('div', {"class": "ok-container"}
                           ) for news in news_list]

    titles = [elem.find('h2').text for elem in child_div]

    detail_links = [elem.find('h2').find('a')["href"]
                    for elem in child_div]

    authors, summaries, contents, timePublished, images = scraperOnlinekhabarDetails(
        detail_links)
    contentsLst = []

    for content in contents:
        contentsStr = ""
        for each in content:
            contentsStr += each + "\n\n"
        contentsLst.append(contentsStr)

    imageIds = [link.split('/')[7] for link in images]
    # getting the unique id of images

    # '../media/posts_images/{imageIds[i]}.jpg'

    # get or create method, if the model doesn't exist, it will create
    print(len(titles), len(authors), len(summaries),
          len(contentsLst), len(timePublished), len(images))

    for i in range(len(images)):

        try:
            news = News.objects.get(title=titles[i])
        except:
            print("BANANANANANANANA")

            response = requests.get(images[i], stream=True)

            if response.status_code != requests.codes.ok:
                continue
            filename = f"{imageIds[i]}"
            fp = BytesIO()
            fp.write(response.content)

            print(summaries[i])

            news = News(title=titles[i], summary=summaries[i], content=contentsLst[i],
                        author=authors[i], created=timePublished[i], source="Onlinekhabar")
            news.save()
            news.image.save(filename, files.File(fp))

    # Write image block to temporary file

    return HttpResponse(contentsLst[1])


def scraperOnlinekhabarDetails(detailLinks):

    authors = []
    summaries = []
    contentsLst = []
    timePublished = []
    images = []
    for link in detailLinks:

        while True:
            try:
                html = requests.get(link).text
                break

            except:
                print("Connection Failed, Retrying in 15 seconds....")
                time.sleep(15)

        soup = BeautifulSoup(html, 'html.parser')
        author = soup.find('span', {"class": "author-name"}).text
        summary = soup.find(
            'div', {"class": "ok18-single-post-content-wrap"}).find('p').getText()

        allowlist = ['p']

        contents = soup.find(
            'div', {"class": "ok18-single-post-content-wrap"}).find_all('p')

        content = [t.getText() for t in contents]

        created = soup.find(
            'div', {"class": "ok-news-post-hour"}).find('span').text
        imageSrc = soup.find('div', {"class": "post-thumbnail"})
        if imageSrc:
            image = imageSrc.find('img')['src']

            images.append(image)

        authors.append(author)
        summaries.append(summary)
        contentsLst.append(content)
        timePublished.append(created)
        print("\n\n\n\n\n\n")

    return authors, summaries, contentsLst, timePublished, images


def nagarik_scraper(request):
    while True:
        try:
            html = requests.get('https://nagariknews.nagariknetwork.com/').text
            break

        except:
            print("Connect to the homepage failed, retrying in 15 seconds....")
            time.sleep(15)

    soup = BeautifulSoup(html, 'html.parser')
    latest_news = soup.find('div', {"class": "justin"})
    all_articles = latest_news.findAll('article', {"class": "list-group-item"})
    titles = [article.find('h1').text for article in all_articles]
    detail_links = [article.find('h1').find('a')["href"]
                    for article in all_articles]
    summaries = [article.find('p').getText() for article in all_articles]

    authors, contents, images, timePublished = scraperNagarikDetail(
        detail_links)
    contentsLst = []

    for content in contents:
        contentsStr = ""
        for each in content:
            contentsStr += each + "\n\n"
        contentsLst.append(contentsStr)

    imageIds = [link.split('/')[6] for link in images]

    print(len(titles), len(authors), len(summaries),
          len(contentsLst), len(timePublished), len(images))

    for i in range(len(images)):
        print()
        print(titles[i]+"\n")
        print(contentsLst[i]+"\n")
        print(authors[i]+"\n")
        print(timePublished[i])
        print(summaries[i]+"\n")

        try:
            news = News.objects.get(title=titles[i])
        except:
            print("BANANANANANANANA")

            response = requests.get(images[i], stream=True)

            if response.status_code != requests.codes.ok:
                continue
            filename = f"{imageIds[i]}"
            fp = BytesIO()
            fp.write(response.content)

            print(summaries[i])

            news = News(title=titles[i], summary=summaries[i], content=contentsLst[i],
                        author=authors[i], created=timePublished[i], source="Nagarik News")
            news.save()
            news.image.save(filename, files.File(fp))

    return HttpResponse(timePublished[0])


def scraperNagarikDetail(detailLinks):
    authors = []

    contentsLst = []
    timePublished = []
    images = []
    for link in detailLinks:

        while True:
            try:
                html = requests.get(
                    f"https://nagariknews.nagariknetwork.com/{link}").text
                break

            except:
                print("Connection Failed, Retrying in 15 seconds....")
                time.sleep(15)

        soup = BeautifulSoup(html, 'html.parser')
        author = soup.find('author').find('a').text
        contents = soup.find('article').find_all('p')
        image = soup.find(
            'div', {"class": "main-news-section"}).find('img')['src']

        content = [t.getText() for t in contents]
        published = soup.find('time').getText()

        authors.append(author)
        contentsLst.append(content)
        images.append(image)
        timePublished.append(published)

    return authors, contentsLst, images, timePublished


class NewsListApi(generics.ListAPIView):
    current_date = datetime.now()
    previous_date = current_date - timedelta(days=2)
    queryset = News.objects.filter(
        created_ad__range=[previous_date, current_date])

    serializer_class = NewsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ('title', 'summary', 'content', 'source')


class NewsDetailApi(generics.RetrieveAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer


class CommentsListApi(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CommentCreateApi(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CommentUpdateApi(generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsTheCommentAuthor]
    # authentication_classes = [authentication.TokenAuthentication]


class CommentDeleteApi(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsTheCommentAuthor]
