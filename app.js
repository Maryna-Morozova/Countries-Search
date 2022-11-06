const appRoot = document.getElementById('app-root');

let h1 = document.createElement('h1')
h1.innerText = 'Countries Search'
appRoot.prepend(h1)

let form = document.createElement('form')
h1.after(form)

let p = document.createElement('p')
p.innerText = 'Please choose the type of search:'
form.prepend(p)

let radioRegion = document.createElement('input')
radioRegion.setAttribute('type', 'radio')
radioRegion.setAttribute('id', 'byRegion')
radioRegion.setAttribute('name', 'TypeOfSearch')
radioRegion.setAttribute('value', 'byRegion')
form.appendChild(radioRegion)

let labelRegion = document.createElement('label')
labelRegion.innerText = 'By Region'
radioRegion.after(labelRegion)

let radioLanguage = document.createElement('input')
radioLanguage.setAttribute('type', 'radio')
radioLanguage.setAttribute('id', 'byLanguage')
radioLanguage.setAttribute('name', 'TypeOfSearch')
radioLanguage.setAttribute('value', 'byLanguage')
form.appendChild(radioLanguage)

let labelLanguage = document.createElement('label')
labelLanguage.innerText = 'By Language'
radioLanguage.after(labelLanguage)

let form2 = document.createElement('form')
form.after(form2)

let p2 = document.createElement('p')
p2.innerText = 'Please choose search query: '
form2.appendChild(p2)

let select = document.createElement('select')
select.setAttribute('class', 'select')
select.setAttribute('id', 'searchQuery')
form2.appendChild(select)

let option = document.createElement('option')
option.setAttribute('id', 'options')
option.innerText = 'Select value'
select.appendChild(option)

let table = document.createElement('table')
table.setAttribute('id', 'table')
form2.after(table)

let getSelectedValue
let radioEvent = document.querySelector('form');
radioEvent.addEventListener('change', function (event) {
    event.preventDefault();

    getSelectedValue = document.querySelector(
        'input[name="TypeOfSearch"]:checked');

    createSelectList(getSelectedValue.value);
    table.innerText = 'No items, please choose search query';
})

let choice = document.querySelector('#searchQuery')
choice.addEventListener('change', function (event) {
    event.preventDefault();
    creatTable(getSelectedValue.value, this.value)
})


function createSelectList(SelectedValue) {
    let list;
    if (SelectedValue === 'byRegion') {
        list = externalService.getRegionsList();
    }
    if (SelectedValue === 'byLanguage') {
        list = externalService.getLanguagesList();
    }

    clear(searchQuery)

    let selectValue = document.createElement('option');
    selectValue.innerText = 'Select value';
    selectValue.setAttribute('id', 'options')
    searchQuery.appendChild(selectValue)

    for (let i = 0; i < list.length; i++) {
        let el = document.createElement('option');
        el.innerText = list[i]
        el.setAttribute('id', 'option')
        searchQuery.appendChild(el)
    }
}


