const functions = {

    collectionToObj: (obj) => {
        let dict={};
        let i=0;
        for (let key in obj) {
            if (i < obj.length) {
                dict[i]=obj[key]
            };
            i++;
        };
        return dict;
    },
    addTag: (tag, text, arrClasses) => {
        let newElement = document.createElement(tag);
        newElement.appendChild( document.createTextNode(text));
        arrClasses.forEach( (element) => {
            newElement.classList.add(element);
        });
        return newElement;
    },
    addButton: (button, text, arrClasses) => {
        let newButton = document.createElement(button);
        newButton.innerHTML = text;
        arrClasses.forEach( (element) => {
            newButton.classList.add(element);
        });
        return newButton;
    },
    removeParent: (element) => {
        element.parentElement.remove();
    },
    addBtnDel: () => {
        let newButton = functions.addButton( 'button', 'x', ['classBtnDel']);
        newButton.addEventListener('click', () => {
            functions.removeParent(newButton);
        });
        return newButton;
    },
    
};

export default functions;