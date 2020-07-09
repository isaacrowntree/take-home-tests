const player = (name) => {
  let score = 0;
  let gamesWon = 0;

  const getScore = () => score;
  const scorePoint = () => {
    score += 1;
  };

  const getGamesWon = () => gamesWon;
  const winGame = () => {
    gamesWon += 1;
  };

  return { name, scorePoint, getScore, getGamesWon, winGame };
};

export default player;
