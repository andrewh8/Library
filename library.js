
// library array for holding book objects
let myLibrary = [];


// constructor function for creating objects with book information
function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function(){
        return `${title} by ${author},${pages} pages, ${read}`
    }
}


// function for passing user input into the object constructor and then adding to the library array
function addBookToLibrary(title, author, pages, read){
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}


// function for displaying myLibrary
const bookList = document.querySelector('#bookList');
function displayBooks(){
    let bookData = '';
    for (let book of myLibrary){
        bookData += 
        `<tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><button data-read=${book.title} class='readStatus'>${book.read}</button></td>
            <td><button data-delete=${book.title} class='deleteButton'>Delete</button></td>
        </tr>`;
    }
    bookList.innerHTML = bookData;
}


// change read status
bookList.addEventListener('click', onReadStatus);
function onReadStatus(e){
    // identify the button that was clicked
    if (!e.target.classList.contains('readStatus')){
        return;
    }
    // iterate through myLibrary and change the read status of the index with the readStatus data attribute
    for (let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].title === e.target.dataset.read){
            if (myLibrary[i].read === "Read"){
                myLibrary[i].read = "Not Read";
            } else if (myLibrary[i].read === "Not Read"){
                myLibrary[i].read = "Read";
            }
        }
    }
    // re-display the library into the table
    displayBooks();
}

// remove book from myLibrary
bookList.addEventListener('click', onDeleteRow);
function onDeleteRow(e){
    // identity the button that was clicked
    if (!e.target.classList.contains('deleteButton')){
        return;
    }
    // iterate through each index of the myLibrary array and remove the index with the delete button's data attribute
    for (let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].title === e.target.dataset.delete){
            myLibrary.splice(i, 1);
        }
    }
    // re-display the library into the table
    displayBooks();
}


// open form when Add Book button is clicked
const addBook = document.querySelector('.addBook');
addBook.addEventListener('click', () => {
    document.querySelector('.popUpBackground').style.display = 'flex'});


// close form when user presses the close button
const closeForm = document.querySelector('.close');
closeForm.addEventListener('click', () => {
    document.querySelector('.popUpBackground').style.display = 'none';
})


// submit form when user presses submit, add book info to library, display library in table, and close form
const form = document.querySelector('form');
form.addEventListener('submit', submitBook);
function submitBook(e){
    e.preventDefault();
    // collect user input and display results
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;   
    const read = document.querySelector('#read').value;     
    addBookToLibrary(title, author, pages, read);
    displayBooks();
    
    // remove the form and refresh the form entries
    document.querySelector('.popUpBackground').style.display = 'none';
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#read').value = "";
}