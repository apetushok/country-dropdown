
export const OptionsValidator = {

    construct(target, args) {

        const [postOptions, container] = args

        if(postOptions && 'defaultCountry' in postOptions && typeof postOptions.defaultCountry !== 'undefined'){

            const typeDefaultCountry = typeof postOptions.defaultCountry
            if(typeDefaultCountry !== 'string' ||
                (typeDefaultCountry === 'string' && postOptions.defaultCountry.length !== 2)){
                throw new Error(`Option 'defaultCountry' must be a sting with length equal 2.. 
                You set the ${typeDefaultCountry} type with length equal ${postOptions.defaultCountry.length}.`)
            }

            const countryObj = container.getData().find(obj => postOptions.defaultCountry === obj.abbreviation)
            if(!countryObj){
                throw new Error(`Countries list doesn't contain ${postOptions.defaultCountry} abbreviation 
                that you set as 'defaultCountry' option.`)
            }
        }

        if(postOptions && 'onSelected' in postOptions && typeof postOptions.onSelected !== 'function'){
            throw new Error(`Option 'onSelected' must be a function. You set the ${typeof postOptions.onSelected} type`)
        }

        return new Proxy( new target(...args), {

            /*get(target, prop){
                const methodName = this._getMethodName(prop)
                if(methodName in this){
                    return this[methodName]()
                }
                return false
            },*/

            set(target, prop, value){
                const methodName = this._getMethodName(prop, 'set')
                if(methodName in this) {
                    return this[methodName](target, prop, value)
                }
                return false
            },

            _getMethodName(prop, mode = 'get') {
                const [firstWord] = prop
                return !prop ? '' : `_${mode + firstWord.toUpperCase() + prop.slice(1)}`
            },

            _setDefaultCountry(target, propName, abbr){

                if(target.container.constructor.name === 'CurrencyModel'){
                    this._setDefaultCountryCurrencyModel(target, propName, abbr)
                }

                const countryObj = target.container.getData().find(obj => abbr === obj.abbreviation)
                if(!countryObj){
                    throw new Error(`Countries list doesn't contain ${abbr} abbreviation.`)
                }

                return Reflect.apply(target._setDefaultCountry, target, [abbr])
            },

            _setDefaultCountryCurrencyModel(target, propName, abbr){

                const data = target.container.getData()
                let isIsset = false

                for(let item of data) {
                    if(item.find(obj => abbr === obj.abbreviation)){
                        isIsset = true
                        break
                    }
                }

                if(!isIsset){
                    throw new Error(`Countries list doesn't contain ${abbr} abbreviation.`)
                }
            }
        })
    }
}