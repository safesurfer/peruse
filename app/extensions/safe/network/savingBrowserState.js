import logger from 'logger';

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
                        safeMutableDataMutation.update( mutationHandle, encryptedKey, encryptedValue, version )
                            .then( resolve );
                    }
                    else
                    {
                        safeMutableDataMutation.insert( mutationHandle, encryptedKey, encryptedValue )
                            .then( resolve );
                    }
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
 * Parses the browser state to json (removes initializer) and saves to an MD on the app Homecontainer,
 * encrypting as it goes.
 * @param  { Object } state App state
 * @param  { Bool } quit  to quit or not to quit...
 * @return {[type]}       Promise
 */
export const saveConfigToSafe = ( state, quit ) =>
{
    logger.info( 'SAVINNNGNGGGGGGG');
    console.log('SAVINGNGGGGGGGG');
    const stateToSave = { ...state, initializer: {} };
    const JSONToSave = JSON.stringify( stateToSave );
    let encryptedData;
    let encryptedKey;
    let homeMdHandle;

    return new Promise( ( resolve, reject ) =>
    {
        const initializer = state.initializer;
        const app = initializer.app;

        if ( !app || !app.handle || !app.authUri )
        {
            logger.error( 'Not authorised to save to the network.' );

            if ( quit )
            {
                browserInstance.quit();
            }

            return reject( 'Not authorised to save data' );
        }

        logger.info( 'Attempting to save state to the network.' );

        safeApp.getOwnContainer( app.handle )
            .then( res => homeMdHandle = res )
            .then( data => encryptedData = data )
            .then( () =>
            {
                let mutationHandle;
                return safeMutableData.getEntries( homeMdHandle )
                    .then( ( entriesHandle ) => safeMutableDataEntries.mutate( entriesHandle ) )
                    .then( ( res ) => mutationHandle = res )
                    .then( () => safeMutableData.encryptKey( homeMdHandle, STATE_KEY ) )
                    .then( res => encryptedKey = res )
                    .then( () => safeMutableData.get( homeMdHandle, encryptedKey ) )
                    .catch( e => logger.info( e.code, e.message ) )
                    .then( ( value ) =>
                    {
                        let version = null;

                        if ( value )
                        {
                            version = value.version + 1;
                        }

                        return updateOrCreateEncrypted( homeMdHandle, mutationHandle, STATE_KEY, JSONToSave, version );
                    } )
                    .then( _ => safeMutableData.applyEntriesMutation( homeMdHandle, mutationHandle ) )
                    .then( ( done ) =>
                    {
                        logger.info( 'Successfully save data to the network.' );
                        resolve();

                        if ( quit )
                        {
                            browserInstance.quit();
                        }

                        return Promise.resolve();
                    } );
            } )
            .catch( e =>
            {
                logger.error( 'Problems saving data to the network: ', e.message );
                reject( e );
                if ( quit )
                {
                    browserInstance.quit();
                }
            } );
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
