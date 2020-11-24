
import View from './View'

export default class CurrencyView extends View{

    constructor(el) {
        super(el)
    }

    setElements() {
        super.setElements()

        this.el.classList.add('currency-dropdown-wrap');
        this.inputCountry.setAttribute('name', 'currency')
    }

    renderCountries(data, defaultSelected) {
        let itemsHtmlStr = ''
        for(let item of data){
            const [firstCountry] = item
            if(firstCountry && defaultSelected === firstCountry.abbreviation){
                this.selectedItem.innerHTML = this.renderCurrencyItemWithOneCountry(firstCountry, false, true)
                itemsHtmlStr += this.renderItem(item, true)
            }else{
                itemsHtmlStr += this.renderItem(item)
            }
        }
        this.items.innerHTML = itemsHtmlStr
        this.inputCountry.value = defaultSelected
    }

    renderItem(data, active= false) {
        if(data.length > 1){
            return (!data ? '' : this.renderCurrencyItemWithSomeCountry(data, active))
        }

        const [firstItem] = data

        return (!data || !firstItem ? '' : this.renderCurrencyItemWithOneCountry(firstItem, active))
    }

    renderCurrencyItemWithSomeCountry(data, active= false) {
        let [item] = data
        return `<div class="country-dropdown-list-item ${active?'active':''}">
                    <span class="country-flag"></span>
                    <span class="country-currency-code">${!item.currency_code ? '' : item.currency_code}</span>
                    <span class="country-name" data-name="${item.country}" data-abbr="${item.abbreviation}" data-currency-code="${!item.currency_code ? '' : item.currency_code}">
                    ${ this.renderCurrencyItemCountriesFlags(data) }
                    </span>
                </div>`
    }

    renderCurrencyItemCountriesFlags(data) {
        let str = ''
        for(let item of data){
            if(item.flag){
                str += `<span class="country-flag">${item.flag}</span>`
            }
        }
        return str
    }

    renderCurrencyItemWithOneCountry(data, active= false, selected = false) {
        return `<div class="country-dropdown-list-item ${active?'active':''}">
                    <span class="country-flag">${!data.flag ? '' : data.flag}</span>
                    <span class="country-currency-code">${!data.currency_code ? '' : data.currency_code}</span>
                    <span class="country-name" data-abbr="${data.abbreviation}" data-currency-code="${!data.currency_code ? '' : data.currency_code}">${!selected ? data.country : ''}</span>
                </div>`
    }

    renderSelected(data, abbreviation){
        let countryObj = undefined
        for(let item of data) {
            countryObj = item.find(obj => obj.abbreviation === abbreviation)
            if(countryObj) break
        }
        if(countryObj)
            this.selectedItem.innerHTML = this.renderCurrencyItemWithOneCountry(countryObj, false, true)
    }
}