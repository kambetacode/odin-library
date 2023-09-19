const title = document.getElementById('title')
const author = document.getElementById('author')
const pages = document.getElementById('pages')
const submit = document.getElementById('submit')
const check = document.getElementById('check')
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

    for (let i = 0; i < myLibrary.length; i++) {
        let content = document.createElement('div')
        content.textContent = `${myLibrary[i].title}`

        check.appendChild(content)
    }
}


submit.addEventListener('click' , (e) => {
    e.preventDefault()

    let testBook = new Book(title.value , author.value , pages.value)

    addBookToLibrary(testBook)
} )