const player = (name) => {
  let score = 0;

  const getScore = () => score;
  const scorePoint = () => {
    score += 1;
  };

  return { name, scorePoint, getScore };
};

export default player;
