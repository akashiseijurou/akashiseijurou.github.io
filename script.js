const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: './img/ba.jpg',
        text: "Raiden Shogun"
    },
    {
        image: './img/ke.jpg',
        text: "Keqing"
    },
    {
        image: './img/ghjg.jpg',
        text: "Eula"
    },
    {
        image: './img/gn.jpg',
        text: "Ganyu"
    },
    {
        image: './img/aa.jpeg',
        text: "girl0"
    },
    {
        image: './img/cc.jpg',
        text: "miku"
    },
    {
        image: './img/dd.jpeg',
        text: "girl1"
    },
    {
        image: './img/ee.jpg',
        text: "fumi"
    },
    {
        image: './img/ff.jpeg',
        text: "girl"
    },
    {
        image: './img/kk.jpg',
        text: "Kokomi"
    },
    {
        image: './img/kklk.jpg',
        text: "Ayaka"
    },
    {
        image: './img/rr.jpg',
        text: "Rider"
    }
];

data.forEach(createBox);

//create speech boxes
function createBox(item) {
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

        // add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });

    main.appendChild(box);
}

// init speech synth
const message = new SpeechSynthesisUtterance();

// store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    });
}

// set text
function setTextMessage(text) {
    message.text = text;
}

//speak text
function speakText() {
    speechSynthesis.speak(message);
}

// set voice
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

// voices change
speechSynthesis.addEventListener('voiceschanged', getVoices);

// toggle text box
toggleBtn.addEventListener('click', () => 
    document.getElementById('text-box').classList.toggle('show')
);

// close text box
closeBtn.addEventListener('click', () => 
    document.getElementById('text-box').classList.remove('show')
);

// change voice
voicesSelect.addEventListener('change', setVoice);

// read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

getVoices();