import { initData } from "./gallery-login.js";
import { getToken } from "./gallery-login.js";

// This function manage the global behavior of the modal box, using keyboard or mouse
function initModal() {
    let modal = null;
    // Create a selector to know all the selectionable elements
    const focusableSelector = 'button, a, input, textarea';
    // Create a variable to save the focusable into
    let focusables = [];
    // Creat a variable to set the previously focused element on the main page
    let previouslyFocusElement = null;

    // Manage the opening of the modal box
    const openModal = function (event) {
        event.preventDefault();
        // Generate the gallery when the modal is opened
        initModalContent();
        // Fetch the element "href" in the page
        modal = document.querySelector(event.target.getAttribute("href"));
        // Select all the element focusable that are into the modal box and put in a table
        focusables = Array.from(modal.querySelectorAll(focusableSelector));
        // Get the element that has the focus in the main page and save it in the variable
        previouslyFocusElement = document.querySelector(':focus');
        // Show the modal box, changing the display:none into display:null
        modal.style.display = null;
        // Set the focus on the first focusable element by default
        focusables[0].focus();
        // Allow the modal box to be visible by assistance interfaces
        modal.removeAttribute("aria-hidden");
        // Indicate that the modal box is a modal box for assistance intefaces
        modal.setAttribute("aria-modal", "true");
        // Listen to the click and call the closeModal constant
        modal.addEventListener("click", closeModal);
        // Close the modal when the close button is clicked
        modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
        // Stop the modal from closing when the click is inside the modal box
        modal.querySelector(".js-modal-stop").addEventListener("click", stopModal);
    }

    // Manage the closing of the modal box
    const closeModal = function (event) {
        // Doesn't do anything if the modal is not opened
        if (modal === null) return;
        // Set the focus on the previously focused element on the main page when the modal box is closed
        if (previouslyFocusElement !== null) previouslyFocusElement.focus();
        event.preventDefault();
        // Hide the modal box
        modal.style.display = "none";
        // Hide the assistance inferfaces
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("arial-modal");
        // modal.removeEventlistener("click", closeModal)
        // modal.querySelector("js-modal-close").removeEventListener("click", closeModal)
        modal = null;
    }

    // Stop the click from being listened outside the modal box
    const stopModal = function (event) {
        event.stopPropagation();
    }

    // Manage the focus in the modal box when tab  or shift +  tab are used
    const focusInModal = function (event) {
        event.preventDefault();
        // Get the index of the focused element in the modal box
        let index = focusables.findIndex(focusableElement => focusableElement === modal.querySelector(':focus'));
        if (event.shiftKey === true) {
            // Take off a level of the index found if the shiftkey is down
            index--;
        } else {
            // Add a level to the index found
            index++;
        }
        // If we are in the last index of the modal box, the index focused get back to the first index
        if (index >= focusables.length) {
            index = 0;
        }
        if (index < 0) {
            // if the index is inferior to zero, the index is reset to the length of focusables -1
            index = focusables.length - 1;
        }
        // Apply focus on the element selected
        focusables[index].focus();
    }

    // Listen to the link being clicked inside the modal ignitiator and open the modal box
    document.querySelectorAll(".js-modal").forEach(a => {
        a.addEventListener("click", openModal);
    })

    // Listen to the keyboard
    window.addEventListener("keydown", function (event) {
        // Listen to the Escpape key and close the modal
        if (event.key === "Escape" || event.key === "Esc") {
            closeModal(event);
        }
        // Listen to the Tab key
        if (event.key === "Tab" && modal !== null) {
            focusInModal(event);
        }
    })



}

// The modal box display two seperate windows : one to delete element from gallery (first modal window), one to add element to gallery (second modal window)
// Create the content of the first modal window
function initModalContent() {
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

    // Reveal a navigation button part
    document.querySelector("#btn-add").style.display = null;
    document.querySelector("hr").style.display = null;

    // Call the function that display the second modal window
    setAddPhotoModal(); 
}

// The following functions generate the second modal window

