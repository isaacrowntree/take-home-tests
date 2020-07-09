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

  const hasPlayerWonGame = (score1, score2, winThreshold) => (
    score1 >= winThreshold || score2 >= winThreshold
  ) && hasWonByMargin(score1, score2);

  const setPlayerGameWon = (name) => {
    playerWon = true;

    if (player1.name === name) {
      player1.winGame();
      player2.loseGame();
    } else {
      player2.winGame();
      player1.loseGame();
    }
  };

  const decideOnGameOver = (name, score1, score2) => {
    if (tieBreak && hasPlayerWonGame(score1, score2, TIE_BREAK_WIN)) {
      setPlayerGameWon(name);
    } else if (!tieBreak && hasPlayerWonGame(score1, score2, GAME_WIN)) {
      setPlayerGameWon(name);
    }
  };

  const pointWonBy = (name) => {
    if (playerWon === true) playerWon = false;

    if (player1.name === name) {
      player1.scorePoint();
    }

    if (player2.name === name) {
      player2.scorePoint();
    }

    const player1Score = player1.getScore();
    const player2Score = player2.getScore();

    decideOnGameOver(name, player1Score, player2Score);

    const p1GamesWon = player1.getGamesWon();
    const p2GamesWon = player2.getGamesWon();

    if (p1GamesWon === p2GamesWon && p1GamesWon === SET_WIN) {
      tieBreak = true;
    }
  };

  const hasPlayerWonSet = (playerGames, opponentGames) => (
    (
      playerGames >= SET_WIN && hasWonByMargin(playerGames, opponentGames)
    ) || (
      tieBreak && playerWon
    )
  );

  const getWinMessage = (name) => `Game, Set, ${name} wins!`;

  const scoreFormat = (score1, score2) => {
    let gameScore = `${scores.get(score1)}-${scores.get(score2)}`;

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

    const p1GamesWon = player1.getGamesWon();
    const p2GamesWon = player2.getGamesWon();

    const setScore = `${p1GamesWon}-${p2GamesWon}`;

    if (hasPlayerWonSet(p1GamesWon, p2GamesWon)) {
      return getWinMessage(player1.name);
    }

    if (hasPlayerWonSet(p2GamesWon, p1GamesWon)) {
      return getWinMessage(player2.name);
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
