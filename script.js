let myLibrary = [];
let bookID = 1;
let user = '';
let dbRefObject 

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  //add in checkbox listener at bottom of page that calls this to change the .checked property
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function openForm() {
  document.getElementById("addBookForm").style.display = "block";
}

function closeForm() {
  document.getElementById("addBookForm").style.display = "none";
  clearForm();
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
  write();
  clearForm();
}

function clearForm() {
  const form = document.querySelector('#addForm');
  form.reset();
}

function displayLibrary() {
  const shelf = document.querySelector('#library');
  while (shelf.rows.length > 1) shelf.deleteRow(1);
  
  for (let i = 0; i < myLibrary.length; i++) {
    const newRow = shelf.insertRow(-1);
    
    const titleCell = newRow.insertCell(-1);
    const title = myLibrary[i].title;
    const titleText = document.createTextNode(`${title}`);
    titleCell.appendChild(titleText);
        
    const authorCell = newRow.insertCell(-1);
    const author = myLibrary[i].author;
    const authorText = document.createTextNode(`${author}`);
    authorCell.appendChild(authorText);
    
    const pagesCell = newRow.insertCell(-1);
    const pages = myLibrary[i].pages;
    const pagesText = document.createTextNode(`${pages}`);
    pagesCell.appendChild(pagesText);
    
    const readCell = newRow.insertCell(-1);
    const read = myLibrary[i].read;
    
    const readCheck = document.createElement('input');
    readCheck.type = "checkbox";
    readCheck.name = "read";
    readCheck.value = `${read}`;
    readCheck.checked = read;
    readCheck.id = "id";
    readCell.appendChild(readCheck);
  }
  
}

function getUser() {
  const username = document.querySelector('#username');
  user = username.value;
  dbRefObject = firebase.database().ref().child('library').child(`${user}`);
  dbRefObject.get().then((snapshot) => {
    if (snapshot.exists()) {
      myLibrary = [];
      for (let i = 0; i < snapshot.val().length; i++) {
        console.log(snapshot.val()[i]);
        myLibrary.push(snapshot.val()[i]);
      }
      displayLibrary();
    } else {
      alert("User not found");
    }
  }).catch((error) => {
    console.error(error);
  });
}

function write() {
  firebase.database().ref('library/' + user).set(
    myLibrary
  )
}



//change arrow function to call the displayLibrary stuff, etc.
//dbRefObject.on('value', snap => console.log(snap.val()));
// addBookToLibrary('The Hobbit', 'JRR Tolkien', 100, true);
// console.log(myLibrary);

const btn = document.querySelector('.username');
btn.addEventListener('click', () => {
  getUser();
});
