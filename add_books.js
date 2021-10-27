class BookList {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = BookList.uniqueId();
    console.log(this.id);
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
    books.forEach((book) => BookList.addBook(book));
  };

  static addBook = (book) => {
    const list = document.getElementById('list');
    const entry = BookList.createNode('div', 'book');

    entry.innerHTML = `
    <p class="" id="${book.id}"> ${book.title} <br> ${book.author} <br><a ref="" class="btn btn-danger btn-sm delete">Remove</a> </p><hr>
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
    const isbn = Math.random().toString();
    const book = new BookList(title, author, isbn);
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
