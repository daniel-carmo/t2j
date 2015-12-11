// Aspetto che il DOM sia pronto
$(document).ready(function () {
    $.getJSON("Data/users.json", function (data: User[], status) {
        var foundUser = false;

        // Genero la lista degli utenti per token
        data.forEach(function (user: User) {
            $("#list").append(
                $("#list").add('<p><a href="index.html#token=' + user.token + '"> Apri come ' + user.firstname + ' ' + user.surname + '</a></p>'));
        });
    });
});