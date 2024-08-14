import { initData } from "./gallery-login.js"
//import { getToken } from "./login.js"
import { getToken } from "./gallery-login.js"

// This function manage the global behavior of the modal box, using keyboard or mouse
function initModal() {

    let modal = null
    // Create a selector to know all the selectionable elements
    const focusableSelector = 'button, a, input, textarea'
    // Create a variable to save the focusable into
    let focusables = []
    // Creat a variable to set the previously focused element on the main page
    let previouslyFocusElement = null

    // This constant manage the opening of the modal box

    const openModal = function (event) {
        event.preventDefault()
        console.log("le lien a été cliqué")
        initModalContent()
        // Fetch the element "href" in the page
        modal = document.querySelector(event.target.getAttribute("href"))
        // Select all the element focusable that are into the modal box and put in a table
        focusables = Array.from(modal.querySelectorAll(focusableSelector))
        // Get the element that has the focus in the main page and save it in the variable
        previouslyFocusElement = document.querySelector(':focus')
        // Show the modal box, changing the display:none into display:null
        modal.style.display = null
        // Set the focus on the first focusable element by default
        focusables[0].focus()
        // Allow the modal box to be visible by assistance interfaces
        modal.removeAttribute("aria-hidden")
        // Indicate that the modal box is a modal box for assistance intefaces
        modal.setAttribute("aria-modal", "true")
        // Listen to the click and call the closeModal constant
        modal.addEventListener("click", closeModal)
        // Close the modal when the close button is clicked
        modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
        // Stop the modal from closing when the click is inside the modal box
        modal.querySelector(".js-modal-stop").addEventListener("click", stopModal)
    }

    // This constant manage the closing of the modal box
    const closeModal = function (event) {
        // Doesn't do anything if the modal is not opened
        if (modal === null) return
        // Set the focus on the previously focused element on the main page when the modal box is closed
        if (previouslyFocusElement !== null) previouslyFocusElement.focus()
        event.preventDefault()
        console.log("On a cliqué ailleurs")
        // Hide the modal box
        modal.style.display = "none"
        // Hide the assistance inferfaces
        modal.setAttribute("aria-hidden", "true")
        modal.removeAttribute("arial-modal")
        // modal.removeEventlistener("click", closeModal)
        // modal.querySelector("js-modal-close").removeEventListener("click", closeModal)
        modal = null
    }

    // This constant stop the click from being listened in the div inside the modal box
    const stopModal = function (event) {
        event.stopPropagation()
    }

    // Manage the focus in the modal box when tab  or shift +  tab are used
    const focusInModal = function (event) {
        event.preventDefault()
        console.log(focusables)
        // Get the index of the focused element in the modal box
        let index = focusables.findIndex(focusableElement => focusableElement === modal.querySelector(':focus'))
        console.log(index)
        if (event.shiftKey === true) {
            // Take off a level of the index found if the shiftkey is down
            index--
        } else {
            // Add a level to the index found
            index++
            console.log(index)
        }
        // If we are in the last index of the modal box, the index focused get back to the first index
        if (index >= focusables.length) {
            index = 0
        }
        if (index < 0) {
            // if the index is inferior to zero, the index is reset to the length of focusables -1
            index = focusables.length - 1
        }
        // Apply focus on the element selected
        focusables[index].focus()
    }

    // This listen to the link being clicked inside the modal ignitiator and open the modal box
    document.querySelectorAll(".js-modal").forEach(a => {
        a.addEventListener("click", openModal)
    })

    // This listen to the keyboard
    window.addEventListener("keydown", function (event) {
        console.log(event.key)
        // Listen to the Escpape key and close the modal
        if (event.key === "Escape" || event.key === "Esc") {
            closeModal(event)
        }
        // Listen to the Tab key
        if (event.key === "Tab" && modal !== null) {
            focusInModal(event)
        }
    })



}

function initModalContent() {
    console.log("la fonction initModal est lancée")

    // Change the title of the modal box
    document.querySelector("h3").innerText = "Galerie photo";
    // Change the id of the div in order to allow the generation of the gallery
    document.querySelector(".inner-modal").id = "gallery-modal";
    // Empty the div from previous content
    document.querySelector(".inner-modal").innerHTML = "";



    //Generate the modal gallery 
    initData();

    // Hide the return button
    const hideButton = document.querySelector(".fa-arrow-left");
    hideButton.style.display = "none";

    // Reveiling a navigation button part
    document.querySelector("#btn-add").style.display = null;
    document.querySelector("hr").style.display = null;

    setAddPhotoModal();
}

