'use strict';


//DATA
const account1 = {
    owner: 'Hélder Costa',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2,
    pin: 1111,

    movementsDates: [
        '2025-07-05T21:31:17.178Z',
        '2025-07-12T07:42:02.383Z',
        '2025-07-20T09:15:04.904Z',
        '2025-07-28T10:17:24.185Z',
        '2025-08-22T14:11:59.604Z',
        '2025-08-23T17:01:17.194Z',
        '2025-08-24T23:36:17.929Z',
        '2025-08-25T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT',
};

const account2 = {
    owner: 'Angélica Silva',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2025-07-01T13:15:33.035Z',
        '2025-07-08T09:48:16.867Z',
        '2025-07-15T06:04:23.907Z',
        '2025-07-22T14:18:46.235Z',
        '2025-08-19T16:33:06.386Z',
        '2025-08-21T14:43:26.374Z',
        '2025-08-23T18:49:59.371Z',
        '2025-08-25T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2];


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


//format date
const formatMovementDate = function (date, locale) {
    const calcDaysPassed = (date1 , date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
    const daysPassed = Math.round(calcDaysPassed(new Date(), date));
    if(daysPassed === 0) return 'Today';
    if(daysPassed === 1) return 'Yesterday';
    if(daysPassed <= 7) return `${daysPassed} days ago`;
    else{
        /*
        const day = `${date.getDate()}`.padStart(2, 0);
        const month = `${date.getMonth() + 1}`.padStart(2, 0);
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
        */
        return new Intl.DateTimeFormat(locale).format(date);
    }

}

//format the currency
const formatCur = function(value, locale, currency) {
    return new Intl.NumberFormat(locale, {style: "currency", currency: currency}).format(value);
}


//displaying movements
const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = '';

    const combinedMovsDates = acc.movements.map((mov, i) => ({movement: mov, movementDate: acc.movementsDates.at(i)}))
    //console.log(combinedMovsDates)

    if (sort) {
        combinedMovsDates.sort((a, b) => a.movement - b.movement);
    }

    // const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
    // console.log(movs)

    combinedMovsDates.forEach(function (object, index) {
        const{movement, movementDate} = object;

        const type = movement > 0 ? 'deposit' : 'withdrawal';
        const date = new Date(movementDate);
        const displayDate = formatMovementDate(date, acc.locale);
        const formatedMovement = formatCur(movement, acc.locale, acc.currency);
        const html = `
         <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatedMovement}</div>
        </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    })

}

//console.log(containerMovements.innerHTML);

//function to display the balance


const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((accumulator, mov) => accumulator + mov, 0);
    labelBalance.innerText = formatCur(acc.balance, acc.locale, acc.currency);
}


//function to create the username
const createUsername = function (accs) {
    accs.forEach((acc) => {//we will mutate the array, and thats what we want
        acc.username = acc.owner.toLowerCase().split(' ').map((name) => name[0]).join('');
        console.log(acc.username);
    })
}
createUsername(accounts);
//console.log(accounts)


//function to calc display summary
const calcDisplaySummary = function (account) {
    const incomes = account.movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
    const outcomes = account.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formatCur(incomes, account.locale, account.currency);
    labelSumOut.textContent = formatCur(Math.abs(outcomes), account.locale, account.currency);
    const interestRate = account.movements.filter((mov) => mov > 0).map((mov) => mov * (account.interestRate / 100)).filter((mov) => mov > 1).reduce((acc, mov) => acc + mov, 0);
    labelSumInterest.textContent = formatCur(interestRate, account.locale, account.currency);
    //console.log(incomes, outcomes, interestRate);
}

const updateUI = function (account) {
    //Display movements
    displayMovements(account);
    //Display Balance
    calcDisplayBalance(account);
    //Display summary
    calcDisplaySummary(account);
}

const startLogOutTimer = function () {
    const tick = function(){
        const minutes = `${Math.floor(time / 60)}`.padStart(2, 0);
        const seconds = `${time % 60}`.padStart(2, 0);
        //In each call, print the remaining time to UI
        labelTimer.textContent = `${minutes}:${seconds}`;
        //When time is 0, stop timer and logout user
        if(time === 0){
            clearInterval(timer);
            labelWelcome.textContent = `Log in to get started`;
            containerApp.style.opacity = '0';
        };
        //Decrease 1 sec
        time--;
    }
    //Set the time to 5 min
    let time = 120;
    //Call the timer every second
    tick();
    const timer =  setInterval(tick, 1000);
    return timer;
}

//Event handles for login
let currentAccount, timer;

//FAKED ALWAYS LOGIN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = '1';

//Experimenting with the API
const now = new Date();
const options ={
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
};

const locale = navigator.language;
console.log(locale);
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
console.log(labelDate.textContent);

/*
//day/month/year
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hour = now.getHours();
const minute = now.getMinutes();
labelDate.textContent = `${day}/${month}/${year},  ${hour}:${minute}`;
*/


//login event
btnLogin.addEventListener('click', function (e) {
    e.preventDefault()
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);
    if (currentAccount?.pin === +(inputLoginPin.value)) {
        //Display UI and welcome message
        labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}!`;
        containerApp.style.opacity = '1';

        const now = new Date();
        const options ={
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            //weekday: 'long',
        };

        const locale = currentAccount.locale;
        labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
        /*
        //create current date
        const now = new Date();
        //day/month/year
        const day = `${now.getDate()}`.padStart(2, 0);
        const month = `${now.getMonth() + 1}`.padStart(2, 0);
        const year = now.getFullYear();
        const hour = `${now.getHours()}`.padStart(2, 0);
        const minute = `${now.getMinutes()}`.padStart(2, 0);
        labelDate.textContent = `${day}/${month}/${year},  ${hour}:${minute}`;
*/
        //Clear the input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur(); //makes input lose his focus

        if(timer) clearInterval(timer);
        timer = startLogOutTimer();
        //UpdateUI
        updateUI(currentAccount);
    }
})


//transfer event
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = +(inputTransferAmount.value);
    const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
    console.log(amount, receiverAccount);
    inputTransferTo.value = inputTransferAmount.value = '';
    if (amount > 0 && receiverAccount && amount <= currentAccount.balance && receiverAccount?.username !== currentAccount.username) {
        //console.log('Transfer valid');
        //Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAccount.movements.push(amount);

        //add transfer date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAccount.movementsDates.push(new Date().toISOString());

        //Update UI
        updateUI(currentAccount);

        //Reset the timer
        clearInterval(timer);
        timer = startLogOutTimer();
    }
})

