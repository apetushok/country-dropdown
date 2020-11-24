
import Options from "./helpers/Options";
import {cl} from "./helpers/cl";
import {OptionsValidator} from "./validators/OptionsValidator";

export default class Controller {

    constructor(el, options, mode, classes) {
        const ProxyOptions = new Proxy(Options, OptionsValidator)

        this.el_selector = el
        this.el = document.querySelector(el);
        this.mode = mode
        this.htmlBuilder = new classes[`${mode}View`](this.el)
        this.dataContainer = new classes[`${mode}Model`]('assets/', container => {
            this.options = new ProxyOptions(options, container)
            this.htmlBuilder.renderCountries(container.getData(), this.options.defaultCountry)
            this.setEvents()
        })

        this.init()
    }

    init() {
        this.htmlBuilder.build()
        this.dataContainer.setupData()
    }

    setEvents() {
        // toggle
        this.htmlBuilder.selectedItem.addEventListener('click', e => this.toogleItems(e))
        document.addEventListener('click', event => {
            if(!this.el.contains(event.target)) {
                this.close()
            }
        });

        // select
        document.addEventListener('click',e => {
            if(e.target && e.target.closest(this.el_selector+' .country-dropdown-list .country-dropdown-list-item') && !e.target.closest(this.el_selector+' .country-dropdown-list .country-dropdown-selected')){
                this.selectItem(e)
            }
        });

        // search
        this.htmlBuilder.searchItems.addEventListener('keyup', e => this.searchItems(e))

        // clear search
        this.htmlBuilder.clearSearch.addEventListener('click', e => this.clearSearch(e))
    }

    toogleItems(){
        if (this.htmlBuilder.itemsWrap.style.display === 'none'
            || this.htmlBuilder.itemsWrap.style.display === '') {
            this.open()
        } else {
            this.close()
        }
    }

    open(){
        this.htmlBuilder.itemsWrap.style.display = 'block'
        this.htmlBuilder.itemsWrap.classList.add('in')
        this.scrollToSelected()
    }

    close(){
        this.htmlBuilder.itemsWrap.style.display = 'none'
        this.htmlBuilder.itemsWrap.classList.remove('in')
    }

    scrollToSelected(){
        let el = this.htmlBuilder.items.querySelector('.country-dropdown-list-item.active')
        if(el) el.scrollIntoView()//{block: "center", behavior: "smooth"});
    }

    selectItem(e){
        let item = e.target.closest('.country-dropdown-list-item'),
            el = item.querySelector('.country-name'),
            abbr = el.getAttribute('data-abbr'),
            activeEl = this.htmlBuilder.items.querySelector('.country-dropdown-list-item.active')

        if(activeEl) activeEl.classList.remove('active')

        item.classList.add('active')
        this.htmlBuilder.renderSelected(this.dataContainer.getData(), abbr)

        this.options.defaultCountry = abbr
        this.options.onSelected(el.dataset.abbr, el.dataset, el)
        this.close()
        if(this.htmlBuilder.clearSearch.style.display === 'block'){
            this.clearSearch()
        }
    }

    searchItems(e){
        let value = e.target.value,
            filteredCountries = this.dataContainer.getData().filter(obj => obj.country.toLowerCase().startsWith(value.toLowerCase()))
        this.htmlBuilder.renderCountries(filteredCountries, this.options.defaultCountry)
        this.scrollToSelected()
        this.showClearBtn(value)
    }

    showClearBtn(value){
        this.htmlBuilder.clearSearch.style.display = value.length > 0 ? 'block' : 'none';
    }

    clearSearch(){
        this.htmlBuilder.searchItems.value = ''
        this.htmlBuilder.renderCountries(this.dataContainer.getData(), this.options.defaultCountry)
        this.showClearBtn('')
        this.scrollToSelected()
    }
}