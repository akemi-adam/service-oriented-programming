# Resumo

Esse repositório tem como objetivo tentar, de uma forma simples e direta, explicar os conceitos da disciplina de Programação Orientada à Serviços ao passo em que exemplica e documenta os códigos desenvolvidos ou não em sala de aula.

## Recomendações

Se você é aluno (ou até se não for) do IFRN, recomendo fortemente se orientar também ou mesmo primariamente pelo repositório oficial da disciplina do professor <a href="https://github.com/ciromdrs">Ciro Morais</a>. Me inspirei muito nele para fazer essa documentação, então acharia muito bom se pudessem ver também o trabalho dele, o cara é bom demais. Podem <a href="https://github.com/ciromdrs/prog-orientada-a-servicos">acessar aqui</a>.

Também há influência da <a href="https://github.com/charlon-156/MySQL">documentação da disciplina de Banco de Dados</a> que meu colega de classe <a href="https://github.com/charlon-156">Charlon Fernandes</a> escreveu.
<br><br>

## Avisos

Não pretendo me atear as explicações aprofundadas ou seguir a risca o funcionamento técnico literal de uma coisa, apenas explicar de uma forma entendível e exemplificar.

Vou tentar sempre usar três exemplos distintos na hora de codificar: um em `php`, outro em `node` e outro em `python`. Se você só souber `php`, só basta ver o exemplo em `php`. Se só sabe `python`, apenas o de `python`. Se sabe tudo e quiser ver tudo, fique à vontade.

Só o que eu quero dizer com isso, é que eu estarei supondo, caso queria acompanhar qualquer que seja o exemplo, que você possua pelo menos uma dessas linguagens instaladas e configuradas em sua máquina.

Por fim, se tiver alguma sugestão, ou ver que algo está errado e quiser me avisar ou corrigir, sinta-se à vontade.
<br/><br/>

# Sumário

