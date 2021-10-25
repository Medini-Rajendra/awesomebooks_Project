let booksList = [];
const listSection = document.getElementById('list-section');

function addTitleAuthor() {
    const addTitle=document.getElementById('title').value;
    const addAuthor=document.getElementById('author').value;
    createBook(addTitle,addAuthor);
    const listContainer = document.querySelector('#list-section');
    const oldList = document.querySelector('.list-div');
    listContainer.removeChild(oldList);
    showBooks(booksList);
}

// Helper functions
function createBook(title, author) {
  let addObject = { title, author };
  booksList.push(addObject);
}

function deleteBook(title, author) {
  booksList = booksList.filter(
    (book) => book.title !== title && book.author !== author,
  );
}

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
    let bookIndex = `${array.indexOf(book)}`;
    console.log(bookIndex);
    listButton.setAttribute('onclick', `removeBook(${bookIndex})`);
    const listhr = createNode('hr');
    listEntry.appendChild(listhr);
  });
};

const removeBook = (bookIndex) => {
  const findBook = document.querySelector(`#book-${bookIndex}`);
  deleteBook(booksList[bookIndex].title, booksList[bookIndex].author);
  findBook.remove();
  const listContainer = document.querySelector('#list-section');
  const oldList = document.querySelector('.list-div');
  listContainer.removeChild(oldList);
  console.log(booksList);
  showBooks(booksList);
};

createBook('abc', 'def');
createBook('123', '456');
showBooks(booksList);
