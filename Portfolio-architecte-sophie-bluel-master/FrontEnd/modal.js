import { initData } from "./gallery-login.js"
//import { getToken } from "./login.js"

// This function manage the global behavior of the modal box, using keyboard or mouse
function modalOpenClose() {

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
        initiateModalContent()
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

function setAddPhotoModal() {
    // Listening to the "Ajouter une photo" button inside the modal box
    const addButton = document.querySelector("#btn-add")
    addButton.addEventListener("click", function (event) {
        event.preventDefault()
        console.log("le bouton ajouter a été cliqué");

        // Changing the title of the modal box
        document.querySelector("h3").innerText = "Ajout photo";
        // Changing the id of the div of the inside content of the modal box
        document.querySelector(".inner-modal").id = "add-photo-modal";
        // Emptying the HTML of that div
        document.querySelector(".inner-modal").innerHTML = ""

        // Revealing the back button
        const hideButton = document.querySelector(".fa-arrow-left");
        hideButton.style.display = null
        // Listening to the click on that button
        hideButton.addEventListener("click", function () {
            console.log("le bouton retour a été cliqué");
            // Recreating the first window of the modal box
            initiateModalContent();
        })

        // Changing the content and idea of the bottom button
        addButton.innerText = "Valider";
        addButton.id = "btn-ok";

        // Creating the content of the second window of the modal box
        const sectionAddPhoto = document.querySelector("#add-photo-modal");
        console.log(sectionAddPhoto)
        //if (sectionAddPhoto.firstChild) {
            
            // Create the div element to contain the first part of the window
            const divAddPhoto = document.createElement("div");
            divAddPhoto.classList.add('div-add-photo');
            const imageIcon = document.createElement("i");
            imageIcon.classList.add('fa-regular', 'fa-image');

            // Create a label element to contain a span and an input in order to upload a new photo. 
            // The input is hidden and the span is set to look like a button while acting like an input. 
            const addPhotoLabel = document.createElement("label");
            addPhotoLabel.for = "images";
            const addPhotoButton = document.createElement("span");
            addPhotoButton.innerText = " + Ajouter photo";
            // Setting the input
            const addPhotoInput = document.createElement("input");
            addPhotoInput.type = "file";
            addPhotoInput.accept = ".jpg, .png";
            addPhotoInput.id = "images";

            // Adding a description about what extensions are supported by the input
            const addPhotoText = document.createElement("p");
            addPhotoText.innerText =  "jpg, png : 4 mo max"

            // Creating all the elements in the DOM
            sectionAddPhoto.appendChild(divAddPhoto);
            divAddPhoto.appendChild(imageIcon);
            divAddPhoto.appendChild(addPhotoLabel);
            addPhotoLabel.appendChild(addPhotoButton)
            addPhotoLabel.appendChild(addPhotoInput);
            divAddPhoto.appendChild(addPhotoText);

            // Adding a second form part of the window in order to categories the photo uploaded
            const formAddPhoto = document.createElement("form");
            formAddPhoto.method = "post";
    
            sectionAddPhoto.appendChild(formAddPhoto);

            // Adding a title part
            const photoTitlelabel = document.createElement("label");
            photoTitlelabel.innerText = "Titre";
            const photoTitle = document.createElement("input");
            photoTitle.type = "text"
            photoTitle.name = "title-photo"
            photoTitle.id = "title-photo"
    
            formAddPhoto.appendChild(photoTitlelabel);
            formAddPhoto.appendChild(photoTitle);

            // Adding a category part
            const photoCatlabel = document.createElement("label");
            photoCatlabel.innerText = "Catégorie";
            const photoCat = document.createElement("input");
            photoCat.type = "text"
            photoCat.name = "cat-photo"
            photoCat.id = "cat-photo"
    
            formAddPhoto.appendChild(photoCatlabel);
            formAddPhoto.appendChild(photoCat);
        //} 

    })
}

function initiateModalContent() {
    console.log("la fonction initiateModal est lancée")

    // Change the title of the modal box
    document.querySelector("h3").innerText = "Galerie photo";
    // Change the id of the div in order to allow the generation of the gallery
    document.querySelector(".inner-modal").id = "gallery-modal";
    // Empty the div from previous content
    document.querySelector(".inner-modal").innerHTML = "";
    
    // Checking what should I call in the if section below.
    const div = document.querySelector(".inner-modal")
    const divHTML = div.innerHTML
    console.log(div);
    console.log(divHTML)
    // Generate the modal gallery if the div is empty
    if (divHTML === "") {
        initData()
    }

    // Hide the return button
    const hideButton = document.querySelector(".fa-arrow-left");
    hideButton.style.display = "none";

    // Changing the text of the bottom button if it's not changed yet.
    const addButton = document.querySelector("#btn-ok");
    if (addButton !== null) {
        addButton.innerText = "Ajouter une photo";
        addButton.id = "btn-add";
    } 

}

modalOpenClose(initData())
setAddPhotoModal()