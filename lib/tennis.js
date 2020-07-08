"use strict";

import { player as newPlayer } from './player';

var player1, player2;

const pointWonBy = (name) => {
  if (player1.name === name) {
    return player1.scorePoint();
  }

  if (player2.name === name) {
    return player2.scorePoint();
  }
};

const score = () => {
  return "";
};

const match = (name1, name2) => {
  player1 = newPlayer(name1);
  player2 = newPlayer(name2);

  return {
    player1,
    player2,
    pointWonBy,
    score,
  };
};

export { match };
