"use strict";

import { player as newPlayer } from './player';

describe('Player', () => {

  let player = 'Mr Bojangles';
  let samplePlayer = { name: player, score: 0 };

  describe ('Set up a Player', () => {

    test('can create a new player', () => {
      expect(
        newPlayer(player)
      ).toMatchObject(samplePlayer);
    });
  });
});
