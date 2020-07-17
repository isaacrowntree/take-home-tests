import config from './config.json';
import { FACES, COMMANDS } from './Types';

const moves = new Map([
    [FACES.East, {x: 1, y: 0}],
    [FACES.West, {x: -1, y: 0}],
    [FACES.North, {x: 0, y: 1}],
    [FACES.South, {x: 0, y: -1}],
]);

const rotationOrder = [FACES.North, FACES.East, FACES.South, FACES.West];

export type State = {
    x: number;
    y: number;
    face: FACES;
    placed: boolean;
    step: number;
}

type Action =
 | { type: COMMANDS.Place, x: number, y: number, face: FACES}
 | { type: COMMANDS.Move }
 | { type: COMMANDS.Left }
 | { type: COMMANDS.Right }
 | { type: COMMANDS.Reset }
 | { type: COMMANDS.NextStep };

 export const initialState = {
    x: 0,
    y: 0,
    face: FACES.North,
    placed: false,
    step: 0,
};

const validLocation = (x: number, y: number): boolean => (
    x < config.width && y < config.height && x >= 0 && y >= 0
);

const currentRotationIndex = (face: FACES): number => {
    for (let i = 0; i < rotationOrder.length; i++) {
        if (rotationOrder[i] === face) {
            return i;
        }
    }
    return 0;
};

function Reducer(state: State, action: Action): State {
    const { x, y, face, placed, step } = state;
    const nextStep = step + 1;

    switch(action.type) {
        case COMMANDS.Place:
            const { x: newX, y: newY, face: newFace } = action;

            if (validLocation(newX, newY)) {
                return { x: newX, y: newY, face: newFace, placed: true, step: nextStep };
            }
            return { ...state, step: nextStep };
        case COMMANDS.Move:
            const { x: incrementX, y: incrementY } = moves.get(face) || { x: 0, y: 0};
            const moveX = x + incrementX;
            const moveY = y + incrementY;

            if (validLocation(moveX, moveY) && placed) {
                return { ...state, x: moveX, y: moveY, step: step +1};
            }
            return state;
        case COMMANDS.Left:
            if (!placed) { return state; }

            let newLeftIndex = currentRotationIndex(face) - 1;
            if (newLeftIndex < 0) {
                newLeftIndex = rotationOrder.length - 1;
            }
            return { ...state, face: rotationOrder[newLeftIndex], step: nextStep };
        case COMMANDS.Right:
            if (!placed) { return state; }

            let newRightIndex = currentRotationIndex(face) + 1;
            if (newRightIndex >= rotationOrder.length) {
                newRightIndex = 0;
            }
            return { ...state, face: rotationOrder[newRightIndex], step: nextStep };
        case COMMANDS.Reset:
            return { ...state, placed: false, step: nextStep };
        case COMMANDS.NextStep:
            return { ...state, step: nextStep };
        default:
            return state;
    }
}

export default Reducer;