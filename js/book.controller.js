'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    const elBookList = document.querySelector('.book-list')
    const strHtmls = getBooks().map(book =>
        `<tr>
                <td>${book.title}</td>
                <td>$${book.price}</td>
                <td>
                <button>read</button>
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