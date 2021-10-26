import Save from './savelist.js';

class BookList {
    static createNode = (type, nodeClass) => {
      const node = document.createElement(type);
      if (nodeClass) node.className = nodeClass;
      return node;
    };

    static showBooks = () => {
      const books = Save.getBooks();
      books.forEach((book) => BookList.addBook(book));
    }

    static addBook = (book) => {
      const list = document.getElementById('list');
      const entry = BookList.createNode('div', 'book');

      entry.innerHTML = `
      <p class="${book.title}" id="${book.author}"> ${book.title} <br> ${book.author} <br><a ref="" class="btn btn-danger btn-sm delete">Remove</a> </p><hr>
      `;
      list.appendChild(entry);
    }

    static clearFields = () => {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
    }

    static deleteBook = (el) => {
      if (el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
}

module.exports = { BookList };