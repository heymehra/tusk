const URL = "https://crudcrud.com/api/2569ca039d074759bfa9af43226f328c/books";

let books = [];

async function addBook() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  if (title.trim() !== '' && description.trim() !== '') {
    try {
      const response = await axios.post(URL, { title, description });
      books.push(response.data);
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      displayBooks(); // Call displayBooks directly after adding a book
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }
}

function searchBooks() {
  const searchTitle = document.getElementById('search').value.toLowerCase();
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTitle));
  document.getElementById('searchCount').innerText = `Total Search Count: ${filteredBooks.length}`;
}

async function displayBooks() {
  try {
    const response = await axios.get(URL);
    books = response.data;
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach(book => {
      const listItem = document.createElement('li');
      const titleElem = document.createElement('h3');
      titleElem.innerText = book.title;
      const descriptionElem = document.createElement('p');
      descriptionElem.innerText = book.description;
      listItem.appendChild(titleElem);
      listItem.appendChild(descriptionElem);
      bookList.appendChild(listItem);
    });

    updateTotalCount();
  } catch (error) {
    console.error('Error displaying books:', error);
  }
}

async function deleteBook(bookId) {
  try {
    await axios.delete(`${URL}/${bookId}`);
    books = books.filter(book => book._id !== bookId);
    displayBooks(); // Call displayBooks after deleting a book
  } catch (error) {
    console.error('Error deleting book:', error);
  }
}

function updateTotalCount() {
  document.getElementById('totalCount').innerText = `Total Books: ${books.length}`;
}

// Set initial total book count
updateTotalCount();

// Event listeners
document.getElementById('addBook').addEventListener('click', addBook);
document.getElementById('search').addEventListener('input', searchBooks);

// Initial display of books
window.addEventListener('DOMContentLoaded', displayBooks);