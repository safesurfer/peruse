import { createActions } from 'redux-actions';

export const TYPES = {
    AUTHORISE_SAFE_APP           : 'AUTHORISE_SAFE_APP',
    GET_BROWSER_CONFIG           : 'GET_BROWSER_CONFIG',
    SAVE_BROWSER_CONFIG_STATUS : 'SAVE_BROWSER_CONFIG_STATUS',
    // SAVE_BROWSER_CONFIG_AND_QUIT : 'SAVE_BROWSER_CONFIG_AND_QUIT',

    SET_INITIALIZER_TASK        : 'SET_INITIALIZER_TASK',
    STORE_NEW_ACCOUNT           : 'STORE_NEW_ACCOUNT',
    RECONNECT_SAFE_APP          : 'RECONNECT_SAFE_APP',
    SAFE_NETWORK_STATUS_CHANGED : 'SAFE_NETWORK_STATUS_CHANGED'
};

export const {
    authoriseSafeApp,
    getBrowserConfig,
    saveBrowserConfigStatus,
    // saveBrowserConfigAndQuit,

    setInitializerTask,
    storeNewAccount,
    safeNetworkStatusChanged,
    reconnectSafeApp
} = createActions(
    TYPES.AUTHORISE_SAFE_APP,
    TYPES.GET_BROWSER_CONFIG,
    TYPES.SAVE_BROWSER_CONFIG_STATUS,
    // TYPES.SAVE_BROWSER_CONFIG_AND_QUIT,

    TYPES.SET_INITIALIZER_TASK,
    TYPES.STORE_NEW_ACCOUNT,
    TYPES.SAFE_NETWORK_STATUS_CHANGED,
    TYPES.RECONNECT_SAFE_APP
);
