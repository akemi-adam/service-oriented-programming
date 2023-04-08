<?php

namespace AkemiAdam\Exemplo;

class IBGE
{
    /**
     * Retorna a mensagem formatada
     */
    public function toString(object $region) : string
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