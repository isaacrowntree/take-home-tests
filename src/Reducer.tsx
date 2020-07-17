import config from './config.json';
import { FACES, COMMANDS } from './Types';

const moves = new Map([
    [FACES.East, {x: 1, y: 0}],
    [FACES.West, {x: -1, y: 0}],
    [FACES.North, {x: 0, y: 1}],
    [FACES.South, {x: 0, y: -1}],
]);

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

function Reducer(state: State, action: Action): State {
    const { x, y, face, placed } = state;

    switch(action.type) {
        case COMMANDS.Place:
            const { x: newX, y: newY, face: newFace } = action;

            if (newX >= config.width || newY >= config.height) {
                return state;
            } else {
                return { x: newX, y: newY, face: newFace, placed: true };
            }
        case COMMANDS.Move:
            const move = moves.get(face);
            return { ...state, x: x + move.x, y: y + move.y};
        default:
            return state;
    }
}

export default Reducer;