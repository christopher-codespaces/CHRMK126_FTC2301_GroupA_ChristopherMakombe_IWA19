import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

if (!books && !Array.isArray(books)) throw new Error('Source required')

// Theme Day/Night
// 'settingsTheme' refers to a DOM element that has a 'data-settings-theme' attribute.

const settingsTheme = document.querySelector('[data-settings-theme]');
// 'headerSettingsBtn' refers to a DOM element that has a 'data-header-settings' attribute.

const headerSettingsBtn = document.querySelector('[data-header-settings]');
// 'settingsCancelBtn' refers to a DOM element that has a 'data-settings-cancel' attribute.

const settingsCancelBtn = document.querySelector('[data-settings-cancel]');
// 'settingsForm' refers to a DOM element that has a 'data-settings-form' attribute.

const settingsForm = document.querySelector('[data-settings-form]');





//This a the book list view
// Select the DOM element that has the attribute 'data-list-items' and assign it to a variable named 'data_list_items'
const data_list_items = document.querySelector('[data-list-items]');

// Select the DOM element that has the attribute 'data-list-button' and assign it to a variable named 'data_list_button'
const data_list_button = document.querySelector('[data-list-button]');

// Select the DOM element that has the attribute 'data-list-message' and assign it to a variable named 'data_list_message'
const data_list_message = document.querySelector('[data-list-message]');

// Books Popup summary
// Select the DOM element that has the attribute 'data-list-active' and assign it to a variable named 'data_list_active'
const data_list_active = document.querySelector('[data-list-active]');

// Select the DOM element that has the attribute 'data-list-blur' and assign it to a variable named 'data_list_blur'
const data_list_blur = document.querySelector('[data-list-blur]');

// Select the DOM element that has the attribute 'data-list-image' and assign it to a variable named 'data_list_image'
const data_list_image = document.querySelector('[data-list-image]');

// Select the DOM element that has the attribute 'data-list-title' and assign it to a variable named 'data_list_title'
const data_list_title = document.querySelector('[data-list-title]');

// Select the DOM element that has the attribute 'data-list-subtitle' and assign it to a variable named 'data_list_subtitle'
const data_list_subtitle = document.querySelector('[data-list-subtitle]');

// Select the DOM element that has the attribute 'data-list-description' and assign it to a variable named 'data_list_description'
const data_list_description = document.querySelector('[data-list-description]');

// Select the DOM element that has the attribute 'data-list-close' and assign it to a variable named 'data_list_closeBtn'
const data_list_closeBtn = document.querySelector('[data-list-close]');





// Search Input that looks up for the books
// Select the DOM element that has the attribute 'data-header-search' and assign it to a variable named 'data_header_searchBtn'
const data_header_searchBtn = document.querySelector('[data-header-search]');

// Select the DOM element that has the attribute 'data-search-cancel' and assign it to a variable named 'data_search_cancelBtn'
const data_search_cancelBtn = document.querySelector('[data-search-cancel]');

// Select the DOM element that has the attribute 'data-search-genres' and assign it to a variable named 'data_search_genres'
const data_search_genres = document.querySelector('[data-search-genres]');

// Select the DOM element that has the attribute 'data-search-authors' and assign it to a variable named 'data_search_authors'
const data_search_authors = document.querySelector('[data-search-authors]');

// Select the DOM element that has the attribute 'data-search-form' and assign it to a variable named 'data_search_form'
const data_search_form = document.querySelector('[data-search-form]');





// Declare and initialize a boolean variable 'isOpen' with a value of 'false'
let isOpen = false;

// Declare and initialize an array variable 'matches' with a value of 'books'
let matches = books;

// Declare and initialize a number variable 'page' with a value of '1'
let page = 1;

// Declare two constant objects 'day' and 'night' with keys representing the color modes 'dark' and 'light', and values that are RGB values as strings.
const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
};
const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
};


// Event Handlers
// Toggle the settings overlay when the settings button is clicked
const toggleSettings = (event) => {
    // Toggle the value of 'isOpen' between true and false
    isOpen = !isOpen;

    // Get the backdrop and settings overlay elements
    const backdrop = document.querySelector('.backdrop');
    const settingsOverlay = document.querySelector('[data-settings-overlay]');

    // If the overlay is open, display the backdrop and settings overlay; otherwise, hide them
    if (isOpen) {
        backdrop.style.display = 'block';
        settingsOverlay.style.display = 'block';
    } else {
        backdrop.style.display = 'none';
        settingsOverlay.style.display = '';
    }
}

