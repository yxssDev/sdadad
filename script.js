function salvarToken() {
    const token = document.getElementById('tokenInput').value;
    // Simula a validação do token (pode ser implementada de forma mais complexa)
    const tokenIsValid = validarToken(token);

    if (tokenIsValid) {
        // Redireciona para verificartoken.html com o token como parâmetro
        window.location.href = `verificartoken.html?token=${token}`;
    } else {
        // Redireciona para errotoken.html em caso de token inválido
        window.location.href = 'errotoken.html';
    }
}

function validarToken(token) {
    // Aqui você pode implementar a lógica de validação do token
    // Exemplo simples: verifica se o token não está vazio
    return token.trim() !== '';
}
