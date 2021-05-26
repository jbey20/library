let myLibrary = [];
let bookID = 1;
let user = '';
let dbRefObject 

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  // this.info = () => {
  //   return `${title} by ${author}, ${pages} pages, ${read ? 'not read yet' : 'read'}`
  // }
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
  console.log(`from display library: ${myLibrary}`);
  const shelf = document.querySelector('#library');
  let newRow = shelf.insertRow(-1);
  
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
    const readText = document.createTextNode(`${read}`);
    readCell.appendChild(readText);

    // Object.values(myLibrary[i]).forEach(val => {
    //   console.log(val);
    //   const newCell = newRow.insertCell(-1)
    //   const newText = document.createTextNode(`${val}`);
    //   newCell.appendChild(newText);
    // })
  }
  
}

function getUser() {
  const username = document.querySelector('#username');
  user = username.value;
  console.log(user);
  dbRefObject = firebase.database().ref().child('library').child(`${user}`);
  dbRefObject.get().then((snapshot) => {
    if (snapshot.exists()) {
      myLibrary = [];
      for (let i = 1; i < snapshot.val().length; i++) {
        console.log(snapshot.val()[i]);
        myLibrary.push(snapshot.val()[i]);
      }
      console.log(myLibrary);
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  console.log(myLibrary);
  displayLibrary();
}

function write() {

}



//change arrow function to call the displayLibrary stuff, etc.
//dbRefObject.on('value', snap => console.log(snap.val()));
// addBookToLibrary('The Hobbit', 'JRR Tolkien', 100, true);
// console.log(myLibrary);

const btn = document.querySelector('.username');
btn.addEventListener('click', () => {
  console.log('got here');
  getUser();
});
