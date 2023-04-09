// Importa o modulo axios
const axios = require('axios')

// Armazena nosso endpoint
const endpoint = 'https://bible-api.com/Salmos+94:11?translation=almeida';

/**
 * Faz uma requisição GET para o nosso endpoint
 * 
 * Como essa função get() do axios retorna uma Promisse, podemos utilziar a função then() para resolver essa Promisse.
 * 
 * Dentro do then(), passamos o objeto response, que contém os dados da resposta da requisiçãom, para dentro da nossa função anônima que age aqui como uma função de callback
 * 
 * Dentro da arrow function, recuperamos o objeto JSON da response acessando a sua propriedade data e armazenam,os em versicle
 * 
 * Depois, apenas printamos uma mensagem formatada contendo o versículo
 */
axios.get(endpoint).then(
    response => {
        const versicle = response.data

        console.log('---------------------- Versículo ----------------------\n')

        console.log(`${versicle.reference} diz:\n${versicle.text}`)
    }
).catch(
    err => console.log(`Ocorreu um error: ${err}`)
)