import './style.css'

type Books = {
  author: string,
  title: string,
  description: string,
  cover: string,
  price: number
}

type State = {
  books: Books[]
  fillter: String
  show: 'books' | 'details'
  selectedBook: Books | null
}

let state: State = {
  books: [],
  fillter: "",
  show: "books",
  selectedBook: null
}

function getBookdata() {
  fetch('http://localhost:3005/books')
    .then(resp => resp.json())
    .then(dataFromServer => {
      state.books = dataFromServer
      render()
    })
}

// getBookdata()
//window.state = state

function getFilteredBooks() {
  return state.books.filter(
    book =>
      book.author.toLowerCase().includes(state.fillter.toLowerCase()) ||
      book.title.toLowerCase().includes(state.fillter.toLowerCase())
  )
}

function filterBook(newFilter: string) {
  state.fillter = newFilter
  state.show = "books"
  state.selectedBook = null
}
function selectBook(book: Books) {
  state.show = 'details'
  state.selectedBook = book
}
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
  searchBarInput.id = 'search-book'
  searchBarInput.name = 'search-bar'
  searchBarInput.placeholder = 'Search here'


  if (searchBarInput) {
    searchBarInput.addEventListener('keydown', function (event) {
      if (searchBarInput == null) return
      if (event.key !== 'Enter') return

      filterBook(searchBarInput.value)
      render()
    })
  }


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
function renderBookDetails() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return
  let divEl = document.createElement("div")

  // for(let book of state.books){ 
  let main1El = document.createElement("main")
  main1El.className = ("main__detailBook")

  let imgEl = document.createElement("img")
  imgEl.src = state.selectedBook?.cover
  imgEl.width = 300
  imgEl.alt = ""

  let pEl = document.createElement("p")
  pEl.textContent = state.selectedBook?.description
  main1El.append(imgEl, pEl)
  divEl.append(main1El)
  // }
  mainEl.append(divEl)
}

function renderBookList() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return

  let mainPageEl = document.createElement('div')
  mainPageEl.className = 'main-page'

  let mainPageText = document.createElement('h2')
  mainPageText.className = 'main-page__text'
  mainPageText.textContent = 'Books everyone is talking about'

  let displayBooksEl = document.createElement('div')
  displayBooksEl.className = 'books-display'

  let filteredBooks = getFilteredBooks()

  for (let item of filteredBooks) {
    let bookItemEl = document.createElement('div')
    bookItemEl.addEventListener('click', function () {
      selectBook(item)
      render()
    })

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

    mainPageEl.append(mainPageText, displayBooksEl)


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
  if (state.show === 'books') {
    renderHeader()
    renderBookList()
    renderFooter()
  }
  if (state.show === 'details') renderHeader(), renderBookDetails()
}

render()
getBookdata()