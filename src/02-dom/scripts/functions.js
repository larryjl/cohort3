const functions = {

    collectionToObj: (arr) => {
        let newObj={};
        let i=0;
        while (i < arr.length) { // html collection of ol seems to have extra items
            newObj[i]=arr[i];
            i++;
        };
        return newObj;
    },
    makeTag: (tag, text, arrClasses) => {
        const newElement = document.createElement(tag);
        newElement.appendChild( document.createTextNode(text));
        if (arrClasses !== undefined) {
            arrClasses.forEach( (element) => 
                newElement.classList.add(element)
            );
        };
        return newElement;
    },
    addDel: (node) => {
        const newButton = functions.makeTag( 'button', 'x', ['classBtnDel']);
        newButton.addEventListener('click', () => newButton.parentElement.remove());
        node.appendChild(newButton);
        return newButton;
    },
    
    // *** part 2 ***

    cardContents: (container, cardCount) => {
        const h4 = functions.makeTag( 'h4', 'Card '+(cardCount), []);
        const p1 = functions.makeTag( 'p', '', []);
        const btnBefore = functions.makeTag( 'button', 'Add Before', ['classButton']);
        const btnAfter = functions.makeTag( 'button', 'Add After', ['classButton']);
        const p2 = functions.makeTag( 'p', '', []);
        const btnDelete = functions.makeTag( 'button', 'Delete', ['classButton']);
        container.appendChild(h4);
        container.appendChild(p1);
        p1.appendChild(btnBefore);
        p1.appendChild(btnAfter);
        container.appendChild(p2);
        p2.appendChild(btnDelete);
        const arrCardBtns = [btnBefore, btnAfter, btnDelete];
        return arrCardBtns;
    },
    count: 0,
    incrementCount: () => {
        functions.count++
        return functions.count;
    },

    addCard: (panel) => {
        let cardCount = functions.incrementCount(); // starts with 1 child: add card button
        const newCard = functions.makeTag( 'div', '', ['classCard']);
        panel.appendChild(newCard);
        const arrBtns = functions.cardContents(newCard, cardCount);
        const btnBefore = arrBtns[0];
        const btnAfter = arrBtns[1];
        const btnDelete = arrBtns[2];

        btnBefore.addEventListener( 'click', () => {
            const nextCard = functions.addCard(panel);
            panel.insertBefore(nextCard, newCard);
        });
        btnAfter.addEventListener( 'click', () => {
            const nextCard = functions.addCard(panel);
            panel.insertBefore(nextCard, newCard.nextSibling);
        });
        btnDelete.addEventListener( 'click', () => btnDelete.parentElement.parentElement.remove());

        return newCard;
    },
};

export default functions;