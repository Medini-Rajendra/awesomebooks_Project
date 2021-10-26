class Save {
    static getBooks = () => {
      let books;
      if (localStorage.getItem('list') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('list'));
      }
      return books;
    }

    static addBook = (book) => {
      let books = Save.getBooks();
      const newBook = [book];
      books = books.concat(newBook);
      localStorage.setItem('list', JSON.stringify(books));
    }

    static removeBook = (title, author) => {
      let books = Save.getBooks();
      books = books.filter(
        (book) => book.title !== title && book.author !== author,
      );
      localStorage.setItem('list', JSON.stringify(books));
    }
}

module.exports = { Save };