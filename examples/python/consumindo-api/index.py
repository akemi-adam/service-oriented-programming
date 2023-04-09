# Importa o client para fazer as requisições HTTP
import http.client
# Importa o modulo para decoficar JSON
import json

# Cria uma conexão com a URI base do nosso endpoint
connection = http.client.HTTPSConnection('servicodados.ibge.gov.br')

# Faz a requisição GET para o nosso endpoint
connection.request('get', '/api/v1/localidades/regioes')

# Recupera a resposta dessa requisição
response = connection.getresponse()

# Pega o JSON que vem formatado como String da função read()
# E decodifica ela para uma lista em Python, guardando-a em regions
regions = json.loads(response.read())

# Fecha a conexão
connection.close()

print('--------------------- Regiões do Brasil ----------------------\n')

# Percorre a lista enquanto imprime a mensagem
for region in regions:
    print('Região {0} tem como sigla {1} e ID {2}'.format(
        region['nome'], region['sigla'], region['id']
    ))