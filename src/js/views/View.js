
export default class View {

    html = `<div class="country-dropdown-selected"></div>
            <div class="caret"></div>
            <div class="country-dropdown-list-wrap">
                <div class="country-dropdown-search-wrap">
                    <input type="text" name="country-dropdown-search" placeholder="Search" autocomplete="off">
                    <div class="clear"></div>
                </div>
                <div class="country-dropdown-list"></div>
            </div>
            <input type="hidden" name="country" value="">`

    constructor(el) {
        this.el = el;
    }

    build() {
        this.el.className = 'country-dropdown-wrap'
        this.el.innerHTML = this.html
        this.setElements()
    }

    setElements() {
        this.selectedItem = this.el.querySelector('.country-dropdown-selected')
        this.itemsWrap = this.el.querySelector('.country-dropdown-list-wrap')
        this.inputCountry = this.el.querySelector('input[name="country"]')
        this.searchItemsWrap = this.itemsWrap.querySelector('.country-dropdown-search-wrap')
        this.searchItems = this.searchItemsWrap.querySelector('input[name="country-dropdown-search"]')
        this.clearSearch = this.searchItemsWrap.querySelector('.clear')
        this.items = this.itemsWrap.querySelector('.country-dropdown-list')
    }

    renderCountries(data, defaultSelected) {
        let itemsHtmlStr = ''
        for(let item of data){
            if(defaultSelected === item.abbreviation){
                this.selectedItem.innerHTML = this.renderSelectedItem(item)
                itemsHtmlStr += this.renderItem(item, true)
            }else{
                itemsHtmlStr += this.renderItem(item)
            }
        }
        this.items.innerHTML = itemsHtmlStr
        this.inputCountry.value = defaultSelected
    }

    renderItem(data, active= false){
        return `<div class="country-dropdown-list-item ${active?'active':''}">
                    <span class="country-flag">${!data.flag ? '' : data.flag}</span>
                    <span class="country-name" data-abbr="${data.abbreviation}">${data.country}</span>
                </div>`
    }

    renderSelectedItem(data){
        return this.renderItem(data)
    }

    renderSelected(data, abbreviation){
        let countryObj = data.find(obj => abbreviation === obj.abbreviation)
        this.selectedItem.innerHTML = this.renderItem(countryObj)
    }
}