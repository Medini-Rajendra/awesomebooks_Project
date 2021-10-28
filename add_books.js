'use strict';

function getContent(fragmentId) {
  // Assign the visibility for each dynamic element of the page
  let pages = {
    booklist: ['d-flex flex-column container mt-4 p-0', 'd-none', 'd-none'],
    add: ['d-none', 'd-flex', 'd-none'],
    contact: ['d-none', 'd-none', 'd-flex'],
  };
  // look up what fragment you are searching for in the object
  return pages[fragmentId];
}
// Matches each section of the site with the respective visibility status (show/hide)
function loadContent() {
  const listSection = document.getElementById('list'),
    addSection = document.getElementById('add'),
    contactSection = document.getElementById('contact'),
    fragmentId = location.hash.substr(1);
  const sectionArray = [listSection, addSection, contactSection];
  for (let i = 0; i < 3; i += 1) {
    sectionArray[i].setAttribute('class', getContent(fragmentId)[i]);
  }
}
// Changes default homepage to use hashes as would happen when clicking the booklist nav item
if (!location.hash) {
  location.hash = '#booklist';
}
loadContent();
// Checks the current location through the hash
window.addEventListener('hashchange', loadContent);

// Start of the booklist application

class BookList {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = BookList.uniqueId();
  }
  static uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };
  static createNode = (type, nodeClass) => {
    const node = document.createElement(type);
    if (nodeClass) node.className = nodeClass;
    return node;
  };
  static showBooks() {
    const title = BookList.createNode('h1', 'py-2 text-center');
    title.innerHTML = 'All Awesome Books';
    list.appendChild(title);
    const books = BookList.getBooks();
    books.forEach((book) => BookList.addBook(book));
  }
  static addBook(book) {
    const list = document.getElementById('list');
    const entry = BookList.createNode('div', `book`);
    entry.innerHTML = `
    <p class="w-100 d-flex justify-content-between p-2 m-0" id="${book.id}"> ${book.title} by ${book.author} <a ref="" class="btn btn-danger btn-sm delete">Remove</a> </p>
    `;
    list.appendChild(entry);
  }
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
  static getBooks = () => {
    return JSON.parse(localStorage.getItem('list')) || [];
  };
  static saveBook = (book) => {
    let books = BookList.getBooks();
    let newBook = [book];
    books = books.concat(newBook);
    localStorage.setItem('list', JSON.stringify(books));
  };
  static removeBook(title, author) {
    let books = BookList.getBooks();
    books = books.filter(
      (book) => book.title !== title && book.author !== author,
    );
    localStorage.setItem('list', JSON.stringify(books));
  }
}

// Show books
document.addEventListener('DOMContentLoaded', BookList.showBooks);

// Add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  //Validate
  if (title === '' || author === '') {
    alert('Please fill in all fields');
  } else {
    const book = new BookList(title, author);
    BookList.addBook(book);
    BookList.saveBook(book);
    BookList.clearFields();
  }
});

// Remove Book
document.querySelector('#list').addEventListener('click', (e) => {
  BookList.deleteBook(e.target);
  BookList.removeBook(e.target.parentElement.class, e.target.parentElement.id);
});
