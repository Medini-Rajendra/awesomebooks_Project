const listSection = document.getElementById('list-section');

// Helper functions
const getBook = () => {
  let result;
  if (localStorage.getItem('list') === null) {
    result = [];
  } else {
    result = JSON.parse(localStorage.getItem('list'));
  }
  return result;
};
let booksList = getBook();

const createBook = (title, author) => {
  const addObject = [{ title, author }];
  booksList = booksList.concat(addObject);
};

const deleteBook = (title, author) => {
  booksList = booksList.filter(
    (book) => book.title !== title && book.author !== author,
  );
};

const createNode = (type, nodeClass) => {
  const node = document.createElement(type);
  if (nodeClass) node.className = nodeClass;
  return node;
};

const showBooks = (array) => {
  const listDiv = createNode('div', 'list-div');
  listSection.appendChild(listDiv);
  array.forEach((book) => {
    const listEntry = createNode('div');
    listDiv.appendChild(listEntry);
    listEntry.id = `book-${array.indexOf(book)}`;
    const listItem = createNode('p', '');
    listEntry.appendChild(listItem);
    listItem.innerHTML = `${book.title} <br> ${book.author}`;
    const listButton = createNode('button', 'list-button');
    listEntry.appendChild(listButton);
    listButton.innerHTML = 'Remove';
    listButton.setAttribute('class', 'buttonsize');
    listButton.id = `button-${array.indexOf(book)}`;
    const bookIndex = `${array.indexOf(book)}`;
    listButton.setAttribute('onclick', `removeBook(${bookIndex})`);
    const listhr = createNode('hr');
    listEntry.appendChild(listhr);
  });
};

const addTitleAuthor = () => {
  const addTitle = document.getElementById('title').value;
  const addAuthor = document.getElementById('author').value;
  createBook(addTitle, addAuthor);
  const listContainer = document.querySelector('#list-section');
  const oldList = document.querySelector('.list-div');
  listContainer.removeChild(oldList);
  localStorage.setItem('list', JSON.stringify(booksList));
  showBooks(booksList);
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
};

const removeBook = (bookIndex) => {
  const findBook = document.querySelector(`#book-${bookIndex}`);
  deleteBook(booksList[bookIndex].title, booksList[bookIndex].author);
  findBook.remove();
  const listContainer = document.querySelector('#list-section');
  const oldList = document.querySelector('.list-div');
  listContainer.removeChild(oldList);
  localStorage.setItem('list', JSON.stringify(booksList));
  showBooks(booksList);
};
showBooks(booksList);
module.exports = {
  addTitleAuthor,
  removeBook,
  rules: {
    'linebreak-style': 0,
  },
};
