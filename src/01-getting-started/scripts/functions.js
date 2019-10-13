
const functions = {
    
    size: (num) => {
        if (num <0) return "negative";
        if (num < 10) return "small";
        if (num < 20) return "medium";
        if (num < 101) return "large";
        return "extra large";
    },

    // calculator
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

    calcSubmit: (num1, num2, operation) => {
        num1 = Number(num1);
        num2 = Number(num2);
        switch(operation) {
            case 'add':
                return functions.add(num1, num2);
            case 'minus':
                return functions.minus(num1, num2);
            case 'times':
                return functions.times(num1, num2);
            case 'divide':
                return functions.divide(num1, num2);
        }
    },

    // tax            
    // 15% on the first $47,630 of taxable income, plus
    // 20.5% on the next $47,629 of taxable income (on the portion of taxable income over 47,630 up to $95,259), plus
    // 26% on the next $52,408 of taxable income (on the portion of taxable income over $95,259 up to $147,667), plus
    // 29% on the next $62,704 of taxable income (on the portion of taxable income over 147,667 up to $210,371), plus
    // 33% of taxable income over $210,371
    tax: (income) => { //income must be number
        const taxBrackets=[
            [0, .15],
            [47630, .205],
            [95259, .26],
            [147667, .29],
            [210371, .33],
            [999999999999, 1]
        ];
        // let remainder;
        let total=0;
        // let i=0;
        for (let i=0; i<5; i++) {
            let bracketLower = taxBrackets[i][0]
            if (income>bracketLower) {
                let taxable = Math.min(income,taxBrackets[i+1][0]) - bracketLower;
                total = total + (taxable * taxBrackets[i][1]);
            } else break;
        };

        // do {
        //     let bracketLower = taxBrackets[i][0];
        //     let rate = taxBrackets[i][1];
        //     let remainder = income - bracketLower;
        //     let taxable = max(remainder, income);
        //     let total = total+(taxable*rate);
        //     i++;
        // }
        // while (remainder>0 && i<5);
        return +(Math.round(total + "e+2")  + "e-2");;
    }

};

export default functions;
