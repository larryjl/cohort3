const functions = {

    // *** 2019-10-07 ***

    /*    
        Write the function that will create this output:

    *** the two values are not the same:
        p1--> a
        p2--> b
    *** the two values are not the same:
        p1--> 1
        p2--> 2
    *** the two values are not the same:
        p1--> 2
        p2--> 2
    */

    // Write the function after this comment ---


    assertEquals: (a,b) => {
        if (!(a===b)) {
            console.log(
                ` *** the two values are not the same
                p1-->${a}
                p2-->${b}`);
        }
        return (a===b) ? true : false;
    },

    // and before this comment ---

    // assertEquals("a","b");
    // assertEquals("a","a");
    // assertEquals(1,2);
    // assertEquals(2,2);
    // assertEquals("2",2);
    // assertEquals("This value","This value");


    // *** 2019-10-09 ***

    makeEmailArr: (arr) => {
        const firstName = arr[0].toLowerCase();
        const lastName = arr[1].toLowerCase();
        const email = `${firstName}.${lastName}@evolveu.ca`;
        return email;
    },

    // *** 2019-10-09 ***

    makeEmailObj: (obj) => {
        const firstName = obj['fname'].toLowerCase();
        const lastName = obj['lname'].toLowerCase();
        const email = `${firstName}.${lastName}@evolveu.ca`;
        return email;
    },

    // *** 2019-10-15 ***

    loopFor: (arr) => {
        for (let i=0;i<arr.length; i++) {
            arr[i]=arr[i]*2;
        };
        return arr;
    },
    loopWhile: (arr) => {
        let i=0;
        while (i<arr.length) {
            arr[i]=arr[i]*2;
            i++;
        };
        return arr;
    },
    loopDoWhile: (arr) => {
        let i=0;
        do {
            arr[i]=arr[i]*2;
            i++;
        } while(i<arr.length)
        return arr;
    },
    loopForIn: (arr) => {
        for (const i in arr) {
            arr[i]=arr[i]*2
        };
        return arr;
    },
    loopForOf: (arr) => {
        let i=0;
        for (let v in arr) {
            arr[i]=v*2
            i++;
        };
        return arr;
    }

};

export default functions;