const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairsBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
const formatMoney = (number) => `$${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

const updateDOM = (providedData = data) => {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${
      formatMoney(item.money)
    }`;
    main.appendChild(element);
  });
};

const addData = (obj) => {
  data.push(obj);

  updateDOM();
};

const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api');
  const jsonData = await res.json();

  const user = jsonData.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

const doubleMoney = () => {
  data = data.map((user) => ({ ...user, money: user.money * 2 }));

  updateDOM();
};

const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
};

const showMillionairs = () => {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
};

const calculateWealth = () => {
  const wealth = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}
</strong></h3>`;

  main.appendChild(wealthEl);
};

getRandomUser();
getRandomUser();
getRandomUser();

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairsBtn.addEventListener('click', showMillionairs);
calculateWealthBtn.addEventListener('click', calculateWealth);