function changeTitle() {
    // Changing the title of the modal box
    document.querySelector("h3").innerText = "Ajout photo";
    // Changing the id of the div of the inside content of the modal box
    document.querySelector(".inner-modal").id = "add-photo-modal";
    // Emptying the HTML of that div
    document.querySelector(".inner-modal").innerHTML = "";
}

function showBackButton() {
    // Revealing the back button
    const hideButton = document.querySelector(".fa-arrow-left");
    hideButton.style.display = null
    // Listening to the click on that button
    hideButton.addEventListener("click", function () {
        console.log("le bouton retour a été cliqué");
        // Recreating the first window of the modal box
        initModalContent();
    });

}

function addNewPhoto(formAddPhoto) {
    // Create the div element to contain the first part of the window : input file
    const divAddPhoto = document.createElement("div");
    divAddPhoto.classList.add('div-add-photo');
    // Create the icon "image"
    const imageIcon = document.createElement("i");
    imageIcon.classList.add('fa-regular', 'fa-image');
    // Create a label element to contain a span and an input in order to upload a new photo. 
    // The input is hidden and the span is set to look like a button while acting like an input. 
    const addPhotoLabel = document.createElement("label");
    addPhotoLabel.for = "images";
    addPhotoLabel.id = "label-image"
    const addPhotoButton = document.createElement("span");
    addPhotoButton.innerText = " + Ajouter photo";
    // Setting the input
    const addPhotoInput = document.createElement("input");
    addPhotoInput.type = "file";
    addPhotoInput.accept = ".jpg, .png";
    addPhotoInput.id = "images";
    // Adding a description about what extensions are supported by the input
    const addPhotoText = document.createElement("p");
    addPhotoText.innerText = "jpg, png : 4 mo max";
    addPhotoText.id = "p-image"

    // Create a div into the form to manage the input type file
    formAddPhoto.appendChild(divAddPhoto);
    // Adding the icon
    divAddPhoto.appendChild(imageIcon);
    // Adding the label, button, input and description text
    divAddPhoto.appendChild(addPhotoLabel);
    addPhotoLabel.appendChild(addPhotoButton);
    addPhotoLabel.appendChild(addPhotoInput);
    divAddPhoto.appendChild(addPhotoText);


}

function addPhotoTitle(formAddPhoto) {
    // Adding a title part
    const photoTitlelabel = document.createElement("label");
    photoTitlelabel.innerText = "Titre";
    const photoTitle = document.createElement("input");
    photoTitle.type = "text";
    photoTitle.name = "title-photo";
    photoTitle.id = "title-photo";

    // Adding the title field
    formAddPhoto.appendChild(photoTitlelabel);
    formAddPhoto.appendChild(photoTitle);

}

function addPhotoCategory(formAddPhoto) {
    // Adding a category part
    const photoCatlabel = document.createElement("label");
    photoCatlabel.innerText = "Catégorie";
    const photoCat = document.createElement("select");
    photoCat.name = "cat-photo";
    photoCat.id = "cat-photo";
    const options = [
        { value: 'Tous', text: '' },
        { value: 'Objet', text: 'Objet' },
        { value: 'Appartements', text: 'Appartements' },
        { value: 'Hotels-Restaurants', text: 'Hotels & Restaurants' },
    ];
    options.forEach(optionData => {
        const optionElement = document.createElement('option');
        optionElement.value = optionData.value;
        optionElement.textContent = optionData.text;
        photoCat.appendChild(optionElement);
    });


    // Adding the category field
    formAddPhoto.appendChild(photoCatlabel);
    formAddPhoto.appendChild(photoCat);
}

function submitPhotoButton(formAddPhoto) {

    const createLine = document.createElement("hr");

    formAddPhoto.appendChild(createLine);

    const submitButton = document.createElement("input");
    submitButton.id = "btn-ok";
    submitButton.type = "submit";
    submitButton.value = "Valider";
    submitButton.disabled = true;

    formAddPhoto.appendChild(submitButton);

}

