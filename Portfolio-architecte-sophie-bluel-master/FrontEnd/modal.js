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
const openModal = function(event) {
    event.preventDefault()
    console.log("le lien a été cliqué")
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
const closeModal = function(event) {
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
const stopModal = function(event){
    event.stopPropagation()
}

// Manage the focus in the modal box when tab  or shift +  tab are used
const focusInModal = function(event){
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
    if (index >= focusables.length){
        index = 0
    }
    if (index < 0) {
        // if the index is inferior to zero, the index is reset to the length of focusables -1
        index = focusables.length -1
    }
    // Apply focus on the element selected
    focusables[index].focus()
}

// This listen to the link being clicked inside the modal ignitiator and open the modal box
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal) 
})

// This listen to the keyboard
window.addEventListener("keydown", function(event){
    console.log(event.key)
    // Listen to the Escpape key and close the modal
    if (event.key === "Escape" || event.key === "Esc"){
        closeModal(event)
    }
    // Listen to the Tab key
    if (event.key === "Tab" && modal !== null) {
        focusInModal(event)
    }
})
    
}

modalOpenClose()

// const test = document.querySelector(".js-modal");
// test.addEventListener("click", function(event) {
//     event.preventDefault()
//     console.log("le bouton a été cliqué")
// })





// /*********************************************************************************
//  * 
//  * Ce fichier contient toutes les fonctions nécessaires à l'affichage et à la 
//  * fermeture de la popup de partage. 
//  * 
//  *********************************************************************************/


// /**
//  * Cette fonction affiche la popup pour partager son score. 
//  */
// function displayPopup() {
//     let editingPopup = document.querySelector(".editing-popup")
//     // La popup est masquée par défaut (display:none), ajouter la classe "active"
//     // va changer son display et la rendre visible. 
//     editingPopup.classList.add("active")
// }

// /**
//  * Cette fonction cache la popup pour partager son score. 
//  */
// function hidePopup() {
//     let editingPopup = document.querySelector(".editing-popup")
//     // La popup est masquée par défaut (display:none), supprimer la classe "active"
//     // va rétablir cet affichage par défaut. 
//     editingPopup.classList.remove("active")
// }


// /**
//  * Cette fonction initialise les écouteurs d'événements qui concernent 
//  * l'affichage de la popup. 
//  */
// function initAddEventListenerPopup() {
//     // On écoute le click sur le bouton "partager"
//     btnEdit = document.querySelector("#btnEdit")
//     let popupAdd = document.querySelector(".editing-popup")
    
//     btnEdit.addEventListener("click", () => {
//         console.log("le bouton Modifier est cliqué")
//         // Quand on a cliqué sur le bouton partagé, on affiche la popup
//         displayPopup()
//     })

//     // On écoute le click sur la div "popupBackground"
//     popupAdd.addEventListener("click", (event) => {
//         // Si on a cliqué précisément sur la popupBackground 
//         // (et pas un autre élément qui se trouve dedant)
//         if (event.target === popupAdd) {
//             // Alors on cache la popup
//             hidePopup()
//         }
//     })
// }

// //initAddEventListenerPopup();