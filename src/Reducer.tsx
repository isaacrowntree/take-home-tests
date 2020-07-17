import config from './config.json';

export enum FACES {
    North = 'NORTH',
    South = 'SOUTH',
    East = 'EAST',
    West = 'WEST',
}

export enum COMMANDS {
    Place = 'PLACE',
    Move = 'MOVE',
    Left = 'LEFT',
    Right = 'RIGHT',
    Report = 'REPORT',
}

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
    switch(action.type) {
        case COMMANDS.Place:
            const { x, y, face } = action;

            if (x >= config.width || y >= config.height) {
                return state;
            } else {
                return { x, y, face, placed: true };
            }
        default:
            return state;
    }
}

export default Reducer;