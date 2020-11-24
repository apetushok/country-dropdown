
import CountryController from './controllers/CountryController'
import PhoneController from './controllers/PhoneController'
import CurrencyController from './controllers/CurrencyController'
import {ControllerValidator} from "./controllers/validators/ControllerValidator";

export const countriesController = (el, options) => {
    const ProxyController = new Proxy(CountryController, ControllerValidator)
    new ProxyController(el, options)
}

export const phonesController = (el, options) => {
    const ProxyController = new Proxy(PhoneController, ControllerValidator)
    new ProxyController(el, options)
}

export const currenciesController = (el, options) => {
    const ProxyController = new Proxy(CurrencyController, ControllerValidator)
    new ProxyController(el, options)
}


/*

1. deploy to github
2. typescript
3. all flags
4. cache flags data
5. custom data

*/


