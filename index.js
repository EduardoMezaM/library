const display = document.querySelector('.display');
const addBook = document.querySelector('.addBook');

const myLibrary = [];

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

function displayBooks() {
    display.innerHTML = "";

    myLibrary.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('book-card');
        div.setAttribute('data-id', book.id);
        div.innerHTML = `
        <span class="delete">🗙</span>
        <ul>
            <li>Title: ${book.title}</li>
            <li>Author: ${book.author}</li>
            <li>Number of pages: ${book.pages}</li>
            <li class="read">Read: ${book.read? 'Yes': 'No'}</li>
            <li>ID: ${book.id}</li>
        </ul>
        <button class="read-status">Read? Yes/No</button>
        `;

        div.querySelector('.delete').addEventListener('click', () => {
            const bookId = div.getAttribute('data-id');
            removeBook(bookId);
        });

        const readDisplay = div.querySelector('.read');
        div.querySelector('.read-status').addEventListener("click", () => {
            book.toggleRead()
            readDisplay.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
        });

        display.appendChild(div);
    });
}

document.querySelector(".form").addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    displayBooks();

    e.target.reset();
});