const handleSettingsFormSubmit = (event) => {
    event.preventDefault();

    // Get the selected theme from the settings form
    const selectedTheme = data_settings_theme.value;

    // Set the CSS variables for light and dark mode based on the selected theme
    const { dark, light } = selectedTheme === 'day' ? day : night;
    document.documentElement.style.setProperty('--color-dark', dark);
    document.documentElement.style.setProperty('--color-light', light);

    // Hide the backdrop and show the settings overlay
    const backdrop = document.querySelector('.backdrop');
    backdrop.style.display = 'none';
    document.querySelector('[data-settings-overlay]').style.display = '';
}
// Define a function called data_list_showHandler
const data_list_showHandler = () => {
    // Check if there are any matches in the 'matches' array
    if (matches.length > 0) {
        // If there are matches, enable the 'data_list_button'
        data_list_button.disabled = false;
        // Hide the 'data_list_message'
        data_list_message.classList.remove('list__message_show');
        // Clear the 'data_list_items' container
        data_list_items.innerHTML = '';
        // Append a new set of previews to the 'data_list_items' container
        data_list_items.appendChild(createPreviewsFragment(matches, BOOKS_PER_PAGE, page + 1));
        // Increment the 'page' counter
        page += 1;
        // Update the text of the 'data_list_button'
        data_list_button.innerHTML = /* html */ `
            <span>Show more</span>
            <span class="list__remaining"> (${matches.length - (BOOKS_PER_PAGE * page)})</span>
        `;
    } else {
        // If there are no matches, clear the 'data_list_items' container and show the 'data_list_message'
        data_list_items.innerHTML = '';
        data_list_message.classList.add('list__message_show');
        // Disable the 'data_list_button'
        data_list_button.disabled = true;
    }
};

// Defines a function called data_list_itemsHandler that takes an event object as its parameter
const data_list_itemsHandler = (event) => {

    // Gets the path of elements that triggered the event and turns it into an array
    const pathArray = Array.from(event.path || event.composedPath())

    // Declares two variables called bookId and bookObj
    let bookId
    let bookObj

    // Loops through the pathArray and sets the bookId variable to the dataset.id of the first element that has it
    for(let i = 0; i < pathArray.length; i++) {
        if(pathArray[i].dataset.id) {
            bookId = pathArray[i].dataset.id
            break
        }
    }

    // Loops through the matches array and sets the bookObj variable to the book object that matches the bookId
    for(let i = 0; i < matches.length; i++){
        if(matches[i].id === bookId) {
            bookObj = matches[i]
            break
        }
    }

    // Sets the open property of the data_list_active object to true
    data_list_active.open = true

    // Sets the src property of the data_list_blur and data_list_image elements to the bookObj image
    data_list_blur.src = bookObj.image
    data_list_image.src = bookObj.image

    // Sets the innerText property of the data_list_title and data_list_subtitle elements to the bookObj title and author name respectively
    data_list_title.innerText = bookObj.title
    data_list_subtitle.innerText = `${authors[bookObj.author]} (${new Date(bookObj.published).getFullYear()})`

    // Sets the innerText property of the data_list_description element to the bookObj description
    data_list_description.innerText = bookObj.description
}

// Define a function to handle search events
const data_searchHandler = (event) => {
    // Toggle the value of isOpen
    isOpen = !isOpen

    // If isOpen is true, show the search overlay and backdrop
    if(isOpen) {
        document.querySelector('.backdrop').style.display = 'block'
        document.querySelector('[data-search-overlay]').style.display = 'block'
    }
    // If isOpen is false, hide the search overlay and backdrop
    else {
        document.querySelector('.backdrop').style.display = 'none'
        document.querySelector('[data-search-overlay]').style.display = ''
    }
}

const data_searchSubmitHandler = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)

    // Find author and genre ids based on the user's search input
    const tempAuthorId = Object.keys(authors).find(key => authors[key] === filters.author)
    const tempGenreId = Object.keys(genres).find(key => genres[key] === filters.genre)

    // Filter matches array based on user's search criteria
    if (filters.title != '') {
        matches = matches.filter(book => book.title.toLowerCase().includes(filters.title.toLowerCase()))
    }
    if (filters.genre != 'any') {
        matches = matches.filter(book => book.genres.includes(tempGenreId))
    }
    if (filters.author != 'any') {
        matches = matches.filter(book => book.author == tempAuthorId)
    }

    // Update book list with filtered matches
    data_list_items.innerHTML = ''
    data_list_items.appendChild(createPreviewsFragment(matches, BOOKS_PER_PAGE, 1))

    // Hide "No books found" message and enable Load More button
    data_list_message.classList.remove('list__message_show')
    data_list_button.disabled = false
}


