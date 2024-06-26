'use strict'

var gIdx = 103

const STORAGE_KEY = 'bookDB'

var gBooks = _createBooks()


function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (books && books.length) return books

    books = [
        { id: 'bk101', title: 'The Great Gatsby', price: 15, imgUrl: 'great-gatsby.jpg' },
        { id: 'bk102', title: '1984', price: 24, imgUrl: '1984.jpg' },
        { id: 'bk103', title: 'To Kill a Mockingbird', price: 18, imgUrl: 'to-kill-a-mockingbird.jpg' }
    ]
    saveToStorage(STORAGE_KEY, books)
    return books
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function getBooks(options = {}) {
    if (!options) return gBooks

    var books = gBooks

    if (options.filterBy.txt) {
        books = gBooks.filter(book => book.title.toLowerCase().includes(options.filterBy.txt.toLowerCase()))
        console.log(books)
    }


    if (options.filterBy.filterBy === 'Over 20') {
        return books.filter(book => book.price > 20)
    } else if (options.filterBy.filterBy === 'Below 20') {
        return books.filter(book => book.price <= 20)
    }
    return books
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
    var idx = getBookIdById(bookId)
    gBooks.splice(idx, 1)
    saveToStorage(STORAGE_KEY, gBooks)
    onSuccessMessage('Book Deleted Successfully.')
}

function updateBook(price, bookId) {
    var idx = getBookIdById(bookId)
    gBooks[idx].price = price
    saveToStorage(STORAGE_KEY, gBooks)
    onSuccessMessage('Book Update Successfully.')
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
    saveToStorage(STORAGE_KEY, gBooks)
    onSuccessMessage('Book Added Successfully.')
}

function showBookDetails(bookId) {
    var book = getBookById(bookId)
    return book
}