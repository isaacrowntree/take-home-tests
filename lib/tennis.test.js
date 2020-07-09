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
      player1 | player2 | result
      ${0}    | ${0}    | ${'0-0, 0-0'}
      ${1}    | ${0}    | ${'0-0, 15-0'}
      ${2}    | ${0}    | ${'0-0, 30-0'}
      ${3}    | ${0}    | ${'0-0, 40-0'}
      ${0}    | ${1}    | ${'0-0, 0-15'}
      ${0}    | ${2}    | ${'0-0, 0-30'}
      ${0}    | ${3}    | ${'0-0, 0-40'}
      ${3}    | ${3}    | ${'0-0, Deuce'}
      ${4}    | ${3}    | ${`0-0, Advantage ${name1}`}
      ${4}    | ${4}    | ${`0-0, Deuce`}
      ${4}    | ${5}    | ${`0-0, Advantage ${name2}`}
      ${5}    | ${3}    | ${'1-0'}
      ${5}    | ${4}    | ${'1-0, 0-15'}
    `(`$result when ${name1} scores $player1 and ${name2} scores $player2`,
      ({ player1, player2, result }) => {
        const match = startMatch(name1, name2);
        for (let i = 0; i < player1; i += 1) {
          match.pointWonBy(name1);
        }
        for (let i = 0; i < player2; i += 1) {
          match.pointWonBy(name2);
        }
        expect(match.score()).toEqual(result);
      });
  });
});
