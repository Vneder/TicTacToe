const fieldsElements = document.querySelectorAll(".board-item");
const panel = document.getElementById("panel");
const button = document.querySelector(".reset");

let fields;
let activePlayer;
let gameActive;

const setDefaults = () => {
    fields = ["","","","","","","","",""];
    activePlayer = "X";
    gameActive = true;
}

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const displayGameWinMessage = () => {
    panel.innerHTML = `Gratulacje ${activePlayer}, wygrałeś!`;
}

const displayGameDrawMessage = () => {
    panel.innerHTML = `Remis!`;
}

const clearMessage = () => {
    panel.innerHTML = ``;
}

const validateGame = () => {
    let gameWon = false;
    for(let i=0; i<=7; i++){
        const [posA, posB, posC] = winningConditions[i];
        const value1 = fields[posA];
        const value2 = fields[posB];
        const value3 = fields[posC];

        if(value1 !== "" && value1=== value2 && value1 === value3){
            gameWon = true;
            break;
        }
    }
    if(gameWon){
        gameActive = false;
        displayGameWinMessage();
    }
    else if(isBoardFull()){
        gameActive = false;
        displayGameDrawMessage();
    }
}

const isBoardFull = () => {
    return fields.find(field => field === "") === undefined;
}

fieldsElements.forEach(field => {
    field.addEventListener("click", e => {

        const {pos} = e.target.dataset;

        if(gameActive && fields[pos] === ""){
            fields[pos] = activePlayer;
            e.target.classList.add(`board-item-field-${activePlayer}`);
            validateGame();
            activePlayer = activePlayer === "X" ? "O": "X";
        }

    });
}); 

const resetBoardClasses = () =>{
    fieldsElements.forEach(field=>{
        field.classList.remove("board-item-field-X", "board-item-field-O");
    })
}
const buttonClick = () =>{
    setDefaults();
    resetBoardClasses();
    clearMessage();
}
button.addEventListener("click", buttonClick);

setDefaults();