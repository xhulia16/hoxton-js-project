import './style.css'

type CartPerUser = {
  id: number
  userId: number
  bookId: number
}

type User = {
  email: string
  name: string
  password: string
  id: number
}

type Review = {
  id: number
  content: string
  bookId: number
}

type Book = {
  id: number
  author: string
  title: string
  description: string
  cover: string
  price: number
  reviews: Review[]
}

type State = {
  books: Book[],
  fillter: string,
  show: 'books' | 'details' | 'login',
  selectedBook: Book | null,
  currentUser: User | null,
  errorMessage: string | null
  cartPerUser: CartPerUser[] | null
  modal: 'cart' | ''
}

let state: State = {
  books: [],
  fillter: "",
  show: "books",
  selectedBook: null,
  currentUser: null,
  errorMessage: null,
  cartPerUser: null,
  modal: ''
}

function getCartForLoggedInUser() {
  fetch(`http://localhost:3005/cartPerUser?userId_like=${state.currentUser?.id}`)
    .then(resp => resp.json())
    .then(dataFromServer => {
      state.cartPerUser = dataFromServer
      render()
    })
}

function getBooksForUser() {
  // filter out cartItems, to only get ones that belong to loggedInUser.id
  if (state.cartPerUser === null) return
  if (state.currentUser === null) return
  const cartItemsForThisUser = state.cartPerUser.filter(cartItem =>
    cartItem.userId === state.currentUser.id)

  function findBookById(idParam: number) {
    return state.books.find(bookInBooks => bookInBooks.id === idParam)
  }

  // for every cartItem for the current user -> transform bookId into full book from state.books
  const booksInCart = cartItemsForThisUser.map(cartItem => findBookById(cartItem.bookId))
  return booksInCart
}
window.getBooksForUser=getBooksForUser

function renderCartModal(mainEl: Element) {
  if (state.cartPerUser === null) return

  let wrapperEl = document.createElement('div')
  wrapperEl.className = 'modal-wrapper'

  let containerEl = document.createElement('div')
  containerEl.className = 'modal-container'

  let titleEl = document.createElement('h2')
  titleEl.textContent = 'Items in your cart:'

  let closeButton = document.createElement('button')
  closeButton.className = 'modal-button'
  closeButton.textContent = 'x'
  closeButton.addEventListener('click', function () {
    state.modal = ''
    render()
  })

  containerEl.append(titleEl, closeButton)
  wrapperEl.append(containerEl)
  mainEl.append(wrapperEl)
}

function logIn(email: string, password: string) {
  fetch('http://localhost:3005/users')
    .then(r => r.json())
    .then((users: User[]) => {

      const foundUser = users.find(user =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
      )

      if (foundUser) {
        state.currentUser = foundUser;
        localStorage.id = foundUser.id;
      } else {
        state.errorMessage = 'No user found!'
      }

      render();
    })
}


function getBookdata() {
  fetch('http://localhost:3005/books')
    .then(resp => resp.json())
    .then(dataFromServer => {
      state.books = dataFromServer
      render()
    })
}

window.state = state