// A function that creates a preview element for a book object
const createPreview = (bookObj) => {
    // Extract properties from the book object
    const { author, image, title, id } = bookObj

    // Create a new div element for the preview
    const previewElement = document.createElement('div')
    previewElement.className = 'preview'
    previewElement.dataset.id = id

    // Set the HTML content of the preview element using a template literal
    previewElement.innerHTML = /* Html*/ `
        <div>
            <img class="preview__image" src="${image}" alt="book image">
        </div>
        <div class="preview__info">
            <div class="preview__title">${title}</div>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `

    // Return the preview element
    return previewElement
}

// This function takes an array of book objects, a number of books per page, and a page number
const createPreviewsFragment = (booksArray, booksPerPage, page) => {
    // Create an empty document fragment
    const fragment = document.createDocumentFragment()

    // Extract a subset of the books array based on the number of books per page and the current page number
    const extracted = booksArray.slice(0, booksPerPage * page)

    // Loop through the extracted books and create a preview element for each one
    for (let i = 0; i < extracted.length; i++) {
        const { author, image, title, id } = extracted[i]

        // Call a function that creates a preview element and pass in the book's author, image, title, and ID as arguments
        const preview = createPreview({ author, id, image, title })

        // Add the preview element to the document fragment
        fragment.appendChild(preview)
    }

    // Return the completed document fragment
    return fragment
}

// Add the document fragment returned by the createPreviewsFragment function to the data_list_items element on the page
data_list_items.appendChild(createPreviewsFragment(matches, BOOKS_PER_PAGE, page))


// Define a function called 'populateDropDown' that takes in three parameters:
// a drop-down element, a string representing the type of drop-down, and an object of data
const populateDropDown = (dropDownElement, dropDownType, dataObject) => {

    // Create a document fragment to hold the drop-down options
    const fragment = document.createDocumentFragment();

    // Create an initial option element with a value of 'any' and inner text of 'All [dropDownType]'
    const fragmentElement = document.createElement('option');
    fragmentElement.dataset.id = '';
    fragmentElement.value = 'any';
    fragmentElement.innerText = `All ${dropDownType}`;

    // Append the initial option element to the document fragment
    fragment.appendChild(fragmentElement);

    // Loop through each entry in the data object
    for (const [id, name] of Object.entries(dataObject)) {
        // Create an option element for the current data object entry
        const element = document.createElement('option');
        element.dataset.id = id;
        element.value = name;
        element.innerText = name;

        // Append the option element to the document fragment
        fragment.appendChild(element);
    }

    // Append the document fragment containing all the drop-down options to the drop-down element
    dropDownElement.appendChild(fragment);
};

// Call the 'populateDropDown' function twice, passing in the search author and search genre drop-down elements, along with the respective authors and genres data objects
populateDropDown(data_search_authors, 'Authors', authors);
populateDropDown(data_search_genres, 'Genres', genres);


// Disable "Show more" button if no more books to show
data_list_button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

// Set the text for "Show more" button with the remaining number of books
data_list_button.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>
`
// Event listener for search button in the header
data_header_searchBtn.addEventListener('click', data_searchHandler)

// Event listener for search cancel button
data_search_cancelBtn.addEventListener('click', data_searchHandler)

// Event listener for search form submission
data_search_form.addEventListener('submit', data_searchSubmitHandler)

// Event listener for "Show more" button
data_list_button.addEventListener('click',data_list_showHandler)

// Event listener for clicking on a book item in the list
data_list_items.addEventListener('click', data_list_itemsHandler)

// Event listener for closing the active book item
data_list_closeBtn.addEventListener('click', () => data_list_active.open = false )

// Event listener for submitting the settings form
dataSettings.addEventListener('submit', data_settingsFormHandler)

// Event listener for clicking on the settings button in the header
data_header_settingsBtn.addEventListener('click', data_settingsHandler)

// Event listener for settings cancel button
data_settings_cancelBtn.addEventListener('click', data_settingsHandler)

// These event listeners handle user interactions with the Book Connect app.