
export default class Model{

    constructor(assetsPath, callback) {
        this.callback = callback
        this.assetsPath = assetsPath
    }

    setupData(){

        //if(cache){
        //this.callback(this)
        //}else{
        Promise.all(this.getPromisesList())
            .then(data => {
                this.parseData(data)
                this.callback(this)
            })
        //}
        return this;
    }

    getPromisesList(){
        return [
            import(`../${this.assetsPath}flags.json`),
            import(`../${this.assetsPath}country-by-abbreviation.json`)
        ]
    }

    parseData([flagsArr, countries]){
        const flags = flagsArr.default
        this.countries = countries.default

        this.countries.map(country => {
            let flagObj = flags.find(flag => country.abbreviation in flag)
            country.flag = flagObj && country.abbreviation in flagObj ? flagObj[country.abbreviation] : false
        });
    }

    getData(){
        return this.countries
    }
}