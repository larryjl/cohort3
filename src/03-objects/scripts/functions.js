const functions = {

  // update the accounts dropdown
  accountSelectUpdate: (targetId, accountName, select) => {
    let option = {};
    switch (targetId) {
      case 'idBtnRemove':
        option = select.querySelector(`option[value="${accountName}"]`);
        option.remove();
        break;
      case 'idBtnCreateConfirm':
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

  // show/hide dynamic divs
  dynamicDivs: (
    event,
    transaction,
    select,
    divSelect, 
    divCreate, 
    divReport, 
    divAccount, 
    divTransaction
  ) => {
    switch (event.target.id) {
      case 'idBtnAdd':
        divCreate.style.display='flex';
        break;
      case 'idBtnRemove':
        if (select.childElementCount===0) {
          divSelect.style.display='none';
          divReport.style.display='none';
          divAccount.style.display='none';
        };
        break;
      case 'idBtnCreateConfirm':
        divCreate.style.display='none';
        divSelect.style.display='flex';
        divReport.style.display='initial';
        divAccount.style.display='initial';
        break;
      case 'idBtnDeposit':
        transaction.textContent = 'Deposit ';
        divTransaction.style.display='flex';
        break;
      case 'idBtnWithdraw':
        transaction.textContent = 'Withdrawal ';
        divTransaction.style.display='flex';
        break;
      case 'idBtnTransactionConfirm':
        divTransaction.style.display='none';
        break;
      default: //-- do nothing
    }
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
        if (msg === 'error') {
          output.textContent = `Account does not exist: ${accountName}`;
        } else {
          output.textContent = `Removed account: ${accountName}`;
          functions.accountSelectUpdate(event.target.id, accountName, select);
          functions.accountHeadingUpdate(heading, select);
        };
        break;
      case 'idBtnCreateConfirm':
        accountName = inputName;
        msg = controller.add(accountName, inputBalance);
        if (msg === 'error') {
          output.textContent = `Account already exists: ${accountName}`;
        } else {
          output.textContent = `Added account: ${accountName}`;
          functions.accountSelectUpdate(event.target.id, accountName, select);
          functions.accountHeadingUpdate(heading, select);
        };
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
      default: // do nothing
    };
  },

  // -- 130b deposit, withdraw, balance
  accountClick: (event, transaction, account, inputNum=0, output) => {
    inputNum = (isNaN(inputNum))
      ? 0
      : Math.floor(inputNum * 100) / 100; // validate and round
    let msg;
    switch(event.target.id) {
      case 'idBtnDeposit':
        transaction.textContent = 'Deposit ';
        break;
      case 'idBtnWithdraw':
        transaction.textContent = 'Withdrawal ';
        break;
      case 'idBtnTransactionConfirm':
        switch (transaction.textContent) {
          case 'Deposit ':
            msg = account.deposit(inputNum);
            output.textContent = `Deposited: $${inputNum.toFixed(2)}`;
            break;
          case 'Withdrawal ':
            msg = account.withdraw(inputNum);
            output.textContent = (msg === 'error') 
              ? 'Insufficient balance.' 
              : `Withdrew: $${inputNum.toFixed(2)}`;
            break;
        };
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