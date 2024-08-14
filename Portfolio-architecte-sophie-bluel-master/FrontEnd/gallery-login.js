
export async function initData() {
    // Fetch the elements in the works API
    const reponse = await fetch("http://localhost:5678/api/works");
    // Create a json file with the elements
    const gallery = await reponse.json();
    console.log(gallery);

    // Fetch the elements in the categories API
    const reponseCat = await fetch("http://localhost:5678/api/categories");
    // Create a json file with the elements
    const categories = await reponseCat.json();
    console.log(categories);
    // Call the function initUI with gallery and categories as arguments
    initUI(gallery, categories);
}

function initUI(gallery, categories) {
    // call the function generateGallery
    generateGallery(gallery);

    generateGalleryModal(gallery);
}

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

function generateGalleryModal(gallery, i) {
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
        // const deleteElement = document.querySelector(".modal-figure");
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


function setupDeleteListener(gallery) {

    console.log(gallery.length)
    for (let i = 0; i < gallery.length; i++) {

        const deleteButton = document.querySelector("#delete-btn" + i)

        deleteButton.addEventListener("click", function () {
            console.log("le bouton poubelle a été cliqué")
            const deleteId = gallery[i].id 
            console.log(deleteId)
            deleteItem(deleteId)
        })
    }
}

export function getToken() {
    const getItemToken = window.localStorage.getItem("token");
    console.log(getItemToken) // mettre à jour la galerie 
    return getItemToken
}


function deleteItem(deleteId) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getToken());

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("http://localhost:5678/api/works/" + deleteId, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

    document.querySelector("#gallery-modal").innerHTML = "";
    document.querySelector(".gallery").innerHTML = "";
    initData();
}





initData();


