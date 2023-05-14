var player = {
    level: "1",
    health: "50",
    damage: "5",
    armor: "0",
};

var difficulty = player.level / 4;

var baseUrl = `https://www.dnd5eapi.co`
var apiDndMon = `https://www.dnd5eapi.co/api/monsters?challenge_rating=${difficulty}`;
var playernameLS = JSON.parse(localStorage.getItem('player-name'));
var playernameArray = [];

function getRandomMonster(apiDndMon) {
    return fetch(apiDndMon)
        .then(response => response.json())
        .then(data => {
            console.log(data.results);
            var monsters = data.results.map(monster => {
                return {
                    name: monster.name,
                    url: monster.url,
                    index: monster.index,
                }
            })
            console.log(monsters);
            var randomChoice = Math.floor(Math.random() * monsters.length);
            var randomMonster = monsters[randomChoice];
            console.log(randomMonster);

            var randMonUrl = `https://www.dnd5eapi.co/api/monsters/${randomMonster.index}`;
            return fetch(randMonUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // fightMon is the object that contains monster information
                    var fightMon = {
                        name: data.name,
                        health: data.hit_points,
                        damage: data.strength,
                        image: data.image ? baseUrl + data.image : "https://i.kym-cdn.com/entries/icons/original/000/019/740/spoons.jpg",

                    }
                    console.log(fightMon)
                    return fightMon;
                })
        });
};

var dialogueIteration = 0;

var startBtn = document.getElementById("startButton");

var groggDialogue = document.createElement("p");
groggDialogue.className = "dialogueBox";
var playerResponse = document.createElement("button");
playerResponse.className = "dialogueBtn";


var initialSelect = document.getElementById("initial-select");


// generates initial start screen using start button event listener
function startPage() {
    initialSelect.innerHTML = '';
    startBtn.textContent = ">START!";
    startBtn.addEventListener("click", function () {
        beginAdventure()
    });
};

startPage();


// prompts user to either go back to start or enter
function beginAdventure() {
    initialSelect.innerHTML = '';
    startBtn.style.display = "none";
    var goBack = document.createElement("button");
    goBack.textContent = ">Return to start";
    goBack.style.marginRight = "70px"
    goBack.addEventListener("click", function () {
        location.reload();
    });

    var goAdventure = document.createElement("button");
    goAdventure.textContent = ">I'm ready to go!";
    goAdventure.addEventListener("click", function () {
        setName();
    });

    var lastChance = document.createElement("p");
    lastChance.className = "dialogueBox";
    lastChance.textContent = "Last chance to turn back. Adventuring isn't for the faint of heart, you know.";

    initialSelect.append(lastChance, goBack, goAdventure);
};

// allows user to set name
function setName() {
    initialSelect.innerHTML = '';
    var enterName = document.createElement("input", "text");
    enterName.textContent = "Enter your name";
    enterName.setAttribute("placeholder", "Enter Your Name")
    var submitName = document.createElement("button");
    submitName.textContent = ">Submit!"
    submitName.addEventListener("click", function () {
        var nameVal = enterName.value;
        localStorage.setItem('player-name', JSON.stringify(nameVal));
        playernameArray.push(nameVal);

        if (nameVal === undefined || nameVal === '') {
            alert("Come now, every adventurer has a name. Make one up if you have to!")
        } else {
            gameIntro()
        };
    });
    initialSelect.append(enterName, submitName);
    return;
};

function gameIntro() {
    var playerName = playernameArray.join('');
    var introDialogue = [
        {
            grogg: "Grogg: Hey, careful now! Stand up slowly.",
            player: ">[STAND UP]"
        },
        {
            grogg: "Grogg: There you go. We wouldn't want you fainting and drowning, would we?",
            player: ">Who are you?"
        },
        {
            grogg: "Grogg: Oh? Me? Why, I'm Grogg, of course! Soggy Grogg, to be exact, but you can call me Grogg. All my friends do. Lovely to meet you, " + playerName.toUpperCase() + ".",
            player: ">How do you know my name?"
        },
        {
            grogg: "Grogg: I know that and a great deal of other things about you, young " + playerName.toUpperCase() + ". A witch of my years knows many things. Anyhow, I've just saved your life!",
            player: ">Huh? I almost died?"
        },
        {
            grogg: "Grogg: I found you floating face-down in my bog. Another minute and you would've been fertilizing my peat. But you're alive! All thanks to me. So now, I believe you owe me a debt.",
            player: ">Are you going to eat me?"
        },
        {
            grogg: "Grogg: What? Eat you? How could you possibly repay me if I ate you? Goodness, I know you're barely alive, but clean the mud from your ears and try to listen.",
            player: ">Okay..."
        },
        {
            grogg: "Grogg: No, young " + playerName.toUpperCase() + ", I need a different type of assistance.",
            player: ">Ominous. Go on."
        },
        {
            grogg: "Grogg: You see, my beloved bog has been overrun! Overtaken! Scourged by beasts and monsters! I would take care of them myself, but I'm afraid my strength isn't what it used to be...",
            player: ">I see. And this is where I come in?"
        },
        {
            grogg: "Grogg: Exactly! You learn quickly. In order to repay me for saving you, you're going to clear them out for me. Sound good?",
            player: ">Do I have much of a choice in the matter?"
        },
        {
            grogg: "Grogg: Well...'choice' is a subjective term. After each monster killed, you can choose to keep adventuring or choose to return and rest at my hut.",
            player: ">But I can't leave. Is that right?"
        },
        {
            grogg: '',
            player: ''
        }
    ];
    initialSelect.innerHTML = '';
    groggDialogue.textContent = introDialogue[dialogueIteration].grogg;
    playerResponse.textContent = introDialogue[dialogueIteration].player;
    initialSelect.append(groggDialogue, playerResponse);
    playerResponse.addEventListener("click", function () {
        initialSelect.innerHTML = '';
        dialogueIteration++
        groggDialogue.textContent = introDialogue[dialogueIteration].grogg;
        playerResponse.textContent = introDialogue[dialogueIteration].player;
        initialSelect.append(groggDialogue, playerResponse);
        if (dialogueIteration > 8) {
            letsGo();
            return;
        }
    });
};

