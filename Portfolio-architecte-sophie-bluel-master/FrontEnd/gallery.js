async function initData() {
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

function initUI(gallery, categories){
    // call the function generateGallery
    generateGallery(gallery);

    generateGalleryModal(gallery);

    // call the function to create filter buttons and generate a filtered gallery
    createFilterButton(categories, gallery);
}

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

function generateGalleryModal(gallery) {
    for (let i = 0; i < gallery.length; i++) {

        const article = gallery[i];
        // Get the DOM element where to put the images
        const sectionPortfolio = document.querySelector(".gallery-modal");
        // Create the figure element
        const figureElement = document.createElement("figure");
        // Create the image element
        const imageElement = document.createElement("img");
        // Get the image from the API
        imageElement.src = article.imageUrl;
        // Get the alternative element from the API
        imageElement.alt = article.title ?? "no description available";
        // const deleteElement = document.querySelector(".modal-figure");
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add('fa-solid', 'fa-trash-can');

        // Create the element in the DOM
        sectionPortfolio.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(deleteIcon);
    }
}

// async function fetchCategories(gallery) {
//     // Fetch the elements from the API categories
//     const reponse = await fetch("http://localhost:5678/api/categories");
//     // Create a json file with the elements
//     const categories = await reponse.json();
//     // Rajouter un test d'erreur
    
//     // const categories = Set(); 

//     // filterGallery(categories);
// }

function createFilterButton(categories, gallery) {

    // Get the DOM element where to put the buttons
    const sectionFilters = document.querySelector(".filters");

    // Create a button with no filter
    const btnNoFilter = document.createElement("button");
    btnNoFilter.className = "btn";
    btnNoFilter.id = "btn-all";
    btnNoFilter.innerText = "Tous";
    sectionFilters.appendChild(btnNoFilter);

    btnNoFilter.addEventListener("click", function() {
        document.querySelector(".gallery").innerHTML = "";
        generateGallery(gallery);
    })

    // Create a button for each categories
    for (let i = 0; i < categories.length; i++){

        const article = categories[i];

        // Create the button element
        const buttonElement = document.createElement("button");
        // Give the button its class name
        buttonElement.className = "btn";
        buttonElement.id = "btn-" + article.id;
        buttonElement.innerText = article.name;
        setupButtonListener(buttonElement, i, gallery)
        // Create the element in the DOM
        sectionFilters.appendChild(buttonElement);
        }
}

function setupButtonListener (button, category, gallery){
    button.addEventListener("click", function() {
        console.log("le bouton est sélectionné. " + category);
        document.querySelector(".gallery").innerHTML = "";
        const galleryObject = gallery.filter(function (gallery) {
            return gallery.categoryId === category + 1;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateGallery(galleryObject)
    })
}


// function filterGallery(categories, gallery){

//         const selectFilter = document.querySelector(".btn");
//         selectFilter.addEventListener("click", function() {
//             console.log("le bouton est sélectionné.");
//             document.querySelector(".gallery").innerHTML = "";
//             fetchGallery();
//         })

//         for (i = 0; i < categories.length; i++){
//             const article = categories[i]

//         }
//         const btnFilterObject = document.querySelector("#btn-1");

//         btnFilterObject.addEventListener("click", function () {
//             console.log("Le bouton objet est sélectionné");
//         // const galleryObject = gallery.filter(function (gallery) {
//         //     return gallery.categoryId === 1;
//         // });
//         // document.querySelector(".gallery").innerHTML = "";
//         // generateGalleryGallery(galleryObject)
//     });
// }

// function filterGallery(categories) {
    
//     const btnNoFilter = document.querySelector("#btn-all");

//     btnNoFilter.addEventListener("click", function () {
//         document.querySelector(".gallery").innerHTML = "";
//         generateGallery(gallery)
//     });


//     const btnFilterObject = document.querySelector("#btn-obj");

//     btnFilterObject.addEventListener("click", function () {
//         const galleryObject = gallery.filter(function (gallery) {
//             return gallery.categoryId === 1;
//         });
//         document.querySelector(".gallery").innerHTML = "";
//         generateGallery(galleryObject)
//     });

//     const btnFilterAppartement = document.querySelector("#btn-app");

//     btnFilterAppartement.addEventListener("click", function () {
//         const galleryAppartement = gallery.filter(function (gallery) {
//             return gallery.categoryId === 2;
//         });
//         document.querySelector(".gallery").innerHTML = "";
//         generateGallery(galleryAppartement)
//     });

//     const btnFilterHotRes = document.querySelector("#btn-hot");

//     btnFilterHotRes.addEventListener("click", function () {
//         const galleryHotRes = gallery.filter(function (gallery) {
//             return gallery.categoryId === 3;
//         });
//         document.querySelector(".gallery").innerHTML = "";
//         generateGallery(galleryHotRes)
//     });
// }


initData();


