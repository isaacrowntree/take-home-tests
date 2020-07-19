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
            step: 1,
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

            expect(RobotReducer(initialState, action)).toEqual({ ...initialState, step: 1});
        });

        test('on the y dim', () => {
            let action = {
                type: COMMANDS.Place,
                x: config.width + 1,
                y: -1,
                face: FACES.South
            };

            expect(RobotReducer(initialState, action)).toEqual({ ...initialState, step: 1 });
        });
    });
});

describe('MOVE commands', () => {
    let action = { type: COMMANDS.Move };
    test('can be reduced', () => {
        let placedState = { x: 0, y: 0, face: FACES.North, placed: true, step: 0 };

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0,
            y: 1,
            face: FACES.North,
            placed: true,
            step: 1,
        })
    });

    test('does nothing if not placed', () => {
        let placedState = { x: 0, y: 0, face: FACES.North, placed: false, step: 0 };

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0, y: 0, face: FACES.North, placed: false, step: 1
        });
    });

    describe('are boundary-checked', () => {
        test('to the West', () => {
            let placedState = { x: 0, y: 0, face: FACES.West, placed: true, step: 0 };

            expect(RobotReducer(placedState, action)).toEqual({
                x: 0,
                y: 0,
                face: FACES.West,
                placed: true,
                step: 1,
            })
        });

        test('to the East', () => {
            let placedState = { x: config.width - 1, y: 0, face: FACES.East, placed: true, step: 0 };

            expect(RobotReducer(placedState, action)).toEqual({
                x: config.width - 1,
                y: 0,
                face: FACES.East,
                placed: true,
                step: 1,
            })
        });

        test('to the North', () => {
            let placedState = { x: 0, y: config.height - 1, face: FACES.North, placed: true, step: 0 };

            expect(RobotReducer(placedState, action)).toEqual({
                x: 0,
                y: config.height - 1,
                face: FACES.North,
                placed: true,
                step: 1,
            })
        });

        test('to the South', () => {
            let placedState = { x: 0, y: 0, face: FACES.South, placed: true, step: 0 };

            expect(RobotReducer(placedState, action)).toEqual({
                x: 0,
                y: 0,
                face: FACES.South,
                placed: true,
                step: 1,
            })
        });
    });
});

describe('LEFT command', () => {
    let action = { type: COMMANDS.Left };

    test ('rotates left', () => {
        let placedState = { x: 0, y: 0, face: FACES.South, placed: true, step: 0};

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0, y: 0, face: FACES.East, placed: true, step: 1
        });
    });
    test ('rotates left around array', () => {
        let placedState = { x: 0, y: 0, face: FACES.North, placed: true, step: 0};

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0, y: 0, face: FACES.West, placed: true, step: 1
        });
    });

    test('does nothing if not placed', () => {
        let placedState = { x: 0, y: 0, face: FACES.North, placed: false, step: 0 };

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0, y: 0, face: FACES.North, placed: false, step: 1
        });
    });
});

describe('RIGHT command', () => {
    let action = { type: COMMANDS.Right };

    test ('rotates right', () => {
        let placedState = { x: 0, y: 0, face: FACES.North, placed: true, step: 0};

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0, y: 0, face: FACES.East, placed: true, step: 1
        });
    });
    test ('rotates right around array', () => {
        let placedState = { x: 0, y: 0, face: FACES.West, placed: true, step: 0};

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0, y: 0, face: FACES.North, placed: true, step: 1
        });
    });
    test('does nothing if not placed', () => {
        let placedState = { x: 0, y: 0, face: FACES.North, placed: false, step: 0 };

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0, y: 0, face: FACES.North, placed: false, step: 1
        });
    });
});
