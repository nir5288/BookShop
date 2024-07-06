'use strict'

var gIdx = 103
var gRating

const STORAGE_KEY = 'bookDB'

var gBooks = _createBooks()


function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (books && books.length) return books

    books = [
        { id: 'bk101', title: 'The Great Gatsby', price: 15, imgUrl: 'great-gatsby.jpg', rating: getRandomIntInclusive(1, 5) },
        { id: 'bk102', title: '1984', price: 24, imgUrl: '1984.jpg', rating: getRandomIntInclusive(1, 5) },
        { id: 'bk103', title: 'To Kill a Mockingbird', price: 18, imgUrl: 'to-kill-a-mockingbird.jpg', rating: getRandomIntInclusive(1, 5) }
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
    const page = options.page

    books = _filterBooks(options)

    if (options.sortBy.title) {
        books = books.toSorted((c1, c2) => c1.title.localeCompare(c2.title) * options.sortBy.title)
    }

    if (options.sortBy.price) {
        books = books.toSorted((c1, c2) => (c1.price - c2.price) * options.sortBy.price)
    }

    if (options.sortBy.rating) {
        books = books.toSorted((c1, c2) => (c1.rating - c2.rating) * options.sortBy.rating)
    }

    const startIdx = page.idx * page.size
    const endIdx = startIdx + page.size
    books = books.slice(startIdx, endIdx)
    return books
}

function _filterBooks(options) {
    var books = gBooks
    if (options.filterBy.txt) books = gBooks.filter(book => book.title.toLowerCase().includes(options.filterBy.txt.toLowerCase()))

    if (options.filterBy.filterBy === 'Over 20') {
        books = books.filter(book => book.price > 20)
    } else if (options.filterBy.filterBy === 'Below 20') {
        books = books.filter(book => book.price <= 20)
    }

    if (options.filterBy.rating > 0) books = books.filter(book => book.rating >= options.filterBy.rating)
    if (options.filterBy.ratingDropDown > 0) books = books.filter(book => book.rating >= options.filterBy.ratingDropDown)
    return books
}

function getPageCount(options) {
    const filterBy = options.filterBy
    const page = options.page

    var booksLength = _filterBooks(filterBy).length

    var pageCount = Math.ceil(booksLength / page.size)

    return pageCount
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
    onStats()
}

function updateBook(price, bookId) {
    var idx = getBookIdById(bookId)
    gBooks[idx].price = price
    saveToStorage(STORAGE_KEY, gBooks)
    onSuccessMessage('Book Update Successfully.')
    onStats()
}

function addBook(price, bookTitle) {
    gIdx++
    gBooks.push(
        {
            id: `bk${gIdx}`,
            title: bookTitle,
            price,
            imgUrl: `${bookTitle}.jpg`,
            rating: getRandomIntInclusive(1, 5)
        }
    )
    saveToStorage(STORAGE_KEY, gBooks)
    onSuccessMessage('Book Added Successfully.')
    onStats()
}

function showBookDetails(bookId) {
    var book = getBookById(bookId)
    return book
}

function stats() { // change to reduce
    var booksCount = gBooks.length
    var booksBelow80 = gBooks.filter(book => book.price < 80).length
    var books80to200 = gBooks.filter(book => book.price >= 80 & book.price <= 200).length
    var booksOver200 = gBooks.filter(book => book.price > 200).length



    return { booksCount, booksBelow80, books80to200, booksOver200 }
}