function changeTitle() {
    // Change the title of the modal box
    document.querySelector("h3").innerText = "Ajout photo";
    // Change the id of the div of the inside content of the modal box
    document.querySelector(".inner-modal").id = "add-photo-modal";
    // Empty the HTML of that div
    document.querySelector(".inner-modal").innerHTML = "";
}

function showBackButton() {
    // Reveal the back button
    const hideButton = document.querySelector(".fa-arrow-left");
    hideButton.style.display = null;
    // Listen to the click on that button
    hideButton.addEventListener("click", function () {
        // Recreate the first modal window
        initModalContent();
    });

}

// Generate the input file section of the second modal window
/**
 * The following functions needs the formAddPhoto parameter in order to generate each section created into one single form
 * 
 * @param {*} formAddPhoto 
 */
function addNewPhoto(formAddPhoto) {
    const divAddPhoto = document.createElement("div");
    divAddPhoto.classList.add('div-add-photo');
    const imageIcon = document.createElement("i");
    imageIcon.classList.add('fa-regular', 'fa-image');
    // Create a label element to contain a span and an input in order to upload a new photo. 
    // The input is hidden and the span is set to look like a button while acting like an input. 
    const addPhotoLabel = document.createElement("label");
    addPhotoLabel.for = "images";
    addPhotoLabel.id = "label-image"
    const addPhotoButton = document.createElement("span");
    addPhotoButton.innerText = " + Ajouter photo";
    // Set the input file, restrain the extensions allowed
    const addPhotoInput = document.createElement("input");
    addPhotoInput.type = "file";
    addPhotoInput.accept = ".jpg, .png";
    addPhotoInput.id = "images";
    // Add a description displayed on screen about what extensions are allowed by the input
    const addPhotoText = document.createElement("p");
    addPhotoText.innerText = "jpg, png : 4mo max";
    addPhotoText.id = "p-image";

    // Generate all the element created into the DOM
    formAddPhoto.appendChild(divAddPhoto);
    divAddPhoto.appendChild(imageIcon);
    divAddPhoto.appendChild(addPhotoLabel);
    addPhotoLabel.appendChild(addPhotoButton);
    addPhotoLabel.appendChild(addPhotoInput);
    divAddPhoto.appendChild(addPhotoText);
}

// Generate a section to add a title to the element uploaded
function addPhotoTitle(formAddPhoto) {
    // Add an input text 
    const photoTitlelabel = document.createElement("label");
    photoTitlelabel.innerText = "Titre";
    const photoTitle = document.createElement("input");
    photoTitle.type = "text";
    photoTitle.name = "title-photo";
    photoTitle.id = "title-photo";

    // Add the title fields into the DOM
    formAddPhoto.appendChild(photoTitlelabel);
    formAddPhoto.appendChild(photoTitle);

}

// Generate a section to add a category to the element uploaded
function addPhotoCategory(formAddPhoto) {
    // Create a drop-down list
    const photoCatlabel = document.createElement("label");
    photoCatlabel.innerText = "Catégorie";
    const photoCat = document.createElement("select");
    photoCat.name = "cat-photo";
    photoCat.id = "cat-photo";
    const options = [
        { value: '', text: '' },
        { value: '1', text: 'Objet' },
        { value: '2', text: 'Appartements' },
        { value: '3', text: 'Hotels & Restaurants' },
    ];
    // Create the option into the DOM for each option declared 
    options.forEach(optionData => {
        const optionElement = document.createElement('option');
        optionElement.value = optionData.value;
        optionElement.textContent = optionData.text;
        photoCat.appendChild(optionElement);
    });


    // Add the category field
    formAddPhoto.appendChild(photoCatlabel);
    formAddPhoto.appendChild(photoCat);
}

// Generate the last section of the form
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

