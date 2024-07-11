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
        getBack()
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

function addPhoto() {
    const addButton = document.querySelector("#btn-add")
    addButton.addEventListener("click", function (event) {
        event.preventDefault()
        console.log("le bouton ajouter a été cliqué");

        document.querySelector("h3").innerText = "Ajout photo";
        document.querySelector(".gallery-modal").style.display = "none";
        document.querySelector(".add-photo-modal").style.display = null

        const hideButton = document.querySelector(".fa-arrow-left");
        hideButton.style.display = null
        hideButton.addEventListener("click", function () {
            console.log("le bouton retour a été cliqué");
            getBack();
        })

        addButton.innerText = "Valider";
        addButton.id = "btn-ok";

        const sectionAddPhoto = document.querySelector(".add-photo-modal");
        console.log(sectionAddPhoto.value)
        if (sectionAddPhoto.firstChild) {
            
            // Create the figure element
            const divAddPhoto = document.createElement("div");
            divAddPhoto.classList.add('div-add-photo');
            const imageIcon = document.createElement("i");
            imageIcon.classList.add('fa-regular', 'fa-image');
            const AddPhotoInput = document.createElement("input");
            AddPhotoInput.innerText = "+ Ajouter photo";
            AddPhotoInput.type = "file"
            AddPhotoInput.accept = ".jpg, .png"
            const AddPhotoText = document.createElement("p");
            AddPhotoText.innerText =  "jpg, png : 4 mo max"
    
            sectionAddPhoto.appendChild(divAddPhoto);
            divAddPhoto.appendChild(imageIcon);
            divAddPhoto.appendChild(AddPhotoInput);
            divAddPhoto.appendChild(AddPhotoText);
    
            const formAddPhoto = document.createElement("form");
            formAddPhoto.method = "post";
    
            sectionAddPhoto.appendChild(formAddPhoto);
    
            const photoTitlelabel = document.createElement("label");
            photoTitlelabel.innerText = "Titre";
            const photoTitle = document.createElement("input");
            photoTitle.type = "text"
            photoTitle.name = "title-photo"
            photoTitle.id = "title-photo"
    
            formAddPhoto.appendChild(photoTitlelabel);
            formAddPhoto.appendChild(photoTitle);
    
            const photoCatlabel = document.createElement("label");
            photoCatlabel.innerText = "Catégorie";
            const photoCat = document.createElement("input");
            photoCat.type = "text"
            photoCat.name = "cat-photo"
            photoCat.id = "cat-photo"
    
            formAddPhoto.appendChild(photoCatlabel);
            formAddPhoto.appendChild(photoCat);
        } 

    })
}

function getBack() {
    console.log("la fonction getBack est lancée")

    document.querySelector("h3").innerText = "Galerie photo";
    document.querySelector(".gallery-modal").style.display = null
    document.querySelector(".add-photo-modal").style.display = "none"

    const hideButton = document.querySelector(".fa-arrow-left");
    hideButton.style.display = "none";

    const addButton = document.querySelector("#btn-ok");
    if (addButton !== null) {
        addButton.innerText = "Ajouter une photo";
        addButton.id = "btn-add";
    } 

}

modalOpenClose()
addPhoto()