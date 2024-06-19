'use strict'

var gIdx = 103

var gBooks = [
    { id: 'bk101', title: 'The Great Gatsby', price: 15, imgUrl: 'great-gatsby.jpg' },
    { id: 'bk102', title: '1984', price: 12, imgUrl: '1984.jpg' },
    { id: 'bk103', title: 'To Kill a Mockingbird', price: 18, imgUrl: 'to-kill-a-mockingbird.jpg' }
]

function getBooks() {
    return gBooks
}


function getBookIdById(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    return idx
}

function getBookById(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    return book
}

function removeBook(bookId) {
    // const idx = gBooks.findIndex(book => book.id === bookId)
    var idx = getBookIdById(bookId)
    gBooks.splice(idx, 1)
}

function updateBook(price, bookId) {
    // const idx = gBooks.findIndex(book => book.id === bookId)
    var idx = getBookIdById(bookId)
    gBooks[idx].price = price
}

function addBook(price, bookTitle) {
    gIdx++
    gBooks.push(
        {
            id: `bk${gIdx}`,
            title: bookTitle,
            price,
            imgUrl: `${bookTitle}.jpg`
        }
    )
}

function showBookDetails(bookId) {
    var book = getBookById(bookId)
    return book
}