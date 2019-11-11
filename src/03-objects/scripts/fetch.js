const fetch = require('node-fetch');

const functions = {

  url: 'https://uinames.com/api/?amount=10',

  getFirstName(data) {
      return (data[0].name);
  },

  getAllFirstNames(data) {
      return data.map((d, i, x) => d.name);
  },

  showDelayProblem() {
      let arr = [];
    //   console.log('One');
      arr.push('One');
      setTimeout(() => {          // Simulates a fetch
        //   console.log("Two");
          arr.push('Two');
      }, 0.1 * 1000);
    //   console.log('Three');       // We have a problem Huston
      arr.push('Three');
      const result = arr.join();
      return result;
  },

  async showDelaySolution(error) {
      try {
          let arr=[];
        //   console.log('One');
          arr.push('One');
          const value = await                 // Simulate fetch
              new Promise(
                  (resolve, reject) =>
                      setTimeout(() => resolve("Two"),
                          0.1 * 1000));
                      if (error) {throw 'error'};
          // Now that we have the value we can use it.
        //   console.log(value);
          arr.push(value);
        //   console.log('Three');
          arr.push('Three');
          const result = arr.join();
          return result;
      } catch (error) {
        //   console.log(error);
          throw 'promise error';
      }
  },

  async getUsers(error) {
      try {
          if (error) {throw 'fetch error'};
          // console.log(functions.url);
          const response = await fetch(functions.url);
          const data = await response.json();
        //   console.log(data);
          return data;
      } catch (error) {
        //   console.error('Error:', error);
          throw (error);
      }
  },

  async workWithData(done) {
      const result = [];
      const data = await functions.getUsers();
      const oneName = functions.getFirstName(data);
    //   console.log(oneName);
      result.push(oneName);
      const allNames = functions.getAllFirstNames(data);
    //   console.log(allNames);
      result.push(allNames);
    //   console.log(result);
      return result;
  },
}


export default functions;