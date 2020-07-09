import newPlayer from './player';

const scores = new Map([
  [0, 0],
  [1, 15],
  [2, 30],
  [3, 40],
]);

const match = (name1, name2) => {
  const player1 = newPlayer(name1);
  const player2 = newPlayer(name2);

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
    return `0-0, ${scores.get(score1)}-${scores.get(score2)}`;
  };

  const score = () => {
    return scoreFormat(player1.getScore(), player2.getScore());
  };

  return {
    player1,
    player2,
    pointWonBy,
    score,
  };
};

export default match;
