// Função para carregar o perfil do usuário com base na token fornecida
function carregarPerfil(token) {
    // Simulação de uma chamada assíncrona para obter os detalhes do perfil
    setTimeout(function() {
        // Aqui você faria a lógica real para obter os detalhes do perfil do usuário usando a token
        // Neste exemplo, usaremos informações simuladas
        const perfil = {
            avatar: "url_do_avatar",
            username: "username_do_usuario",
            nomeExibido: "Nome Exibido do Usuário"
        };

        // Exibindo os detalhes do perfil na página
        exibirPerfil(perfil);
    }, 1000); // Simulação de 1 segundo de tempo de carregamento
}

// Função para exibir o perfil do usuário na página
function exibirPerfil(perfil) {
    // Exibindo o avatar
    document.getElementById("avatar").src = perfil.avatar;
    // Exibindo o nome de usuário
    document.getElementById("username").innerText = perfil.username;
    // Exibindo o nome exibido
    document.getElementById("nomeExibido").innerText = perfil.nomeExibido;
}
