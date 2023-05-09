var player = {
    health: "10",
    damage: "1",
    armor: "0",
};

var startSelect = ["Option 1",
"Option 2",
"Option 3"];
// When player attacks it deals 1 damage to enemy
// When defeating an enemy I get an option to increase on of these stats
// Milestone "level" 5 adventuring gain a skill?
var startBtn = document.getElementById("startButton");
var initialSelect = document.getElementById("initial-select")

// generates initial start screen using start button event listener
function startPage(){
    initialSelect.innerHTML = '';
    startBtn.textContent = "Start!";
    startBtn.addEventListener("click", function(){
        initialSelect.innerHTML = '';
        startBtn.style.display = "none";
        // for later when adding start select classes
            // for (var i = 0; i < startSelect.length; i++){
            //     var optionBtn = document.createElement("button");
            //     optionBtn.textContent = startSelect[i];
            //     optionBtn.style.display = "block";
            //     initialSelect.append(optionBtn);
            // }
        var placeholderText = document.createElement("p");
        placeholderText.textContent = "Hey, you. You're finally awake"

        var goBack = document.createElement("button");
        goBack.textContent = "Go back"
        goBack.addEventListener("click", function(){
            location.reload();
        });

        var goAdventure = document.createElement("button");
        goAdventure.textContent = "Begin your Adventure!"
        goAdventure.addEventListener("click", function(){
            console.log("does this work")
        })

        initialSelect.append(placeholderText, goBack, goAdventure);
    });
};

startPage();





// random fetch bs using https://www.dnd5eapi.co/api/monsters?data="cr"&sortby=max or something like that. Add to monster cr groups arrays that change based on characters level within certain parameters later defined. Also need to grab image, health stat, and hit dice value.

// using loop to show heart that will be changed to display: none based on the health percentage