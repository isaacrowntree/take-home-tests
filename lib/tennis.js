"use strict";

var player1, player2;

const pointWonBy = (player) => {

};

const match = (name1, name2) => {
  player1 = name1;
  player2 = name2;

  return { player1, player2 };
};

export { match };
