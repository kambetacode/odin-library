class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = 0,
        isRead = false
    ) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

class Library { 
    constructor() {
        this.books = []
    }

    addBook(newBook) {
        this.books.push(newBook)
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }

    getTitle(title) {
        return this.books.find(book => book.title === title)
    }

    isInLibrary(title) {
        return this.books.some(book => book.title === title)
    }
}

const library = new Library()

// Interface

const addBookBtn = document.getElementById('add-book-btn')
const addBookModal = document.getElementById('add-book-modal')
const overlay = document.getElementById('overlay')
const addBookForm = document.getElementById('add-book-form')
const bookCardContainer = document.getElementById('book-card-container')

//

// Handling book input modal

const openAddBookModal = () => {
    addBookModal.classList.add('active')
    overlay.classList.add('active')
}

const closeAddBookModal = () => {
    addBookForm.reset()
    addBookModal.classList.remove('active')
    overlay.classList.remove('active')
}

//

// Handling input data 

const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('is-read').checked

    return new Book(title, author, pages, isRead)
}

const addNewBook = (e) => {
    e.preventDefault()
    const newBook = getBookFromInput()
    if(library.isInLibrary(newBook.title)) {
        alert('This book already exists')
    } else {
        library.addBook(newBook)
        updateBookContainer()
        closeAddBookModal()
    }
}

//

// Handling book cards

const createBookCard = (book) => {
    const bookCard = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const btnContainer = document.createElement('div')
    const readBtn = document.createElement('button')
    const removeBtn = document.createElement('button')

    bookCard.classList.add('book-card')
    btnContainer.classList.add('button-group')
    readBtn.classList.add('btn')
    removeBtn.classList.add('btn')
    readBtn.onclick = toggleRead
    removeBtn.onclick = removeBook

    title.textContent = `${book.title}`
    author.textContent = `${book.author}`
    pages.textContent = `${book.pages}`
    removeBtn.textContent = 'Remove'

    if(book.isRead) {
        readBtn.textContent = 'Read'
        readBtn.classList.add('btn-light-green')
    } else {
        readBtn.textContent = 'Not read'
        readBtn.classList.add('btn-light-red')
    }

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    btnContainer.appendChild(readBtn)
    btnContainer.appendChild(removeBtn)
    bookCard.appendChild(btnContainer)
    bookCardContainer.appendChild(bookCard)
}

const removeBook = (e) => {
    const title =  e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        '')

    library.removeBook(title)
    updateBookContainer()
}

const toggleRead = (e) => {
    const title =  e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        '')
    const book = library.getTitle(title)
    book.isRead = !book.isRead
    updateBookContainer()
}

const resetBookContainer = () => {
    bookCardContainer.innerHTML = ''
}

const updateBookContainer = () => {
    resetBookContainer()
    for(let book of library.books) {
        createBookCard(book)
    }
}

//


// Event listeners

addBookForm.onsubmit = addNewBook
addBookBtn.onclick = openAddBookModal
overlay.onclick = closeAddBookModal

//