import newPlayer from './player.js';

const scores = new Map([
  [0, 0],
  [1, 15],
  [2, 30],
  [3, 40],
]);

const match = (name1, name2) => {
  const player1 = newPlayer(name1);
  const player2 = newPlayer(name2);

  let playerWon = false;

  const pointWonBy = (name) => {
    let player1Score = player1.getScore();
    let player2Score = player2.getScore();

    if (playerWon === true) playerWon = false;

    if (player1.name === name) {
      player1.scorePoint();
      player1Score = player1.getScore();

      if (player1Score >= 4 && (player1Score - player2Score) > 1) {
        player1.winGame();
        playerWon = true;
        player2.loseGame();
      }
    }

    if (player2.name === name) {
      player2.scorePoint();
      player2Score = player2.getScore();

      if (player2Score >= 4 && (player2Score - player1Score) > 1) {
        player2.winGame();
        playerWon = true;
        player1.loseGame();
      }
    }
  };

  const scoreFormat = (score1, score2) => {
    let gameScore = `${scores.get(score1)}-${scores.get(score2)}`;

    if (score1 === score2 && score1 >= 3) {
      gameScore = 'Deuce';
    }

    if (score1 > score2 && score1 >= 4) {
      gameScore = `Advantage ${player1.name}`;
    }

    if (score2 > score1 && score2 >= 4) {
      gameScore = `Advantage ${player2.name}`;
    }

    const setScore = `${player1.getGamesWon()}-${player2.getGamesWon()}`;

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
