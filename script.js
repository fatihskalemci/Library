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

Book.prototype.toggleRead = function(btn) {
  if (this.haveRead) {
    this.haveRead = false;
    btn.innerText = "Not Read";
    this.readStatus = "not read yet";
  } else {
    this.haveRead = true;
    btn.innerText = "Read";
    this.readStatus = "read";
  }
  
}


function addBookToLibrary(title, author, pages, haveRead) {
  let newBook = new Book(title, author, pages, haveRead);
  myLibrary.push(newBook);
  return newBook;
}

function addBookToTable(book, table) {
  let row = table.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);

  
  let readButton = document.createElement("BUTTON");

  cell1.innerHTML = book.title;
  cell2.innerHTML = book.author;
  cell3.innerHTML = book.pages;
  if (book.haveRead) {
    readButton.innerText = "Read"
  } else {
    readButton.innerText = "Not Read"
  }
  readButton.className = "read-button"
  readButton.dataset.id = book.id;
  cell4.append(readButton);

  let deleteButton = document.createElement("BUTTON");
  deleteButton.innerText = "X"
  deleteButton.className = "delete-button"
  deleteButton.dataset.id = book.id;
  
  cell5.append(deleteButton);
  
}


function displayMyLibrary(books, table) {
  for (let book of books) {
    addBookToTable(book, table);
  }
}

addBookToLibrary("1984", "George Orwell", 328 , true)
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 96, false)
addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", 671, false)
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true)



const submitButton = document.getElementById("book-submit");
const formDialog = document.getElementById("book-form-dialog");
const table = document.getElementById("books-table");

displayMyLibrary(myLibrary, table);

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const bookName = document.getElementById("book-name");
  const bookAuthor = document.getElementById("book-author");
  const bookPage = document.getElementById("book-page");
  const bookRead = document.getElementById("book-read");
  const addedBook = addBookToLibrary(bookName.value, bookAuthor.value, bookPage.value, bookRead.checked)
  addBookToTable(addedBook, table);

  document.getElementById("book-form").reset();
  formDialog.close();
})

const deleteButtons = document.querySelectorAll(".delete-button")

for (let btn of deleteButtons) {
  btn.addEventListener ("click", (e) => {
    index = myLibrary.findIndex(x => x.id === btn.dataset.id);
    myLibrary.splice(index,1);
    table.deleteRow(btn.parentNode.parentNode.rowIndex);
  })
}

const readButtons = document.querySelectorAll(".read-button")

for (let btn of readButtons) {
  btn.addEventListener ("click", (e) => {
    index = myLibrary.findIndex(x => x.id === btn.dataset.id);
    myLibrary[index].toggleRead(btn);
  })
}
