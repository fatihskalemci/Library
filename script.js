const myLibrary = [];

function Book(title, author, pages, haveRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;

  if (this.haveRead) {
    this.readStatus = "read";
  } else {
    this.readStatus = "not read yet";
  }

  this.info = function() {
      let info = `ID: ${this.id} | ${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
      return info
  }
}


function addBookToLibrary(title, author, pages, haveRead) {
  newBook = new Book(title, author, pages, haveRead);
  myLibrary.push(newBook);
}

function displayMyLibrary(books) {
  for (let book of books) {
    console.log(book.info());
  }
}




addBookToLibrary("deneme", "ben", 31, true)
addBookToLibrary("adasd", "sad", 61, false)
addBookToLibrary("asdfasd", "afasda", 2341, false)
addBookToLibrary("gsfa", "be34123n", 321, true)