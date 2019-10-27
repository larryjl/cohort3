const functions = {
  hearClick: (event, account, input, output) => {
    
    switch(event.target.id) {
      case 'idBtnDeposit':
        account.deposit(input);
        break;
      case 'idBtnWithdraw':
        account.withdraw(input);
        break;
      case 'idBtnBalance':
        let balance = account.balance().toFixed(2);
        console.log(balance);
        output.textContent = `Current balance: $${balance}`;
        break;
      default:
    };
  }
};

export default functions;