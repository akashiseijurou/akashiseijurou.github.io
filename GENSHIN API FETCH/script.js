const name = document.getElementById("name");
const vision = document.getElementById("vision");
const weapon = document.getElementById("weapon");
const nation = document.getElementById("nation");
const bday = document.getElementById("bday");
const constellation = document.getElementById("constellation");
const passive = document.getElementById("passive");
const charName = document.getElementById("charName");
const rarity = document.getElementById("rarity");
const picture = document.getElementById("picture");
const skill = document.getElementById("skill");
const constellations = document.getElementById("constellations");
const title = document.getElementById("title");
const openImg = document.getElementById("picture");

const select = document.getElementById("selectChara");
const options = ["albedo", "aloy", "amber", "arataki-itto", "ayaka", "barbara", "beidou",
    "bennett", "chongyun", "diluc", "diona", "eula", "fischl", "ganyu", "gorou", "hu-tao",
    "jean", "kaeya", "kazuha", "keqing", "klee", "kokomi", "lisa", "mona", "ningguang", "noelle",
    "qiqi", "raiden", "razor", "rosaria", "sara", "sayu", "shenhe", "sucrose", "tartaglia", "thoma",
    "traveler-anemo", "traveler-electro", "traveler-geo", "venti", "xiangling", "xiao", "xingqiu",
    "xinyan", "yanfei", "yoimiya", "yun-jin", "zhongli"];

for (var i = 0; i < options.length; i++) {
    var opt = options[i].charAt(0).toUpperCase() + options[i].substr(1);
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
}

// run script when a name is selected
function selectName(e) {
    document.getElementById("charName").value = e.target.value;
    loadChar(e);
};

// Event listener for manual input

charName.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        loadChar(e);
    }
});

function loadChar(e) {
    e.preventDefault()
    name.innerHTML = '<em>Loading...</em>';
    vision.innerHTML = '<em>Loading...</em>';
    weapon.innerHTML = '<em>Loading...</em>';
    nation.innerHTML = '<em>Loading...</em>';
    bday.innerHTML = '<em>Loading...</em>';
    constellation.innerHTML = '<em>Loading...</em>';
    passive.innerHTML = '<em>Loading...</em>';
    rarity.innerHTML = '<em>Loading...</em>';
    picture.innerHTML = '<em>Loading...</em>';
    skill.innerHTML = '<em>Loading...</em>';
    constellations.innerHTML = '<em>Loading...</em>';
    title.innerHTML = '<em>Loading...</em>';


    // const randomNumber = Math.ceil(Math.random() * 83);
    getInfo();

    function getInfo() {
        const charN = charName.value.toLowerCase();
        const imgLink = `https://api.genshin.dev/characters/${charN}/portrait.png`;
        fetch(`https://api.genshin.dev/characters/${charN}/`)
            .then(response => response.json())
            .then(character => {
                name.innerHTML = character['name'];
                validNameChecker();
                vision.innerHTML = character['vision'];
                weapon.innerHTML = character['weapon'];
                nation.innerHTML = character['nation'];
                bday.innerHTML = character['birthday'].substr(5);
                constellation.innerHTML = character['constellation'];
                passive.innerHTML =
                    "1. " + character['passiveTalents'][0].name + `<br>` +
                    "2. " + character['passiveTalents'][1].name + `<br>` +
                    "3. " + character['passiveTalents'][2].name;
                rarity.innerHTML = character['rarity'] + " stars";
                skill.innerHTML =
                    "1. " + character['skillTalents'][0].name + `<br>` +
                    "2. " + character['skillTalents'][1].name + `<br>` +
                    "3. " + character['skillTalents'][2].name;
                constellations.innerHTML =
                    "1. " + character['constellations'][0].name + `<br>` +
                    "2. " + character['constellations'][1].name + `<br>` +
                    "3. " + character['constellations'][2].name + `<br>` +
                    "4. " + character['constellations'][3].name + `<br>` +
                    "5. " + character['constellations'][4].name + `<br>` +
                    "6. " + character['constellations'][5].name;
                title.innerHTML = character['title'];
                changeTitle();
                document.getElementById("picture").src = imgLink;
                console.log(character);
            });
    };
};

openImg.addEventListener('click', () =>
    window.open(document.getElementById("picture").src)
);

function validNameChecker() {
    if (name.innerHTML === "undefined") {
        alert("Please enter a valid character name");
        name.innerHTML = '<em>...</em>';
        vision.innerHTML = '<em>...</em>';
        weapon.innerHTML = '<em>...</em>';
        nation.innerHTML = '<em>...</em>';
        bday.innerHTML = '<em>...</em>';
        constellation.innerHTML = '<em>...</em>';
        passive.innerHTML = '<em>...</em>';
        rarity.innerHTML = '<em>...</em>';
        picture.innerHTML = '';
        skill.innerHTML = '<em>...</em>';
        constellations.innerHTML = '<em>...</em>';
        title.innerHTML = '<em>...</em>';
        console.log("test");
    };
};

function changeTitle() {
    if (title.innerHTML === "undefined") {
        title.innerHTML = "None";
    }
};