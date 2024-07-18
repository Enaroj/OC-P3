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

export function initUI(gallery, categories){
    // call the function generateGallery
    generateGallery(gallery);

    generateGalleryModal(gallery);
}

export function generateGallery(gallery) {
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

export function generateGalleryModal(gallery, i) {
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
        deleteButton.id = "deleteBtn" + i
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add('fa-solid', 'fa-trash-can');

        // Create the element in the DOM
        sectionPortfolio.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(deleteButton);
        deleteButton.appendChild(deleteIcon);
    }

   
}

initData();


