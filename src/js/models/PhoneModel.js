
import Model from './Model'

export default class PhoneModel extends Model{

    constructor(assetsPath, callback) {
        super(assetsPath, callback)
    }

    getPromisesList(){
        let promisesList = super.getPromisesList()
        promisesList.push(import(`../${this.assetsPath}country-by-calling-code.json`))
        return promisesList
    }

    parseData(data){
        super.parseData(data)
        let phoneCodes = data[2].default

        this.countries.map(country => {
            let phoneCodeObj = phoneCodes.find(phoneCode => country.country === phoneCode.country)
            country.phone_code = phoneCodeObj && phoneCodeObj.calling_code? phoneCodeObj.calling_code : false
        });
    }
}