'use strict'

const gQueryOptions = {
    filterBy: { txt: '', filterBy: '' }
}

function onInit() {
    renderBooks()
}

function renderBooks() {
    const elBookList = document.querySelector('.book-list')
    const strHtmls = getBooks(gQueryOptions).map(book =>
        `<tr>
                <td>${book.title}</td>
                <td>$${book.price}</td>
                <td>
                <button onclick="onShowBookDetails(event, '${book.id}')" class="button-read">read</button>
                <button onclick="onUpdateBook('${book.id}')">update</button>
                <button onclick="onRemoveBook('${book.id}')">delete</button>
                </td>
            </tr>`
    )
    elBookList.innerHTML = strHtmls.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId) {
    var suggestedPrice = +prompt('Please suggest a new Price')

    if (isNaN(suggestedPrice) || suggestedPrice <= 0) {
        alert('Invalid price. Please enter a valid price over $0.')
        return
    }
    updateBook(suggestedPrice, bookId)
    renderBooks()
}

function onAddBook() {
    var price = +prompt('Suggest a price')
    var bookTitle = prompt('Suggest a new book title')

    if (isNaN(price) || price <= 0) {
        alert('Invalid price. Please enter a valid price over $0.')
        return
    }
    addBook(price, bookTitle)
    renderBooks()
}

function onShowBookDetails(ev, bookId) {
    ev.stopPropagation()
    const elBookDetails = document.querySelector('.book-details')
    const elPre = elBookDetails.querySelector('.book-details pre')
    const book = showBookDetails(bookId)

    elPre.innerText = JSON.stringify(book, null, 2)
    elBookDetails.showModal()
}

function onSetFilterBy(elFilter) {
    if (elFilter.txt !== undefined) {
        gQueryOptions.filterBy.txt = elFilter.txt
    } else if (elFilter.value !== undefined) {
        gQueryOptions.filterBy.filterBy = elFilter.value
    }
    renderBooks()
}

function resetFilter() {
    const elResetButton = document.getElementById('filter-txt')

    gQueryOptions.filterBy.txt = ''
    elResetButton.value = ''

    renderBooks()
}

function onSuccessMessage(message) {
    const elMessage = document.querySelector('.success-message')
    elMessage.innerText = message

    elMessage.classList.add('show')

    setTimeout(() => {
        elMessage.classList.remove('show')
        setTimeout(() => {
            elMessage.innerText = ''
        }, 500);
    }, 2000)
}