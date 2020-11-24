import './sass/index.scss'

import {countriesController, phonesController, currenciesController} from './js/index'

countriesController('#country-dropdown', {
    defaultCountry: 'US',
    /*onSelected(abbr, data, el) {
        console.log(abbr, data, el)
    }*/
    customData:{}
})

phonesController('#phone-dropdown')

currenciesController('#currency-dropdown')