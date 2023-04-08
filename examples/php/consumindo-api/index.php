<?php

$endpoint = 'https://servicodados.ibge.gov.br/api/v1/localidades/regioes'; // Guarda o endpoint da API

$response = file_get_contents($url); // Armazena a resposta JSON em $response como uma String

$regions = json_decode($response); // Decodifica essa String e retorna um array de objetos contendo todas as regiões do Brasil

echo "---------------------- Regiões do Brasil ----------------------\n"; // Exibe uma mensagem e quebra linha

// Percorre o array $regions mostrando uma mensagem padrão para todas as regiões
foreach ($regions as $region)
{
    echo "Região " . $region->nome . " tem como sigla " . $region->sigla . " e ID " . $region->id . "\n";
}