const currencyElOne = document.getElementById('currency-one');
const amountElOne = document.getElementById('amount-one');
const currencyElTwo = document.getElementById('currency-two');
const amountElTwo = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

const fetchJson = () => {
  fetch('items.json')
    .then((res) => res.json())
    .then((data) => {
      const items = document.querySelector('.json-items');
      data.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = item.text;
        items.appendChild(listItem);
      });
    });
};

const calculate = () => {
  const currencyOne = currencyElOne.value;
  const currencyTwo = currencyElTwo.value;

  fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currencyTwo];

      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

      amountElTwo.value = (amountElOne.value * rate).toFixed(2);
    });
};

currencyElOne.addEventListener('change', calculate);
amountElOne.addEventListener('input', calculate);
currencyElTwo.addEventListener('change', calculate);
amountElTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyElOne.value;
  currencyElOne.value = currencyElTwo.value;
  currencyElTwo.value = temp;
});

fetchJson();
calculate();
