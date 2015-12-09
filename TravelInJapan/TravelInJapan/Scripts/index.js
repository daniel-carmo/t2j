// Aspetto che il DOM sia pronto
$(document).ready(function () {
    // Variabili neccessarie
    var token;
    // Controllo se è presente il parametro del token nel URL della pagina
    if (location.hash.indexOf("token=") < 0) {
        document.body.innerHTML = "<h2>401.0 - Accesso negato</h2>";
        showAccessPage();
    }
    // Ottengo il token dal URL
    token = location.hash.split("=")[1];
    // Controllo la lunghezza del token per vedere se corrisponde alla lunghezza di una stringa codificata con MD5
    if (token.length == 32) {
        // Ottengo la lista degli utenti
        $.getJSON("Data/users.json", function (data, status) {
            var foundUser = false;
            // Controllo se il token corrisponde ad un utente nella lista
            data.forEach(function (user) {
                if (user.token == token) {
                    setGiftButton(user.firstname, token);
                    loadUserPicture(token);
                    showAccessPage();
                    foundUser = true;
                }
            });
            if (foundUser == false) {
                document.body.innerHTML = "<h2>401.0 - Accesso negato</h2>";
                showAccessPage();
            }
        });
    }
    else {
        document.body.innerHTML = "<h2>400.0 - Richiesta non valida</h2>";
        showAccessPage();
    }
});
function showAccessPage() {
    $(document.body).show(800);
}
// Setta il testo e l'azione del bottone d'accesso
function setGiftButton(firstname, token) {
    $("#openTravel").text("Ciao " + firstname + ", controlla il tuo premio!");
    $("#openTravel").click(function () {
        $(document.body).hide(800);
        setTimeout(function () {
            localStorage.setItem("token", token);
            location.href = "travel.html";
        }, 850);
    });
}
// Sostituisce l'immagine prefinita con quella dell'utente del token
function loadUserPicture(token) {
    $("#userImage").attr("src", "Resources/profileImages/" + token + ".png");
}
