const body = document.querySelector('body')
const newBookBtn = document.getElementById('new-book-btn')
const newBtnDiv = document.getElementById('button-div')
const form = document.getElementById('form')
const title = document.getElementById('title')
const author = document.getElementById('author')
const pages = document.getElementById('pages')
const inputs = document.querySelectorAll('input')
const submit = document.getElementById('submit')
const bookContainer = document.getElementById('book-card-container')
const modal = document.getElementById('modal')
const overlay = document.querySelector('.overlay')
const readToggle = document.getElementById('read-toggle')
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
        ${readTest(myLibrary[i].read)}
        <button class="remove-button" id="remove">Remove</button>
        `

        content.setAttribute('data-index', `${i}`)
        content.className = 'book-card'

        bookContainer.appendChild(content)
    }
}

function handleRemove() {
    const remove = document.querySelectorAll('#remove')
    
    remove.forEach(item => {
        item.addEventListener('click', (e) => {
            let removeParent = item.parentNode
            removeParent.remove()
            myLibrary.splice(removeParent.dataset.index, '1')
        })
    })
}

function handleRead() {
    const readButton = document.querySelectorAll('#read')
    
    readButton.forEach(item => {

        item.addEventListener('click', (e) => {
            let readParent = item.parentNode
            console.log(e.target)
        })
    })
}

function readTest(readStatus) {
    if( readStatus === true) {
        return '<button class="read-button green" id="read">Read</button>'
    } else {
        return '<button class="read-button red" id="read">Not read</button>'
    }
}

submit.addEventListener('click' , (e) => {
    e.preventDefault()

    let testBook = new Book(title.value , author.value , pages.value, readToggle.checked)
    modal.classList.remove('active')
    bookContainer.style.display = 'grid'
    overlay.style.display = 'none'
    inputs.forEach(item => {
        item.value = ''
    })

    addBookToLibrary(testBook)
    handleRead()
    handleRemove()
} )

newBookBtn.addEventListener('click', (e) => {
    modal.classList.add('active')
    overlay.style.display = 'block'
    form.style.backgroundColor = '#F0EEF1'
    
})

body.addEventListener('click', (e) => {
    if(e.target.className != "form") {
        modal.classList.remove('active')
        overlay.style.display = 'none'
    }
})