//request loan event
btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount =Math.floor(inputLoanAmount.value);
    if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
        setTimeout( () => {
        //Add movement
        currentAccount.movements.push(amount);

        //add loan date
        currentAccount.movementsDates.push(new Date().toISOString());

        //Update UI
        updateUI(currentAccount);}, 2500);
        //Reset the timer
        clearInterval(timer);
        timer = startLogOutTimer();
    }
    inputLoanAmount.value = '';
})


//sort movements event
let sorted = false;

btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});


//close account event
//delete an account - means delete an account from the accounts array
//to delete an element from the array we use the splice method (we need an index) - findIndex method

btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    //console.log('Delete')
    const user = inputCloseUsername.value;
    const pin = +(inputClosePin.value);
    if (currentAccount?.username === user && currentAccount?.pin === pin) {
        //console.log('Check done');
        const index = accounts.findIndex((account) => account.username === currentAccount.username)
        console.log(index);
        accounts.splice(index, 1)
        containerApp.style.opacity = '0';
    }
    inputCloseUsername.value = inputClosePin.value = '';
})

//console.log(accounts);

/*
labelBalance.addEventListener('click', function (e) {
    [...document.querySelectorAll('.movements__row')].forEach((row, i) =>{
        //0, 2, 4, 6, 8
        if(i % 2 === 0) row.style.backgroundColor = 'orangered';
        //0, 3, 6, 9, 12
         if(i % 3 === 0) row.style.backgroundColor = 'blue';
        }
    );
})
*/