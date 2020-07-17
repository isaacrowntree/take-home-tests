import config from './config.json';
import RobotReducer, { initialState } from './Reducer';
import { FACES, COMMANDS } from './Types';

test('reduces an invalid/improper action command by returning state', () => {
    expect(RobotReducer(initialState, { type: 'INVALID_ACTION'})).toEqual(initialState);
});

describe('PLACE commands', () => {
    test('can be reduced', () => {
        let action = { 
            type: COMMANDS.Place,
            x: config.width - 1,
            y: 2,
            face: FACES.South
        };

        expect(RobotReducer(initialState, action)).toEqual({
            x: config.width - 1,
            y: 2,
            face: FACES.South,
            placed: true,
        });
    });

    describe('are boundary-checked', () => {
        test('on the x dim', () => {
            let action = { 
                type: COMMANDS.Place,
                x: config.width + 1,
                y: config.height,
                face: FACES.South
            };

            expect(RobotReducer(initialState, action)).toEqual(initialState);
        });

        test('on the y dim', () => {
            let action = { 
                type: COMMANDS.Place,
                x: config.width + 1,
                y: -1,
                face: FACES.South
            };

            expect(RobotReducer(initialState, action)).toEqual(initialState);
        });
    });
});

describe('MOVE commands', () => {
    let action = { type: COMMANDS.Move };
    test('can be reduced', () => {
        let placedState = { x: 0, y: 0, face: FACES.North, placed: true };

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0,
            y: 1,
            face: FACES.North,
            placed: true,
        })
    });

    test('does nothing if not placed', () => {
        let placedState = { x: 0, y: 0, face: FACES.North, placed: false };

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0, y: 0, face: FACES.North, placed: false
        });
    });

    describe('are boundary-checked', () => {
        test('to the West', () => {
            let placedState = { x: 0, y: 0, face: FACES.West, placed: true };

            expect(RobotReducer(placedState, action)).toEqual({
                x: 0,
                y: 0,
                face: FACES.West,
                placed: true,
            })
        });

        test('to the East', () => {
            let placedState = { x: config.width - 1, y: 0, face: FACES.East, placed: true };

            expect(RobotReducer(placedState, action)).toEqual({
                x: config.width - 1,
                y: 0,
                face: FACES.East,
                placed: true,
            })
        });

        test('to the North', () => {
            let placedState = { x: 0, y: config.height - 1, face: FACES.North, placed: true };

            expect(RobotReducer(placedState, action)).toEqual({
                x: 0,
                y: config.height - 1,
                face: FACES.North,
                placed: true,
            })
        });

        test('to the South', () => {
            let placedState = { x: 0, y: 0, face: FACES.South, placed: true };

            expect(RobotReducer(placedState, action)).toEqual({
                x: 0,
                y: 0,
                face: FACES.South,
                placed: true,
            })
        });
    });
});

describe('LEFT command', () => {
    let action = { type: COMMANDS.Left };

    test ('rotates left', () => {
        let placedState = { x: 0, y: 0, face: FACES.South, placed: true};

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0, y: 0, face: FACES.East, placed: true
        });
    });
    test ('rotates left around array', () => {
        let placedState = { x: 0, y: 0, face: FACES.North, placed: true};

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0, y: 0, face: FACES.West, placed: true
        });
    });
});

describe('RIGHT command', () => {
    let action = { type: COMMANDS.Right };

    test ('rotates right', () => {
        let placedState = { x: 0, y: 0, face: FACES.North, placed: true};

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0, y: 0, face: FACES.East, placed: true
        });
    });
    test ('rotates right around array', () => {
        let placedState = { x: 0, y: 0, face: FACES.West, placed: true};

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0, y: 0, face: FACES.North, placed: true
        });
    });
});