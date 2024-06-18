'use strict'

var gBooks = [
    { id: 'bk101', title: 'The Great Gatsby', price: 15, imgUrl: 'great-gatsby.jpg' },
    { id: 'bk102', title: '1984', price: 12, imgUrl: '1984.jpg' },
    { id: 'bk103', title: 'To Kill a Mockingbird', price: 18, imgUrl: 'to-kill-a-mockingbird.jpg' }
]

function getBooks() {
    return gBooks
}

function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
	gBooks.splice(idx, 1)
}