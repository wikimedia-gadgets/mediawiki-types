declare global {
    namespace mw {
        /**
         * Collection of values by string keys.
         *
         * This is an internal class that backs the mw.config and mw.messages APIs.
         *
         * It allows reading and writing to the collection via public methods,
         * and allows batch iteraction for all its methods.
         *
         * For {@link mw.config}, scripts sometimes choose to "import" a set of keys locally,
         * like so:
         *
         * ```js
         * var conf = mw.config.get( [ 'wgServerName', 'wgUserName', 'wgPageName' ] );
         * conf.wgServerName; // "example.org"
         * ```
         *
         * Check the existence ("AND" condition) of multiple keys:
         *
         * ```js
         * if ( mw.config.exists( [ 'wgFoo', 'wgBar' ] ) );
         * ```
         *
         * For mw.messages, the {@link set} method allows {@link mw.loader} and {@link mw.Api} to essentially
         * extend the object, and batch-apply all their loaded values in one go:
         *
         * ```
         * mw.messages.set( { "mon": "Monday", "tue": "Tuesday" } );
         * ```
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Map.html
         */
        class Map<V extends Record<string, any> = Record<string, any>> {
            private values: V;

            /**
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Map.html#Map
             */
            constructor();

            /**
             * Check if a given key exists in the map.
             *
             * @param selection Key to check
             * @returns True if the key exists
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Map.html#.exists
             */
            exists(selection: keyof V): boolean;

            /**
             * Get the value of one or more keys.
             *
             * If called with no arguments, all values are returned.
             *
             * @param selection Key or array of keys to retrieve values for.
             * @param fallback Value for keys that don't exist.
             * @returns If selection was a string, returns the value. If selection was an array, returns
             * an object of key/values. If no selection is passed, a new object with all key/values is returned.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Map.html#.get
             */
            get<S extends TypeOrArray<keyof V>, TD>(
                selection: S,
                fallback: TD
            ): PickOrDefault<V, S, TD>;
            get<S extends TypeOrArray<keyof V>>(selection: S): PickOrDefault<V, S, null>;
            get(): V;

            /**
             * Set the value of one or more keys.
             *
             * @param selection Key to set value for, or object mapping keys to values
             * @param value Value to set (optional, only in use when key is a string)
             * @returns True on success, false on failure
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Map.html#.set
             */
            set<S extends keyof V>(selection: S, value: V[S]): boolean;
            set<S extends Partial<V>>(selection: S): boolean;
        }

        namespace Map {
            // `Map.Extensible<V, TX>` is an alternative to `Map<V & Record<string, TX>>`, but unlike the latter
            // Map.Extensible provides additional overloads to improve selection autocompletion and type checking.
            interface Extensible<V extends Record<string, any>, TX = unknown>
                extends Map<V & Record<string, TX>> {
                /**
                 * Check if a given key exists in the map.
                 *
                 * @param selection Key to check
                 * @returns True if the key exists
                 * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Map.html#.exists
                 */
                exists(selection: keyof V): boolean;
                exists(selection: string): boolean;

                /**
                 * Get the value of one or more keys.
                 *
                 * If called with no arguments, all values are returned.
                 *
                 * @param selection Key or array of keys to retrieve values for.
                 * @param fallback Value for keys that don't exist.
                 * @returns If selection was a string, returns the value. If selection was an array, returns
                 * an object of key/values. If no selection is passed, a new object with all key/values is returned.
                 * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Map.html#.get
                 */
                get<S extends TypeOrArray<keyof V>, TD>(
                    selection: S,
                    fallback: TD
                ): PickOrDefault<V, S, TD, TX>;
                get<S extends TypeOrArray<string>, TD>(
                    selection: S,
                    fallback: TD
                ): PickOrDefault<V, S, TD, TX>;
                get<S extends TypeOrArray<keyof V>>(selection: S): PickOrDefault<V, S, null, TX>;
                get<S extends TypeOrArray<string>>(selection: S): PickOrDefault<V, S, null, TX>;
                get(): V & Record<string, TX>;

                /**
                 * Set the value of one or more keys.
                 *
                 * @param selection Key to set value for, or object mapping keys to values
                 * @param value Value to set (optional, only in use when key is a string)
                 * @returns True on success, false on failure
                 * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Map.html#.set
                 */
                set<S extends keyof V>(selection: S, value: V[S]): boolean;
                set<S extends string>(selection: S, value: TX): boolean;
                set<S extends Partial<V> & Record<string, TX>>(selection: S): boolean;
            }
        }
    }
}

/** @deprecated Use {@link mw.Map.Extensible} instead */
export type ExtensibleMap<V extends Record<string, any>, TX = unknown> = mw.Map.Extensible<V, TX>;

export {};
