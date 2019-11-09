const functions = {

    // *** 2019-11-09
    selectPeople: (arrPeople, arrProv) => {
        return arrProv.flatMap(prov => 
            arrPeople.filter(
                person => 
                    person.province.toUpperCase() === prov.toUpperCase()
            )
        );
    },
    peopleNames: (arrPeople) => {
        return arrPeople.map(v => `${v.fname} ${v.lname}`);
    },
    selectNames: (arrPeople, arrProv) => {
        return (functions.peopleNames(
            functions.selectPeople(arrPeople, arrProv)
        ));
    },


    // *** 2019-11-06
    // create a new array for balances >= 1000 from the staff data
    bigBalance: (arrStaff) => {
        return arrStaff.filter(staff => staff.balance >= 1000);
    },

    // *** 2019-10-29
    // 1. write a function to receive the same array (staff) and return the total of balances
    // 2. write a function to receive the same array (staff) and return the average the balances
    totalBalance: (arrStaff) => {
        const arrBalance = arrStaff.map((person)=>{
            return person.balance;
        });
        return arrBalance.reduce((a, b) => a + b);
    },

    averageBalance: (arrStaff) => {
        const total = functions.totalBalance(arrStaff);
        return total / arrStaff.length;
    },


    // *** 2019-10-25 build emails using foreach, map
    loopStaffForEach: (arrStaff) => {
        const arrStaffEmail=[];
        arrStaff.forEach((v, i)=>{
            arrStaffEmail[i]=functions.makeEmailObj(v);
        });
        return arrStaffEmail;
    },
    loopStaffMap: (arrStaff) => {
        return arrStaff.map(functions.makeEmailObj);
    },

    // *** 2019-10-24 build emails using for in, for of
    loopStaffIn: (arrStaff) => {
        let arrStaffEmail = [];
        for (const p in arrStaff) {
            arrStaffEmail[p] = functions.makeEmailObj(arrStaff[p]);
        };
        return arrStaffEmail;
    },
    loopStaffOf: (arrStaff) => {
        let arrStaffEmail = [];
        let i = 0;
        for (const v of arrStaff) {
            arrStaffEmail[i] = functions.makeEmailObj(v);
            i++;
        };
        return arrStaffEmail;
    },
    // *** 2019-10-21 take an array and return an array of emails ***
    
    loopStaff: (arrStaff) => {
        return arrStaff.map(functions.makeEmailObj);
    },
    
    // *** 2019-10-16 ***

    arraySlice: (arr) => {
        return arr.slice(1,3);
    },
    arraySplice: (arr) => {
        arr.splice(1,1,'a','b');
        return arr;
    },
    arrayForEach: (arr) => {
        arr.forEach( (v,i) => {
            arr[i]=v*2;
        });
        return arr;
    },
    arrayMap: (arr) => {
        let newArr = arr.map( v => 
            v*2
        );
        return newArr;
    },
    arrayReduce: (arr) => {
        let newArr = arr.reduce( (accumulator, v) =>
            accumulator + v,
            1 // initial value (optional)
        );
        return newArr;
    },
    arrayFilter: (arr) => {
        let newArr = arr.filter( v => 
            v>0
        );
        return newArr;
    },
    arraySort: (arr) => {
        arr.sort( (a,b) => 
            b-a);
        return arr;
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
    },

    // *** 2019-10-11 ***

    makeEmailObj: (obj) => {
        const firstName = obj['fname'];
        const lastName = obj['lname'];
        const email = (`${firstName}.${lastName}@evolveu.ca`).toLowerCase();
        return email;
    },

    // *** 2019-10-09 ***

    makeEmailArr: (arr) => {
        const firstName = arr[0].toLowerCase();
        const lastName = arr[1].toLowerCase();
        const email = `${firstName}.${lastName}@evolveu.ca`;
        return email;
    },

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
            // console.log(
            //     ` *** the two values are not the same
            //     p1-->${a}
            //     p2-->${b}`);
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



};

export default functions;