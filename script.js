'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2022-01-05T23:36:17.929Z',
    '2022-01-10T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-8-12T21:31:17.178Z',
    '2019-10-2T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-07-21T10:17:24.185Z',
    '2020-05-15T14:11:59.604Z',
    '2020-11-20T17:01:17.194Z',
    '2022-09-19T23:36:17.929Z',
    '2022-02-17T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'es-ES',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2022-01-02T21:31:17.178Z',
    '2022-01-12T07:42:02.383Z',
    '2022-01-13T09:15:04.904Z',
    '2022-01-08T10:17:24.185Z',
    '2022-01-05T14:11:59.604Z',
    '2022-01-11T17:01:17.194Z',
    '2022-01-14T23:36:17.929Z',
    '2022-01-01T10:51:36.790Z',
  ],
  currency: 'MXN',
  locale: 'es-MX',
};

const accounts = [account1, account2, account3, account4];
console.log(accounts);
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

///////////////////////////////////////

// Event Handlers
const createUsername = accs => {
  accs.forEach(el => {
    el.userName = el.owner
      .toLowerCase()
      .split(' ')
      .map(el => el[0])
      .join('');
  });
};
createUsername(accounts);

// Currency Formatter
const curFormat = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// Display Movements
const displayMovements = function (acc) {
  containerMovements.innerHTML = ' ';

  acc.movements.forEach((el, i) => {
    const transactionType = el > 0 ? 'deposit' : 'withdrawal';
    const formatted = curFormat(el, acc.locale, acc.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${transactionType}">
        ${i + 1} ${transactionType}
      </div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${formatted}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculate Balance
const calcBalance = function (acc) {
  const balance = acc.movements.reduce((acc, el) => acc + el, 0);
  labelBalance.textContent = curFormat(balance, acc.locale, acc.currency);
};

// Calculate Summary
const calcSummary = function (acc) {
  const incomes = acc.movements
    .filter(el => el > 0)
    .reduce((acc, el) => acc + el);
  labelSumIn.textContent = curFormat(incomes, acc.locale, acc.currency);
  const outcomes = acc.movements
    .filter(el => el < 0)
    .reduce((acc, el) => acc + el);
  labelSumOut.textContent = curFormat(
    Math.abs(outcomes),
    acc.locale,
    acc.currency
  );
  const interest = acc.movements
    .filter(el => el > 0)
    .map(el => el * (acc.interestRate / 100))
    .filter(el => el > 1)
    .reduce((acc, el) => acc + el);
  labelSumInterest.textContent = curFormat(interest, acc.locale, acc.currency);
};

const timerCountDown = function () {
  let time = 20;

  const timerCount = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const second = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${second}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };

  timerCount();
  const timer = setInterval(timerCount, 1000);
};

let currentAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  const loginFilter = inputLoginUsername.value.toLowerCase();

  currentAccount = accounts.find(el => el.userName === loginFilter);

  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
  }
  const date = new Date();
  labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, {
    hourCycle: 'h24',
    hour: '2-digit',
    minute: '2-digit',
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(date);

  containerApp.style.opacity = 1;
  inputLoginPin.value = inputLoginUsername.value = '';
  inputLoginPin.blur();

  displayMovements(currentAccount);
  calcBalance(currentAccount);
  calcSummary(currentAccount);
  timerCountDown();
});
