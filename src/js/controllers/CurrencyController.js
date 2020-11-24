
import Controller from './Controller'
import CurrencyView from './../views/CurrencyView'
import CurrencyModel from './../models/CurrencyModel'

export default class CurrencyController extends Controller{

    constructor(el, options) {
        super(el, options, 'Currency', {
            CurrencyView,
            CurrencyModel
        })
    }

    searchItems(e){
        const value = e.target.value,
            data = this.dataContainer.getData(),
            mapData = new Map(Object.entries(data)),
            filteredCountries = this.dataContainer.getEmptyIterateObj()

        for(let [key, item] of mapData) {
            let countryObj = item.find(obj => {
                return (key && key.startsWith(value.toUpperCase()))
                || (value.length >= 3 && obj.country.toLowerCase().startsWith(value.toLowerCase()))
            })
            if(countryObj) filteredCountries[key] = item
        }

        this.htmlBuilder.renderCountries(Object.keys(filteredCountries).length > 0 ? filteredCountries: data, this.options.defaultCountry)
        this.scrollToSelected()
        this.showClearBtn(value)
    }
}