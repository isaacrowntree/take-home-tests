import newPlayer from './player';

describe('Player', () => {
  const name = 'Mr Bojangles';
  const samplePlayer = { name };

  describe('Set up a Player', () => {
    test('can create a new player', () => {
      expect(
        newPlayer(name),
      ).toMatchObject(samplePlayer);
    });

    test('player object has indirect access to score and games', () => {
      const player = newPlayer(name);
      expect(player.score).toEqual(undefined);
      expect(player.getScore()).toEqual(0);
      expect(player.games).toEqual(undefined);
      expect(player.getGamesWon()).toEqual(0);
    });

    test('player object can be set up with an already-won game tally', () => {
      const player = newPlayer(name);
      expect(player.getGamesWon()).toEqual(0);

      player.setGamesWon(3);
      expect(player.getGamesWon()).toEqual(3);

      player.setGamesWon(false);
      expect(player.getGamesWon()).toEqual(3);
    });
  });

  describe('Player scores', () => {
    test('can score a point', () => {
      const player = newPlayer(name);
      player.scorePoint();
      player.scorePoint();
      player.scorePoint();

      expect(player.getScore()).toEqual(3);
    });

    test('can win a game', () => {
      const player = newPlayer(name);
      player.winGame();
      player.winGame();

      expect(player.getGamesWon()).toEqual(2);
    });
  });
});
