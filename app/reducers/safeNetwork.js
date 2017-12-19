// @flow
// import { remote, shell, webContents } from 'electron';
import { TYPES } from 'actions/safe_actions';
import initialAppState from './initialAppState';
import logger from 'logger';

import { SAFE, CONFIG } from 'appConstants';

const initialState = initialAppState.safeNetwork;

export default function safeNetwork( state = initialState, action )
{
    if ( action.error )
    {
        logger.error( 'Error in initializer reducer: ', action, action.error );
        return state;
    }

    const payload = action.payload;

    switch ( action.type )
    {
        case TYPES.SET_INITIALIZER_TASK:
        {
            const oldTasks = state.tasks;
            const tasks = [ ...oldTasks ];
            tasks.push( payload );
            return { ...state, tasks };
        }
        // case `${TYPES.AUTHORISE_APP}_LOADING`:
        // {
        //     return { ...state, app: null, appStatus: SAFE.APP_STATUS.AUTHORISING };
        // }
        case TYPES.AUTHORISE_SAFE_APP:
        {
            return { ...state,
                app           : { ...state.app, ...payload },
                appStatus     : SAFE.APP_STATUS.AUTHORISED,
                networkStatus : CONFIG.NET_STATUS_CONNECTED
            };
        }
        case TYPES.SAFE_NETWORK_STATUS_CHANGED:
        {
            return { ...state, networkStatus: payload };
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
