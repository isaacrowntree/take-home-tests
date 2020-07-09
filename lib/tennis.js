import newPlayer from './player.js';

const scores = new Map([
  [0, 0],
  [1, 15],
  [2, 30],
  [3, 40],
]);

const DEUCE = 3;
const ADVANTAGE = 4;
const GAME_WIN = 4;
const SET_WIN = 6;
const MARGIN = 2;
const TIE_BREAK_WIN = 7;

const match = (name1, name2) => {
  const player1 = newPlayer(name1);
  const player2 = newPlayer(name2);

  let playerWon = false;
  let tieBreak = false;

  const hasWonByMargin = (score1, score2) => Math.abs(score1 - score2) >= MARGIN;

  const pointWonBy = (name) => {
    let player1Score = player1.getScore();
    let player2Score = player2.getScore();

    if (playerWon === true) playerWon = false;

    if (player1.name === name) {
      player1.scorePoint();
      player1Score = player1.getScore();

      if (
        tieBreak
        && player1Score >= TIE_BREAK_WIN
        && hasWonByMargin(player1Score, player2Score)
      ) {
        player1.winGame();
        playerWon = true;
        player2.loseGame();
      } else if (
        !tieBreak
        && player1Score >= GAME_WIN
        && hasWonByMargin(player1Score, player2Score)
      ) {
        player1.winGame();
        playerWon = true;
        player2.loseGame();
      }
    }

    if (player2.name === name) {
      player2.scorePoint();
      player2Score = player2.getScore();

      if (
        tieBreak
        && player2Score >= TIE_BREAK_WIN
        && hasWonByMargin(player1Score, player2Score)
      ) {
        player2.winGame();
        playerWon = true;
        player1.loseGame();
      } else if (
        !tieBreak
        && player2Score >= GAME_WIN
        && hasWonByMargin(player1Score, player2Score)
      ) {
        player2.winGame();
        playerWon = true;
        player1.loseGame();
      }
    }

    const p1GamesWon = player1.getGamesWon();
    const p2GamesWon = player2.getGamesWon();

    if (p1GamesWon === p2GamesWon && p1GamesWon === SET_WIN) {
      tieBreak = true;
    }
  };

  const scoreFormat = (score1, score2) => {
    let gameScore = `${scores.get(score1)}-${scores.get(score2)}`;

    const p1GamesWon = player1.getGamesWon();
    const p2GamesWon = player2.getGamesWon();

    if (tieBreak) {
      gameScore = `${score1}-${score2}`;
    } else {
      if (score1 === score2 && score1 >= DEUCE) {
        gameScore = 'Deuce';
      }

      if (score1 > score2 && score1 >= ADVANTAGE) {
        gameScore = `Advantage ${player1.name}`;
      }

      if (score2 > score1 && score2 >= ADVANTAGE) {
        gameScore = `Advantage ${player2.name}`;
      }
    }

    const setScore = `${p1GamesWon}-${p2GamesWon}`;

    if (
      (p1GamesWon >= SET_WIN && hasWonByMargin(p1GamesWon, p2GamesWon))
      || (tieBreak && p1GamesWon >= SET_WIN && playerWon)
    ) {
      return `Game, Set, ${player1.name} wins!`;
    }

    if (
      (p2GamesWon >= SET_WIN && hasWonByMargin(p1GamesWon, p2GamesWon))
      || (tieBreak && p2GamesWon >= SET_WIN && playerWon)
    ) {
      return `Game, Set, ${player2.name} wins!`;
    }

    if (playerWon) {
      playerWon = false;
      return setScore;
    }

    return `${setScore}, ${gameScore}`;
  };

  const score = () => scoreFormat(player1.getScore(), player2.getScore());

  return {
    player1,
    player2,
    pointWonBy,
    score,
  };
};

export default match;
