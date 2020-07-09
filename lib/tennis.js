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

  const score = () => `${player1.getScore()}-${player2.getScore()}`;

  return {
    player1,
    player2,
    pointWonBy,
    score,
  };
};

export default match;
