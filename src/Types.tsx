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
    Reset = 'RESET',
    NextStep = 'NEXTSTEP',
}

export type State = {
    x: number;
    y: number;
    face: FACES;
    placed: boolean;
    step: number;
}

export type Action =
 | { type: COMMANDS.Place, x: number, y: number, face: FACES}
 | { type: COMMANDS.Move }
 | { type: COMMANDS.Left }
 | { type: COMMANDS.Right }
 | { type: COMMANDS.Reset }
 | { type: COMMANDS.NextStep };
