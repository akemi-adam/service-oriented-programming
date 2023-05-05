const sendRequest = (client, endpoint) =>
{
    client.open('GET', endpoint)

    client.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    client.setRequestHeader('Content-Type', 'application/json');
    client.setRequestHeader('Access-Control-Allow-Origin', '*');

    client.send(null)
}

// Armazena uma arrow function em listPosts
// Passa um objeto client como parâmetro
const listPosts = (client) =>
{
    // A propriedade onreadystatechange se refere a que lógica
    // vai ser executada sempre que o estado da requisição mudar
    client.onreadystatechange = () =>
    {
        // Verifica se a requisição conseguiu ser feita (4 indica que sim)
        if (client.readyState === 4)
            // Verifica o status code da requisição para ver se foi o esperado
            if (client.status === 200)
            {
                // responseText contém o JSON da request, só que ele vem como String
                // JSON.parse() transforma um JSON em forma de String para um
                // objeto JavaScript
                const posts = JSON.parse(client.responseText)

                // Recupera a div que lista todos os posts
                const postDiv = document.getElementById('post-div')

                // Percorre todos os posts um por um retornados da requisição
                // e executa um callback
                posts.map(post => {
                    
                    // Cria uma div
                    const div = document.createElement('div')

                    // Formata uma mensagem como conteúdo dessa div
                    div.innerHTML = `${post.title} - ${post.content}<br/>`

                    // Adiciona a nova div à outra div que exibe os posts
                    postDiv.appendChild(div)
                    
                    // Cria uma linha para separar os elementos
                    postDiv.appendChild(document.createElement('hr'))
                })
            }
    }

    sendRequest(client, 'http://localhost:8000/post')
}

const listFishes = (client) =>
{
    client.onreadystatechange = () =>
    {
        if (client.readyState === 4)
            if (client.status === 200)
            {
                const fishes = JSON.parse(client.responseText)

                const fishDiv = document.getElementById('fish-div')

                fishes.map(fish => {
                    
                    const div = document.createElement('div')

                    div.innerHTML = `${fish.specie} - Tamanho: ${fish.size}<br/>`

                    fishDiv.appendChild(div)
                    
                    fishDiv.appendChild(document.createElement('hr'))
                })
            }
    }
    
    sendRequest(client, 'http://localhost:5000/fish')
}

window.addEventListener('DOMContentLoaded', () =>
{
    listPosts(new XMLHttpRequest());

    listFishes(new XMLHttpRequest());
})