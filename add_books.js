let booksList = [];
const listSection = document.getElementById('list-section');

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
  const listUl = createNode('ul', 'list-ul list-group');
  listSection.appendChild(listUl);
  array.forEach((book) => {
    const listItem = createNode('li', 'list-group-item');
    listUl.appendChild(listItem);
    listItem.innerHTML = `${book.title} - ${book.author}`;
  });
};

createBook('abc', 'def');
createBook('123', '456');
showBooks(booksList);