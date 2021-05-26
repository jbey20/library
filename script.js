let myLibrary = [];
let bookID = 1;

function Book(bookID, title, author, pages, read) {
  this.bookID = bookID;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  // this.info = () => {
  //   return `${title} by ${author}, ${pages} pages, ${read ? 'not read yet' : 'read'}`
  // }
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(bookID, title, author, pages, read);
  bookID++;
  myLibrary.push(book);
}

function openForm() {
  document.getElementById("addBookForm").style.display = "block";
}

function closeForm() {
  document.getElementById("addBookForm").style.display = "none";
}

function submitForm() {
  const title = document.querySelector('#title').value;
  console.log(title);
  const author = document.querySelector('#author').value;
  console.log(author);
  const pages = document.querySelector('#pages').value;
  console.log(pages);
  const read = document.querySelector('#read').checked;
  console.log(read);
  addBookToLibrary(title, author, pages, read);
  displayLibrary();
}

function displayLibrary() {
  const shelf = document.querySelector('#library');
  let newRow = shelf.insertRow(-1);
  for (let i = 0; i < myLibrary.length; i++) {
    const newRow = shelf.insertRow(-1);
    Object.values(myLibrary[i]).forEach(val => {
      const newCell = newRow.insertCell(-1)
      const newText = document.createTextNode(`${val}`);
      newCell.appendChild(newText);
    })
  }
  
}

addBookToLibrary('The Hobbit', 'JRR Tolkien', 295, false);
addBookToLibrary('Deep Work', 'Cal Newport', 300, true);
displayLibrary();