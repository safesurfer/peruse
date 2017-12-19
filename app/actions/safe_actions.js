import { createActions } from 'redux-actions';

export const TYPES = {
    AUTHORISE_SAFE_APP           : 'AUTHORISE_SAFE_APP',
    GET_BROWSER_CONFIG           : 'GET_BROWSER_CONFIG',
    SAVE_BROWSER_CONFIG          : 'SAVE_BROWSER_CONFIG',
    SAVE_BROWSER_CONFIG_AND_QUIT : 'SAVE_BROWSER_CONFIG_AND_QUIT',

    SET_INITIALIZER_TASK        : 'SET_INITIALIZER_TASK',
    STORE_NEW_ACCOUNT           : 'STORE_NEW_ACCOUNT',
    RECONNECT_SAFE_APP          : 'RECONNECT_SAFE_APP',
    SAFE_NETWORK_STATUS_CHANGED : 'SAFE_NETWORK_STATUS_CHANGED'
};

export const {
    authoriseSafeApp,
    getBrowserConfig,
    saveBrowserConfig,
    saveBrowserConfigAndQuit,

    setInitializerTask,
    storeNewAccount,
    safeNetworkStatusChanged,
    reconnectSafeApp
} = createActions({
    [ TYPES.AUTHORISE_SAFE_APP ] : payload => payload,
    [ TYPES.GET_BROWSER_CONFIG ] : payload => payload,
    [ TYPES.SAVE_BROWSER_CONFIG ] : payload => payload,
    [ TYPES.SAVE_BROWSER_CONFIG_AND_QUIT ] : payload => payload,

    [ TYPES.SET_INITIALIZER_TASK ] : payload => payload,
    [ TYPES.STORE_NEW_ACCOUNT ] : payload => payload,
    [ TYPES.SAFE_NETWORK_STATUS_CHANGED ] : payload => payload,
    [ TYPES.RECONNECT_SAFE_APP ] : payload => payload
});
