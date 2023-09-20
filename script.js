const newBookBtn = document.getElementById('new-book-btn')
const newBtnDiv = document.getElementById('button-div')
const form = document.getElementById('form')
const title = document.getElementById('title')
const author = document.getElementById('author')
const pages = document.getElementById('pages')
const submit = document.getElementById('submit')
const bookContainer = document.getElementById('book-card-container')
const myLibrary = [];


function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${title} by ${author}, ${pages}, ${read}`
    }
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook)
    bookContainer.innerHTML = ''

    for (let i = 0; i < myLibrary.length; i++) {
        let content = document.createElement('div')
        content.innerHTML = `
        <p>${myLibrary[i].title}</p>
        <p>${myLibrary[i].author}</p>
        <p>${myLibrary[i].pages}</p>
        `
        content.className = 'book-card'

        bookContainer.appendChild(content)
    }
}


submit.addEventListener('click' , (e) => {
    e.preventDefault()

    let testBook = new Book(title.value , author.value , pages.value)

    form.style.display = 'none'
    newBtnDiv.style.display = 'flex'


    addBookToLibrary(testBook)
} )

newBookBtn.addEventListener('click', (e) => {
    form.style.display = 'flex'
    newBtnDiv.style.display = 'none'
})

