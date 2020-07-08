"use strict";

import { player as newPlayer } from './player';

var player1, player2;

const pointWonBy = (player) => {

};

const score = () => {
  return "";
};

const match = (name1, name2) => {
  player1 = newPlayer(name1);
  player2 = newPlayer(name2);

  return {
    name1,
    name2,
    pointWonBy,
    score,
  };
};

export { match };
