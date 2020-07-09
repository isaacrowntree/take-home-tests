import newPlayer from './player';

const scores = new Map([
  [0, 0],
  [1, 15],
  [2, 30],
  [3, 40],
]);

const match = (name1, name2, p1GamesWon = 0, p2GamesWon = 0) => {
  const player1 = newPlayer(name1);
  const player2 = newPlayer(name2);

  if (p1GamesWon || p2GamesWon) {
    player1.setGamesWon(p1GamesWon);
    player2.setGamesWon(p2GamesWon);
  }

  const pointWonBy = (name) => {
    if (player1.name === name) {
      return player1.scorePoint();
    }

    if (player2.name === name) {
      return player2.scorePoint();
    }
    return null;
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

    if ((score1 - score2) > 1 && score1 >= 4) {
      player1.winGame();
      gameScore = null;
    }

    const setScore = `${player1.getGamesWon()}-${player2.getGamesWon()}`;

    if (!gameScore) return setScore;

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
