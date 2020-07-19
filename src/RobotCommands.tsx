import { COMMANDS, State, Action } from "./Types";

function commands (
    command: string,
    reducer: [State, React.Dispatch<Action>],
    logger: Function,
    args: any,
): void {
    const [state, dispatch] = reducer;
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
                logger(`${state.x},${state.y},${state.face}`)
            }
            dispatch({ type: COMMANDS.NextStep });
            break;
        default:
            dispatch({ type: COMMANDS.Reset });
            break;
    }
}

export default commands;