function clear(elem) {
    while (elem.firstChild) {
        elem.firstChild.remove();
    }
} 
let minusOne = -1;
function creatTable (type, query) {
    let x
    if (type === 'byRegion') {
        x = externalService.getCountryListByRegion(query)
    }
    if (type === 'byLanguage') {
        x = externalService.getCountryListByLanguage(query)
    }
    
    x = x.sort((a, b) => a.name > b.name ? 1 : minusOne);

    clear(table)

    let thead = document.createElement('thead')
    table.appendChild(thead)

    let trow = document.createElement('tr')
    thead.appendChild(trow)

    let thCountryName = document.createElement('th')
    thCountryName.setAttribute('class', 'countryName')
    thCountryName.innerText = 'Country name';
    trow.appendChild(thCountryName)

    let input = document.createElement('input')
    input.setAttribute('id', 'stateInput')
    input.setAttribute('type', 'checkbox')
    thCountryName.appendChild(input)

    let label1 = document.createElement('label')
    label1.setAttribute('for', 'stateInput')
    label1.setAttribute('class', 'arrows')
    thCountryName.appendChild(label1)
    
    let input2 = document.createElement('input')
    input2.setAttribute('id', 'stateInput2')
    input2.setAttribute('type', 'checkbox')
    input2.setAttribute('checked', '')
    thCountryName.appendChild(input2)

    let label2 = document.createElement('label')
    label2.setAttribute('for', 'stateInput2')
    label2.setAttribute('class', 'arrows2')
    thCountryName.appendChild(label2)

    let thCapital = document.createElement('th')
    thCapital.innerText = 'Capital';
    trow.appendChild(thCapital)

    let thWorldRegion = document.createElement('th')
    thWorldRegion.innerText = 'World Region';
    trow.appendChild(thWorldRegion)

    let thLanguages = document.createElement('th')
    thLanguages.innerText = 'Languages';
    trow.appendChild(thLanguages)

    let thArea = document.createElement('th')
    thArea.setAttribute('class', 'thArea')
    thArea.setAttribute('data-type', 'number')
    thArea.innerText = 'Area';
    trow.appendChild(thArea)

    let inputArea = document.createElement('input')
    inputArea.setAttribute('id', 'stateInputArea')
    inputArea.setAttribute('type', 'checkbox')
    thArea.appendChild(inputArea)

    let labelArea = document.createElement('label')
    labelArea.setAttribute('for', 'stateInputArea')
    labelArea.setAttribute('class', 'arrowsArea')
    thArea.appendChild(labelArea)

    let inputArea2 = document.createElement('input')
    inputArea2.setAttribute('id', 'stateInputArea2')
    inputArea2.setAttribute('type', 'checkbox')
    inputArea2.setAttribute('checked', '')
    thArea.appendChild(inputArea2)

    let labelArea2 = document.createElement('label')
    labelArea2.setAttribute('for', 'stateInputArea2')
    labelArea2.setAttribute('class', 'arrowsArea2')
    thArea.appendChild(labelArea2)

    let thFlag = document.createElement('th')
    thFlag.innerText = 'Flag';
    trow.appendChild(thFlag)

    let tbody = document.createElement('tbody')
    table.appendChild(tbody)

    x.forEach(element => {
        let row = document.createElement('tr');
        row.setAttribute('class', 'tr')
        tbody.appendChild(row)

        let country = document.createElement('td');
        country.innerText = element.name
        row.prepend(country)

        let capital = document.createElement('td');
        capital.innerText = element.capital
        country.after(capital)

        let region = document.createElement('td');
        region.innerText = element.region
        capital.after(region)

        let languages = document.createElement('td');
        languages.innerText = Object.values(element.languages)
        region.after(languages)

        let area = document.createElement('td');
        area.innerText = element.area
        languages.after(area)

        let flag = document.createElement('td');
        area.after(flag)
        let flagImg = document.createElement('img');
        flagImg.setAttribute('src', `${element.flagURL}`)
        flagImg.setAttribute('style', 'width: 100px;')
        flagImg.setAttribute('alt', 'Country flag')
        flag.appendChild(flagImg)
    });

    input.addEventListener('click', function () {
        label1.setAttribute('style', 'visibility:hidden')
        label2.removeAttribute('style', 'visibility:hidden')
        labelArea.removeAttribute('style', 'visibility:hidden')
        labelArea2.removeAttribute('style', 'visibility:hidden')

        let tbody = document.querySelector('tbody')
        let trs = document.querySelectorAll('.tr')
        let sorted = [...trs].sort(function (a, b) {
            if (a.children[0].innerText < b.children[0].innerText) {
                return 1;
            } else {
                return minusOne;
            }
        })
        for (let tr of sorted) {
            tbody.appendChild(tr)
        }
    })

    input2.addEventListener('click', function () {
        label2.setAttribute('style', 'visibility:hidden')
        label1.removeAttribute('style', 'visibility:hidden')
        labelArea.removeAttribute('style', 'visibility:hidden')
        labelArea2.removeAttribute('style', 'visibility:hidden')

        let tbody = document.querySelector('tbody')
        let trs = document.querySelectorAll('.tr')
        let sorted = [...trs].sort(function (a, b) {
            if (a.children[0].innerText > b.children[0].innerText) {
                return 1;
            } else {
                return minusOne;
            }
        })
        for (let tr of sorted) {
            tbody.appendChild(tr)
        }
    })

    let areaItem = 4;
    labelArea.addEventListener('click', function () {
        labelArea.setAttribute('style', 'visibility:hidden')
        labelArea2.removeAttribute('style', 'visibility:hidden')
        label1.removeAttribute('style', 'visibility:hidden')
        label2.removeAttribute('style', 'visibility:hidden')

        let tbody = document.querySelector('tbody')
        let trs = document.querySelectorAll('.tr')
        let sorted = [...trs].sort(function (a, b) {
            return b.children[areaItem].innerText - a.children[areaItem].innerText;
        });
        for (let tr of sorted) {
            tbody.appendChild(tr)
        }
    })

    labelArea2.addEventListener('click', function () {
        labelArea2.setAttribute('style', 'visibility:hidden')
        labelArea.removeAttribute('style', 'visibility:hidden')
        label1.removeAttribute('style', 'visibility:hidden')
        label2.removeAttribute('style', 'visibility:hidden')

        let tbody = document.querySelector('tbody')
        let trs = document.querySelectorAll('.tr')
        let sorted = [...trs].sort(function (a, b) {
            return a.children[areaItem].innerText - b.children[areaItem].innerText;
        });
        for (let tr of sorted) {
            tbody.appendChild(tr)
        }
    })
}


