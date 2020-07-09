"use strict";

const player = (name) => {

  let score = 0;

  const getScore = () => score;
  const scorePoint = () => score = '15';

  return { name, scorePoint, getScore };
};

export { player };
