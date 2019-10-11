
const functions = {
    
    size: (num) => {
        if (num <0) return "negative";
        if (num < 10) return "small";
        if (num < 20) return "medium";
        if (num < 101) return "large";
        return "extra large";
    },

    add: (num1, num2) => {
        return num1 + num2;
    },

    minus: (num1, num2) => {
        return num1 - num2;
    },

    times: (num1, num2) => {
        return num1 * num2;
    },

    divide: (num1, num2) => {
        return num1 / num2;
    }, 

    calcSubmit: (node, num1, num2, operation) => {
        num1 = Number(num1);
        num2 = Number(num2);
        let result;
        switch(operation) {
            case 'add':
                result = functions.add(num1, num2);
                if (node!==null) {node.textContent = result;};
                return result;
            case 'minus':
                result = functions.minus(num1, num2);
                if (node!==null) {node.textContent = result;};
                return result;
            case 'times':
                result = functions.times(num1, num2);
                if (node!==null) {node.textContent = result;};
                return result;
            case 'divide':
                result = functions.divide(num1, num2);
                if (node!==null) {node.textContent = result;};
                return result;
        }
    }
};

export default functions;
