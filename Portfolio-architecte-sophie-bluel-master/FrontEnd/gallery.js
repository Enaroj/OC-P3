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



const btnNoFilter = document.querySelector("#btn-all");

btnNoFilter.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    generateGallery(gallery)
    });


const btnFilterObject = document.querySelector("#btn-obj");

btnFilterObject.addEventListener("click", function() {
    const galleryObject = gallery.filter(function(gallery) {
        return gallery.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateGallery(galleryObject)
});

const btnFilterAppartement = document.querySelector("#btn-app");

btnFilterAppartement.addEventListener("click", function() {
    const galleryAppartement = gallery.filter(function(gallery) {
        return gallery.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateGallery(galleryAppartement)
});

const btnFilterHotRes = document.querySelector("#btn-hot");

btnFilterHotRes.addEventListener("click", function() {
    const galleryHotRes = gallery.filter(function(gallery) {
        return gallery.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateGallery(galleryHotRes)
});
// const boutonFiltrer = document.querySelector(".btn-filtrer");

// boutonFiltrer.addEventListener("click", function () {
//     const piecesFiltrees = pieces.filter(function (piece) {
//         return piece.prix <= 35;
//     });
//     document.querySelector(".fiches").innerHTML = "";
//     genererPieces(piecesFiltrees);
// });
