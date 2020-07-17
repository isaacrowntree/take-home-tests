import { useReducer } from 'react';
import RobotReducer, { initialState, FACES, COMMANDS } from './Reducer';

test('reduces an invalid/improper action command by returning state', () => {
    expect(RobotReducer(initialState, { type: 'INVALID_ACTION'})).toEqual(initialState);
});

describe('MOVE commands', () => {
    test('can be reduced', () => {
        let action = { type: COMMANDS.Move };
        let placedState = { x: 0, y: 0, face: FACES.North, placed: true };

        expect(RobotReducer(placedState, action)).toEqual({
            x: 0,
            y: 1,
            face: FACES.North,
            placed: true,
        })
    });
});

describe('PLACE commands', () => {
    test('can be reduced', () => {
        let action = { 
            type: COMMANDS.Place,
            x: 4,
            y: 2,
            face: FACES.South
        };

        expect(RobotReducer(initialState, action)).toEqual({
            x: 4,
            y: 2,
            face: FACES.South,
            placed: true,
        });
    });

    describe('are boundary checked', () => {
        test('on the x dim', () => {
            let action = { 
                type: COMMANDS.Place,
                x: 6,
                y: 4,
                face: FACES.South
            };

            expect(RobotReducer(initialState, action)).toEqual(initialState);
        });

        test('on the y dim', () => {
            let action = { 
                type: COMMANDS.Place,
                x: 4,
                y: 6,
                face: FACES.South
            };

            expect(RobotReducer(initialState, action)).toEqual(initialState);
        });
    });
});