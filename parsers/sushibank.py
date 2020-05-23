import requests
from bs4 import BeautifulSoup as bs
import json
from datetime import datetime
import os



headers = {
  'accept': '*/*',
  'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36'
}

def sushibank_parse(headers, category_url, base_url, category_name):

  session = requests.Session()
  request = session.get(category_url, headers = headers)

  if request.status_code == 200:

    productsList = list()

    soup = bs(request.content, 'html.parser')

    product_containers = soup.find_all('div', attrs={'class': 'tov-card product'})

    for product in product_containers:

      title = product.find('a', attrs={'itemprop': 'name'}).text
      href  = base_url + product.find('a', attrs={'itemprop': 'name'})['href']
      img = base_url + product.find('img')['src']
      composition = product.find('div', attrs={'class': 'tov-card__composition'}).text
      variants = product.find_all('div', attrs={'class': 'tov-card__variant'})

      productVariations = []

      for variant in variants:

        price = 0.0
        count = 0
        weight = 0.0
        
        price = variant.find('span', attrs={'class': 'tov-card__price', 'itemprop': 'price'}).text.replace(' ', '')

        if(price.isdecimal()):
          price = float(price)
        else:
          price = 1

        count = variant.find('a', attrs={'class': 'button tov-card__add add-to-cart-animate'}).text.split(' ')[0]

        if(category_name == 'sety'):

          count = [int(s) for s in composition.split() if s.isdigit()]
          count = count[len(count) - 1]

          composition = composition.rsplit('\n', 1)[0]

        if(count == 'В'):
          count = title.split(' ')
          count = [x for x in count if x]
          count = count[len(count) - 1].split('шт')[0]

        if(str(count).isdecimal()):
          count = int(count)
        else:
          count = 1
        
        weight = float(variant.find('span', attrs={'class': 'tov-card__weight'}).text.split('гр.')[0])

        variant = {
          'price': price,
          'count': count,
          'weight': weight
        }

        productVariations.append(variant)

      productsList.append(
        {
          'title': title,
          'href': href,
          'img': img,
          'composition': composition,
          'variations': productVariations
        }
      )

    return productsList

  else:
    print('ERROR')


categories = [
  {
    'name': 'rolly', 
    'url': 'https://www.sushibank.ru/catalog/rolly/',
    'products': [],
  },
  # {
  #   'name': 'sety', 
  #   'url': 'https://www.sushibank.ru/catalog/sety/',
  #   'products': [],
  # },
  # {
  #   'name': 'sushi', 
  #   'url': 'https://www.sushibank.ru/catalog/sushi/',
  #   'products': [],
  # },
  # {
  #   'name': 'voki', 
  #   'url': 'https://www.sushibank.ru/catalog/voki/',
  #   'products': [],
  # },
  # {
  #   'name': 'tyakhan', 
  #   'url': 'https://www.sushibank.ru/catalog/tyakhan/',
  #   'products': [],
  # },
  # {
  #   'name': 'napitki', 
  #   'url': 'https://www.sushibank.ru/catalog/napitki/',
  #   'products': [],
  # },
  # {
  #   'name': 'salaty', 
  #   'url': 'https://www.sushibank.ru/catalog/salaty/',
  #   'products': [],
  # },
  # {
  #   'name': 'supy', 
  #   'url': 'https://www.sushibank.ru/catalog/supy/',
  #   'products': [],
  # },
  # {
  #   'name': 'sauces', 
  #   'url': 'https://www.sushibank.ru/catalog/sauces/',
  #   'products': [],
  # }
]

base_url = 'https://www.sushibank.ru'

for i in range(len(categories)):

  category = categories[i]

  productsList = sushibank_parse(headers, category['url'], base_url, category['name'])

  categories[i]['products'] = productsList


result = json.dumps(categories)
print(result)