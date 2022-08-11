'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Santiago Jimenez',
  ownerNo: 1,
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
    '2022-01-15T23:36:17.929Z',
    '2022-01-18T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Charlotte Gin',
  ownerNo: 2,
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
  owner: 'Sofía Mercedes',
  ownerNo: 3,
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-08-12T21:31:17.178Z',
    '2019-10-02T07:42:02.383Z',
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
  owner: 'María Mateo',
  ownerNo: 4,
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

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelName = document.querySelector('.first__name');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');

const container = document.querySelector('.container');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements__mov');
const closeAccount = document.querySelector('.close-account');
const modalContainer = document.querySelector('.operation');

const btnLogin = document.querySelector('.login__btn');
const btnLoan = document.querySelector('.form__btn--loan');
const btnSort = document.querySelector('.btn--sort');
const btnSignup = document.querySelector('.signup__btn');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputSignupUsername = document.querySelector('.signup__input--user');
const inputSignupPin = document.querySelector('.signup__input--pin');
const inputSignupFirstName = document.querySelector(
  '.signup__input--user-firstname'
);
const inputSignupLastName = document.querySelector(
  '.signup__input--user-lastname'
);
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const btnLogOut = document.querySelector('.log-out');

const beneficiary = document.querySelectorAll('.transaction__beneficiaries');
const closeModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const loginSection = document.querySelector('.log-section');
const overlay = document.querySelector('.overlay');
const userImg = document.querySelector('.user-img');

///////////////////////////////////////

