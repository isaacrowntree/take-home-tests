"use strict";

import { match as startMatch } from './tennis';

describe('Tennis Game', () => {

  let name1 = 'Isaac';
  let name2 = 'Silvana';

  let returnedObject = {
    player1: { name: name1, score: 0 },
    player2: { name: name2, score: 0 },
  };

  describe ('Set up a Match', () => {

    test('can start a match', () => {
      expect(
        startMatch(name1, name2)
      ).toMatchObject(returnedObject);
    });
  });

  describe('Score a point', () => {
    test('can score a point', () => {
      let match = startMatch(name1, name2);
      match.pointWonBy(name1);

      expect(match.score()).toEqual('15-0');
    });
  });
});
