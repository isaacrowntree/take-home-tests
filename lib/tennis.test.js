"use strict";

import { match as startMatch } from './tennis';

describe('Tennis Game', () => {

  let name1 = 'Isaac';
  let name2 = 'Silvana';

  let sampleMatch = {
    name1,
    name2,
  };

  describe ('Set up a Match', () => {

    test('can start a match', () => {
      expect(
        startMatch(name1, name2)
      ).toMatchObject(sampleMatch);
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
