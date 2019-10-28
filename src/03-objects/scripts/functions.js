const functions = {

  // 130c add, remove, total, highest, lowest
  controlClick: (event, controller, inputName, inputBalance, output) => {
    let msg;
    switch(event.target.id) {
      case 'idBtnRemove':
        msg = controller.remove(inputName);
        output.textContent = (msg === 'error')
        ? `Account does not exist: ${inputName}`
        : `Removed account: ${inputName}`;
        break;
      case 'idBtnAdd':
        msg = controller.add(inputName, inputBalance);
        output.textContent = (msg === 'error')
          ? `Account already exists: ${inputName}`
          : `Added account: ${inputName}`;
        break;
      case 'idBtnTotal':
        msg = controller.total();
        output.textContent = (msg === 'error')
        ? `No accounts.`
        : `Total balance: $${msg.toFixed(2)}`;
        break;
      case 'idBtnHighest':
          msg = controller.highest();
          output.textContent = (msg === 'error')
          ? `No accounts.`
          : `Highest: name: ${msg.name}, balance: $${msg.bal.toFixed(2)}`;
        break;
      case 'idBtnLowest':
          msg = controller.lowest();
          output.textContent = (msg === 'error')
          ? `No accounts.`
          : `Lowest: name: ${msg.name}, balance: $${msg.bal.toFixed(2)}`;
        break;
      default:
    };
  },

  // -- 130b deposit, withdraw, balance
  accountClick: (event, account, input, output) => {
    let msg;
    switch(event.target.id) {
      case 'idBtnDeposit':
        msg = account.deposit(input);
        output.textContent = (msg === 'error') 
          ? 'Error.' 
          : `Deposited: $${input.toFixed(2)}`;
        break;
      case 'idBtnWithdraw':
        msg = account.withdraw(input);
        output.textContent = (msg === 'error') 
          ? 'Insufficient balance.' 
          : `Withdrew: $${input.toFixed(2)}`;
        break;
      case 'idBtnBalance':
        msg = account.balance();
        output.textContent = `Current balance: $${msg.toFixed(2)}`;
        break;
      case 'idBtnConfirm':
        break;
      default:
    };
  }
};

export default functions;