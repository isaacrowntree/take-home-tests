import { COMMANDS } from "./Types";
import { State } from './Reducer';

function commands (command: string, state: State, dispatch: any, args: any): void {
    switch(command)  {
        case COMMANDS.Place: 
            dispatch({ type: command, ...args});
            break;
        case COMMANDS.Move:
            dispatch({ type: command });
            break;
        case COMMANDS.Left:
            dispatch({ type: command });
            break;
        case COMMANDS.Right:
            dispatch({ type: command });
            break;
        case COMMANDS.Report:
            if (state.placed) {
                console.log(`${state.x},${state.y},${state.face}`)
            }
            dispatch({ type: COMMANDS.NextStep });
            break;
        default:
            dispatch({ type: COMMANDS.Reset });
            break;
    }
} 

export default commands;