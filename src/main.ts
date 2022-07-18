import './style.css'

let state = {}

function renderHeader() {
  let mainEl = document.querySelector('#app')
  if (mainEl === null) return

  let headerEl = document.createElement('div')
  headerEl.className = 'header'

  let leftPaneEl = document.createElement('div')
  leftPaneEl.className='header__left-pane'
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
  rightPaneEl.className='header__right-pane'
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

  let bookDisplayEl = document.createElement('div')
  bookDisplayEl.className = 'main-page'
  bookDisplayEl.textContent = 'TEXT HERE'

  mainEl.append(bookDisplayEl)

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

console.log('it works')