// Functions
const createUsername = (accs) => {
  accs.forEach((el) => {
    el.userName = el.owner
      .toLowerCase()
      .split(' ')
      .map((el) => el[0])
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

// Date Formatter
const dateFormat = function (date, locale) {
  const currentDate = new Date();
  const daysPassed = Math.round(
    Math.abs(currentDate - date) / (1000 * 60 * 60 * 24)
  );
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

// Display Movements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ' ';

  const sortMovs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  sortMovs.forEach((el, i) => {
    const transactionType = el > 0 ? 'deposit' : 'withdrawal';
    const formatted = curFormat(el, acc.locale, acc.currency);
    const date = new Date(acc.movementsDates[i]);
    const displayDate = dateFormat(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${transactionType}">
        ${i + 1} ${transactionType}
      </div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatted}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculate Balance
const calcBalance = function (acc) {

  if (acc.movements.length === 0) {
    labelBalance.textContent = curFormat(1000, acc.locale, acc.currency);
  } else {
    acc.balance = acc.movements.reduce((acc, el) => acc + el, 0);
    labelBalance.textContent = curFormat(acc.balance, acc.locale, acc.currency);
  }
};

// Calculate Summary
const calcSummary = function (acc) {
  if (acc.movements.length === 0) {
    return;
  } else {
    const incomes = acc.movements
      .filter((el) => el > 0)
      .reduce((acc, el) => acc + el);
    labelSumIn.textContent = curFormat(incomes, acc.locale, acc.currency);

    const outcomes = acc.movements
      .filter((el) => el < 0)
      .reduce((acc, el) => acc + el);
    labelSumOut.textContent = curFormat(
      Math.abs(outcomes),
      acc.locale,
      acc.currency
    );

    const interest = acc.movements
      .filter((el) => el > 0)
      .map((el) => el * (acc.interestRate / 100))
      .filter((el) => el > 1)
      .reduce((acc, el) => acc + el);
    labelSumInterest.textContent = curFormat(
      interest,
      acc.locale,
      acc.currency
    );
  }
};

// Display beneficiaries
let filterBeneficiaries, benefi;
const transactionBeneficiaries = function () {
  filterBeneficiaries = accounts.filter(
    (el) => el.ownerNo != currentAccount.ownerNo
  );

  document.querySelector('.transaction__beneficiaries').innerHTML = '';

  filterBeneficiaries.forEach((el) => {
    const html = `
      <button class = "beneficiary beneficiary-1">
        <img src="img/img-${el.ownerNo}.jpg" alt="${
      el.owner
    }" class="beneficiary__img">
        <p class= "beneficiary__name">${el.owner.split(' ')[0]} ${
      el.owner.split(' ')[1][0]
    }</p>
      </button>
    `;

    document
      .querySelector('.transaction__beneficiaries')
      .insertAdjacentHTML('beforeend', html);
  });

  benefi = document.querySelectorAll('.beneficiary');

  benefi.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openM();
      document.querySelector('.modal').innerHTML = '';
      document.querySelector('.modal').classList.add('operation--loan');
      document.querySelector('.modal').classList.remove('operation--close');

      const html = `
        <div class="operation--header operation--header-loan">
          <i class="fa-solid fa-money-bill-transfer"></i>
          <h2>Transfer to: ${el.innerText}</h2>
        </div>
        <form class="form form--transfer">
          <input
            type="number"
            class="form__input form__input--amount"
            placeholder="Amount"
          />
          <button class="form__btn form__btn--transfer">
            <i class="fa-solid fa-arrow-right-long"></i>
          </button>
          <!-- <label class="form__label form__label--loan">Amount</label> -->
        </form>
        <button class="close-modal">&times;</button>
        `;
      document.querySelector('.modal').insertAdjacentHTML('afterbegin', html);
      closeEvent();

      const btnTransfer = document.querySelector('.form__btn--transfer');
      const inputTransferTo = el.innerText
        .toLowerCase()
        .split(' ')
        .map((el) => el[0])
        .join('');
      const inputTransferAmount = document.querySelector(
        '.form__input--amount'
      );

      btnTransfer.addEventListener('click', (e) => {
        e.preventDefault();

        const recieverAccount = accounts.find(
          (el) => el.userName === inputTransferTo
        );

        const amount = +inputTransferAmount.value;
        const date = new Date();
        if (
          recieverAccount &&
          amount &&
          amount > 0 &&
          recieverAccount !== currentAccount &&
          currentAccount.balance > amount
        ) {
          currentAccount.movements.push(-amount);
          currentAccount.movementsDates.push(date);
          recieverAccount.movements.push(amount);
          recieverAccount.movementsDates.push(date);
          displayMovements(currentAccount);
          calcBalance(currentAccount);
          calcSummary(currentAccount);
        }
        inputTransferAmount.value = '';
        closeM();
      });
    });
  });
};

// Delete Account
const deleteAccount = function () {
  btnClose.addEventListener('click', (e) => {
    e.preventDefault();
    if (
      currentAccount.userName === inputCloseUsername.value &&
      currentAccount.pin === +inputClosePin.value
    ) {
      accounts.splice(
        accounts.findIndex((el) => el.userName === inputCloseUsername.value),
        1
      );
    }
    inputClosePin.value = inputCloseUsername.value = '';
  });
};

// Close Modal
let closeM;
const closeEvent = function () {
  closeM = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  document.querySelector('.close-modal').addEventListener('click', () => {
    closeM();
  });

  // Close Modal on Keypress
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeM();
    }
  });
};

// Sort Account
let sorted = false;
const sort = function () {
  btnSort.addEventListener('click', (e) => {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
  });
};

// Open Modal
const openM = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const profileImg = function (acc) {
  const html = `
    <img src="img/img-${acc.ownerNo}.jpg" alt="Image of a person" class="user-img"></img>
  `;

  document
    .querySelector('.user__container')
    .insertAdjacentHTML('beforeend', html);
};
///////////////////////////////////////////
// Event Handlers

