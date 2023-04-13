
import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

date = datetime.now()
year = date.strftime('%Y')


def getResoluciones():
    url = 'http://bo.unsa.edu.ar/dr/R'+year+'/?C=M;O=D'
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    resoluciones = [p.get_text() for p in soup.find_all('a')]
    data = {'resoluciones': resoluciones}
    with open('../resoluciones.json', 'w') as archivo:
        json.dump(data, archivo)


def getInfoNoDocente():
    url = 'https://www.unsa.edu.ar/index.php/no-docentes/'
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    resoluciones = [p.decode_contents() for p in soup.find_all(
        'div', {'class': 'eael-accordion-list'})]
   
    data = {'novedades': resoluciones}
    with open('../novedades.json', 'w') as archivo:
        json.dump(data, archivo)


def main():
    getResoluciones()
    getInfoNoDocente()


main()
