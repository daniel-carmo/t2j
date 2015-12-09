
// Aspetto che il DOM sia pronto
$(document).ready(function () {
    // Variabili neccessarie
    var token: string = localStorage.getItem("token");
    
    // Controllo se è presente il parametro del token nel URL della pagina
    if (token.length != 32) {
        document.body.innerHTML = "<h2>401.0 - Accesso negato</h2>";
        showTravelPage();
    }

    // Controllo la lunghezza del token per vedere se corrisponde alla lunghezza di una stringa codificata con MD5
    if (token.length == 32) {
        // Ottengo la lista degli utenti
        $.getJSON("Data/users.json", function (data: User[], status) {
            var foundUser = false;

            // Controllo se il token corrisponde ad un utente nella lista
            data.forEach(function (user: User) {
                if (user.token == token) {
                    setUsername(user.firstname, user.surname);
                    setUserPicture(token);
                    showTravelPage();
                    foundUser = true;
                }
                else {
                    $("#people").append($("#people").add('<figure class="peopleCircle"><img src="Resources/profileImages/' + user.token + '.png"/></figure>'));
                }
            });

            if (foundUser == false) {
                document.body.innerHTML = "<h2>401.0 - Accesso negato</h2>";
                showTravelPage();
            }
        });
    }
    else {
        document.body.innerHTML = "<h2>400.0 - Richiesta non valida</h2>";
        showTravelPage();
    }
});

function showTravelPage() {
    $(document.body).show(800);
}

// Setta il nome e cognome dell'utente in base ai parametri
function setUsername(firstname, surname) {
    $("#username").text(firstname + " " + surname);
}

// Setta l'immagine dell'utente in base al token inviato come parametro
function setUserPicture(token: string) {
    $("#userImage").attr("src", "Resources/profileImages/" + token + ".png");
}