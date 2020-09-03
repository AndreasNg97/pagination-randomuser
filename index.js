const tbody = document.querySelector("#tbody");
const pageNum = document.getElementsByClassName('pageNum')
const pageNumContainer = document.querySelector(".pageNumContainer")
const nxtbtn = document.querySelector(".nxtbtn")
const prvbtn = document.querySelector(".prvbtn")

const resultsShown = 15 // How many results are shown per page
const resultQty = 100
let newResults
let nextPrev = () => { }

for (let i = 0; i < Math.ceil(resultQty / resultsShown); i++) {
    pageNumContainer.innerHTML += `
        <li class="page-item pageNum"><button onclick="getUser(${i})" class="page-link page1"> ${i + 1} </button></li>
    `
}

(async () => {
    const response = await fetch('https://randomuser.me/api/?results=' + resultQty)
    const json = await response.json()
    const results = json.results
    newResults = new Array(Math.ceil(results.length / resultsShown))
        .fill()
        .map(_ => results.splice(0, resultsShown))
    getUser(0)
})().catch(err => { console.error(err) })

const getUser = (page) => {
    let itemIndex = 0
    //Carouselle 
/*  if (page === -1) page = Math.ceil(resultQty / resultsShown - 1)
    if (page >= Math.ceil(resultQty / resultsShown)) page = 0  */

    //Stopping at 0 and max page
    page === 0 ? prvbtn.className = 'page-item prvbtn disabled' : prvbtn.className = 'page-item prvbtn'
    page === Math.ceil(resultQty/resultsShown - 1) ? nxtbtn.className = 'page-item nxtbtn disabled' : nxtbtn.className = 'page-item nxtbtn'

    for (let i = 0; i < pageNum.length; i++) pageNum[i].className = 'page-item pageNum'
    pageNum[page].className += ' active'

    nextPrev = (n) => {
        getUser(page += n)
    }

    tbody.innerHTML = ``
    newResults[page].forEach(result => {
        itemIndex++
        tbody.innerHTML += `
        <tr>
            <td>${itemIndex + page * resultsShown}</td>
            <td>${result.name.title}</td>
            <td>${result.name.first + " " + result.name.last}</td>
            <td>${result.email}</td>
            <td>${result.location.country + ", " + result.location.city}</td>
        </tr>
    `})
}