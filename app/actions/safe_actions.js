import { createActions } from 'redux-actions';

export const TYPES = {
    SET_AUTH_APP_STATUS           : 'SET_AUTH_APP_STATUS',
    GET_BROWSER_CONFIG           : 'GET_BROWSER_CONFIG',
    SET_SAVE_CONFIG_STATUS : 'SET_SAVE_CONFIG_STATUS',
    AUTHORISED_APP : 'AUTHORISED_APP',

    SET_INITIALIZER_TASK        : 'SET_INITIALIZER_TASK',
    STORE_NEW_ACCOUNT           : 'STORE_NEW_ACCOUNT',
    RECONNECT_SAFE_APP          : 'RECONNECT_SAFE_APP',
    SAFE_NETWORK_STATUS_CHANGED : 'SAFE_NETWORK_STATUS_CHANGED'
};

export const {
    setAuthAppStatus,
    getBrowserConfig,
    setSaveConfigStatus,
    authorisedApp,

    setInitializerTask,
    storeNewAccount,
    safeNetworkStatusChanged,
    reconnectSafeApp
} = createActions(
    TYPES.SET_AUTH_APP_STATUS,
    TYPES.GET_BROWSER_CONFIG,
    TYPES.SET_SAVE_CONFIG_STATUS,
    TYPES.AUTHORISED_APP,

    TYPES.SET_INITIALIZER_TASK,
    TYPES.STORE_NEW_ACCOUNT,
    TYPES.SAFE_NETWORK_STATUS_CHANGED,
    TYPES.RECONNECT_SAFE_APP
);
