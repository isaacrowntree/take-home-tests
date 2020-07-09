"use strict";

import { player as newPlayer } from './player';

const match = (name1, name2) => {

  var player1 = newPlayer(name1);
  var player2 = newPlayer(name2);

  const pointWonBy = (name) => {
    if (player1.name === name) {
      return player1.scorePoint();
    }

    if (player2.name === name) {
      return player2.scorePoint();
    }
  };

  const score = () => {
    return `${player1.getScore()}-${player2.getScore()}`;
  };

  return {
    player1,
    player2,
    pointWonBy,
    score,
  };
};

export { match };
