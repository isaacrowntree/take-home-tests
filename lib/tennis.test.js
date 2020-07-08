"use strict";

import { match as startMatch } from './tennis';

describe('Tennis Game', () => {

  let player1 = 'Isaac';
  let player2 = 'Silvana';

  let sampleMatch = { player1, player2 };

  describe ('Set up a Match', () => {

    test('can start a match', () => {
      expect(
        startMatch(player1, player2)
      ).toMatchObject(sampleMatch);
    });
  });

  describe('Score a point', () => {
    test('can score a point', () => {
      let match = startMatch(player1, player2);
      match.pointWonBy(player1);

      expect(match.score()).toEqual('15-0');
    });
  });
});
