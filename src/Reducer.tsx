import config from './config.json';
import { FACES, COMMANDS } from './Types';

const moves = new Map([
    [FACES.East, {x: 1, y: 0}],
    [FACES.West, {x: -1, y: 0}],
    [FACES.North, {x: 0, y: 1}],
    [FACES.South, {x: 0, y: -1}],
]);

const rotationOrder = [FACES.North, FACES.East, FACES.South, FACES.West];

type State = {
    x: number;
    y: number;
    face: FACES;
    placed: boolean;
}

type Action =
 | { type: COMMANDS.Place, x: number, y: number, face: FACES}
 | { type: COMMANDS.Move };

 export const initialState = {
    x: 0,
    y: 0,
    face: FACES.North,
    placed: false,
};

const validLocation = (x: number, y: number): boolean => (
    x < config.width && y < config.height && x >= 0 && y >= 0
);

function Reducer(state: State, action: Action): State {
    const { x, y, face, placed } = state;

    switch(action.type) {
        case COMMANDS.Place:
            const { x: newX, y: newY, face: newFace } = action;

            if (validLocation(newX, newY)) {
                return { x: newX, y: newY, face: newFace, placed: true };
            }
            return state;
        case COMMANDS.Move:
            const { x: incrementX, y: incrementY } = moves.get(face);
            const moveX = x + incrementX;
            const moveY = y + incrementY;

            if (validLocation(moveX, moveY) && placed) {
                return { ...state, x: moveX, y: moveY};
            }
            return state;
        case COMMANDS.Left:
            let leftIndex = 0;
            for (let i = 0; i < rotationOrder.length; i++) {
                if (rotationOrder[i] === face) {
                    leftIndex = i;
                }
            }
            let newLeftIndex = leftIndex - 1;
            if (newLeftIndex < 0) {
                newLeftIndex = rotationOrder.length - 1;
            }
            return { ...state, face: rotationOrder[newLeftIndex] };
        case COMMANDS.Right:
            let rightIndex = 0;
            for (let i = 0; i < rotationOrder.length; i++) {
                if (rotationOrder[i] === face) {
                    rightIndex = i;
                }
            }
            let newRightIndex = rightIndex + 1;
            if (newRightIndex >= rotationOrder.length) {
                newRightIndex = 0;
            }
            return { ...state, face: rotationOrder[newRightIndex] };
        default:
            return state;
    }
}

export default Reducer;