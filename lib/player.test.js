"use strict";

import { player as newPlayer } from './player';

describe('Player', () => {

  let name = 'Mr Bojangles';
  let samplePlayer = { name };

  describe ('Set up a Player', () => {

    test('can create a new player', () => {
      expect(
        newPlayer(name)
      ).toMatchObject(samplePlayer);
    });
  });

  describe('Player scores', () => {
    test('can score a point', () => {
      var player = newPlayer(player);
      player.scorePoint();

      expect(player.getScore()).toEqual('15');
    });
  });
});
