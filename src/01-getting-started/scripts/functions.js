
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

    subtract: (num1, num2) => {
        return num1 - num2;
    },

    multiply: (num1, num2) => {
        return num1 * num2;
    },

    divide: (num1, num2) => {
        return num1 / num2;
    }, 

    calcButton: (operation) => {switch(operation) {
            case '+':
            calcInputNd.value = calcInputNd.value + '+';
            break;
            case '&minus':
            calcInputNd.value = calcInputNd.value + '-';
            break;
            case '&times':
            calcInputNd.value = calcInputNd.value + '*';
            break;
            case '&divide':
            calcInputNd.value = calcInputNd.value + '/';
            break;
        }
    },
    calcSubmit: () => {}
};

export default functions;
