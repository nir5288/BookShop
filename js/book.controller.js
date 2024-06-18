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
                <td><button>read</button><button>update</button><button>delete</button></td>
            </tr>`
    )
    elBookList.innerHTML = strHtmls.join('')
}