function createReview(content: string, bookId: number) {
  fetch('http://localhost:3005/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content,
      bookId
    })
  })
    .then(resp => resp.json())
    .then(newReview => {
      let book = state.books.find(book => book.id === newReview.bookId)
      book?.reviews.push(newReview)
      render()
    })
}

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
function selectBook(book: Book) {
  state.show = 'details'
  state.selectedBook = book
}
function createFormSingIn() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return

  let mainbodyEl = document.createElement("body")
  mainbodyEl.className = "bodyform"

  let formEl = document.createElement("form")
  formEl.className = "formEl"

  let divEl = document.createElement("div")
  divEl.className = ("login")
  let h2El = document.createElement("h2")
  h2El.textContent = ("Login")

  let labelEl = document.createElement("label")
  labelEl.setAttribute("for", 'name');
  labelEl.textContent = "Email"
  let inputEl = document.createElement("input")
  inputEl.className = "input"
  inputEl.id = "name"
  inputEl.type = "text"
  inputEl.name = "name"
  inputEl.minLength = 3
  inputEl.maxLength = 20
  inputEl.placeholder = "Type your email"
  var brEl = document.createElement('br');

  let label2El = document.createElement("label")
  label2El.setAttribute("for", 'email');
  label2El.textContent = "Password"
  let input2El = document.createElement("input")
  input2El.className = "input"
  input2El.id = "password"
  input2El.type = "password"
  input2El.name = "paswword"
  input2El.placeholder = "Type your pasword"
  var br2El = document.createElement('br')
  divEl.append(h2El, labelEl, inputEl, brEl, label2El, input2El, br2El)

  let buttonEl = document.createElement("button")
  buttonEl.className = "button"
  buttonEl.type = "button"
  buttonEl.textContent = "LOGIN"
  buttonEl.addEventListener('click', function () {
    logIn(inputEl.value, input2El.value)
    render()
  })

  let logInMessage = document.createElement('h3')
  logInMessage.textContent = state.errorMessage

  let backbuttonEl = document.createElement("button")
  backbuttonEl.textContent = "⬅Back"
  backbuttonEl.className = "backbutton"
  backbuttonEl.addEventListener("click", function () {
    state.show = "books"
    render()
  })

  formEl.append(divEl, logInMessage, buttonEl)
  mainbodyEl.append(formEl, backbuttonEl)


  mainEl.append(mainbodyEl)

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
  let websiteHome = document.createElement('li')
  websiteHome.textContent = 'BookAl Library'
  websiteHome.className='website-title'
  leftUlEl.append(websiteHome)
  leftNavEl.append(leftUlEl)
  leftPaneEl.append(leftNavEl)


  let rightPaneEl = document.createElement('div')
  rightPaneEl.className = 'header__right-pane'
  let rightNavEl = document.createElement('nav')
  let rightUlEl = document.createElement('ul')

  let homeBtnLi = document.createElement('li')
  let homeBtn = document.createElement('button')
  homeBtn.className='header-button'
  homeBtn.textContent = 'Home'
  homeBtn.addEventListener('click', function () {
    state.show = "books"
    render()
  })

  homeBtnLi.append(homeBtn)
  let cartBtnLi = document.createElement('li')
  let cartBtn = document.createElement('button')
  cartBtn.className='header-button'
  cartBtn.textContent = 'Shopping Cart'
  if (state.currentUser === null) {
    cartBtn.addEventListener('click', function () {
      state.show = 'login'
      render()
    })
  }
  else {
    cartBtn.addEventListener('click', function () {
      getCartForLoggedInUser()
      state.modal = 'cart'
      console.log('it works?')
      render()
    })
  }
  cartBtnLi.append(cartBtn)

  let searchBarLi = document.createElement('li')

  let searchBarInput = document.createElement('input')
  searchBarInput.id = 'search-book'
  searchBarInput.name = 'search-bar'
  searchBarInput.placeholder = 'Search for a book'


  if (searchBarInput) {
    searchBarInput.addEventListener('keydown', function (event) {
      if (searchBarInput == null) return
      if (event.key !== 'Enter') return
      filterBook(searchBarInput.value)
      render()
    })
  }

  let userProfileEL = document.createElement('button')
  userProfileEL.className='header-button'
  if (state.currentUser === null) {
    userProfileEL.textContent = 'Log in'
    userProfileEL.addEventListener("click", function () {
      state.show = 'login'
      render()
    })
  }
  else {
    userProfileEL.textContent = 'Log out'
    userProfileEL.addEventListener('click', function () {
      state.currentUser = null;
      state.errorMessage = null;
      localStorage.clear();
      render();
    })
  }

  searchBarLi.append(searchBarInput)
  rightUlEl.append(searchBarLi, homeBtnLi, cartBtnLi, userProfileEL)
  rightNavEl.append(rightUlEl)
  rightPaneEl.append(rightNavEl)


  headerEl.append(leftPaneEl, rightPaneEl)
  mainEl.append(headerEl)
}

