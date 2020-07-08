"use strict";

const score = 0;

const scorePoint = () => {
  return '15';
};

const player = (name) => {
  return { name, score, scorePoint };
};

export { player };