function letsGo() {
    groggDialogue.textContent = "Grogg: Not until your debt is paid, I'm afraid. It's not me, you see, it's the magical laws around debts and life's worth and...oh, nevermind. That's all terribly dull. Why don't we go back to my hut and you can head out in the morning, hm?";
    playerResponse.textContent = ">Sure, a rest would be nice [RETURN TO GROGG'S HUT]"

    playerResponse.addEventListener("click", function () {
        initialSelect.innerHTML = '';
        var adventureMsg = document.createElement("p");
        var letsgoBtn = document.createElement("button");

        adventureMsg.textContent = "After a full night's rest in Grogg's hut, you feel energized and ready to adventure..."
        adventureMsg.className = "dialogueBox";
        letsgoBtn.textContent = ">Alright, let's do this!"
        letsgoBtn.addEventListener("click", function () {
            fightorRest();
        })

        initialSelect.append(adventureMsg, letsgoBtn);
    })
};

function fightorRest() {
    initialSelect.innerHTML = '';
    var fightorrestPrompt = document.createElement("p");
    var fightBtn = document.createElement("button");
    var restBtn = document.createElement("button");
    fightorrestPrompt.className = "dialogueBox";
    fightorrestPrompt.textContent = "Wandering through the bog, you encounter a(n) [MONSTER NAME]. What do you do?";

    fightBtn.textContent = ">Stay and fight--this will be easy!"
    fightBtn.className = "fightorrestBtn";
    fightBtn.addEventListener("click", function () {
        getRandomMonster(apiDndMon).then(fightMon => {
            initialSelect.innerHTML = '';
            var monsterImageUrl = fightMon.image;
            console.log(monsterImageUrl);
            var fightMonInfo = document.createElement("div");
            fightMonInfo.style.backgroundImage = `url(${monsterImageUrl})`;
            fightMonInfo.style.backgroundSize = "cover";
            fightMonInfo.style.width = "600px";
            fightMonInfo.style.height = "400px";
            initialSelect.appendChild(fightMonInfo);
            console.log("Mama didn't raise a quitter");



        });


    })
    restBtn.textContent = ">Flee and rest--I need to heal."
    fightBtn.className = "fightorrestBtn";
    restBtn.addEventListener("click", function () {
        console.log("Do I look like I wanna die rn?");
        // place for heal function
    })
    initialSelect.append(fightorrestPrompt, fightBtn, restBtn);
};



// On adventure/fight button
var encounter = document.createElement("div");
encounter.style.background = `monsterImageUrl`;
// fightMon is the variable that holds the object data
// call on the monster object for the health and using the rpgui to show the health as a bar
// call on monster strength (calculation most likely necessary) for damage to player
// maybe add the doom damage css when taking damage



// When player attacks it deals 1 damage to enemy
// When defeating an enemy I get an option to increase on of these stats
// Milestone "level" 5 adventuring gain a skill?
// player is the variable that holds the object data
// need to add player information
// need to add attack button
var swordIcon = document.createElement("button");
// swap button to div if we would like to use the icon for something else
swordIcon.classList.add("rpgui-icon sword");
document.body.appendChild(swordIcon);

var swordIcon = document.createElement("div");
// maybe button for running away?
swordIcon.classList.add("rpgui-icon shield");
document.body.appendChild(swordIcon);

var swordIcon = document.createElement("div");
swordIcon.classList.add("rpgui-icon exclamation");
document.body.appendChild(swordIcon);

var healthBar = document.createElement("div");
healthBar.id = "hp-bar";
healthBar.setAttribute("data-value", $(healthBarVal));
healthBar.classList.add("rpgui-progress red");
document.body.appendChild(healthBar);
// var healthBarVal = fightMon current health / `fightMon.health`;

// one day we can add a new skill button

// upon defeat of the monster player receives option to raise parameters of one stat damage or armor
// level: +1, health +4(?), 
// damage or armor +5(?),




// On rest button
var rest = document.createElement("div");
rest.textContent = "You sleep peacefully";
// maybe add random encounters?
// player health recovers by 15%(?)
// On button float shows the value the player will heal (example: Heal: 2 Health)




// Add character information sheet button (Maybe star stat format?)
// Player Name
// Player Level
// Player Health
// Player Attack Points
// Player Defense Points


// https://image-charts.com/chart

// google image api for cartoon+fightmon.index