// Create the form from the previous functions
function addForm() {
    // Create the content of the second modal window
    const sectionAddPhoto = document.querySelector("#add-photo-modal");

    // Create a form element
    const formAddPhoto = document.createElement("form");
    formAddPhoto.method = "post";
    formAddPhoto.id = "my-form";
    formAddPhoto.action = "/submit";

    // Call each of the function creating the different sections of the form
    addNewPhoto(formAddPhoto);
    addPhotoTitle(formAddPhoto);
    addPhotoCategory(formAddPhoto);
    submitPhotoButton(formAddPhoto);

    // Create the form into the DOM
    sectionAddPhoto.appendChild(formAddPhoto);
}

// Listen to the behaviour of the form and check if all field are correctly filled 
function setUpFormListener() {
    const form = document.getElementById('my-form');

    // Create a element to display error types on screen
    const elementError = document.createElement("p");
    elementError.id = "add-photo-error-message";
    form.appendChild(elementError);

    form.addEventListener('change', function () {
        // Get all the elements necessary to check the form's behaviour
        const fileInput = document.querySelector('input[type="file"]');
        const titleInput = document.getElementById('title-photo');
        const categoryInput = document.querySelector('#cat-photo');
        const fileValue = fileInput.value;
        const extFile = fileValue.split('.').pop();
        const file = fileInput.files[0];
        const fileSize = file.size;
        const fileSizeInKB = (fileSize / 1024);


        // Check every field of the form
        // Display an error message if the file extension is not png or jpg
        if (!["png", "PNG", "jpg", "JPG", "jpeg", "JPEG"].includes(extFile)) {
            elementError.innerHTML = "Le format du fichier n'est pas bon";
            // Display an error message is file is too big
        } if (fileSizeInKB > 4000) {
            elementError.innerHTML = "Le fichier est trop volumineux";
            // Check if all the field are correctly completed then activate the submit button   
        } if (fileInput.value != "" && titleInput.value != "" && categoryInput.value != "") {
            document.getElementById("btn-ok").disabled = false;
            document.getElementById("btn-ok").id = "btn-ok-valide";
            // If the user did not complete the form correctly, the submit button is not activated
            // If the user completed the form correctly and choses to change one field so it's not correctly completed anymore, the submit button is disabled
        } else {
            if (document.getElementById("btn-ok-valide") != null) {
                document.getElementById("btn-ok-valide").id = "btn-ok";
                document.getElementById("btn-ok").disabled = true;
            };
        }
    });


}

function displayMiniature() {
    const image = document.getElementById("images");

    // Check the input file state change and change the display of this section
    image.addEventListener('change', () => {
        const icone = document.querySelector(".fa-image");
        icone.style.display = "none";
        const content = document.querySelector(".div-add-photo");
        const newPhoto = document.createElement("img");
        newPhoto.id = "preview-photo";
        content.appendChild(newPhoto);

        document.getElementById("label-image").style.display = "none";
        document.getElementById("p-image").style.display = "none";

        // Use a fileReader element to bypass the access of the file and display a miniature of the photo
        const file = image.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                newPhoto.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Listen to the submit button and call the function calling the API
function setupSubmitListener() {
    const form = document.getElementById('my-form');

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        addItemtoAPI();
    });

}

// Fetch the API to send the information of the form
function addItemtoAPI() {
    const form = document.getElementById('my-form');

    // Get the authorisation to modify the data
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getToken());

    // Get the right elements to send the API
    const formdata = new FormData();
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    const titleInput = document.getElementById('title-photo').value;
    const categoryInput = document.querySelector('#cat-photo').value;

    // Load the formdata
    formdata.append("image", file);
    formdata.append("title", titleInput);
    formdata.append("category", Number(categoryInput));

    // Build the request
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    // Fetch the API
    fetch("http://localhost:5678/api/works/", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            document.querySelector('.modal').style.display = "none";
            initModalContent();
            initData();
        })
        .catch((error) => {
            elementError.innerText = "Une erreur s'est produite.";
        })
}

// Create the content of the second modal window
function setAddPhotoModal() {
    const addButton = document.getElementById("btn-add");

    // Listen to the button of the first modal window, change the display of the window
    addButton.addEventListener("click", function (event) {
        event.preventDefault();

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