function addForm() {

    // Creating the content of the second window of the modal box
    const sectionAddPhoto = document.querySelector("#add-photo-modal");
    console.log(sectionAddPhoto);

    // Adding a form
    const formAddPhoto = document.createElement("form");
    formAddPhoto.method = "post";
    formAddPhoto.id = "my-form";
    formAddPhoto.action = "/submit";

    addNewPhoto(formAddPhoto);
    addPhotoTitle(formAddPhoto);
    addPhotoCategory(formAddPhoto);
    submitPhotoButton(formAddPhoto);

    // Creating all the elements in the DOM
    // Create the form
    sectionAddPhoto.appendChild(formAddPhoto);

}

function setUpFormListener() {
    const form = document.getElementById('my-form');

    const elementError = document.createElement("p");
    elementError.id = "add-photo-error-message";
    form.appendChild(elementError);

    form.addEventListener('change', function () {
        const fileInput = document.querySelector('input[type="file"]');
        console.log(fileInput.value)
        const titleInput = document.getElementById('title-photo');
        console.log(titleInput.value)
        const categoryInput = document.querySelector('#cat-photo');
        console.log(categoryInput.value)
        const fileValue = fileInput.value
        const extFile = fileValue.split('.').pop();
        console.log(extFile);
        const file = fileInput.files[0];
        console.log(file);
        const fileSize = file.size;
        console.log(fileSize);
        const fileSizeInKB = (fileSize / 1024);
        console.log(fileSizeInKB);



        if (!["png", "PNG", "jpg", "JPG", "jpeg", "JPEG"].includes(extFile)) {
            elementError.innerHTML = "Le format du fichier n'est pas bon"
        } if (fileSizeInKB > 4000) {
            elementError.innerHTML = "Le fichier est trop volumineux"
        } if (fileInput.value != "" && titleInput.value != "" && categoryInput.value != "Tous") {
            console.log("Tout est en règle vous pouvez circuler");
            document.getElementById("btn-ok").disabled = false;
            document.getElementById("btn-ok").id = "btn-ok-valide"; // activer le bouton : done !

        } else {
            console.log("Vous n'avez pas sélectionné de fichier, ou donné un titre ou sélectionné une catégorie");
            ;
            if (document.getElementById("btn-ok-valide") != null) {
                document.getElementById("btn-ok-valide").id = "btn-ok";
                document.getElementById("btn-ok").disabled = true;
            };
        }
    });


}

function setupSubmitListener() {
    const form = document.getElementById('my-form')

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("le bouton submit a été cliqué")
        addItemtoAPI();
    });

}

function displayMiniature() {
    const image = document.getElementById("images");
    image.addEventListener('change', (event) => {
        console.log(event.target.value);
        const icone = document.querySelector(".fa-image");
        icone.style.display = "none";
        const content = document.querySelector(".div-add-photo");
        const newPhoto = document.createElement("img");
        newPhoto.id = "preview-photo";
        content.appendChild(newPhoto);
        // newPhoto.src = image.files[0];

        document.getElementById("label-image").style.display = "none";
        document.getElementById("p-image").style.display = "none";


        const file = image.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                newPhoto.src = event.target.result;
                //newPhoto.style.display = "block";
            };
            reader.readAsDataURL(file);
        }



    });
}

// Error 400 Bad request
function addItemtoAPI() {
    const form = document.getElementById('my-form') // comment ne pas écrire deux fois cette ligne ? (voir setUpFormListener)




    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getToken());

    const formdata = new FormData();
    const fileInput = document.querySelector('input[type="file"]');
    console.log('la valeur de l"input est ', fileInput.value)
    const file = fileInput.files[0];
    const titleInput = document.getElementById('title-photo').value;
    const categoryInput = document.querySelector('#cat-photo').selectedIndex;
    console.log(categoryInput)


    formdata.append("image", file /*, "/path/to/file"*/);
    formdata.append("title", titleInput);
    formdata.append("category", categoryInput);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    fetch("http://localhost:5678/api/works/", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            document.querySelector('.modal').style.display = "none";
            initModalContent();
            initData();
        })
        .catch((error) => {
            console.error(error);
            elementError.innerText = "Une erreur s'est produite.";
        })
}


function setAddPhotoModal() {

    const addButton = document.getElementById("btn-add");
    addButton.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("le bouton ajouter a été cliqué");

        changeTitle();

        showBackButton();

        document.querySelector("#btn-add").style.display = "none";
        document.querySelector("hr").style.display = "none";

        addForm();


        displayMiniature()

        setUpFormListener()
        setupSubmitListener()

    });
}


initModal()

