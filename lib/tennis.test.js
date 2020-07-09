import startMatch from './tennis';

describe('Tennis Game', () => {
  const name1 = 'Isaac';
  const name2 = 'Silvana';

  const returnedObject = {
    player1: { name: name1 },
    player2: { name: name2 },
  };

  describe('Set up a Match', () => {
    test('Returns a match object', () => {
      expect(
        startMatch(name1, name2),
      ).toMatchObject(returnedObject);
    });
  });

  describe('Show correct score of', () => {
    test.each`
      p1game | p2game | p1point | p2point | result
      ${0}   | ${0}   | ${0}    | ${0}    | ${'0-0, 0-0'}
      ${0}   | ${0}   | ${1}    | ${0}    | ${'0-0, 15-0'}
      ${0}   | ${0}   | ${2}    | ${0}    | ${'0-0, 30-0'}
      ${0}   | ${0}   | ${3}    | ${0}    | ${'0-0, 40-0'}
      ${0}   | ${0}   | ${0}    | ${1}    | ${'0-0, 0-15'}
      ${0}   | ${0}   | ${0}    | ${2}    | ${'0-0, 0-30'}
      ${0}   | ${0}   | ${0}    | ${3}    | ${'0-0, 0-40'}
      ${0}   | ${0}   | ${3}    | ${3}    | ${'0-0, Deuce'}
      ${0}   | ${0}   | ${4}    | ${3}    | ${`0-0, Advantage ${name1}`}
      ${0}   | ${0}   | ${4}    | ${4}    | ${`0-0, Deuce`}
      ${0}   | ${0}   | ${4}    | ${5}    | ${`0-0, Advantage ${name2}`}
      ${0}   | ${0}   | ${5}    | ${3}    | ${'1-0'}
      ${0}   | ${0}   | ${3}    | ${4}    | ${'0-1'}
      ${1}   | ${0}   | ${0}    | ${1}    | ${'1-0, 0-15'}
      ${1}   | ${0}   | ${0}    | ${4}    | ${'1-1'}
    `(`$result when the setScore is $p1game-$p2game and ${name1} scores $p1point and ${name2} scores $p2point`,
      ({ p1game, p2game, p1point, p2point, result }) => {
        const match = startMatch(name1, name2, p1game, p2game);

        for (let i = 0; i < p1point; i += 1) {
          match.pointWonBy(name1);
        }
        for (let i = 0; i < p2point; i += 1) {
          match.pointWonBy(name2);
        }
        expect(match.score()).toEqual(result);
      });
  });
});
