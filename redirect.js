$(document).ready(function() {
    $('#userIdForm').submit(function(event) {
        event.preventDefault();
        var userId = $('#userId').val();
        redirecionarParaInfo(userId);
    });
});

function redirecionarParaInfo(userId) {
    // Redireciona o usuário para a página de redirecionamento
    window.location.href = 'redirect.html';

    // Salva o ID do usuário na sessão para ser acessado na próxima página
    sessionStorage.setItem('userId', userId);
}
