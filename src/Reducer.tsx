
enum FACES {
    North = 'NORTH',
    South = 'SOUTH',
    East = 'EAST',
    West = 'WEST',
}

type State = {
    x: number;
    y: number;
    face: FACES;
}

type Action =
 | { type: 'PLACE', x: number, y: number, face: FACES}
 | { type: 'request' }
 | { type: 'success', results: State }
 | { type: 'failure', error: string };

 export const initialState = {
    x: 0,
    y: 0,
    face: FACES.North,
};

function Reducer(state: State, action: Action): State {
    switch(action.type) {
        case 'PLACE':
            return { x: action.x, y: action.y, face: action.face };
        default:
            return state;
    }
}

export default Reducer;