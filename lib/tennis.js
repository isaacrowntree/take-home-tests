import newPlayer from './player';

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
    return `0-0, ${score1}-${score2}`;
  };

  const score = () => {
    return scoreFormat(player1.getScore() * 15, player2.getScore() * 15);
  };

  return {
    player1,
    player2,
    pointWonBy,
    score,
  };
};

export default match;
