// @flow
// import { remote, shell, webContents } from 'electron';
import { TYPES } from 'actions/safe_actions';
// import { makeValidUrl } from 'utils/urlHelpers';
import initialAppState from './initialAppState';
import logger from 'logger';

import { SAFE, CONFIG } from 'appConstants';

const initialState = initialAppState.safeNetwork;

console.log( '"INITIAL STATE IN EDUUCUCER"', initialState );
const safeNetwork = ( state = initialState, action ) =>
{
    if ( action.error )
    {
        logger.error( 'Error in initializer reducer: ', action, action.error );
        return state;
    }

    switch ( action.type )
    {
        case TYPES.SET_INITIALIZER_TASK:
        {
            const tasks = state.tasks.slice();
            tasks.push( action.task );
            return { ...state, tasks };
        }
        // case `${TYPES.AUTHORISE_APP}_LOADING`:
        // {
        //     return { ...state, app: null, appStatus: SAFE.APP_STATUS.AUTHORISING };
        // }
        case TYPES.AUTHORISE_SAFE_APP:
        {
            console.log( 'this one is happening' );
            return { ...state,
                app           : { ...state.app, ...action.payload },
                appStatus     : SAFE.APP_STATUS.AUTHORISED,
                networkStatus : CONFIG.NET_STATUS_CONNECTED
            };
        }
        case TYPES.SAFE_NETWORK_STATUS_CHANGED:
        {
            return { ...state, networkStatus: action.payload };
        }
        case TYPES.GET_BROWSER_CONFIG:
        {
            return { ...state,
                appStatus : SAFE.APP_STATUS.READY,
            };
        }

        default:
            return state;
    }
};

export default safeNetwork;
