# Rock Paper Scissors game

Here we have a simple game of rock-paper-scissors.

## How to use it?

- Firstly, you need to install the packages.

```
npm install
```

- Then we are ready. In order to run the game you have to write the available moves like this:

```
node ./rock-paper-scissors.js rock paper scissors
```

- When initialized, press '?' in order to see the table of available moves and which result to expect:

```
┌─────────┬────────────┬────────────────┬────────────────┬────────────────┐
│ (index) │ 0          │ 1              │ 2              │ 3              │
├─────────┼────────────┼────────────────┼────────────────┼────────────────┤
│ 0       │ 'Moves'    │ 'rock'         │ 'paper'        │ 'scissors'     │
│ 1       │ 'rock'     │ "It's a draw!" │ 'You lose!'    │ 'You win!'     │
│ 2       │ 'paper'    │ 'You win!'     │ "It's a draw!" │ 'You lose!'    │
│ 3       │ 'scissors' │ 'You lose!'    │ 'You win!'     │ "It's a draw!" │
└─────────┴────────────┴────────────────┴────────────────┴────────────────┘
```