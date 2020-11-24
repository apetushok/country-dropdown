
export default class Options{
    defaultOptions = {
        defaultCountry: 'BY',
        onSelected(abbr, data, el){
            let inputCountry = document.querySelector('.country-dropdown-wrap input[name="country"], .country-dropdown-wrap input[name="phone_code"]')
            if(inputCountry) inputCountry.value = abbr
        }
    }

    currentOptions = {}

    constructor(options, container) {
        let countryObj = this.postOptions ? container.getData().find(obj => this.postOptions.defaultCountry === obj.abbreviation) : false

        this.postOptions = options
        this.container = container
        this.currentOptions.defaultCountry = countryObj && countryObj.abbreviation || this.defaultOptions.defaultCountry
        this.currentOptions.onSelected = this.postOptions && typeof this.postOptions.onSelected == 'function' ? this.postOptions.onSelected : this.defaultOptions.onSelected
    }

    get onSelected(){
        return this.currentOptions.onSelected
    }

    get defaultCountry(){
        return this._getDefaultCountry()
    }

    _getDefaultCountry(){
        return this.currentOptions.defaultCountry || this.defaultOptions.defaultCountry
    }

/*
    set defaultCountry(value){
        return this.setDefaultCountry(value)
    }*/

    _setDefaultCountry(abbr){
        this.currentOptions.defaultCountry = abbr && abbr.length === 2 ? abbr : this.currentOptions.defaultCountry
        return this.currentOptions.defaultCountry
    }
}