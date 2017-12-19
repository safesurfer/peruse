/* eslint-disable func-names */
import safeNetwork from 'reducers/safeNetwork';
import { TYPES } from 'actions/safe_actions';
import initialState from 'reducers/initialAppState';
import { SAFE, CONFIG } from 'appConstants';

const safeInitialState = initialState.safeNetwork;
describe( 'safe network reducer', () =>
{
    it( 'should return the initial state', () =>
    {
        expect( safeNetwork( undefined, {} ) ).toEqual( initialState.safeNetwork );
    } );

    describe( 'SET_INITIALIZER_TASK', () =>
    {
        it( 'should handle setting a task', () =>
        {
            const payload =  'well hi';

            expect(
                safeNetwork( safeInitialState, {
                    type    : TYPES.SET_INITIALIZER_TASK,
                    payload
                } ).tasks
            ).toEqual( [ payload ] );
        } );
    });
    describe( 'AUTHORISE_SAFE_APP', () =>
    {
        it( 'should handle app authorisation', () =>
        {
            const payload =  { fakeApp: 'yesIam' };

            expect(
                safeNetwork( safeInitialState, {
                    type    : TYPES.AUTHORISE_SAFE_APP,
                    payload
                } )
            ).toMatchObject( {
                app           : { ...payload },
                appStatus     : SAFE.APP_STATUS.AUTHORISED,
                networkStatus : CONFIG.NET_STATUS_CONNECTED
            });
        } );
    });

    describe( 'SAFE_NETWORK_STATUS_CHANGED', () =>
    {
        it( 'should handle a change in network state', () =>
        {
            const payload =  'testing';

            expect(
                safeNetwork( safeInitialState, {
                    type    : TYPES.SAFE_NETWORK_STATUS_CHANGED,
                    payload
                } ).networkStatus
            ).toEqual( payload );
        } );
    })


})
