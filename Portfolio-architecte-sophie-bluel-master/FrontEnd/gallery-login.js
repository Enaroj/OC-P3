
export async function initData() {
    // Fetch the elements in the works API
    const reponse = await fetch("http://localhost:5678/api/works");
    // Create a json file with the elements
    const gallery = await reponse.json();

    // Fetch the elements in the categories API
    const reponseCat = await fetch("http://localhost:5678/api/categories");
    // Create a json file with the elements
    const categories = await reponseCat.json();
    // Call the function initUI with gallery and categories as arguments
    initUI(gallery, categories);
}

function initUI(gallery) {

    generateGallery(gallery);

    generateGalleryModal(gallery);
}

// Generate the gallery when the author is logged-in
function generateGallery(gallery) {
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML = "";

    for (let i = 0; i < gallery.length; i++) {

        const article = gallery[i];
        // Get the DOM element where to put the images
        const sectionPortfolio = document.querySelector(".gallery");
        // Create the figure element
        const figureElement = document.createElement("figure");
        // Create the image element
        const imageElement = document.createElement("img");
        // Get the image from the API
        imageElement.src = article.imageUrl;
        // Get the alternative element from the API
        imageElement.alt = article.title ?? "no description available";
        // Create the caption
        const captionFigure = document.createElement("figcaption");
        // Get the caption from the API
        captionFigure.innerText = article.title ?? "no title";

        // Create the element in the DOM
        sectionPortfolio.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(captionFigure);
    }
}

// Generate the gallery into the modal box
function generateGalleryModal(gallery) {
    // Get the DOM element where to put the images
    const sectionPortfolio = document.querySelector("#gallery-modal");
    sectionPortfolio.innerHTML = "";

    for (let i = 0; i < gallery.length; i++) {

        const article = gallery[i];

        // Create the figure element
        const figureElement = document.createElement("figure");
        // Create the image element
        const imageElement = document.createElement("img");
        // Get the image from the API
        imageElement.src = article.imageUrl;
        // Get the alternative element from the API
        imageElement.alt = article.title ?? "no description available";
        const deleteButton = document.createElement("button");
        deleteButton.id = "delete-btn" + i
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add('fa-solid', 'fa-trash-can');

        // Create the element in the DOM
        sectionPortfolio.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(deleteButton);
        deleteButton.appendChild(deleteIcon);
    }
    setupDeleteListener(gallery)


}

// Listen to the trashcan icon
function setupDeleteListener(gallery) {
    for (let i = 0; i < gallery.length; i++) {

        const deleteButton = document.querySelector("#delete-btn" + i);

        deleteButton.addEventListener("click", function () {
            const deleteId = gallery[i].id;
            deleteItem(deleteId);
        })
    }
}

// Retrieve the token from the local storage
export function getToken() {
    const getItemToken = window.localStorage.getItem("token");
    return getItemToken
}

// Delete an item from the API
function deleteItem(deleteId) {

    // Get the authorisation to modify the data
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getToken());

    // Build the request
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    // Fetch the API
    fetch("http://localhost:5678/api/works/" + deleteId, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

    // Clear the DOM in order to avoid multiple display of the gallery
    document.querySelector("#gallery-modal").innerHTML = "";
    document.querySelector(".gallery").innerHTML = "";
    initData();
}

initData();


