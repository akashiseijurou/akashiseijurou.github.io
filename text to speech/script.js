const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: 'https://preppykitchen.com/wp-content/uploads/2019/06/Chocolate-cake-recipe-1200a.jpg',
        text: "Cake"
    },
    {
        image: 'https://s3-us-west-2.amazonaws.com/courses-images-archive-read-only/wp-content/uploads/sites/939/2015/09/26001731/Computer.png',
        text: "Computer"
    },
    {
        image: 'https://media.cntraveler.com/photos/5b2c06854c18411aa3e9f5d3/16:9/w_2560,c_limit/High-Park_GettyImages-171589236.jpg',
        text: "Park"
    },
    {
        image: 'https://static.onecms.io/wp-content/uploads/sites/9/2021/06/22/different-types-of-tea-FT-BLOG0621.jpg',
        text: "Tea"
    },
    {
        image: 'https://www.atablefullofjoy.com/wp-content/uploads/2018/06/Hamburger-Sliders-Featured-500x500.jpg',
        text: "Hamburger"
    },
    {
        image: 'https://assets.themortgagereports.com/wp-content/uploads/2020/12/Buy-A-Home-With-Low-No-Down-Payment-First-Time-Home-Buyer.jpg',
        text: "House"
    },
    {
        image: 'https://entrepreneurship.babson.edu/wp-content/uploads/2020/10/Movie-1200-630.jpg',
        text: "Theater"
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Times_Square_New_York_USA.jpg',
        text: "Time Square"
    },
    {
        image: 'https://cdn.britannica.com/77/114477-050-4191357E/Plane-on-takeoff-from-the-Amsterdam-Airport-international-airport.jpg',
        text: "Airplane"
    },
    {
        image: 'https://www.corriecooks.com/wp-content/uploads/2021/05/french-fries-instant-pot.jpg',
        text: "Fries"
    },
    {
        image: 'https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg',
        text: "Vegetable"
    },
    {
        image: 'https://atlantis.nyc3.digitaloceanspaces.com/media/legacy/atlantis/Things_To_Do/Water_Park/Beaches/Hero/Experiences_Beach.jpg',
        text: "Beach"
    },
    {
        image: 'https://djwp.s3.amazonaws.com/wp-content/uploads/2022/01/12120240/THUMB_HORIZONTAL-v1.jpg',
        text: "Robot"
    },
    {
        image: 'https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/8/2020/03/GettyImages-512366437-e1583519258231.jpg',
        text: "Dog"
    },
    {
        image: 'https://hips.hearstapps.com/hmg-prod/images/domestic-cat-lies-in-a-basket-with-a-knitted-royalty-free-image-1592337336.jpg',
        text: "Cat"
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
