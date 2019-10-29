const functions = {
  // update the accounts dropdown
  accountSelectUpdate: (targetId, accountName, select) => {
    let options = {};
    let option = {};
    switch (targetId) {
      case 'idBtnRemove':
        option = select.querySelector(`option[value="${accountName}"]`);
        option.remove();
        break;
      case 'idBtnAdd':
        option = document.createElement('option');
        option.value = accountName;
        option.textContent = accountName;
        option.classList.add('classOption');
        select.appendChild(option);
        break;
      default:
    };
  },

  // update the account heading
  accountHeadingUpdate: (heading, select) => {
    heading.textContent = `Your ${select.value} account`
  },

  // 130c add, remove, total, highest, lowest
  controlClick: (
    event, 
    controller, 
    inputName, 
    inputBalance=0, 
    output, 
    select,
    heading
  ) => {
    inputBalance = (isNaN(inputBalance))
      ? 0
      : Math.floor(inputBalance * 100) / 100; // validate and round
    let accountName;
    let msg;
    switch(event.target.id) {
      case 'idBtnRemove':
        accountName = select.value;
        // accountName = select.options[select.selectedIndex].text; // -- alternate for select value
        msg = controller.remove(accountName);
        output.textContent = (msg === 'error')
          ? `Account does not exist: ${accountName}`
          : `Removed account: ${accountName}`;
        functions.accountSelectUpdate(event.target.id, accountName, select);
        functions.accountHeadingUpdate(heading, select);
        break;
      case 'idBtnAdd':
        accountName = inputName;
        msg = controller.add(accountName, inputBalance);
        output.textContent = (msg === 'error')
          ? `Account already exists: ${accountName}`
          : `Added account: ${accountName}`;
        functions.accountSelectUpdate(event.target.id, accountName, select);
        functions.accountHeadingUpdate(heading, select);
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
  accountClick: (event, account, inputNum=0, output) => {
    inputNum = (isNaN(inputNum))
      ? 0
      : Math.floor(inputNum * 100) / 100; // validate and round
    let msg;
    switch(event.target.id) {
      case 'idBtnDeposit':
        msg = account.deposit(inputNum);
        output.textContent = `Deposited: $${inputNum.toFixed(2)}`;
        break;
      case 'idBtnWithdraw':
        msg = account.withdraw(inputNum);
        output.textContent = (msg === 'error') 
          ? 'Insufficient balance.' 
          : `Withdrew: $${inputNum.toFixed(2)}`;
        break;
      case 'idBtnBalance':
        msg = account.balance();
        output.textContent = `Current balance: $${msg.toFixed(2)}`;
        break;
      default:
    };
  }
};

export default functions;