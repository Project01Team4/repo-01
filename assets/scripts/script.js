var player = {
    level: "1",
    health: "10",
    damage: "1",
    armor: "0",
};

var baseUrl = `https://www.dnd5eapi.co`
var apiDndMon = `https://www.dnd5eapi.co/api/monsters?challenge_rating=${difficulty}`;
var difficulty = player.level / 4;

fetch(apiDndMon)
    .then(response => response.json())
    .then(data => {
        console.log(data.results);
        var monsters = data.results.map(monster => {
            console.log(monster);
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
        fetch(randMonUrl)
            .then(response => response.json())
            .then(data => {
                var placeHolderImage = "https://i.kym-cdn.com/entries/icons/original/000/019/740/spoons.jpg";
                var monsterImageUrl = data.image ? baseUrl + data.image : placeHolderImage;
                console.log(monsterImageUrl);
                console.log(data);
                var fightMon = {
                    name: data.name,
                    health: data.hit_points,
                    damage: data.strength,
                }
                console.log(fightMon)
            })
    });
    

// var startSelect = ["Option 1",
// "Option 2",
// "Option 3"];

var dialogueIteration = 0;

var startBtn = document.getElementById("startButton");
var playerName = JSON.parse(localStorage.getItem('player-name'));

var introDialogue = [
    {grogg: '',
    player: ''},
    {grogg: "Grogg: Hey, careful now! Stand up slowly.",
    player: ">[Stand up]"},
    {grogg: "Grogg: There you go. We wouldn't want you fainting and drowning, would we?",
    player: ">Who are you?"},
    {grogg: "Grogg: Oh? Me? Why, I'm Grogg, of course! Soggy Grogg, to be exact, but you can call me Grogg. All my friends do. Lovely to meet you, " + playerName + ".",
    player: ">How do you know my name?"},
    {grogg: "Grogg: I know that and a great deal of other things about you, young " + playerName + ". A witch of my years knows many things. Anyhow, I've just saved your life!",
    player: ">Huh? I almost died?"},
    {grogg: "Grogg: I found you floating face-down in my bog. Another minute and you would've been fertilizing my peat. But you're alive! All thanks to me. So now, I believe you owe me a debt.",
    player: ">Are you going to eat me?"},
    {grogg: "Grogg: What? Eat you? How could you possibly repay me if I ate you? Goodness, I know you're barely alive, but clean the mud from your ears and try to listen.",
    player: ">Okay..."},
    {grogg: "Grogg: No, young " + playerName + ", I need a different type of assistance.",
    player: ">Ominous. Go on."},
    {grogg: "Grogg: You see, my beloved bog has been overrun! Overtaken! Scourged by beasts and monsters! I would take care of them myself, but I'm afraid my strength isn't what it used to be...",
    player: ">I see. And this is where I come in?"},
    {grogg: "Grogg: Exactly! You learn quickly. In order to repay me for saving you, you're going to clear them out for me. Sound good?",
    player: ">Do I have much of a choice in the matter?"},
    {grogg: "Grogg: Well...'choice' is a subjective term. After each monster killed, you can choose to keep adventuring or choose to return and rest at my hut.",
    player: ">But I can't leave. Is that right?"},
    {grogg: "",
    player: ""},
];

// When player attacks it deals 1 damage to enemy
// When defeating an enemy I get an option to increase on of these stats
// Milestone "level" 5 adventuring gain a skill?
var initialSelect = document.getElementById("initial-select")

// generates initial start screen using start button event listener
function startPage(){
    initialSelect.innerHTML = '';
    startBtn.textContent = "Start!";
    startBtn.addEventListener("click", function(){
        beginAdventure()
    });
    initialSelect.append(startBtn);
};

startPage();



function beginAdventure(){
    initialSelect.innerHTML = '';
    startBtn.style.display = "none";
    var goBack = document.createElement("button");
    goBack.textContent = "Return to start";
    goBack.addEventListener("click", function(){
        location.reload();
    });

    var goAdventure = document.createElement("button");
    goAdventure.textContent = "I'm ready to go!";
    goAdventure.addEventListener("click", function(){
        setName();
    });

    var placeholderText = document.createElement("p");
    placeholderText.textContent = "Last chance to turn back. Adventuring isn't for the faint of heart, you know.";

    initialSelect.append(placeholderText, goBack, goAdventure);
}

function setName(){
    initialSelect.innerHTML = '';
    var enterName = document.createElement("input", "text");
    enterName.textContent = "Enter your name";
    var submitName = document.createElement("button");
    submitName.textContent = "Submit!"
    submitName.addEventListener("click", function(){
        var nameVal = enterName.value;
        localStorage.setItem('player-name', JSON.stringify(nameVal));

        if (nameVal === undefined || nameVal === ''){
            alert("Come now, every adventurer has a name. Make one up if you have to!")
        } else {
            gameIntro()};
    });
    initialSelect.append(enterName, submitName);
    return;
}

function gameIntro(){
    initialSelect.innerHTML = '';
    var groggDialogue = document.createElement("p");
    var playerResponse = document.createElement("button");
    initialSelect.append(groggDialogue, playerResponse);
    playerResponse.addEventListener("click", function(){
        initialSelect.innerHTML = '';
        dialogueIteration++
        groggDialogue.textContent = introDialogue[dialogueIteration].grogg;
        playerResponse.textContent = introDialogue[dialogueIteration].player;
        initialSelect.append(groggDialogue, playerResponse);
    });

};

// health bar and other bar go down thing: 

// class name we will convert to special progress
var _progress_class = "rpgui-progress";

// create a rpgui-progress from a given element.
// note: element must be <input> of type "range" for this to work properly.
RPGUI.__create_funcs["progress"] = function(element)
{
	RPGUI.add_class(element, _progress_class);
	create_progress(element);
};

// set function to set value of the progress bar
// value should be in range of 0 - 1.0
// RPGUI.__set_funcs["progress"] = function(elem, value)
// {
// 	// get trackbar and progress bar elements
// 	var track = RPGUI.get_child_with_class(elem, "rpgui-progress-track");
// 	var progress = RPGUI.get_child_with_class(track, "rpgui-progress-fill");

// 	// get the two edges
// 	var edge_left = RPGUI.get_child_with_class(elem, "rpgui-progress-left-edge");
// 	var edge_right = RPGUI.get_child_with_class(elem, "rpgui-progress-right-edge");

// 	// set progress width
// 	progress.style.left = "0px";
// 	progress.style.width = (value * 100) + "%";
// };

// // init all progress elements on page load
// RPGUI.on_load(function()
// {
// 	// get all the select elements we need to upgrade
// 	var elems = document.getElementsByClassName(_progress_class).type='range'; // class name we will convert to special progress
//     var _progress_class = "rpgui-progress";
    
//     // create a rpgui-progress from a given element.
//     // note: element must be <input> of type "range" for this to work properly.
//     RPGUI.__create_funcs["progress"] = function(element)
//     {
//         RPGUI.add_class(element, _progress_class);
//         create_progress(element);
//     };

    //     // set function to set value of the progress bar
//     // value should be in range of 0 - 1.0
//     RPGUI.__set_funcs["progress"] = function(elem, value)
//     {
//         // get trackbar and progress bar elements
//         var track = RPGUI.get_child_with_class(elem, "rpgui-progress-track");
//         var progress = RPGUI.get_child_with_class(track, "rpgui-progress-fill");
    
//         // get the two edges
//         var edge_left = RPGUI.get_child_with_class(elem, "rpgui-progress-left-edge");
//         var edge_right = RPGUI.get_child_with_class(elem, "rpgui-progress-right-edge");
    
//         // set progress width
//         progress.style.left = "0px";
//         progress.style.width = (value * 100) + "%";
//     };
    
//     // init all progress elements on page load
//     RPGUI.on_load(function()
//     {
//         // get all the select elements we need to upgrade
//         var elems = document.getElementsByClassName(_progress_class);
    
//         // iterate the selects and upgrade them
//         for (var i = 0; i < elems.length; ++i)
//         {
//             RPGUI.create(elems[i], "progress");
//         }
//     });
    
//     // upgrade a single "input" element to the beautiful progress class
//     function create_progress(elem)
//     {
//         // create the containing div for the new progress
//         progress_container = elem;
    
//         // insert the progress container
//         RPGUI.insert_after(progress_container, elem);
    
//         // create progress parts (edges, track, thumb)
    
//         // track
//         var track = RPGUI.create_element("div");
//         RPGUI.add_class(track, "rpgui-progress-track");
//         progress_container.appendChild(track);
    
//         // left edge
//         var left_edge = RPGUI.create_element("div");
//         RPGUI.add_class(left_edge, "rpgui-progress-left-edge");
//         progress_container.appendChild(left_edge);
    
//         // right edge
//         var right_edge = RPGUI.create_element("div");
//         RPGUI.add_class(right_edge, "rpgui-progress-right-edge");
//         progress_container.appendChild(right_edge);
    
//         // the progress itself
//         var progress = RPGUI.create_element("div");
//         RPGUI.add_class(progress, "rpgui-progress-fill");
//         track.appendChild(progress);
    
//         // set color
//         if (RPGUI.has_class(elem, "blue")) {progress.className += " blue";}
//         if (RPGUI.has_class(elem, "red")) {progress.className += " red";}
//         if (RPGUI.has_class(elem, "green")) {progress.className += " green";}
    
//         // set starting default value
//         var starting_val = elem.dataset.value !== undefined ? parseFloat(elem.dataset.value) : 1;
//         RPGUI.set_value(elem, starting_val);
//     };

// 	// iterate the selects and upgrade them
// 	for (var i = 0; i < elems.length; ++i)
// 	{
// 		RPGUI.create(elems[i], "progress");
// 	}
// });

// // upgrade a single "input" element to the beautiful progress class
// function create_progress(elem)
// {
// 	// create the containing div for the new progress
// 	progress_container = elem;

// 	// insert the progress container
// 	RPGUI.insert_after(progress_container, elem);

// 	// create progress parts (edges, track, thumb)

// 	// track
// 	var track = RPGUI.create_element("div");
// 	RPGUI.add_class(track, "rpgui-progress-track");
// 	progress_container.appendChild(track);

// 	// left edge
// 	var left_edge = RPGUI.create_element("div");
// 	RPGUI.add_class(left_edge, "rpgui-progress-left-edge");
// 	progress_container.appendChild(left_edge);

// 	// right edge
// 	var right_edge = RPGUI.create_element("div");
// 	RPGUI.add_class(right_edge, "rpgui-progress-right-edge");
// 	progress_container.appendChild(right_edge);

// 	// the progress itself
// 	var progress = RPGUI.create_element("div");
// 	RPGUI.add_class(progress, "rpgui-progress-fill");
// 	track.appendChild(progress);

// 	// set color
// 	if (RPGUI.has_class(elem, "blue")) {progress.className += " blue";}
// 	if (RPGUI.has_class(elem, "red")) {progress.className += " red";}
// 	if (RPGUI.has_class(elem, "green")) {progress.className += " green";}

// 	// set starting default value
// 	var starting_val = elem.dataset.value !== undefined ? parseFloat(elem.dataset.value) : 1;
// 	RPGUI.set_value(elem, starting_val);
// }

// random fetch bs using https://www.dnd5eapi.co/api/monsters?data="cr"&sortby=max or something like that. Add to monster cr groups arrays that change based on characters level within certain parameters later defined. Also need to grab image, health stat, and hit dice value.

// using loop to show heart that will be changed to display: none based on the health percentage

// https://image-charts.com/chart