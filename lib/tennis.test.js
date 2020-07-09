"use strict";

import { match as startMatch } from './tennis';

describe('Tennis Game', () => {

  let name1 = 'Isaac';
  let name2 = 'Silvana';

  let returnedObject = {
    player1: { name: name1 },
    player2: { name: name2 },
  };

  describe ('Set up a Match', () => {
    test('Returns a match object', () => {
      expect(
        startMatch(name1, name2)
      ).toMatchObject(returnedObject);
    });
  });

  describe('Can score correctly given', () => {
    test.each`
      player1 | player2 | result
      ${1} | ${0} | ${'15-0'}
      ${2} | ${0} | ${'30-0'}
    `('Score $result when Isaac scores $player1 and Silvana scores $player2', ({player1, player2, result}) => {
      let match = startMatch(name1, name2);
      for (let i = 0; i < player1; i++) {
        match.pointWonBy(name1);
      }
      for (let i = 0; i < player2; i++) {
        match.pointWonBy(name2);
      }
      expect(match.score()).toEqual(result);
    });
  });
});
