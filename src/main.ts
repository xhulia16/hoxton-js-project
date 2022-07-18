import './style.css'

let state={}

function renderHeader(){
  let mainEl=document.querySelector('#app')
  if(mainEl===null) return

  let headerEl=document.createElement('div')
  headerEl.className='header'
  headerEl.textContent='TEXT HERE'

  mainEl.append(headerEl)
}

function renderBookList(){
  let mainEl=document.querySelector('#app')
  if(mainEl===null) return

  let bookDisplayEl=document.createElement('div')
  bookDisplayEl.className='main-page'
  bookDisplayEl.textContent='TEXT HERE'

  mainEl.append(bookDisplayEl)

}

function renderFooter(){
  let mainEl=document.querySelector('#app')
  if(mainEl===null) return

  let FooterEl=document.createElement('div')
  FooterEl.className='footer'
  FooterEl.textContent='TEXT HERE'

  mainEl.append(FooterEl)

}


function render(){
let mainEl=document.querySelector('#app')
if(mainEl===null) return
mainEl.textContent=''

renderHeader()

renderBookList()

renderFooter()
}

render()

console.log('it works')