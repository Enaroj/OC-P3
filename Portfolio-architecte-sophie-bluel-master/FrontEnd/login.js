function logIn() {
    const formLogIn = document.querySelector(".form-login");
    formLogIn.addEventListener("submit", async function (event) {
        // Desactivate the default behaviour of the browser
        event.preventDefault();

        // Create the data to be send to the API
        const logInData = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };

        // Transform the data into JSON file
        const chargeUtile = JSON.stringify(logInData);

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
                // Store the data into local storage for future use
                window.localStorage.setItem("token", data.token);
                document.location.href="/index.html";
            })
            .catch(error => {
                // Manage errors
                const idError = document.querySelector("#id-error");
                idError.innerText = "Erreur dans l'identifiant ou le mot de passe."
            });
    });



}

logIn();
