const initialState = {
    bookmarks     : [],
    notifications : [
    ],
    safeNetwork : {
        appStatus       : null,
        networkStatus   : null,
        app             : null,
        tasks           : [],
        savedBeforeQuit : false
    },
    tabs : [{
        url          : 'safe-auth://home/',
        history      : ['safe-auth://home/'],
        historyIndex : 0,
        isActiveTab  : true,
        isClosed     : false,
        windowId     : 1
    }],
    ui : {
        addressBarIsFocussed : false
    }
};

export default initialState;
