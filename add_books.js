// Helper function
// Show books
import BookList from './booklist.js';
import Book from './book.js';
import Save from './savelist.js';

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
    const book = new Book(title, author);
    BookList.addBook(book);
    Save.addBook(book);
    BookList.clearFields();
  }
});

// Remove Book
document.querySelector('#list').addEventListener('click', (e) => {
  BookList.deleteBook(e.target);
  Save.removeBook(e.target.parentElement.class, e.target.parentElement.id);
});
