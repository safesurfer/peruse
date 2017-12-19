/* eslint-disable func-names */
import safeNetwork from 'reducers/safeNetwork';
import { TYPES } from 'actions/safe_actions';
import initialState from 'reducers/initialAppState';

describe( 'safe network reducer', () =>
{
    it( 'should return the initial state', () =>
    {
        expect( safeNetwork( undefined, {} ) ).toEqual( initialState.safeNetwork );
    } );

    // describe( 'FOCUS_ADDRESS_BAR', () =>
    // {
    //     it( 'should handle setting address bar focus', () =>
    //     {
    //         expect(
    //             safeNetwork( {}, {
    //                 type    : TYPES.FOCUS_ADDRESS_BAR
    //             } )
    //         ).toEqual( { addressBarIsFocussed: true } );
    //     } );
    // })


})
