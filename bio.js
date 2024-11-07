$(document).ready(function() {
    $('#userIdForm').submit(function(event) {
        event.preventDefault();
        var userId = $('#userId').val();
        buscarBio(userId);
    });
});

function buscarBio(userId) {
    var url = `https://api.meshapis.cc/user/${userId}`;

    $.ajax({
        url: url,
        type: 'GET',
        success: function(response) {
            exibirBio(response);
        },
        error: function() {
            $('#bio').html("<p>Usuário não encontrado</p>");
        }
    });
}

function exibirBio(user) {
    var bioHTML = `
        <h2>${user.name}</h2>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Biografia:</strong> ${user.bio}</p>
        <p><strong>Website:</strong> <a href="${user.website}" target="_blank">${user.website}</a></p>
    `;

    $('#bio').html(bioHTML);
}
