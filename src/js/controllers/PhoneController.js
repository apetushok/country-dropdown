
import Controller from './Controller'
import PhoneView from './../views/PhoneView'
import PhoneModel from './../models/PhoneModel'

export default class PhoneController extends Controller{

    constructor(el, options) {
        super(el, options, 'Phone', {
            PhoneView,
            PhoneModel
        })
    }

    searchItems(e){
        let value = e.target.value,
            filteredCountries = this.dataContainer.getData().filter(obj => {
                return obj.phone_code.toString().toLowerCase().startsWith(value.toLowerCase())
                    || obj.country.toLowerCase().startsWith(value.toLowerCase())
            })
        this.htmlBuilder.renderCountries(filteredCountries, this.options.defaultCountry)
        this.scrollToSelected()
        this.showClearBtn(value)
    }
}