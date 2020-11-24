
import Model from './Model'

export default class CurrencyModel extends Model{

    constructor(assetsPath, callback) {
        super(assetsPath, callback)
    }

    getPromisesList(){
        let promisesList = super.getPromisesList()
        promisesList.push(import(`../${this.assetsPath}country-by-currency-code.json`))
        return promisesList
    }

    getEmptyIterateObj(){
        const keysObj = Symbol('keys'),
            keysPrivate = Symbol('keys')

        return {
            [keysPrivate]: [],
            [keysObj]() {
                return this[keysPrivate].length > 0 ? this[keysPrivate] : Object.keys(this)
            },
            [Symbol.iterator](){
                let i = 0
                return {
                    next: () => {
                        const keys = this[keysObj](),
                            curKey = keys[i],
                            value = this[curKey]
                        i++
                        return{
                            done: i > keys.length,
                            value
                        }
                    }
                }
            }
        }
    }

    parseData(data){
        super.parseData(data)

        const [,,currencyCodesArr] = data,
            currencyCodes = currencyCodesArr.default

        let filteredData = this.getEmptyIterateObj()

        for(let item of currencyCodes){
            let countryObj = this.countries.find(country => country.country === item.country)

            if(item.currency_code){
                if(!filteredData[item.currency_code]) {
                    filteredData[item.currency_code] = []
                }

                if(countryObj){
                    countryObj.currency_code = item.currency_code
                    filteredData[item.currency_code].push(countryObj)
                }
            }
        }
        this.countries = filteredData
    }
}