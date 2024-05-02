const reponse = await fetch("http://localhost:5678/api/works");
const gallery = await reponse.json();

function generateGallery(gallery) {
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

generateGallery(gallery);

