$(document).ready(function() {
    // Verifica se o formulário é submetido
    $('#userIdForm').submit(function(event) {
        event.preventDefault();
        var userId = $('#userId').val();
        console.log("ID do Usuário:", userId); // Adiciona este log para verificar se o userId está correto
        buscarInformacoesUsuario(userId);
    });

    // Restante do seu código...
});

function buscarInformacoesUsuario(userId) {
    var url = `https://api.meshapis.cc/user/${userId}`;

    $.ajax({
        url: url,
        type: 'GET',
        success: function(response) {
            exibirInformacoesUsuario(response);
        },
        error: function() {
            $('#userInfo').html("<p>Erro ao buscar informações do usuário</p>");
        }
    });
}

function exibirInformacoesUsuario(userInfo) {
    var userInfoHTML = `
        <h2>Informações do Usuário</h2>
        <p><strong>Nome:</strong> ${userInfo.username}</p>
        <p><strong>Avatar Atual:</strong> <img src="${userInfo.avatar_url}" alt="Avatar do Usuário"></p>
        <p><strong>Avatares Antigos:</strong></p>
        <ul>`;

    if (userInfo.past_avatars && userInfo.past_avatars.length > 0) {
        userInfo.past_avatars.forEach(avatar => {
            userInfoHTML += `<li><img src="${avatar}" alt="Avatar Antigo"></li>`;
        });
    } else {
        userInfoHTML += `<li>Nenhum avatar antigo disponível</li>`;
    }

    userInfoHTML += `</ul>
        <p><strong>Tempo de Boost:</strong> ${userInfo.boosting_since ? new Date(userInfo.boosting_since * 1000).toLocaleString() : 'Não está boostando'}</p>
        <p><strong>Nickname Atual:</strong> ${userInfo.nickname ? userInfo.nickname : 'Não definido'}</p>
    `;

    $('#userInfo').html(userInfoHTML);
}
