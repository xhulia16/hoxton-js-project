import './style.css'

type Book = {
  author: string,
  title: string,
  description: string,
  cover: string,
  price: number
}

type State = {
  books: Book[]
}

let state: State = {
  books: []
}

function getBookdata() {
  fetch('http://localhost:3005/books')
    .then(resp => resp.json())
    .then(dataFromServer => {
      state.books = dataFromServer
      render()
    })
}

<<<<<<< HEAD
// getMoviedata()
// window.state = state
=======
getBookdata()
window.state = state
>>>>>>> ec3e32683e6a1102445121d35a16da6283e71613

function renderHeader() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return

  let headerEl = document.createElement('div')
  headerEl.className = 'header'

  let leftPaneEl = document.createElement('div')
  leftPaneEl.className = 'header__left-pane'
  let leftNavEl = document.createElement('nav')
  let leftUlEl = document.createElement('ul')
  let menuTab = document.createElement('li')
  menuTab.textContent = '='
  let websiteHome = document.createElement('li')
  websiteHome.textContent = 'BookAl Library'

  leftUlEl.append(menuTab, websiteHome)
  leftNavEl.append(leftUlEl)
  leftPaneEl.append(leftNavEl)


  let rightPaneEl = document.createElement('div')
  rightPaneEl.className = 'header__right-pane'
  let rightNavEl = document.createElement('nav')
  let rightUlEl = document.createElement('ul')
  let searchBarLi = document.createElement('li')
  let searchBarInput = document.createElement('input')
  searchBarInput.name = 'search-bar'
  searchBarInput.placeholder = 'Search here'
  let submitBtn = document.createElement('button')
  submitBtn.textContent = 'submit'

  let userProfileEL = document.createElement('li')
  userProfileEL.textContent = '👤'

  searchBarLi.append(searchBarInput, submitBtn)
  rightUlEl.append(searchBarLi, userProfileEL)
  rightNavEl.append(rightUlEl)
  rightPaneEl.append(rightNavEl)


  headerEl.append(leftPaneEl, rightPaneEl)
  mainEl.append(headerEl)
}

function renderBookList() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return

  let mainPageEl = document.createElement('div')
  mainPageEl.className = 'main-page'


    let displayBooksEl = document.createElement('div')
    displayBooksEl.className = 'books-display'

    for (let item of state.books) {
    let bookItemEl = document.createElement('div')

    let bookCoverEl = document.createElement('img')
    bookCoverEl.className = 'book-cover'
    bookCoverEl.src = item.cover


    let bookTitleEl = document.createElement("h3")
    bookTitleEl.textContent = item.title

    let bookAuthorEl = document.createElement("h4")
    bookAuthorEl.textContent = item.author

    let bookPriceEl = document.createElement("h4")
    bookPriceEl.textContent = `£ ${item.price}`

    bookItemEl.append(bookCoverEl, bookTitleEl, bookAuthorEl, bookPriceEl)
    displayBooksEl.append(bookItemEl)

    mainPageEl.append(displayBooksEl)
  

  mainEl.append(mainPageEl)

  }

}

function renderFooter() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return

  let FooterEl = document.createElement('div')
  FooterEl.className = 'footer'
  FooterEl.textContent = 'TEXT HERE'

  mainEl.append(FooterEl)

}


function render() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return
  mainEl.textContent = ''

  renderHeader()

  renderBookList()

  renderFooter()
}

render()
getMoviedata()
