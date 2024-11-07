// Função para verificar a validade da token do Discord
function verificarToken(token) {
    // Faz uma requisição para a API do Discord para validar a token
    fetch('https://discord.com/api/v9/users/@me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            // Token válida, redireciona para a página verificartoken.html
            window.location.href = `verificar token.html?token=${token}`;
        } else {
            // Token inválida, exibe mensagem de erro
            mostrarMensagem("Token inválida");
        }
    })
    .catch(error => {
        console.error('Erro ao verificar token:', error);
        mostrarMensagem("Erro ao verificar a token");
    });
}

// Função para exibir mensagem em layout 3D
function mostrarMensagem(mensagem) {
    const container = document.createElement('div');
    container.classList.add('message-container');

    const message = document.createElement('h1');
    message.textContent = mensagem;

    container.appendChild(message);

    document.body.appendChild(container);
}

// Captura o parâmetro 'token' da URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

// Verifica se há uma token na URL e chama a função verificarToken
if (token) {
    verificarToken(token);
} else {
    mostrarMensagem("Token não especificada");
}
