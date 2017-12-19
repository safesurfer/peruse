import * as safe from 'actions/safe_actions';

describe( 'notification actions', () =>
{
    it( 'should have types', () =>
    {
        expect( safe.TYPES ).toBeDefined();
    } );

    it( 'should authoriseSafeApp', () =>
    {
        const expectedAction = {
            type : safe.TYPES.AUTHORISE_SAFE_APP
        };
        expect( safe.authoriseSafeApp( ) ).toEqual( expectedAction );
    } );

    it( 'should getBrowserConfig', () =>
    {
        const expectedAction = {
            type : safe.TYPES.GET_BROWSER_CONFIG
        };
        expect( safe.getBrowserConfig( ) ).toEqual( expectedAction );
    } );

    it( 'should saveBrowserConfig', () =>
    {
        const expectedAction = {
            type : safe.TYPES.SAVE_BROWSER_CONFIG
        };
        expect( safe.saveBrowserConfig( ) ).toEqual( expectedAction );
    } );

    it( 'should saveBrowserConfigAndQuit', () =>
    {
        const expectedAction = {
            type : safe.TYPES.SAVE_BROWSER_CONFIG_AND_QUIT
        };
        expect( safe.saveBrowserConfigAndQuit( ) ).toEqual( expectedAction );
    } );

    it( 'should setInitializerTask', () =>
    {
        const payload = 'something';
        const expectedAction = {
            type : safe.TYPES.SET_INITIALIZER_TASK,
            payload
        };
        expect( safe.setInitializerTask( payload ) ).toEqual( expectedAction );
    } );

    it( 'should STORE_NEW_ACCOUNT', () =>
    {
        const expectedAction = {
            type : safe.TYPES.STORE_NEW_ACCOUNT
        };
        expect( safe.storeNewAccount( ) ).toEqual( expectedAction );
    } );

    it( 'should safeNetworkStatusChanged', () =>
    {
        const expectedAction = {
            type : safe.TYPES.SAFE_NETWORK_STATUS_CHANGED
        };
        expect( safe.safeNetworkStatusChanged( ) ).toEqual( expectedAction );
    } );

    it( 'should reconnectSafeApp', () =>
    {
        const expectedAction = {
            type : safe.TYPES.RECONNECT_SAFE_APP
        };
        expect( safe.reconnectSafeApp( ) ).toEqual( expectedAction );
    } );
} );
