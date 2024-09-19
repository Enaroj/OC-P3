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

function initUI(gallery, categories){
    // call the function generateGallery
    generateGallery(gallery);

    // call the function to create filter buttons and generate a filtered gallery
    createFilterButton(categories, gallery);

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

// Dynamic creation of the filter buttons
function createFilterButton(categories, gallery) {

    // Get the DOM element where to put the buttons
    const sectionFilters = document.querySelector(".filters");
    sectionFilters.innerHTML = "";

    // Create a button with no filter
    const btnNoFilter = document.createElement("button");
    btnNoFilter.className = "btn-focus";
    btnNoFilter.id = "btn-all";
    btnNoFilter.innerText = "Tous";
    sectionFilters.appendChild(btnNoFilter);

    btnNoFilter.addEventListener("click", function() {
        document.querySelector(".gallery").innerHTML = "";
        generateGallery(gallery);

        updateButton(btnNoFilter)
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
        setupButtonListener(buttonElement, article.id, gallery)
        // Create the element in the DOM
        sectionFilters.appendChild(buttonElement);
        }
}


function updateButton(button){
    const divFilter = document.querySelector(".filters");
    const buttons = divFilter.querySelectorAll("button");
    buttons.forEach(salade => {
        console.log(salade);
        salade.className = "btn";
        button.className = "btn-focus"
    });
}

// Listen to the filter buttons being clicked in order to filter the gallery displayed
function setupButtonListener (button, category, gallery){
    button.addEventListener("click", function() {
        document.querySelector(".gallery").innerHTML = "";

        updateButton(button)

        const galleryObject = gallery.filter(function (gallery) {
            return gallery.categoryId === category;
        });
        generateGallery(galleryObject)
    })
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

function checkLogin(){
    if (getToken() != null){
        console.log(getToken())
        document.querySelector(".edition-mode").style.display = "";
        document.querySelector(".js-modal").style.display = "";
        document.querySelector(".filters").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "";
        
        logOut();
    }
}

function logOut(){
    const logOutButton = document.getElementById("logout");
    logOutButton.addEventListener("click", function(){
        window.localStorage.removeItem("token");
        document.getElementById("login").style.display = "";
        document.getElementById("logout").style.display = "none";
        document.querySelector(".edition-mode").style.display = "none";
        document.querySelector(".js-modal").style.display = "none";
        document.querySelector(".filters").style.display = "";
    })
}

checkLogin();
initData();




