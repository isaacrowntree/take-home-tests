"use strict";

import { match as startMatch } from './tennis';

describe('Tennis Game', () => {

  let player1 = 'Isaac';
  let player2 = 'Silvana';

  let match = { player1, player2 };

  describe ('Set up a Match', () => {

    test('can start a match', () => {
      expect(
        startMatch(player1, player2)
      ).toMatchObject(match);
    });
  });
});
