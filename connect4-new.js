
class Game{
    constructor(p1,p2, WIDTH=7,HEIGHT=6){
      this.players = [p1,p2]
      this.WIDTH = WIDTH;
      this.HEIGHT = HEIGHT;
      this.currPlayer = 1;
      // What is the point of adding those 2   this.makeBoard(); and this.makeHtmlBoard(); ?
      this.makeBoard();
      this.makeHtmlBoard();
      this.board = [];
      this.startOver = false;
    }
    
    
  
    makeBoard(){
      for (let y = 0; y < this.HEIGHT; y++) {
        this.board.push(Array.from({ length: this.WIDTH}));
      }
    }
    
    makeHtmlBoard(){
      const board = document.getElementById('board');
      board.innerHTML = '';
      // is line 25 to reset?

  
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');

    this.helpStopClick = this.handleClick.bind(this);
    // what is the third 'this' refering to on the 33rd line? is  it not supposed to be this.handleClick.bind(this);
    top.addEventListener('click', this.helpStopClick);
    //console.log(this)
  
    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    board.append(top);
  
    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');
  
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
  
      board.append(row);
    }
    }
    findSpotForCol(x){
      for (let y = this.HEIGHT - 1; y >= 0; y--) {
        if (!board[y][x]) {
          return y;
        }
      }
      return null;
    }
    placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        // piece.classList.add(`p${currPlayer}`); instead of hard coding the background color. it is determined by the input.color
        piece.style.backgroundColor = this.currPlayer.color;
        piece.style.top = -50 * (y + 2);
      
        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
      }

    
    endGame(msg) {
        alert(msg);
        const top = document.querySelector("#column-top");
        top.removeEventListener("click", this.helpStopClick);
        // when  the game ends remove the event listener. 
      }
    handleClick(){
      // get x from ID of clicked cell
      const x = +evt.target.id;
  
      // get next spot in column (if none, ignore click)
      const y = this.findSpotForCol(x);
      if (y === null) {
      return;
      }
  
      // place piece in board and add to HTML table
      this.board[y][x] = this.currPlayer;
      this.placeInTable(y, x);
    
      // check for win
      if (this.checkForWin()) {
      this.startOver === true;
      return this.endGame(`Player ${this.currPlayer.color} won!`);
      }
    
      // check for tie
      if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
      }
      
      // switch players
      this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
  
    }
  
  
    checkForWin(){
        const _win = cells=> 
            // Check four cells to see if they're all color of current player
            //  - cells: list of four (y, x) cells
            //  - returns true if all are legal coordinates & all match currPlayer
            // make check if check for win is true then the restart butten will be called 
        
            cells.every(
              ([y, x]) =>
                y >= 0 &&
                y < this.HEIGHT &&
                x >= 0 &&
                x < this.WIDTH &&
                board[y][x] === currPlayer
            );
          
          for (let y = 0; y < this.HEIGHT; y++) {
            for (let x = 0; x < this.WIDTH; x++) {
              // get "check list" of 4 cells (starting here) for each of the different
              // ways to win
              const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
              const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
              const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
              const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
        
              // find winner (only checking each win-possibility as needed)
              if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
              }
            }
          }
        
    }
    // startOver(){
    //     const restartBtn = document.querySelector('#btn')
    //     if(checkForWin === true){
    //         return 
    //     }
    //     restartBtn.addEventListener('click',this.handleClick.bind(Game));

    // }
  
    
  }

class Player extends Game{
    constructor(color){
        // if(color === String|| )
        this.color = color;
    }
}

document.getElementById('start-game').addEventListener('click', () => {
  let p1 = new Player(document.getElementById('p1-color').value);
  let p2 = new Player(document.getElementById('p2-color').value);
  new Game(p1, p2);
});

// new Game(p1,p2)
// new Game(7,6)
// function restartBTN(){
//   alert
// }
// const restartBtn = document.querySelector('#btn')
  