- [Resumo](#resumo)
  - [Recomendações](#recomendações)
  - [Avisos](#avisos)
- [Sumário](#sumário)
- [Introdução](#introdução)
  - [O que é um serviço?](#o-que-é-um-serviço)
  - [O que é uma API?](#o-que-é-uma-api)
    - [Verbos HTTP](#verbos-http)
    - [Endpoints](#endpoints)
    - [Padrão REST](#padrão-rest)
- [Dados semiestruturados](#dados-semiestruturados)
  - [XML](#xml)
  - [JSON](#json)
  - [Qual dos dois usar?](#qual-dos-dois-usar)
- [Consumindo um serviço simples](#consumindo-um-serviço-simples)
  - [Fazendo requisição com PHP](#fazendo-requisição-com-php)
  - [Tratando a resposta da requisição com PHP](#tratando-a-resposta-da-requisição-com-php)
    - [Utilizando a biblioteca Guzzle](#utilizando-a-biblioteca-guzzle)
  - [Fazendo requisição com Node](#fazendo-requisição-com-node)
  - [Tratando a resposta da requisição com Node](#tratando-a-resposta-da-requisição-com-node)
  - [Fazendo requisição com Python](#fazendo-requisição-com-python)
  - [Tratando a resposta da requisição com Python](#tratando-a-resposta-da-requisição-com-python)
- [Desenvolvendo um serviço simples](#desenvolvendo-um-serviço-simples)
    - [API simples com PHP](#api-simples-com-php)
    - [API simples com Node](#api-simples-com-node)
    - [API simples com Python](#api-simples-com-python)
- [Testando nossos Serviços](#testando-nossos-serviços)
    - [Status codes](#status-codes)
    - [Utilizando cURL](#utilizando-curl)
    - [Utilizando Postman]($utilizando-postman)
- [Consumindo nossos Serviços](#consumindo-nossos-serviços)
    - [Consumindo Serviço no lado do Cliente](#consumindo-serviço-no-lado-do-cliente)
      - [DOM](#dom)
      - [Requisições Ajax](#ajax)
    - [Consumindo Serviço no lado do Servidor](#consumindo-serviço-no-lado-do-servidor)
- [Finalização](#finalização)
- [Referências](#referências)

# Introdução

Programação Orientada à Serviços, do inglês *Service Oriented Programming* (SOP), é uma solução, um paradigma, desenvolvido para facilitar a integração de determinados sistemas à aplicações distintas por meio de serviços.

O Facebook, por exemplo, possui tanto a aplicação web (o site do Facebook), quanto a aplicação para mobile (o aplicativo para celular). Ambas são aplicações tecnicamente distintas mas que implementam os mesmos serviços, pois, uma vez que você faz uma publicação no Facebook pelo celular, você consegue visualizar essa publicação pelo navegador, vice-e-versa.

Isso acontece justamente por estarem utilizando os mesmos serviços.

Seguindo esse racicínio, a imagem a baixo um exemplo bem interessante e intuitivo:

![Imagem exemplificando o uso da Arquitetura SOP para resolução de problemas](https://media.discordapp.net/attachments/942819468344713236/1093853320503894067/imagem_post.png?width=810&height=450)

Três empresas distintas com aplicações distintas precisam executar a mesma lógica para cadastrar um cliente. A melhor forma de solucionar esse problema é aplicar a mesma lógica mostrada no exemplo do Facebook: podemos criar um único serviço que é independente dos softwares que irão usá-lo e, nesse serviço, adicionar a função que valida e persiste (salva) um novo cliente no banco de dados.

Dessa forma, reduzimos e muito a repetição de código, o trabalho que seria dar manutenção nessa função e centralizamos toda a *lógica de negócio* em um único ponto, que é justamente o serviço. Tudo o que os softwares das outras empresas precisam fazer é consumir esse serviço; fazer uma requisição para ele com os dados do cliente e pronto, o cliente será salvo no banco de dados.

Além disso, se, por caso, for preciso mudar a lógica de inclusão de cliente, basta apenas modificar o serviço e a consequentemente a mudança será aplicada às outras aplicações.

Agora, vamos nos aprofundar melhor nesses conceitos apresentados, como serviços, web services etc.
<br/><br/>

## O que é um serviço?

No nosso contexto um serviço é o equivalente a uma função de um sistema que está sendo disponibilizada para outro sistema.

Voltando ao exemplo do Facebook, a forma como o aplicativo de celular e o site publicam um post é a mesma, certo? Tão logo, a função que salva um post vai ser a mesma para ambos os sistemas. Dessa forma, podemos transformar essa funcionalidade em um serviço para que ambas as aplicações possam usufruir dessa função apenas chamando o serviço que salva o post.
<br/><br/>

## O que é uma API?

Não pretendo entrar na discussão das diferenças de entre *Application Programming Interface* (API) e *Web Service*; porém, basta entender que, para poder acessar e usar os nossos serviços, iremos utilizar um *Web Service*; que, por sua vez, sempre vai ser uma API. Tão logo, de maneira geral, podemos concluir que: **todo Web Service é uma API, mas nem toda API é um Web Service.** 

Por isso, rotineiramente irei me referir a criação dos nossos *Web Services* como uma API, que vai ser justamente **o sistema que irá contém todos os nossos serviços e que será requisitado toda vez que algum outro sistema precisar de um desses serviços**.

Antes de prosseguir, preciso explicar mais alguns conceitos:

### **Verbos HTTP**

Nossas APIs em suma irão seguir o protocolo HTTP, que em suma, no nosso contexto, é um protocolo que estabelece as operações usadas para comunicação e troca de dados entre cliente e servidor. Essas operações são conhecidas também como *Verbos HTTP* e toda requisição HTTP possui um verbo que evidência e determina a sua intenção.

Existem outros verbos, mas os principais e os que iremos usar são esses:

|Verbo|Descrição|
|---|---|
|GET|Usado para obter um recurso|
|POST|Usado para salvar um recurso ou realiza operações mais sensíveis|
|PUT|Usado para atualizar um recurso|
|DELETE|Usado para deletar um recurso|

É muito importante utilizar o verbo (ou método) certo para o serviço certo. Terá situações onde isso não será possível? Sim, mas sempre tente manter o padrão. Se o seu serviço pretende excluir algum objeto ou recurso, utilize o método DELETE. Se pretende recuperar algum recurso, por exemplo, do banco de dados, use o método GET.

Se ainda não está muito claro como fazer isso, não se preocupe, isso será abordado com detalhes mais adiante.

### **Endpoints**

*Endpoint* é local onde se pode solicitar um recurso ou uma operação de uma API.

Em outras palavras, um *endpoint* na prática nada mais é do que uma **rota** ou uma **url**.

Veja um exemplo de *endpoint*: `https://servicodados.ibge.gov.br/api/v1/localidades/estados`

Esse é um dos vários *endpoints* da API do IBGE. Nesse contexto, uma requisição para esse endpoint irá retornar um recurso (nesse caso, as informações de todos os estados brasileiros) e, se esse endpoint é usado para obter um recurso, ele é do tipo GET.

### **Padrão REST**

*Representational State Transfer* (REST) é um padrão de arquitetura baseado no protocolo HTTP. Não vou me aprofundar tanto nesse tópico porque possivelmente não seguiremos esse padrão a risca, entretanto é bom saber que existe e que é nele que iremos nos orientar.

Sendo um padrão de arquitetura, o REST delimita e específica como devemos desenvolver nossa API.

Algumas de suas principais características são:

  - As solicitações da arquitetura cliente-servidor devem ser gerenciadas pelo protocolo HTTP
  - Ser stateless (sem estado)
  - Armazenamento em cache para otimização da interação cliente-servidor
  - O formato da informação deve ser padronizado
  - Sistema em camadas para organizar os tipos de servidores
<br/><br/>

# Dados semiestruturados

Dados semiestruturados são comumente chamados de noSQL (não SQL). Todos os bancos de dados relacionais estão estruturados em SQL, que nada mais é do que dizer que eles estão estruturados em tabelas. Dizer que uma estrutura é noSQL é o mesmo que falar que essa estrutura não organiza seus dados por tabelas, colunas e chaves primárias.

Entretanto, esses dados estão sim estruturados, possuem em geral índices ou marcadores para distinguir os elementos e contém hierarquias.

Nessa seção, iremos ver mais sobre duas linguagens que são usadas para estruturar dados. Vão ser nessas formas de estruturas que nossos serviços vão restornar os dados de uma resposta, uma vez que praticamente qualquer linguagem de programação possui uma forma nativa ou alguma biblioteca que consiga interpretar e tratar esse tipo de dado.
<br/><br/>

## XML

*Extensible Markup Language* (XML) é uma linguagem que estrutura os dados de forma hierárquica muito semelhante ao HTML na sintaxe e no formato. Vejamos um exemplo:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<user>
  <id>7</id> <!-- ID -->
  <name>Akemi Adam</name> <!-- Nome -->
  <age>18</age> <!-- Idade -->
  <address> <!-- Endereço -->
    <city>Caicó</city> <!-- Cidade -->
    <district>Rio Grande do Norte</district> <!-- Estado -->
  </address>
</user>
```

Primeiramente, se declara a versão do XML que está sendo utilizada.

```xml
<?xml version="1.0" encoding="UTF-8"?>
```

Depois do atributo version, há o encoding, que diz respeito a codificação e interpretação de caracteres. UTF-8 foi a escolha por aceitar acentos nas letras e outros caracteres especiais.

Seguindo agora para a estruturação de fato dos dados, podemos perceber que ela é bem flexível, mais próxima de uma linguagem natural. Por padrão, se declara sempre um único elemento raiz; essa tag vai conter todos os outros dados. No exemplo, essa tag é o elemento `<user></user>`.

Em seguida, podemos definir outros elementos dentro do nosso elemento raiz. Esses elementos vão corresponder aos dados do usuário no nosso exemplo, como:

```xml
<id>7</id> <!-- ID -->
<name>Akemi Adam</name> <!-- Name -->
<age>18</age> <!-- Idade -->
```

Nesse caso, os atributos do elemento `<user>` vão ser os elementos: `<id>`, `<name>` e `<age>` e terão como valor o que está dentro da tag, respectivamente `7`, `"Akemi Adam"` e `18`.

Tal como no HTML, para representar um comentário em XML, podemos utilizar a tag `<!-- -->`, pondo o nosso comentário entre os traços.

Além de poder inserir os dados diretamente no seu respectivo elemento, podemos colocar outros elementos dentro um elemento para agrupar dados que possuem relação, como é mostrado no exemplo no elemento `<address>`:

```xml
<address> <!-- Endereço -->
  <city>Caicó</city> <!-- Cidade -->
  <district>Rio Grande do Norte</district> <!-- Estado -->
</address>
```

Aqui, o elemento `<address>` guarda dois outros elementos: `<city>`, `<district>`; que tem os respectivos valores: `"Caicó"`, `"Rio Grande do Norte"`

Uma outra forma de estruturar esses dados do usuário é utilizar atributos nos elementos:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<user id="7" name="Akemi Adam" age="18">
  <address city="Caicó" district="Rio Grande do Norte"/>
</user>
```

Dessa forma, refatoramos todos os elementos que representavam algum dado isolado e colocamos eles como atributos dos seus referidos contextos.

Caso queira ver outros exemplos de arquivos XML, <a href="./examples/xml">clique aqui!</a>
<br/><br/>

## JSON

Agora, vamos falar de coisa boa!

*`JavaScript Object Notation`* (JSON) — ou "Jhonson", para os mais íntimos —  é uma estrutura de dados simples, direta, fácil de ler, e rápida que é amplamente utilizada para troca de informações entre sistemas. A grande maioria dos `Web Services` devolvem seus dados em JSON; e praticamente qualquer linguagem de programação que se preze possui alguma forma de ler e processar JSON.

Mas, como é o JSON? Bem, ele é estruturado da seguinte forma:

```json
{
  "id": 7,
  "name": "Akemi Adam",
  "age": 18,
  "address": {
    "city": "Caicó",
    "district": "Rio Grande do Norte"
  }
}
```

Utilizando o mesmo exemplo do XML, podemos identificar que para os dados serem estruturados em JSON, eles precisam estar dentro de um par de chaves global como mostrado abaixo:

```json
{
  // ...
}
```

Uma chave abrindo no início, outra fechando no final.

Prosseguindo, para declarar um atributo (um nome/chave associada a um valor), deve-se escrevé-lo dentro das `{}` globais e dentro de aspas duplas (`""`), como no caso do atributo `"name"`. Após a declaração do atributo, coloca-se o sinal de dois pontos e em seguida o valor do atributo:

```json
{
  "name": "Akemi Adam"
}
```

Os valores que podem ser atribuídos a um atributo podem ser dos seguintes tipos:

  - String (entre aspas duplas)
  - Number
  - Object (par de chaves)
  - Array (par de parênteses)
  - Boolean
  - Null

Uma coisa bem interessante sobre o formato JSON é que ele é um objeto JavaScript. Isso torna muito mais fácil tanto de se entender quanto de se trabalhar com esse tipo de dado.

Em Javascript, poderíamos criar um objeto equivalente ao JSON de usuário assim:

```javascript
const user = {
  id: 7,
  name: "Akemi Adam",
  age: 18,
  address: {
    city: "Caicó",
    district: "Rio Grande do Norte"
  }
}
```

Para mais exemplos em JSON, <a href="./examples/json">clique aqui!</a>
<br>

## Qual dos dois usar?

A resposta depende do contexto e do que você quer fazer.

Para nosso caso, ao decorrer da explicação, irei utilizar e mostrar os exemplos sempre em JSON, pois é o formato mais usado hoje em dia. Em comparação com XML, JSON é muito, muito mais limpo e legível. Utiliza `parse` de String para ler e interpretar os dados e tem a vantagem de se integrar perfeitamente com JavaScript. Além do que, é o que eu tenho mais familiariedade.

Entretanto, posso adicionar posteriormente uma documentação de como trabalhar com XML.
<br/><br/>

# Consumindo um serviço simples

Bem, depois de muito falar e pouco praticar, vamos botar a mão na massa! (Alguém ainda usa esse termo?)

Nesse início, porém, iremos apenas consumir Serviços de terceiros (serivços feitos por outras pessoas), não os nossos ainda.

Para isso, irei mostrar de forma bem simples como enviar requisições HTTP para APIs (iremos utilizar apenas APIs públicas aqui) e como processar e tratar as respostas dessas requisições. Vou mostrar sempre três exemplos com três linguagens diferentes.

Para essa seção, utilizarei a mesma API para todos os códigos. Essa API vai ser a API do IBGE. Acho ela muito completa e boa de se trabalhar. A princípio, iremos utilizar o seguinte endpoint:

```
https://servicodados.ibge.gov.br/api/v1/localidades/regioes
```

Esse endpoint retorna todas as regiões do Brasil. **O objetivo aqui é mostrar, de forma formatada e organizada todas as informações sobre cada região do Brasil**, utilizando a API do IBGE.

Com isso em mente, mão na massa!
<br/><br/>

## Fazendo requisição com PHP

Essa primeira forma que mostrarei é apenas para exemplificar. Não recomendo usar isso seriamente; existem bibliotecas muito melhores e mais seguras do que fazer da forma como irei mostrar, mas em um primeiro momento, acho bom demonstrar-la aqui.

Para começar, precisamos criar um arquivo `.php`. Nesse repositório, vou criar ele dentro de `./examples/php/consumindo-api` (você pode acessá-lo <a href="./examples/php/consumindo-api/index.php">aqui</a>). Darei também o nome de `index.php` para o arquivo. Tendo feito isso, podemos começar a codificar.

Visando ficar mais didático, vamos criar uma variável chamada `$endpoint` que irá armazenar nosso endpoint (uma url da API) que queremos enviar uma requisição:

```php
<?php

// Variável que armazena o endpoint 
$endpoint = 'https://servicodados.ibge.gov.br/api/v1/localidades/regioes';
```

Esse endpoint é do tipo GET. Sei disso porque está específicado na sua <a href="https://servicodados.ibge.gov.br/api/docs/localidades#api-Regioes-regioesGet">documentação</a>, que especifica as características de cada endpoint, como seu verbo HTTP.

Uma vez tendo nosso endpoint, iremos utilizar a função `file_get_contents()` do PHP. Essa função é utilizada para ler o conteúdo de algum arquivo, como um arquivo `.txt`, por exemplo. Só que ela também serve para realizar requisições HTTP, e é desse modo que nós a iremos usar. Para isso, basta passar nosso endpoint como primeiro parâmetro da função:

```php
<?php

// Variável que armazena o endpoint 
$endpoint = 'https://servicodados.ibge.gov.br/api/v1/localidades/regioes';

// Faz uma requisição para o endpoint especificado e armazena sua resposta em $response
$response = file_get_contents($endpoint);
```

Com isso, nós estamos fazendo uma requisição (do tipo GET, por padrão) para o endpoint `https://servicodados.ibge.gov.br/api/v1/localidades/regioes` e armazenando a resposta dessa requisição na variável `$response`. Se você pegar essa url, colocar no seu navegador e der enter, vai ver que o que vai aparecer é algo que você já viu e espero que tenha aprendido aqui:

![Acessando endpoint do IBGE diretamente pelo navegador](https://media.discordapp.net/attachments/942819468344713236/1094208174996856863/image.png?width=1200&height=86)

Sim, justamente: um JSON! Bem feio e mal formatado? Sim, mas ainda é um JSON. Na verdade, mais especificamente, isso é um JSON que contém uma lista. Nessa lista estão armazenados outros objetos JSON. Cada um desses objetos (delimitados pelos pares de `{}`) está representando uma região do Brasil com suas características. Como por exemplo o primeiro objeto, que representa a região Norte. Para deixar mais legível, deixa eu organizar melhor:

```json
{
  "id": 1,
  "sigla": "N",
  "Nome": "Norte"
},
// ...
```
<br>

## Tratando a resposta da requisição com PHP

Muito massa, né? Porém, nossa variável `$response` ainda não pode ser lida completamente. Isso porque, a função `get_file_contents()` ler o conteúdo do arquivo (nesse caso do nosso endpoint) e transforma ele numa String. Se dermos um `var_dump()` na variável `$response` vamos ver isso com clareza:

```php
var_dump($response); // Mostra o tipo e o valor da variável
```

A resposta seria a seguinte:

```
string(194) "[{"id":1,"sigla":"N","nome":"Norte"},{"id":2,"sigla":"NE","nome":"Nordeste"},{"id":3,"sigla":"SE","nome":"Sudeste"},{"id":4,"sigla":"S","nome":"Sul"},{"id":5,"sigla":"CO","nome":"Centro-Oeste"}]"
```

Porém, para conseguirmos utilizar a resposta desse endpoint, vamos precisar transformar esse JSON que está no formato de uma String em um objeto PHP.

Nativamente, graças a Deus, o PHP já oferece uma função para fazer isso por nós. Ela se chama `json_decode()`. Como o nome sugere, essa função vai decodificar um JSON que está armazenado em uma String e transformá-lo em um objeto PHP. A partir disso, vamos conseguir utilizar os dados da resposta da requisição (`response`) adequadamente:

```php
<?php

$endpoint = 'https://servicodados.ibge.gov.br/api/v1/localidades/regioes';

$response = file_get_contents($endpoint);

$regions = json_decode($response);
```

Aqui, armazenamos a decodificação do JSON de `$response` na variável `$regions`. Se dermos um `var_dump()` em `$regions`, vamos ver que agora sim podemos usar a resposta da requisição:

```
array(5) {
  [0]=>
  object(stdClass)#1 (3) {
    ["id"]=>
    int(1)
    ["sigla"]=>
    string(1) "N"
    ["nome"]=>
    string(5) "Norte"
  }
  [1]=>
  object(stdClass)#2 (3) {
    ["id"]=>
    int(2)
    ["sigla"]=>
    string(2) "NE"
    ["nome"]=>
    string(8) "Nordeste"
  }
  [2]=>
  object(stdClass)#3 (3) {
    ["id"]=>
    int(3)
    ["sigla"]=>
    string(2) "SE"
    ["nome"]=>
    string(7) "Sudeste"
  }
  [3]=>
  object(stdClass)#4 (3) {
    ["id"]=>
    int(4)
    ["sigla"]=>
    string(1) "S"
    ["nome"]=>
    string(3) "Sul"
  }
  [4]=>
  object(stdClass)#5 (3) {
    ["id"]=>
    int(5)
    ["sigla"]=>
    string(2) "CO"
    ["nome"]=>
    string(12) "Centro-Oeste"
  }
}
```

Perceba que `$regions` armazena um array invés de um objeto. Isso acontece justamente porque, se você olhar o JSON do nosso endpoint, vai ver que ele retorna uma lista de objetos, e não um único objeto. Dessa forma, nós temos um array de objetos em PHP que podemos utilizar como bem quisermos.

Agora, é só lógica de programação. Vamos percorrer esse array em um loop (utilizando `foreach`) e exibir nossa mensagem:

```php
<?php

$endpoint = 'https://servicodados.ibge.gov.br/api/v1/localidades/regioes';

$response = file_get_contents($endpoint);

$regions = json_decode($response); // Exibe uma mensagem e quebra linha

echo "---------------------- Regiões do Brasil ----------------------\n";

// Percorre o array $regions mostrando uma mensagem padrão para todas as regiões
foreach ($regions as $region)
{
    echo "Região " . $region->nome . " tem como sigla " . $region->sigla . " e ID " . $region->id . "\n";
}
```

E pronto, é só isso! O código acima é literalmente: um título (Regiões do Brasil) e um laço de repetição do tipo `foreach` que vai pecorrer cada linha do array $regions. Como esse array só contém objetos que possuem os mesmo atributos (nome, sigla e id), então eu coloquei um echo dentro do `foreach` para imprimir uma mensagem informando as informações de cada um dos objetos que está dentro do array; ou seja: cada uma das regiões do Brasil.

A saída disso é:

```
---------------------- Regiões do Brasil ----------------------
Região Norte tem como sigla N e ID 1
Região Nordeste tem como sigla NE e ID 2
Região Sudeste tem como sigla SE e ID 3
Região Sul tem como sigla S e ID 4
Região Centro-Oeste tem como sigla CO e ID 5
```

### **Utilizando a biblioteca Guzzle**

Na forma mostrada acima, nós utilizamos a função `get_file_contents()` para atuar como cliente HTTP e fazer a nossa requisição. Entretanto, existem alternativas melhores e mais seguras, como utilizar uma biblioteca. No caso do PHP, a biblioteca que eu considero mais famosa e simples de usar, é a Guzzle. Vou mostrar como fazer a mesma requisição acima utlizando ela.

Primeiro de tudo, é preciso instalar ela. Para instalá-la, é preciso ter o `Composer` instalado em sua máquina. Composer é um gerenciador de pacotes. Você pode <a href="https://getcomposer.org/download/">baixá-lo aqui</a> caso ainda não o tenha.

Com o composer instalado, vamos rodar o seguinte comando para iniciar um projeto: `composer init`. Você pode dar enter em todas as perguntas que aparecerem (se quiser responde-las também, fique à vontade), elas não importam muito para o nosso contexto.

Agora, com um projeto iniciado, o Composer terá criado algumas pastas para você. São elas: `src` e `vendor`; além de um arquivo `composer.json`. Esse arquivo serve para configurações do pacote. Ele deve se parecer com isso:

```json
{
    "name": "akemi-adam/exemplo",
    "autoload": {
        "psr-4": {
            "AkemiAdam\\Exemplo\\": "src/"
        }
    },
    "authors": [
        {
            "name": "Akemi Adam",
            "email": "90357785+akemi-adam@users.noreply.github.com"
        }
    ],
    "require": {}
}
```

O que importa aqui para nós, é o primeiro e único atributo que está dentro de `"psr-4"`. No meu caso é: `"AkemiAdam\\Exemplo\\"`. Esse nome é o namespace do nosso pacote. Possívelmente estará diferente no seu projeto caso esteja seguindo esse passo a passo, mas o que importa é ter esse nome e reconhece-lo. Esse namespace possibilita que possamos utilizar outras classes de outras pastas em nossos arquivos. Onde essas classes vão ficar? Dentro da pasta `src`.

Vou criar um arquivo na raiz do projeto chamado de `index.php`. Nesse `index.php`, vou colocar a seguinte linha de código:

```php
<?php

require_once __DIR__ . '/vendor/autoload.php';
```

Com esse `require_once` direcioando para esse arquivo `autoload.php`, vamos poder carregar e usar nossas classes a partir do nosso namespace.

Agora, vamos finalmente baixar o pacote `Guzzle`. Para isso, digite o comando:

```shell
composer require guzzlehttp/guzzle
```

Agora, vamos usar essa biblioteca para fazer uma requisição para o nosso endpoint:

```php
<?php

require_once __DIR__ . '/vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client;

$response = $client->get('https://servicodados.ibge.gov.br/api/v1/localidades/regioes');

$regions = json_decode($response->getBody());
```

Aqui, nós criamos um objeto `Client` e usamos o método `get()` dessa classe para fazer uma requisição GET para o endpoint passado por parâmetro. Armazenando isso em `$response`, nós fazemos praticamente a mesma coisa que no outro exemplo: passa `$response` como parâmetro de `json_decode()` e guarda em `$regions`. Aqui, no entanto, para pegar os dados da requisição, precisamos usar esse método `getBody()` do objeto `$response`.

Para mostrar a mensagem, iremos criar uma arquivo dentro de `src` chamado `IBGE.php`. O conteúdo desse arquivo será o seguinte:

```php
<?php

namespace AkemiAdam\Exemplo;

class IBGE
{
  /**
   * Retorna a mensagem formatada
   */
  public function toString(stdObject $region) : string
  {
      return "Região " . $region->nome . " tem como sigla " . $region->sigla . " e ID " . $region->id . "\n";
  }

  /**
   * Imprime a mensagem para todas as regiões
   */
  public function showRegions(array $regions) : void
  {
    echo "---------------------- Regiões do Brasil ----------------------\n";

    foreach ($regions as $region)
        echo $this->toString($region);
  }
}
```

Nele, a primeira coisa que fazemos é declarar o namespace, que nesse caso vai ser justamente aquele que eu havia falado. Isso pode variar, como comentei. Enfim: criamos uma classe chamada IBGE e dentro dessa classe criamos a função `toString()` que mostra a mensagem formatada de uma região. Outra função também foi criada: `showRegions`, que mostra a mensagem formatada de todas as regiões passada por parâmetro.

Agora, precisamos usar essa classe no nosso arquivo `index.php`:

```php
<?php

require_once __DIR__ . '/vendor/autoload.php';

// Importa a classe Client
use GuzzleHttp\Client;

// Importa a nossa classe IBGE
use AkemiAdam\Exemplo\IBGE;

// Instância um objeto do tipo Client
$client = new Client;

// Faz a requisição GET
$response = $client->get('https://servicodados.ibge.gov.br/api/v1/localidades/regioes');

// Decodifica o corpo da requisição com os dados
$regions = json_decode($response->getBody());

// Instância nossa classe IBGE
$ibge = new IBGE;

// Imprime os dados das regiões
$ibge->showRegions($regions);
```

A saída será a mesma que no outro exemplo:

```
---------------------- Regiões do Brasil ----------------------
Região Norte tem como sigla N e ID 1
Região Nordeste tem como sigla NE e ID 2
Região Sudeste tem como sigla SE e ID 3
Região Sul tem como sigla S e ID 4
Região Centro-Oeste tem como sigla CO e ID 5
```
<br>

## Fazendo requisição com Node

Antes de prosseguir, por algumas questões técnicas, irei, para esse exemplo, utilizar um outro endpoint. É ele:

```
https://bible-api.com/Salmos+94:11?translation=almeida
```

Esse endpoint retorna as informações sobre um versículo específico da bíblia; nesse caso, Salmos 94: 11.

Por que escolhi essa rota? Achei peculiar.

Enfim, vamos prosseguir:

Particularmente, para fazer uma requisição com Node, eu gosto bastante de utilizar a biblioteca `Axios`. Ela é simples e muito fácil de usar, além de ser bem poderosa. Aqui, mostrarei como fazer uma simples requisição GET para o nosso endpoint utilizando essa biblioteca.

No diretório `./examples/node/consumindo-api` desse repositório irei criar um arquivo `index.js`, onde escreveremos nosso código.

Porém, antes de prosseguir, precisamos instalar a biblioteca axios. Para isso, temos que executar o comando:

```
npm i axios
```

Após isso, alguns arquivos de `.json` de configuração e uma pasta `node_modules` deve ser criada.

Vamos então abrir o nosso arquivo `index.js` e escrever o seguinte:

```javascript
// Importa o modulo axios
const axios = require('axios')

// Armazena nosso endpoint
const endpoint = 'https://bible-api.com/Salmos+94:11?translation=almeida';
```

Essas linhas de código são simples: importamos o axios e guardamos na constante de mesmo nome e salvamos nosso endpoint em `endpoint`. Na demais.

Agora, vamos fazer nossa requisição com o objeto `axios`:

```javascript
const axios = require('axios')

const endpoint = 'https://bible-api.com/Salmos+94:11?translation=almeida';

axios.get(endpoint)
```

Com isso, nós conseguimos fazer uma requisição do tipo GET para o endpoint específicado. Vejamos agora como podemos processar e tratar isso.
<br><br>

## Tratando a resposta da requisição com Node

Conseguimos fazer a nossa requisição, porém não estamos fazendo nada com ela, como dá para observar.

Para mudar isso, precisamos entender que o que essa função retorna, é uma `Promisse`. Se você não sabe exatamente o que é uma Promisse, ou não viu ainda a parte de funções assíncronas com `async-await`, não se preocupe, vou tentar explicar de forma resumida e direta.

Uma `Promisse` nada mais é do que uma promessa, como o nome sugere. Essa promessa é um objeto que funciona de forma assíncrona no código. Ou seja: você consegue executar outras partes do código ao mesmo tempo em que essa `Promisse` está sendo "resolvida".

A `Promisse` como objeto tem três estados: `pendente` (quando ela ainda não vou resolvida, ou seja: está pendente), `resolvida` e `rejeitada` (quando ocorre algum erro que impeça ela de ser resolvida).

Quando a `Promisse` é resolvida ou rejeitada, nós podemos usar uma função de `callback` para executar qualquer coisa que quisermos para essas duas situações. Podemos acessar esses estados por meio das funções: `then()` e `catch()`, popularmente chamadas de `thencat`; não é a mesma coisa, mas uma analogia que gosto de fazer é com os blocos `try-catch`. Se a `Promisse` for bem sucedida, a função `then()` vai ser executada; similar com o bloco `try {}`. Já se ela for rejeitada, se ocorrer algum erro, a função `then()` será ignorada e a função `catch()` vai capturar esse erro e ser executada; como o bloco `catch {}`.

Assim sendo, depois dessa breve explicação monóloga sobre programação assíncrona em `JavaScript`, deixa eu mostrar como vamos aplicar isso no nosso código:

```javascript
const axios = require('axios')

const endpoint = 'https://bible-api.com/Salmos+94:11?translation=almeida';

// A função then() recebe uma função de callback para ser executada quando a Promisse for resolvida
axios.get(endpoint).then(
    // Passamos o objeto response para essa callback
    response => {
        // reponse possui os dados da resposta de nossa requisição
        // Com isso, acessamos a propriedade data desse objeto para guarda o JSON numa variável
        const versicle = response.data
    }
// Caso ocorra alguma falha, o callback da função catch vai ser executado mostrando uma mensagem de erro simples
).catch(
    err => console.log(`Ocorreu um error: ${err}`)
)
```

Como descrito no próprio código, nossa função then recebe uma arrow function que atua como uma função de callback para ser executada sempre que a `Promisse` for resolvida. Essa nossa `Promisse` possui um objeto `response` que guarda a resposta da nossa requisição; passamos esse objeto como parâmetro do callback. Em seguida, acessamos o atributo `data` do objeto `response` e guardamos ele dentro da constante `versicle`. Esse atributo `data` armazena JSON que o nosso endpoint retorna. Por fim, a função catch está ali para ser executada caso ocorra algum erro com a `Promisse`.

Agora, tudo o que precisamos fazer é, dentro do callback da função then, estruturar nossa mensagem.

```javascript
axios.get(endpoint).then(
    response => {
        const versicle = response.data

        console.log('---------------------- Versículo ----------------------\n')

        console.log(`${versicle.reference} diz:\n${versicle.text}`)
    }
).catch(
    err => console.log(`Ocorreu um error: ${err}`)
)
```

Agora, se executarmos esse código com o comando `node index.js`, teremos a seguinte resposta:

```
---------------------- Versículo ----------------------

Salmos 94:11 diz:
o Senhor, conhece os pensamentos do homem, que são vaidade.
```
<br><br>

## Fazendo requisição com Python


<br><br>

# Referências

ACCURATE. API e Web Service: entenda as diferenças. Disponível em: https://blog.accurate.com.br/api-e-web-service/. Acesso em: 28 mar. 2023.

ALLAMARAJU, Subbu. RESTful Web Services Cookbook. 1. ed. Sebastopol: O'Reilly Media, 2010.

AMAZON WEB SERVICES. O que é arquitetura orientada a serviços? Disponível em: https://aws.amazon.com/pt/what-is/service-oriented-architecture/. Acesso em: 28 mar. 2023.

AMAZON WEB SERVICES. O que é XML?. Disponível em: https://aws.amazon.com/pt/what-is/xml/#:~:text=A%20Extensible%20Markup%20Language%20(XML,dados%20e%20aplica%C3%A7%C3%B5es%20de%20terceiros.. Acesso em: 28 mar. 2023.

CLOUDFLARE. What is an API endpoint?. Disponível em: https://www.cloudflare.com/pt-br/learning/security/api/what-is-api-endpoint/. Acesso em: 28 mar. 2023.

GUEDES, Marylene. TreinaWeb. Você sabe o que é arquitetura orientada a serviços (SOA)? Disponível em: https://www.treinaweb.com.br/blog/voce-sabe-o-que-e-arquitetura-orientada-a-servicos-soa/. Acesso em: 28 mar. 2023.

JSON. Disponível em: https://www.json.org/json-pt.html. Acesso em: 28 mar. 2023.

RED HAT. What is a REST API?. Disponível em: https://www.redhat.com/pt-br/topics/api/what-is-a-rest-api. Acesso em: 28 mar. 2023.

WIKIPÉDIA. Web service. Disponível em: https://pt.wikipedia.org/wiki/Web_service. Acesso em: 28 mar. 2023.

WIKIPÉDIA. Service-oriented architecture. Disponível em: https://pt.wikipedia.org/wiki/Service-oriented_architecture. Acesso em: 28 mar. 2023.

WIKIPEDIA. Dados semiestruturados. Disponível em: https://pt.wikipedia.org/wiki/Dados_semiestruturados. Acesso em: 28 mar. 2023.

WIKIPEDIA. XML. Disponível em: https://pt.wikipedia.org/wiki/XML. Acesso em: 28 mar. 2023.

WIKIPEDIA. JSON. Disponível em: https://pt.wikipedia.org/wiki/JSON. Acesso em: 28 mar. 2023.

W3SCHOOLS. XML Attributes. Disponível em: https://www.w3schools.com/xml/xml_attributes.asp. Acesso em: 28 mar. 2023.