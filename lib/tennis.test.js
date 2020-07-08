"use strict";

import { match } from './tennis';

describe('Tennis Game', () => {

  let player1 = 'Isaac';
  let player2 = 'Silvana';

  describe ('Set up a Match', () => {

    test('can start a match', () => {
      expect(
        match(player1, player2)
      ).toBeTruthy();
    });
  });
});