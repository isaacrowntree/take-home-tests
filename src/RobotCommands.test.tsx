import { COMMANDS } from "./Types";
import { initialState } from './Reducer';
import RobotCommands from './RobotCommands';

const mockDispatch = jest.fn();
const mockLogger = jest.fn();

describe('commands', () => {
    let args = { x: 0, y: 0, face: 'test'};

    const reducer = [initialState, mockDispatch];

    test('PLACE command dispatches', () => {
        RobotCommands(COMMANDS.Place, reducer, mockLogger, args);
        expect(mockDispatch).toBeCalledWith( { type: COMMANDS.Place, ...args});
    });

    test('MOVE command dispatches', () => {
        RobotCommands(COMMANDS.Move, reducer, mockLogger, args);
        expect(mockDispatch).toBeCalledWith( { type: COMMANDS.Move});
    });

    test('LEFT command dispatches', () => {
        RobotCommands(COMMANDS.Left, reducer, mockLogger, args);
        expect(mockDispatch).toBeCalledWith( { type: COMMANDS.Left});
    });

    test('RIGHT command dispatches', () => {
        RobotCommands(COMMANDS.Right, reducer, mockLogger, args);
        expect(mockDispatch).toBeCalledWith( { type: COMMANDS.Right});
    });

    test('REPORT command dispatches', () => {
        let reportReducer = [{...initialState, placed: true}, mockDispatch];
        RobotCommands(COMMANDS.Report, reportReducer, mockLogger, args);
        expect(mockDispatch).toBeCalledWith( { type: COMMANDS.NextStep});
        expect(mockLogger).toBeCalledWith( '0,0,NORTH');
    });

    test('RESET command dispatches', () => {
        RobotCommands(COMMANDS.Reset, reducer, mockLogger, args);
        expect(mockDispatch).toBeCalledWith( { type: COMMANDS.Reset});
    });
});
