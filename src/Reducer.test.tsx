import { useReducer } from 'react';
import RobotReducer, { initialState} from './Reducer';

test('reduces an invalid/improper action command by returning state', () => {
    expect(RobotReducer(initialState, { type: 'INVALID_ACTION'})).toEqual(initialState);
});

describe('PLACE commands', () => {
    test('can be reduced', () => {
        let action = { 
            type: 'PLACE',
            x: 4,
            y: 2,
            face: 'SOUTH'
        };

        expect(RobotReducer(initialState, action)).toEqual({
            x: 4,
            y: 2,
            face: 'SOUTH'
        });
    });

    test('are boundary-checked', () => {
        let action = { 
            type: 'PLACE',
            x: 6,
            y: 6,
            face: 'SOUTH'
        };

        expect(RobotReducer(initialState, action)).toEqual(initialState);
    });
});