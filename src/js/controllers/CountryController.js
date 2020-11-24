
import Controller from './Controller'
import CountryView from './../views/CountryView'
import CountryModel from './../models/CountryModel'

export default class CountryController extends Controller{

    constructor(el, options) {
        super(el, options, 'Country', {
            CountryView,
            CountryModel
        })
    }
}