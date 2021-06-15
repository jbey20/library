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
  this.read = !this.read;
  write();
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
    readCheck.setAttribute('data-index', i);
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
        myLibrary.push(readFromFirebase(snapshot.val()[i]));
      }
      displayLibrary();
      addCheckboxListeners();
    } else {
      alert("User not found");
    }
  }).catch((error) => {
    console.error(error);
  });
}

function readFromFirebase (Object) {
  const title = Object.title;
  const author = Object.author;
  const pages = Object.pages;
  const read = Object.read;
  return new Book(title, author, pages, read);
}

function write() {
  firebase.database().ref('library/' + user).set(
    myLibrary
  )
}

function addCheckboxListeners() {
  const checkboxes = document.querySelectorAll('input[type=checkbox][name=read]');
  console.log(checkboxes);
  checkboxes.forEach( checkbox => {
    checkbox.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      console.log(index);
      myLibrary[index].toggleRead();
      console.log(myLibrary[index]);
    })
  })
}



const btn = document.querySelector('#signin');
btn.addEventListener('submit', () => {
  getUser();
});


