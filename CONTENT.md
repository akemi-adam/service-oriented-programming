# Resumo

Esse repositório tem como objetivo tentar, de uma forma simples e direta, explicar os conceitos da disciplina de Programação Orientada à Serviços ao passo em que exemplica e documenta os códigos desenvolvidos ou não em sala de aula.

Não pretendo me atear as explicações aprofundadas ou seguir a risca o funcionamento técnico literal de uma coisa, apenas explicar de uma forma entendível e exemplificar.
<br/><br/>

# Sumário

- [Introdução](#introdução)
    - [O que é um Serviço?](#o-que-é-um-serviço)
    - [O que é uma API?](#o-que-é-uma-api)
      - [Verbos HTTP](#verbos-http)
      - [Padrão Rest](#padrão-rest)
- [Dados semiestruturados](#dados-semiestruturados)
    - [XML](#xml)
    - [JSON](#json)
    - [Qual dos dois usar?](#qual-dos-dois-usar)
- [Consumindo um serviço simples](#consumindo-um-serviço-simples)
    - [Tratando a resposta da requisição](#tratando-a-resposta-da-requisição)
- [Desenvolvendo um serviço simples](#desenvolvendo-um-serviço-simples)
    - [API simples com PHP](#api-simples-com-php)
      - [Utilizando a biblioteca Guzzle](#utilizando-a-biblioteca-guzzle)
    - [API simples com Node](#api-simples-com-node)
      - [Utilizando a biblioteca Axios](#utilizando-a-biblioteca-axios)
    - [API simples com Python](#api-simples-com-python)
- [Testando nossos Serviços](#testando-nossos-serviços)
    - [Status codes](#status-codes)
    - [Utilizando cURL](#utilizando-curl)
    - [Utilizando Postman]($utilizando-postman)
- [Consumindo nossos Serviços](#consumindo-nossos-serviços)
    - [Consumindo Serviço no lado do Cliente](#consumindo-serviço-no-lado-do-cliente)
      - [Requisições Ajax](#ajax)
    - [Consumindo Serviço no lado do Servidor](#consumindo-serviço-no-lado-do-servidor)
- [Finalização](#finalização)
- [Referências](#referências)
<br/><br/>

# Introdução

Programação Orientada à Serviços, do inglês *Service Oriented Programming* (SOP), é uma solução, uma arquitetura, desenvolvida para facilitar a integração de determinados sistemas à aplicações distintas por meio de serviços.

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


<br/><br/>

# Referências

Amazon Web Services. O que é arquitetura orientada a serviços? Disponível em: https://aws.amazon.com/pt/what-is/service-oriented-architecture/. Acesso em: 28 mar. 2023.

ALLAMARAJU, Subbu. RESTful Web Services Cookbook. 1. ed. Sebastopol: O'Reilly Media, 2010.

GUEDES, Marylene. TreinaWeb. Você sabe o que é arquitetura orientada a serviços (SOA)? Disponível em: https://www.treinaweb.com.br/blog/voce-sabe-o-que-e-arquitetura-orientada-a-servicos-soa/. Acesso em: 28 mar. 2023.

WIKIPÉDIA. Web service. Disponível em: https://pt.wikipedia.org/wiki/Web_service. Acesso em: 28 mar. 2023.

WIKIPÉDIA. Service-oriented architecture. Disponível em: https://pt.wikipedia.org/wiki/Service-oriented_architecture. Acesso em: 28 mar. 2023.