import counterReducer from './counter';
import loggedReducer from './isLogged';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLogged: loggedReducer,
})

export type RootState = ReturnType<typeof allReducers>;
export default allReducers;