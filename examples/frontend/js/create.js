const sendRequest = async (endpoint, method, body) =>
{
    try {
        
        const response = await fetch(endpoint, {
            method: method,
            headers: {
                accept: 'application.json',
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(body)
        })

        if (response.ok)
            window.location.href = './index.html';

    } catch (error) {
        console.log(`Ocorreu um erro: ${error}`)
    }
}


const saveModel = (endpoint, className) =>
{
    const elements = [...document.getElementsByClassName(className)];

    let body = {};

    elements.map(element => body[element.name] = element.value)

    sendRequest(endpoint, 'POST', body)
}


window.addEventListener('DOMContentLoaded', () =>
{
    document.getElementById('post-button').addEventListener('click', () => saveModel('http://localhost:8000/post', 'post'))

    document.getElementById('fish-button').addEventListener('click', () => saveModel('http://localhost:5000/fish', 'fish'))
})