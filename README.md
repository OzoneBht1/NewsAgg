### News Aggregator
News Aggregator is a web application that collects news articles from various Nepalese news sources and presents them in a clean, user-friendly interface. The application is built using Django Rest Framework and React, making use of web scraping and REST API to gather and present data.

## Features
Collects articles from popular Nepalese news sources, including Ekantipur, Onlinekhabar, and Nagarik News.
User-friendly interface for browsing and reading news articles.
Web scraping and REST API implementation for gathering and presenting data.
Clean, minimalist design for optimal reading experience.
Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites 
- [Node.js](https://nodejs.org/) 
- [Python 3](https://www.python.org/downloads/)


##Installing

1. Clone the repository:

```bash
$ git clone https://github.com/OzoneBht1/NewsAgg.git
```

2. Install the required packages for the frontend:

```bash
$ cd NewsAgg/frontend
$ npm install
```

3. Create and activate a virtual environment

```bash
$ python3 -m venv myenv
$ source myenv/bin/activate
```

4. Install the required packages for the backend:

```bash
$ cd ../backend
$ pip install -r requirements.txt
```

5. Run the frontend

```bash
$ cd ../frontend
npm start
```
The application should now be running on http://localhost:3000.

## Built With

* [Django](https://www.djangoproject.com/) - The web framework used
* [Django Rest Framework](https://www.django-rest-framework.org/) - Used to generate REST API
* [React](https://reactjs.org/) - Used to build the frontend
* [Node.js](https://nodejs.org/) - Used to run the frontend
  