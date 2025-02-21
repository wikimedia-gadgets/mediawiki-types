declare global {
    namespace mw {
        /**
         * A safe interface to HTML5 `localStorage` and `sessionStorage`.
         *
         * This normalises differences across browsers and silences any and all
         * exceptions that may occur.
         *
         * **Note**: Storage keys are not automatically prefixed in relation to
         * MediaWiki and/or the current wiki. Always **prefix your keys** with "mw" to
         * avoid conflicts with gadgets, JavaScript libraries, browser extensions,
         * internal CDN or webserver cookies, and third-party applications that may
         * be embedded on the page.
         *
         * **Warning**: This API has limited storage space and does not use an expiry
         * by default. This means unused **keys are stored forever**, unless you
         * opt-in to the `expiry` parameter or otherwise make sure that your code
         * can rediscover and delete keys you created in the past.
         *
         * If you don't use the `expiry` parameter, avoid keys with variable
         * components as this leads to untracked keys that your code has no way
         * to know about and delete when the data is no longer needed. Instead,
         * store dynamic values in an object under a single constant key that you
         * manage or replace over time.
         * See also {@link https://phabricator.wikimedia.org/T121646 T121646}.
         *
         * @example
         * ```js
         * mw.storage.set( key, value, expiry );
         * mw.storage.set( key, value ); // stored indefinitely
         * mw.storage.get( key );
         * ```
         * @example
         * ```js
         * var local = require( 'mediawiki.storage' ).local;
         * local.set( key, value, expiry );
         * local.get( key );
         * ```
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.storage
         */
        const storage: Storage;

        /**
         * A wrapper for the HTML5 Storage interface (`localStorage` or `sessionStorage`)
         * that is safe to call in all browsers.
         *
         * The constructor is not publicly accessible. An instance can be accessed from
         * {@link mw.storage} or {@link module:mediawiki.storage}.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-mediawiki.storage-SafeStorage.html
         */
        interface SafeStorage {
            /**
             * Retrieve value from device storage.
             *
             * @param {string} key Key of item to retrieve
             * @returns {string|null|false} String value, null if no value exists, or false
             *  if storage is not available.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-mediawiki.storage-SafeStorage.html#get
             */
            get(key: string): string | null | false;

            /**
             * Retrieve JSON object from device storage.
             *
             * @param {string} key Key of item to retrieve
             * @returns {Object|null|boolean} Object, null if no value exists or value
             *  is not JSON-parseable, or false if storage is not available.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-mediawiki.storage-SafeStorage.html#getObject
             */
            getObject(key: string): any;

            /**
             * Remove a value from device storage.
             *
             * @param {string} key Key of item to remove
             * @returns {boolean} Whether the key was removed
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-mediawiki.storage-SafeStorage.html#remove
             */
            remove(key: string): boolean;

            /**
             * Set a value in device storage.
             *
             * @since 1.39 - expiry parameter can be passed.
             * @param {string} key Key name to store under
             * @param {string} value Value to be stored
             * @param {number} [expiry] Number of seconds after which this item can be deleted
             * @returns {boolean} The value was set
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-mediawiki.storage-SafeStorage.html#set
             */
            set(key: string, value: string, expiry?: number): boolean;

            /**
             * Set the expiry time for an item in the store.
             *
             * @since 1.39
             * @since 1.41 - returns a boolean indicating whether the expiry was set.
             * @param {string} key Key name
             * @param {number} [expiry] Number of seconds after which this item can be deleted,
             *  omit to clear the expiry (either making the item never expire, or to clean up
             *  when deleting a key).
             * @returns {boolean} The expiry was set (or cleared)
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-mediawiki.storage-SafeStorage.html#setExpires
             */
            setExpires(key: string, expiry?: number): boolean;

            /**
             * Set an object value in device storage by JSON encoding.
             *
             * @since 1.39 - expiry parameter can be passed.
             * @since 1.41 - returns a boolean indicating whether the value was set.
             * @param {string} key Key name to store under
             * @param {Object} value Object value to be stored
             * @param {number} [expiry] Number of seconds after which this item can be deleted
             * @returns {boolean} The value was set
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-mediawiki.storage-SafeStorage.html#setObject
             */
            setObject(key: string, value: any, expiry?: number): boolean;

            /**
             * Clear any expired items from the store.
             *
             * @private
             * @since 1.39
             * @returns {JQuery.Promise} Resolves when items have been expired
             */
            clearExpired(): JQuery.Promise<undefined>;

            /**
             * Get all keys with expiry values.
             *
             * @private
             * @since 1.39
             * @returns {JQuery.Promise<string[]>} Promise resolving with all the keys which have
             *  expiry values (unprefixed), or as many could be retrieved in the allocated time.
             */
            getExpiryKeys(): JQuery.Promise<string[]>;

            /**
             * Check if a given key has expired.
             *
             * @private
             * @since 1.39
             * @param {string} key Key name
             * @returns {boolean} Whether key is expired
             */
            isExpired(key: string): boolean;
        }

        interface Storage extends SafeStorage {
            /**
             * A safe interface to HTML5 `localStorage` and `sessionStorage`.
             *
             * This normalises differences across browsers and silences any and all
             * exceptions that may occur.
             *
             * **Note**: Storage keys are not automatically prefixed in relation to
             * MediaWiki and/or the current wiki. Always **prefix your keys** with "mw" to
             * avoid conflicts with gadgets, JavaScript libraries, browser extensions,
             * internal CDN or webserver cookies, and third-party applications that may
             * be embedded on the page.
             *
             * **Warning**: This API has limited storage space and does not use an expiry
             * by default. This means unused **keys are stored forever**, unless you
             * opt-in to the `expiry` parameter or otherwise make sure that your code
             * can rediscover and delete keys you created in the past.
             *
             * If you don't use the `expiry` parameter, avoid keys with variable
             * components as this leads to untracked keys that your code has no way
             * to know about and delete when the data is no longer needed. Instead,
             * store dynamic values in an object under a single constant key that you
             * manage or replace over time.
             * See also {@link https://phabricator.wikimedia.org/T121646 T121646}.
             *
             * @example
             * ```js
             * mw.storage.session.set( key, value );
             * mw.storage.session.get( key );
             * ```
             * @example
             * ```js
             * var session = require( 'mediawiki.storage' ).session;
             * session.set( key, value );
             * session.get( key );
             * ```
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-mediawiki.storage.html#.session
             */
            session: SafeStorage;
        }
    }
}

export {};
