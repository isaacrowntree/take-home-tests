"use strict";

import { player as newPlayer } from './player';

describe('Player', () => {

  let player = 'Mr Bojangles';
  let samplePlayer = { player };

  describe ('Set up a Player', () => {

    test('can create a new player', () => {
      expect(
        newPlayer(player)
      ).toMatchObject(samplePlayer);
    });
  });
});
