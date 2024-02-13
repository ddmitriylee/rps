const crypto = require('crypto');
const readline = require('readline-sync');

class KeyGenerator {
    static generateKey() {
        return crypto.randomBytes(32).toString('hex');
    }
}

class HmacGenerator {
    static generateHmac(key, message) {
        const hmac = crypto.createHmac('sha256', key);
        return hmac.update(message).digest('hex');
    }
}

class Rules {
    constructor(moves) {
      this.moves = moves;
    }
  
    determineWinner(userMove, computerMove) {
      const userMoveIndex = this.moves.indexOf(userMove);
      const computerMoveIndex = this.moves.indexOf(computerMove);
  
      if (userMoveIndex === computerMoveIndex) {
        return 'It\'s a draw!';
      }
  
      const halfLength = Math.floor(this.moves.length / 2);
      const movesToLose = [
        ...this.moves.slice(userMoveIndex + 1, userMoveIndex + 1 + halfLength),
        ...this.moves.slice(0, halfLength - (this.moves.length - userMoveIndex - 1))
      ];
  
      if (movesToLose.includes(computerMove)) {
        return 'You lose!';
      } else {
        return 'You win!';
      }
    }
  }
  
  
  

class TableGenerator {
    static generateTable(moves, rules) {
        const table = [['Moves', ...moves]];

        for (let i = 0; i < moves.length; i++) {
            const row = [moves[i]];

            for (let j = 0; j < moves.length; j++) {
                const result = rules.determineWinner(moves[i], moves[j]);
                row.push(result);
            }

            table.push(row);
        }

        return table;
    }
}

const moves = process.argv.slice(2);

if (moves.length < 3 || moves.length % 2 === 0 || new Set(moves).size !== moves.length) {
    console.error('Invalid Input');
    process.exit();
}

const key = KeyGenerator.generateKey();
const computerMove = moves[Math.floor(Math.random() * moves.length)];
const hmac = HmacGenerator.generateHmac(key, computerMove);
const rules = new Rules(moves);
const table = TableGenerator.generateTable(moves, rules);

console.log(`HMAC: ${hmac}`);
console.log('Available moves: ');
moves.forEach((move, index) => {console.log(`${index + 1} - ${move}`)});
console.log('0 - exit');
console.log('? - help');

const userChoice = readline.question('Enter your move: ');

if (userChoice === '?') {
    console.table(table);
    process.exit();
}

if (isNaN(userChoice) || userChoice < 0 || userChoice > moves.length) {
    console.error('Invalid input');
    process.exit(1);
}

const userMove = moves[userChoice - 1];
const result = rules.determineWinner(userMove, computerMove);

console.log(`Your move: ${userMove}`);
console.log(`Computer move: ${computerMove}`);
console.log(result);
console.log(`HMAC key: ${key}`);