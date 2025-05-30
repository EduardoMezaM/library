const display = document.querySelector('.display');
const addBook = document.querySelector('.addBook');

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function(){
    const info = `${this.title} by ${this.author} has ${this.pages} pages. ${read? 'Already read.': "Haven't read yet."}`;
    return info;
  }
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

addBookToLibrary('hello', 'me', 12, true);
addBookToLibrary('there', 'you', 5, false);

function displayBook() {
    display.innerHTML = "";

    myLibrary.forEach(book => {
        const div = document.createElement('div');
        div.innerHTML = `
        <ul>
            <li>Title: ${book.title}</li>
            <li>Author: ${book.author}</li>
            <li>Number of pages: ${book.pages}</li>
            <li>Read: ${book.read? 'Yes': 'No'}</li>
        </ul>
        <p>Description: ${book.info()}</p>
        `;
        display.appendChild(div);
    });
}

displayBook();