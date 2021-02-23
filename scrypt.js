const me = "O";
const bot = "X";
let player = me;
let turn = 0;

const cells = Array.from(document.querySelectorAll(".app>*"));
const board = Array.from(Array(cells.length).keys());
console.log(board);

const modal = document.querySelector(".modal");
const play = document.querySelector(".play");
const winList =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
const checkWin=(board, player)=>{
    const traces = board.reduce((a,v,i)=>v === player?a.concat(i): a,[]);

    let isWin = null;

    for(let [i, win] of winList.entries()){
        if(win.every(id=> traces.indexOf(id)>-1)){
            isWin = {i, player}
            break
        }

    }


    return isWin;

}

const replay = () => {
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

const handleTurn = (cell, player) => {
  cell.innerText = player;
  board[cell.id] = player
  console.log(board);
  const isWin = checkWin(board, player);
 if(isWin)console.log(isWin);;
};
// foction pour changer de jouer
const newTurn = (event) => {
  player = player === me ? bot : me;
  handleTurn(event.target, player);

  turn++;
  if (turn === cells.length) replay();
};

//selectionné la modale
const start = () => {
  modal.style.display = "none";

  cells.map((cell) => {
    cell.innerText = "";
    cell.addEventListener("click", newTurn);
  });
};
// faire disparaitre la modale
play.addEventListener("click", start);