// Login functionality
let currentAccount;
btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  const loginFilter = inputLoginUsername.value.toLowerCase();

  currentAccount = accounts.find((el) => el.userName === loginFilter);

  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`;
    labelName.textContent = `${currentAccount.owner}`;
    loginSection.style.display = 'none';
    document.querySelector('.login').classList.add('hidden');
    document.querySelector('.signup').classList.add('hidden');
    inputLoginPin.value = inputLoginUsername.value = '';
    container.style.display = 'block';
  } else {
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
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

  transactionBeneficiaries();
  displayMovements(currentAccount);
  calcBalance(currentAccount);
  calcSummary(currentAccount);
  profileImg(currentAccount);
  sort();
});

// Logout functionality
btnLogOut.addEventListener('click', (e) => {
  e.preventDefault();
  loginSection.style.display = 'grid';
  document.querySelector('.login').classList.remove('hidden');
  document.querySelector('.signup').classList.add('hidden');
  container.style.display = 'none';

  currentAccount = {};
});

// loan Functionality
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const loanAmount = +inputLoanAmount.value;
  const date = new Date().toISOString();
  if (currentAccount.movements.some((el) => el > el * (10 / 100))) {
    currentAccount.movements.push(loanAmount);
    currentAccount.movementsDates.push(date);
    displayMovements(currentAccount);
    calcBalance(currentAccount);
    calcSummary(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Close account functionality
closeAccount.addEventListener('click', (e) => {
  openM();
  document.querySelector('.modal').innerHTML = '';
  document.querySelector('.modal').classList.remove('operation--loan');
  document.querySelector('.modal').classList.add('operation--close');

  const close = `
      <div class="operation--header operation--header-close">
      <i class="fa-solid fa-key"></i>
      <h2>Close Account</h2>
    </div>
    <form class="form form--close">
    <input type="text" class="form__input form__input--user" placeholder = "User Id"/>
      <input
      type="password"
      maxlength="4"
      class="form__input form__input--pin"
      placeholder = "Pin"
    />
      <button class="form__btn form__btn--close">
        <i class="fa-solid fa-arrow-right-long"></i>
      </button>
    </form>
    <button class="close-modal">&times;</button>`;

  document.querySelector('.modal').insertAdjacentHTML('afterbegin', close);

  document.querySelector('.form--close').style.gridTemplateColumns =
    '1fr 1fr .4fr';

  closeEvent();

  const inputCloseUsername = document.querySelector('.form__input--user');
  const inputClosePin = document.querySelector('.form__input--pin');
  const btnClose = document.querySelector('.form__btn--close');

  btnClose.addEventListener('click', (e) => {
    e.preventDefault();
    if (
      currentAccount.userName === inputCloseUsername.value &&
      currentAccount.pin === +inputClosePin.value
    ) {
      accounts.splice(
        accounts.findIndex((el) => el.userName === inputCloseUsername.value),
        1
      );

      loginSection.style.display = 'grid';
      container.style.display = 'none';
      overlay.style.display = 'none';
    }
    // inputClosePin.value = inputCloseUsername.value = '';
  });
});

btnSignup.addEventListener('click', (e) => {
  e.preventDefault();

  const newAccount = {
    owner: ''.concat(
      inputSignupFirstName.value.charAt(0).toUpperCase() +
        inputSignupFirstName.value.slice(1),
      ' ',
      inputSignupLastName.value.charAt(0).toUpperCase() +
        inputSignupLastName.value.slice(1)
    ),
    movements: [],
    interestRate: 1.5,
    pin: +inputSignupPin.value,
    movementsDates: [],
    currency: 'USD',
    locale: navigator.language,
    userName: inputSignupUsername.value,
  };

  accounts.push(newAccount);
  currentAccount = accounts.find(
    (el) => el.userName === inputSignupUsername.value
  );
  labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`;
  labelName.textContent = `${currentAccount.owner}`;
  loginSection.style.display = 'none';
  inputLoginPin.value = inputLoginUsername.value = '';
  container.style.display = 'block';

  const date = new Date();
  labelDate.textContent = new Intl.DateTimeFormat(navigator.language, {
    hourCycle: 'h24',
    hour: '2-digit',
    minute: '2-digit',
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(date);

  transactionBeneficiaries();
  displayMovements(currentAccount);
  calcBalance(currentAccount);
  calcSummary(currentAccount);
  sort();
  profileImg(currentAccount);
});
