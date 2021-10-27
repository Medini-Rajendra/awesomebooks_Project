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

  static showBooks = () => {
    const books = BookList.getBooks();
    books.forEach((book) => BookList.addBook(book, books.indexOf(book)));
  };

  static addBook = (book, id) => {
    const list = document.getElementById('list');
    const entry = BookList.createNode('div', 'book');
    entry.innerHTML = `
    <p class="w-100 d-flex justify-content-between p-2 m-0" id="${book.id}"> ${book.title} by ${book.author} <a ref="" class="btn btn-danger btn-sm delete">Remove</a> </p>
    `;
    list.appendChild(entry);
  };

  static clearFields = () => {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  };

  static deleteBook = (el) => {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  };

  static getBooks = () => JSON.parse(localStorage.getItem('list')) || [];

  static saveBook = (book) => {
    let books = BookList.getBooks();
    const newBook = [book];
    books = books.concat(newBook);
    localStorage.setItem('list', JSON.stringify(books));
  };

  static removeBook = (id) => {
    let books = BookList.getBooks();
    books = books.filter((book) => book.id !== id);
    localStorage.setItem('list', JSON.stringify(books));
  };
}

document.addEventListener('DOMContentLoaded', BookList.showBooks);

// Add Book

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // Validate
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
  BookList.removeBook(e.target.parentElement.id);
});
