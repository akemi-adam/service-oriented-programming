# Resumo

Esse repositório tem como objetivo tentar, de uma forma simples e direta, explicar os conceitos da disciplina de Programação Orientada à Serviços ao passo em que exemplica e documenta os códigos desenvolvidos ou não em sala de aula.

Não pretendo me atear as explicações aprofundadas ou seguir a risca o funcionamento técnico literal de uma coisa, apenas explicar de uma forma entendível e exemplificar.
<br/><br/>

# Sumário

- [Introdução](#introdução)
    - [O que é um Serviço?](#o-que-é-um-serviço)
    - [O que é uma API?](#o-que-é-uma-api)
      - [Verbos HTTP](#verbos-http)
      - [Endpoints](#endpoints)
      - [Padrão Rest](#padrão-rest)
- [Dados semiestruturados](#dados-semiestruturados)
    - [XML](#xml)
    - [JSON](#json)
    - [Qual dos dois usar?](#qual-dos-dois-usar)
- [Consumindo um serviço simples](#consumindo-um-serviço-simples)
    - [Tratando a resposta da requisição com PHP](#tratando-a-resposta-da-requisição-com-php)
      - [Utilizando a biblioteca Guzzle](#utilizando-a-biblioteca-guzzle)
    - [Tratando a resposta da requisição com Node](#tratando-a-resposta-da-requisição-com-node)
      - [Utilizando a biblioteca Axios](#utilizando-a-biblioteca-axios)
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
<br/><br/>

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

Por isso, rotineiramente irei me referir a criação dos nossos *Web Services* como uma API, que vai ser justamente o sistema que irá contém todos os nossos serviços e que será requisitado toda vez que algum outro sistema precisar de um desses serviços.

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

# Referências

Amazon Web Services. O que é arquitetura orientada a serviços? Disponível em: https://aws.amazon.com/pt/what-is/service-oriented-architecture/. Acesso em: 28 mar. 2023.

ALLAMARAJU, Subbu. RESTful Web Services Cookbook. 1. ed. Sebastopol: O'Reilly Media, 2010.

GUEDES, Marylene. TreinaWeb. Você sabe o que é arquitetura orientada a serviços (SOA)? Disponível em: https://www.treinaweb.com.br/blog/voce-sabe-o-que-e-arquitetura-orientada-a-servicos-soa/. Acesso em: 28 mar. 2023.

WIKIPÉDIA. Web service. Disponível em: https://pt.wikipedia.org/wiki/Web_service. Acesso em: 28 mar. 2023.

WIKIPÉDIA. Service-oriented architecture. Disponível em: https://pt.wikipedia.org/wiki/Service-oriented_architecture. Acesso em: 28 mar. 2023.

ACCURATE. API e Web Service: entenda as diferenças. Disponível em: https://blog.accurate.com.br/api-e-web-service/. Acesso em: 28 mar. 2023.

CLOUDFLARE. What is an API endpoint?. Disponível em: https://www.cloudflare.com/pt-br/learning/security/api/what-is-api-endpoint/. Acesso em: 28 mar. 2023.