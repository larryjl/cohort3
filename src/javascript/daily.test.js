import functions from './daily.js'

// -- Daily 2019-11-26

test('today destructuring', () => {
    const squares = ['X','X','X','O','O',,,,]
    expect(functions.calculateWinner(squares)).toBe('X');
});


// -- Daily 2019-11-22

const myArray = [
    {num: 5,str: "apples", origin:"BC"},
    {num: 7,str: "oranges", origin:"Florida"},
    {num: 2,str: "lemons", origin:"Mexico"},
    // {num: 8,str: "bananas", origin:"Ecuador"},
    // {num: 6,str: "avocados", origin:"Mexico"},
    // {num: 4,str: "pineapple", origin:"Brazil"},
    // {num: 3,str: "blueberries", origin:"Chile"},
    // {num: 9,str: "pears", origin:"Oregon"},
    // {num: 1,str: "cantaloupe", origin:"California"}
];

test('numSort', () => {
    const result = functions.numSort(myArray, 'num').map(e => e.num);
    expect(result).toEqual([2,5,7]);
});

test('alphaSort', () => {
    const result = functions.alphaSort(myArray, 'str').map(e => e.str);
    expect(result).toEqual(['apples','lemons','oranges']);
});

test('alphaRevSort', () => {
    const result = functions.alphaRevSort(myArray, 'origin').map(e => e.origin);
    expect(result).toEqual(['Mexico','Florida','BC']);
});

// -- Sample data for daily 2019-11-09

const people = [
    {fname:"Alex", lname:"Smith", province:"BC", age:33},
    {fname:"Angela", lname:"Jones", province:"AB", age:61},
    {fname:"Anne", lname:"Bird", province:"SK", age:35},
    {fname:"Brent", lname:"Riddle", province:"MN", age:79},
    {fname:"Byron", lname:"Cardenas", province:"BC", age:38},
    {fname:"Carrie", lname:"Ramirez", province:"AB", age:89},
    {fname:"Cheryl", lname:"Glenn", province:"SK", age:70},
    {fname:"Dima", lname:"Curry", province:"MN", age:67},
    {fname:"Dustin", lname:"Bullock", province:"BC", age:59},
    {fname:"Eva", lname:"Keiths", province:"AB", age:24},
    {fname:"Faith", lname:"Liu", province:"SK", age:46},
    {fname:"Fawad", lname:"Bowman", province:"MN", age:69},
    {fname:"Forest", lname:"Vaughn", province:"BC", age:52},
    {fname:"Giovanni", lname:"Browning", province:"AB", age:32},
    {fname:"Greg", lname:"Hogan", province:"SK", age:55},
    {fname:"Harpreet", lname:"Ramsey", province:"MN", age:18},
    {fname:"Ian", lname:"Fitzgerald", province:"BC", age:16},
    {fname:"James", lname:"Kramer", province:"AB", age:57},
    {fname:"Jarvis", lname:"Ortega", province:"SK", age:69},
    {fname:"Jawad", lname:"Huerta", province:"MN", age:35},
    {fname:"Jinbong", lname:"Robinson", province:"BC", age:26},
    {fname:"Jingnan", lname:"Hatfield", province:"AB", age:71},
    {fname:"Joe", lname:"Banks", province:"SK", age:37},
    {fname:"Kristina", lname:"Dalton", province:"MN", age:73},
    {fname:"Latora", lname:"Matthews", province:"BC", age:25},
    {fname:"Lauren", lname:"McClure", province:"AB", age:42},
    {fname:"Licedt", lname:"Rasmussen", province:"SK", age:30},
    {fname:"Linden", lname:"Pierce", province:"MN", age:68},
    {fname:"Luis", lname:"Price", province:"BC", age:23},
    {fname:"Marcela", lname:"Perez", province:"AB", age:20},
    {fname:"Marilou", lname:"Graham", province:"SK", age:32},
    {fname:"Matt", lname:"Novak", province:"MN", age:29},
    {fname:"Monica", lname:"Giles", province:"BC", age:34},
    {fname:"Niloufar", lname:"Carson", province:"AB", age:29},
    {fname:"Omar", lname:"Olson", province:"SK", age:69},
    {fname:"Roger", lname:"Woodard", province:"MN", age:84},
    {fname:"Roman", lname:"Swanson", province:"BC", age:21},
    {fname:"Seun", lname:"Kelly", province:"AB", age:60},
    {fname:"Shane", lname:"Frost", province:"SK", age:87},
    {fname:"Steven", lname:"Haynes", province:"MN", age:47},
    {fname:"Thomas", lname:"Hart", province:"BC", age:14},
    {fname:"Trent", lname:"Kerr", province:"AB", age:12},
    {fname:"Darrell", lname:"Koch", province:"SK", age:10},
    {fname:"Tylor", lname:"Torres", province:"MN", age:98}
];
const arrProv = ["AB","BC"]

// Daily 2019-11-09 province callbacks
test('flat', () => {
    const array = [1,[2],3];
    const result = array.flat(); // jest requires core-js to use flat, flatmap
    expect(result).toEqual([1,2,3]);
});
test('select people', () => {
    const result = functions.selectPeople(people, arrProv);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(v => {
        expect(v.province == "AB" || v.province == "BC")
            .toBe(true);
    });
});
test('people names', () => {
    const arrPeople = people;
    const objPeople = {...arrPeople};
    const result = functions.peopleNames.call(objPeople);
    expect(result.length).toEqual(arrPeople.length);
    arrPeople.forEach((v,i) => {
        expect(result[i]).toEqual(`${v.fname} ${v.lname}`);
    });
});
test('select names (call both functions wrapped together)', () => {
    const result = functions.selectNames(people, arrProv, functions.peopleNames);
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThan(people.length);
    result.forEach(v=>{
        expect(typeof v).toBe("string");
    });
});

