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