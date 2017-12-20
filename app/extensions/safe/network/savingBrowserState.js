import logger from 'logger';
import { initializeApp, fromAuthURI } from '@maidsafe/safe-node-app';
import {
    setAuthAppStatus,
    setSaveConfigStatus
} from 'actions/safe_actions'
import { CONFIG, SAFE } from 'appConstants';

/**
 * Adds an encrypted value mutation to an existing mutation handle + key for a given MD.
 * Encrypts both the handle and the key.
 * @param  { String } md      mutableDataHandle
 * @param  { String } mut     mutationHandle
 * @param  { String } key     key to encrypt and store the value as
 * @param  { String } value   String or Buffer to encrypt and store
 * @param  { Int } version   [optional] version of the data if updating (then required)
 * @return { Promise }
 */
const updateOrCreateEncrypted = ( mutableDataHandle, mutationHandle, key, value, version ) =>
{
    let encryptedValue;

    return new Promise( ( resolve, reject ) =>
    {
        safeMutableData.encryptKey( mutableDataHandle, key )
            .then( ( encryptedKey ) => safeMutableData.encryptValue( mutableDataHandle, value )
                .then( res =>
                {
                    encryptedValue = res;

                    if ( version )
                    {
                        return safeMutableDataMutation.update(
                            mutationHandle, encryptedKey, encryptedValue, version )
                            .then( resolve );
                    }

                    return safeMutableDataMutation.insert(
                        mutationHandle, encryptedKey, encryptedValue )
                        .then( resolve );

                } )
            )
            .catch( e =>
            {
                logger.error( 'Problems updating/inserting encrypted: ', e, e.message );
                reject( e );
            } );
    } );
};


/**
 * Parses the browser state to json (removes safeNetwork) and saves to an MD on the app Homecontainer,
 * encrypting as it goes.
 * @param  { Object } state App state
 * @param  { Bool } quit  to quit or not to quit...
 * @return {[type]}       Promise
 */
export const saveConfigToSafe = ( store, quit ) =>
{
    const state = store.getState();

    const stateToSave = { ...state, safeNetwork: {} };
    const JSONToSave = JSON.stringify( stateToSave );
    let encryptedData;
    let encryptedKey;
    let homeMdHandle;

    return new Promise( async ( resolve, reject ) =>
    {
        const safeNetwork = state.safeNetwork;
        const app = safeNetwork.app;

        console.log( app );
        logger.info( app );

        if ( !app )
        {
            store.dispatch( setSaveConfigStatus( SAFE.SAVE_STATUS.FAILED_TO_SAVE ) );
            logger.error( 'Not authorised to save to the network.' );
            return reject( 'Not authorised to save data' );
        }

        logger.info( '!!!!!!!!!!!!!!!!!Attempting to save state to the network.', app );

        try{

            let container = await app.auth.getOwnContainer();
            let mdEntries = await app.mutableData.getEntries();
            let mutation = await app.mutableData.newMutation();
            let encryptedKey = await app.mutableData.encryptKey( CONFIG.STATE_KEY );
            let previousEntry = await app.mutableData.get( encryptedKey );

            logger.info( '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>' );
            logger.info( container, mdEntries, mutation, encryptedKey );
            logger.info( '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>' );
            let version;
            if( previousEntry && previousEntry.version )
            {
                version = value.version + 1;
            }

            logger.info('we got here');
            updateOrCreateEncrypted( homeMdHandle, mutationHandle, STATE_KEY, JSONToSave, version );

        }
        catch( e )
        {
            logger.error( '>>>>>>>>>>>>>>>>>' )
            logger.error( e )
            logger.error( '>>>>>>>>>>>>>>>>>' )
        }
            // .then( res => homeMdHandle = res )
        //     .then( data => encryptedData = data )
        //     .then( () =>
        //     {
        //         let mutationHandle;
        //         return safeMutableData.getEntries( homeMdHandle )
        //             .then( ( entriesHandle ) => safeMutableDataEntries.mutate( entriesHandle ) )
        //             .then( ( res ) => mutationHandle = res )
        //             .then( () => safeMutableData.encryptKey( homeMdHandle, STATE_KEY ) )
        //             .then( res => encryptedKey = res )
        //             .then( () => safeMutableData.get( homeMdHandle, encryptedKey ) )
        //             .catch( e => logger.info( e.code, e.message ) )
        //             .then( ( value ) =>
        //             {
        //                 let version = null;
        //
        //                 if ( value )
        //                 {
        //                     version = value.version + 1;
        //                 }
        //
        //                 return updateOrCreateEncrypted( homeMdHandle, mutationHandle, STATE_KEY, JSONToSave, version );
        //             } )
        //             .then( _ => safeMutableData.applyEntriesMutation( homeMdHandle, mutationHandle ) )
        //             .then( ( done ) =>
        //             {
        //                 logger.info( 'Successfully save data to the network.' );
        //                 resolve();
        //
        //                 if ( quit )
        //                 {
        //                     browserInstance.quit();
        //                 }
        //
        //                 return Promise.resolve();
        //             } );
        //     } )
        //     .catch( e =>
        //     {
        //         logger.error( 'Problems saving data to the network: ', e.message );
        //         reject( e );
        //         if ( quit )
        //         {
        //             browserInstance.quit();
        //         }
        //     } );
    } );
};

function delay( t )
{
    return new Promise( ( ( resolve ) =>
    {
        setTimeout( resolve, t );
    } ) );
}

/**
 * Read the configuration from the netowrk
 * @param  {[type]} app SafeApp reference, with handle and authUri
 */
export const readConfig = ( app ) =>
    new Promise( ( resolve, reject ) =>
    {
        if ( !app || !app.handle || !app.authUri )
        {
            reject( 'Not authorised to read from the network.' );
        }

        let homeMdHandle;
        let encryptedKey;
        let encryptedValue;

        // FIXME: we add a delay here to prevent a deadlock known in the node-ffi
        // logic when dealing with the callbacks.
        // Research and remove this ASAP.
        return delay( 5000 )
            .then( ( r ) => safeApp.getOwnContainer( app.handle ) )
            .then( res => homeMdHandle = res )
            .then( () => safeMutableData.encryptKey( homeMdHandle, STATE_KEY ) )
            .then( res => encryptedKey = res )
            .then( () => safeMutableData.get( homeMdHandle, encryptedKey ) )
            .then( res => encryptedValue = res )
            .then( () => safeMutableData.decrypt( homeMdHandle, encryptedValue.buf ) )
            .then( browserState => JSON.parse( browserState.toString() ) )
            .then( json =>
            {
                logger.info( 'State retrieved: ', json );
                resolve( json );
            } )
            .catch( e =>
            {
                logger.info( 'Failure getting config from the network: ', e.message );
                logger.info( 'Failure getting config from the network: ', e.stack );
                reject( e );
            } );
    } );
