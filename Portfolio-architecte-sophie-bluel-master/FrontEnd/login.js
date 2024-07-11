function logIn() {
    const formLogIn = document.querySelector(".form-login");
    formLogIn.addEventListener("submit", async function (event) {
        // Desactivate the default behaviour of the browser
        event.preventDefault();
        // verify that the click is listened to
        console.log("le bouton submit a été cliqué.")

        // Create the data to be send to the API
        const logInData = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        // Verify that the data are correct
        console.log(logInData)

        // Transform the data into JSON file
        const chargeUtile = JSON.stringify(logInData);
        // Verify the transformation
        console.log(chargeUtile);

        // Post the data in the API
        const response = fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
            .then(response => {
                // Verify is the response is ok
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                // Transform the data into JSON
                return response.json();
            })
            .then(data => {
                // Display the data into the console
                console.log(data);
                // Store the data into local storage for future use
                window.localStorage.setItem("token", data.token);
                document.location.href="/index-login.html";
            })
            .catch(error => {
                // Manage errors
                console.error('Erreur de fetch:', error);
                const idError = document.querySelector("#id-error");
                idError.innerText = "Erreur dans l'identifiant ou le mot de passe."
            });

            console.log(response)

    });



}




function getToken() {
    const getItemToken = window.localStorage.getItem("token");
    console.log(getItemToken)
}


logIn();
// getToken();