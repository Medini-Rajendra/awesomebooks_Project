// Helper function
const createNode = (type, nodeClass) => {
  const node = document.createElement(type);
  if (nodeClass) node.className = nodeClass;
  return node;
};

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class bookList {
  static showBooks() {
    const books = Save.getBooks();
    books.forEach((book) => bookList.addBook(book));
  }
  static addBook(book) {
    const list = document.getElementById('list');
    const entry = createNode('div', `book`);

    entry.innerHTML = `
    <p class="${book.title}" id="${book.author}"> ${book.title} - ${book.author} <a ref="" class="btn btn-danger btn-sm delete">X</a> </p>
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
}

class Save {
  static getBooks() {
    let books;
    if (localStorage.getItem('list') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('list'));
    }
    return books;
  }
  static addBook(book) {
    let books = Save.getBooks();
    let newBook = [book];
    books = books.concat(newBook);
    localStorage.setItem('list', JSON.stringify(books));
  }
  static removeBook(title, author) {
    let books = Save.getBooks();
    books = books.filter(
      (book) => book.title !== title && book.author !== author,
    );
    localStorage.setItem('list', JSON.stringify(books));
  }
}

// Show books
document.addEventListener('DOMContentLoaded', bookList.showBooks);

// Add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  //Validate
  if (title == '' || author == '') {
    alert('Please fill in all fields');
  } else {
    const book = new Book(title, author);
    bookList.addBook(book);
    Save.addBook(book);
    bookList.clearFields();
  }
});

// Remove Book
document.querySelector('#list').addEventListener('click', (e) => {
  bookList.deleteBook(e.target);
  Save.removeBook(e.target.parentElement.class, e.target.parentElement.id);
});
