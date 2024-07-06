'use strict'

const gQueryOptions = {
    filterBy: { txt: '', filterBy: '', rating: 0, ratingDropDown: 0 },
    sortBy: {},
    page: { idx: 0, size: 5 }
}

function onInit() {
    readQueryParams()
    renderBooks()
}

function renderBooks() {
    const elBookList = document.querySelector('.book-list')
    const strHtmls = getBooks(gQueryOptions).map(book =>
        `<tr>
                <td>${book.title}</td>
                <td>$${book.price}</td>
                <td>
                <button onclick="onShowBookDetails(event, '${book.id}')" class="button-read">Read</button>
                <button onclick="onUpdateBook('${book.id}')">Update</button>
                <button onclick="onRemoveBook('${book.id}')">Delete</button>
                <td class="rating">${book.rating}</td>
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
    if (bookTitle.length < 1) {
        alert('Invalid Name. Please enter a valid name.')
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
    } else if (elFilter.rating !== undefined) {
        gQueryOptions.filterBy.rating = elFilter.rating
    } else if (elFilter.ratingDropDown !== undefined) {
        gQueryOptions.filterBy.ratingDropDown = elFilter.ratingDropDown
    }
    setQueryParams()
    gQueryOptions.page.idx = 0
    renderBooks()
}

function onSetSortBy() {
    const elSortField = document.querySelector('.sort-by select')
    const elSortDir = document.querySelector('.sort-by input')

    const sortField = elSortField.value
    const sortDir = elSortDir.checked ? -1 : 1

    gQueryOptions.sortBy = { [sortField]: sortDir }

    gQueryOptions.page.idx = 0
    setQueryParams()
    renderBooks()

}


function onNextPage() {
    const pageCount = getPageCount(gQueryOptions)

    if (gQueryOptions.page.idx === pageCount - 1) {
        gQueryOptions.page.idx = 0
    } else {
        gQueryOptions.page.idx++
    }
    setQueryParams()
    renderBooks()
}

function onPreviousPage() {
    const pageCount = getPageCount(gQueryOptions)

    if (gQueryOptions.page.idx === 0) {
        gQueryOptions.page.idx = pageCount - 1
    } else {
        gQueryOptions.page.idx--
    }
    setQueryParams()
    renderBooks()
}


function resetFilter() {
    const elResetButton = document.getElementById('filter-txt')
    const elPriceReset = document.querySelector('.filter')
    const elRating = document.querySelector('.rating-range')
    const elRatingDropDown = document.querySelector('.filter-rating select')
    const elSort = document.querySelector('.sort-by select')
    const elSortDir = document.querySelector('.sort-desc')

    gQueryOptions.filterBy.filterBy = ''
    gQueryOptions.filterBy.txt = ''
    gQueryOptions.filterBy.rating = 0
    gQueryOptions.filterBy.ratingDropDown = 0
    gQueryOptions.sortBy = {}

    elResetButton.value = ''
    elRating.title = 0
    elRating.value = 0
    elRatingDropDown.value = ''
    elPriceReset.value = ''
    elSort.value = ''
    elSortDir.checked  = false

    renderBooks()
}

function onSuccessMessage(message) {
    const elMessage = document.querySelector('.success-message')
    elMessage.innerText = message

    elMessage.classList.add('show')

    setTimeout(() => {
        elMessage.classList.remove('show')
    }, 2000)
}

onStats()
function onStats() {
    var statsResult = stats()

    var totalStats = document.querySelector('.total-books')
    var booksBelow80 = document.querySelector('.books-below-80')
    var books80to200 = document.querySelector('.books-between-80-200')
    var booksOver200 = document.querySelector('.books-over-200')

    totalStats.innerText = statsResult.booksCount
    booksBelow80.innerText = statsResult.booksBelow80
    books80to200.innerText = statsResult.books80to200
    booksOver200.innerText = statsResult.booksOver200
}


function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)

    gQueryOptions.filterBy = {
        txt: queryParams.get('book') || '',
        filterBy: queryParams.get('priceOver') || '',
        rating: +queryParams.get('rating') || 0,
        ratingDropDown: +queryParams.get('ratingDropDown') || 0
    }

    if (queryParams.get('sortBy')) {
        const prop = queryParams.get('sortBy')
        const dir = queryParams.get('sortDir')
        gQueryOptions.sortBy[prop] = dir
    }

    renderQueryParams()
}

function renderQueryParams() {
    document.getElementById('filter-txt').value = gQueryOptions.filterBy.txt
    document.querySelector('.filter').value = gQueryOptions.filterBy.filterBy
    document.querySelector('.rating-range').value = gQueryOptions.filterBy.rating
    document.querySelector('.rating-range').title = gQueryOptions.filterBy.rating
    document.querySelector('.filter-rating select').value = gQueryOptions.filterBy.ratingDropDown

    const sortKeys = Object.keys(gQueryOptions.sortBy)
    const sortBy = sortKeys[0]
    const dir = gQueryOptions.sortBy[sortKeys[0]]

    document.querySelector('.sort-by select').value = sortBy || ''
    document.querySelector('.sort-by .sort-desc').checked = (dir === '-1') ? true : false

}


function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('book', gQueryOptions.filterBy.txt)
    queryParams.set('rating', gQueryOptions.filterBy.rating)
    queryParams.set('ratingDropDown', gQueryOptions.filterBy.ratingDropDown)
    queryParams.set('priceOver', gQueryOptions.filterBy.filterBy)

    const sortKeys = Object.keys(gQueryOptions.sortBy)

    if (sortKeys.length) {
        queryParams.set('sortBy', sortKeys[0])
        queryParams.set('sortDir', gQueryOptions.sortBy[sortKeys[0]])
    }

    if (gQueryOptions.page) {
        queryParams.set('pageIdx', gQueryOptions.page.idx)
        queryParams.set('pageSize', gQueryOptions.page.size)
    }

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}