function renderBookDetails() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return
  if (state.selectedBook === null) return
  let divEl = document.createElement("div")

  let main1El = document.createElement("main")
  main1El.className = ("main__detailBook")

  let imgDiv = document.createElement('div')
  let imgEl = document.createElement("img")
  imgEl.className = 'single-book_image'
  imgEl.src = state.selectedBook?.cover
  imgEl.alt = ""

  imgDiv.append(imgEl)

  let bookDetailsDiv = document.createElement('div')
  bookDetailsDiv.className = 'book-details'

  let singleBookTitle = document.createElement('h2')
  singleBookTitle.textContent = `Title: ${state.selectedBook?.title}`

  let singleBookAuthor = document.createElement('h3')
  singleBookAuthor.textContent = `Author: ${state.selectedBook?.author}`

  let singleBookPrice = document.createElement('h3')
  singleBookPrice.className='book-price'
  singleBookPrice.textContent = `Price: £${state.selectedBook?.price}`

  let addToCart = document.createElement('button')
  addToCart.className = 'addCart-button'
  addToCart.textContent = 'Add to cart'
  if (state.currentUser === null) {
    addToCart.addEventListener('click', function () {
      state.show = 'login'
      render()
    })
  }
  else {
    addToCart.addEventListener('click', function () {
      // increaseQuantity(state.selectedBook)
      console.log('nothing happens')
    })
  }


  let singleBookDescription = document.createElement("p")
  singleBookDescription.className = 'book-description__paragraph'
  singleBookDescription.textContent = state.selectedBook?.description

  let addReviewForm = document.createElement('form')
  addReviewForm.className = 'comment-form'
  addReviewForm.addEventListener('submit', function (event) {
    event.preventDefault()
    console.log('new review was posted')
    createReview(reviewInput.value, state.selectedBook?.id)
  })

  let reviewInput = document.createElement('input')
  reviewInput.className = 'review-input'
  reviewInput.type = 'text'
  reviewInput.name = 'review'
  reviewInput.placeholder = 'Add a review...'

  let submitButton = document.createElement('button')
  submitButton.className = 'comment-button'
  submitButton.type = 'submit'
  submitButton.textContent = 'Post'

  addReviewForm.append(reviewInput, submitButton)


  let reviewUl = document.createElement('ul')
  reviewUl.className = 'reviews'

  let reviewsText = document.createElement('h3')
  reviewsText.textContent = 'Reviews by other users:'

  for (let review of state.selectedBook.reviews) {
    let reviewLi = document.createElement('li')
    reviewLi.textContent = review.content
    reviewUl.append(reviewLi)
  }


  bookDetailsDiv.append(singleBookTitle, singleBookAuthor, singleBookPrice, addToCart, singleBookDescription, addReviewForm, reviewsText, reviewUl)

  main1El.append(imgDiv, bookDetailsDiv)
  divEl.append(main1El)
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
    bookItemEl.className='single-book'
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
    bookPriceEl.className='book-price'
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

  let footerMainEl = document.createElement('div')
  footerMainEl.className = 'footer'

  let contactUsEl = document.createElement('div')

  let contactUsUl = document.createElement('ul')
  let websiteNameLi = document.createElement('li')
  websiteNameLi.textContent = 'BookAL Library'
  let phoneNumberLi = document.createElement('li')
  phoneNumberLi.textContent = 'fake phone number here'
  let addressLi = document.createElement('li')
  addressLi.textContent = 'address goes here'

  contactUsUl.append(websiteNameLi, phoneNumberLi, addressLi)
  contactUsEl.append(contactUsUl)

  mainEl.append(contactUsEl)

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
  if (state.show === 'details') renderHeader(), renderBookDetails(), renderFooter()

  if (state.show === 'login') createFormSingIn()

  if (state.currentUser) {
    state.show = 'books'
  }

  if (state.modal === 'cart') renderCartModal(mainEl)
}

render()
getBookdata()