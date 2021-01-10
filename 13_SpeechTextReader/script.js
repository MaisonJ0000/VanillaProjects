const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/happy.jpg',
    text: '나는 기뻐요',
  },
  {
    image: './img/angry.jpg',
    text: '화낫심',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
];

const message = new SpeechSynthesisUtterance();

const setTextMessage = (text) => {
  message.text = text;
};
const speakText = () => {
  speechSynthesis.speak(message);
};

const createBox = (item) => {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
};

data.forEach(createBox);

let voices = [];

const getVoices = () => {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
};

const setVoice = (e) => {
  message.voice = voices.find((voice) => voice.name === e.target.value);
};

speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
