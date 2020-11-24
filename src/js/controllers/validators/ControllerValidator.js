
export const ControllerValidator = {

    construct(target, args) {
        const [el,options] = args,
            domElement = document.querySelector(el);

        if(!domElement){
            throw new Error(`There was not found an element with the selector ${el}`)
        }

        return new target(el,options)
    }
}