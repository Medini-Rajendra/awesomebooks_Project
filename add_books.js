let booksList=[];

function createBook(title, author) {
    let addObject={title,author};
    booksList.push(addObject);
}

function removeBook(booksList,title,author) {
    booksList=booksList.filter(book=>book.title!==title && book.author!==author)
}
