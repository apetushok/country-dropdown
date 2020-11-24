
import View from './View'

export default class PhoneView extends View{

    constructor(el) {
        super(el)
    }

    setElements() {
        super.setElements()

        this.el.classList.add('phone-dropdown-wrap');
        this.inputCountry.setAttribute('name', 'phone_code')
    }

    renderItem(data, active= false){
        return `<div class="country-dropdown-list-item ${active?'active':''}">
                    <span class="country-flag">${!data.flag ? '' : data.flag}</span>
                    <span class="country-phone-code">${!data.phone_code ? '' : '+'+data.phone_code}</span>
                    <span class="country-name" data-abbr="${data.abbreviation}" data-phone-code="${!data.phone_code ? '' : data.phone_code}">${data.country}</span>
                </div>`
    }

    renderSelectedItem(data){
        return `<div class="country-dropdown-list-item">
                    <span class="country-flag">${!data.flag ? '' : data.flag}</span>
                    <span class="country-phone-code">${!data.phone_code ? '' : '+'+data.phone_code}</span>
                </div>`
    }

    renderSelected(data, abbreviation){
        let countryObj = data.find(obj => abbreviation === obj.abbreviation)
        this.selectedItem.innerHTML = this.renderSelectedItem(countryObj)
    }
}