// ********************************************************

// Sample data for the next few exercises.


const data = {
    staff: [
        { fname: "Jane", lname: "Smith", balance: 10 },
        { fname: "Liam", lname: "Henry", balance: 1000 },
        { fname: "Emma", lname: "Jones", balance: 1330 },
        { fname: "Olivia", lname: "Notly", balance: 310 },
        { fname: "Noah", lname: "Ho", balance: 503 },
        { fname: "William", lname: "Lee", balance: 520 },
        { fname: "Benjamin", lname: "Amis", balance: 150 },
    ],
    company: "EvolveU",
    city: "Calgary",
    prov: "Alberta"
};

// Daily 2019-11-06 big balance
test('balance >=1000', () => {
    const bigStaff = functions.bigBalance(data.staff);
    expect(bigStaff).toEqual([
        { fname: "Liam", lname: "Henry", balance: 1000 },
        { fname: "Emma", lname: "Jones", balance: 1330 }
    ]);
});

// Daily 2019-10-29 balance
test('total balance', () => {
    const total = functions.totalBalance(data.staff);
    expect(total).toBe(3823);
});
test('average balance', () => {
    const average = functions.averageBalance(data.staff);
    expect(average).toBeCloseTo(546.14, 2);
});

// Daily 2019-10-25 - foreach, map
test('emails with for in', () => {
    const staffEmail = functions.loopStaffForEach(data.staff);
    emailTests(staffEmail);
});
test('emails with for in', () => {
    const staffEmail = functions.loopStaffMap(data.staff);
    emailTests(staffEmail);
});

// Daily 2019-10-24 - for in, for of statements

const emailTests = (staffEmail) => {
    expect(staffEmail).toEqual([
        "jane.smith@evolveu.ca",
        "liam.henry@evolveu.ca",
        "emma.jones@evolveu.ca",
        "olivia.notly@evolveu.ca",
        "noah.ho@evolveu.ca",
        "william.lee@evolveu.ca",
        "benjamin.amis@evolveu.ca"
    ]);
};
test('emails with for in', () => {
    const staffEmail = functions.loopStaffIn(data.staff);
    emailTests(staffEmail);
});
test('emails with for of', () => {
    const staffEmail = functions.loopStaffOf(data.staff);
    emailTests(staffEmail);
});
// Daily 2019-10-21 - build email addresses for the company ***
test('email builder for company', () => {
    const staffEmail = functions.loopStaff(data.staff);
    expect(staffEmail[0])
        .toEqual("jane.smith@evolveu.ca");
    expect(staffEmail[3])
        .toEqual("olivia.notly@evolveu.ca");
    expect(staffEmail[6])
        .toEqual("benjamin.amis@evolveu.ca");
});

// Daily 2019-10-16
test('advanced js arrays', () => {
    expect(functions.arraySlice([0,1,2,3])).toEqual([1,2]);
    expect(functions.arraySplice([0,1,2])).toEqual([0,'a','b',2]);
    expect(functions.arrayForEach([0,1,2])).toEqual([0,2,4]);
    expect(functions.arrayMap([0,1,2])).toEqual([0,2,4]);
    expect(functions.arrayReduce([0,1,2])).toBe(4);
    expect(functions.arrayFilter([0,1,2])).toEqual([1,2]);
    expect(functions.arraySort([0,1,2])).toEqual([2,1,0]);
});

// Daily 2019-10-15
test('array loops', () => {
    expect(functions.loopFor([0,1,2])).toEqual([0,2,4]);
    expect(functions.loopWhile([0,1,2])).toEqual([0,2,4]);
    expect(functions.loopDoWhile([0,1,2])).toEqual([0,2,4]);
    expect(functions.loopForIn([0,1,2])).toEqual([0,2,4]);
    expect(functions.loopForOf([0,1,2])).toEqual([0,2,4]);
});

// Daily 2019-10-11
test('email builder from an object / map', () => {
    const name = { fname: 'first', lname: 'last' };
    expect(functions.makeEmailObj(name))
        .toEqual("first.last@evolveu.ca");
    expect(functions.makeEmailObj({ fname: 'First', lname: 'Last' }))
        .toEqual("first.last@evolveu.ca");
    expect(functions.makeEmailObj({ fname: "Bill", lname: "Smith" }))
        .toEqual("bill.smith@evolveu.ca");
});

// Daily 2019-10-09
test('email builder from an array', () => {
    const name = ["first", "last"];
    expect(functions.makeEmailArr(name))
        .toEqual("first.last@evolveu.ca");
    expect(functions.makeEmailArr(["First", "Last"]))
        .toEqual("first.last@evolveu.ca");
    expect(functions.makeEmailArr(["Bill", "Smith"]))
        .toEqual("bill.smith@evolveu.ca");
});

// Daily 2019-10-07
test('Check equality', () => {
    expect(functions.assertEquals('a','b')).toBe(false);
    expect(functions.assertEquals('a','a')).toBe(true);
    expect(functions.assertEquals(1,2)).toBe(false);
    expect(functions.assertEquals(2,2)).toBe(true);
    expect(functions.assertEquals('2',2)).toBe(false); // tbd
    expect(functions.assertEquals(2.0,2)).toBe(true);
    expect(functions.assertEquals('this value','this value')).toBe(true);
});
