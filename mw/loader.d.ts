declare global {
    namespace mw {
        /**
         * Client for ResourceLoader server end point.
         *
         * This client is in charge of maintaining the module registry and state
         * machine, initiating network (batch) requests for loading modules, as
         * well as dependency resolution and execution of source code.
         *
         * For more information, refer to
         * {@link https://www.mediawiki.org/wiki/Special:MyLanguage/ResourceLoader/Features}
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.loader.html
         */
        namespace loader {
            /**
             * Create a new style element and add it to the DOM.
             *
             * @param {string} text CSS text
             * @param {Node|null} [nextNode] The element where the style tag
             *  should be inserted before
             * @returns {HTMLStyleElement} Reference to the created style element
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.loader.html#.addStyleTag
             */
            function addStyleTag(text: string, nextNode?: Node | null): HTMLStyleElement;

            /**
             * Get the names of all registered ResourceLoader modules.
             *
             * @returns {string[]}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.loader.html#.getModuleNames
             */
            function getModuleNames(): string[];

            /**
             * Load a script by URL.
             *
             * @example
             * ```js
             * mw.loader.getScript(
             *     'https://example.org/x-1.0.0.js'
             * )
             *     .then( function () {
             *         // Script succeeded. You can use X now.
             *     }, function ( e ) {
             *         // Script failed. X is not avaiable
             *         mw.log.error( e.message ); // => "Failed to load script"
             *     } );
             * } );
             * ```
             * @param {string} url Script URL
             * @returns {JQuery.Promise} Resolved when the script is loaded
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.loader.html#.getScript
             */
            function getScript(url: string): JQuery.Promise<any>;

            /**
             * Get the state of a module.
             *
             * Possible states for the public API:
             *
             * - `registered`: The module is available for loading but not yet requested.
             * - `loading`, `loaded`, or `executing`: The module is currently being loaded.
             * - `ready`: The module was successfully and fully loaded.
             * - `error`: The module or one its dependencies has failed to load, e.g. due to
             *    uncaught error from the module's script files.
             * - `missing`: The module was requested but is not defined according to the server.
             *
             * Internal mw.loader state machine:
             *
             * - `registered`:
             *    The module is known to the system but not yet required.
             *    Meta data is stored by {@link register()}.
             *    Calls to that method are generated server-side by StartupModule.
             * - `loading`:
             *    The module was required through mw.loader (either directly or as dependency of
             *    another module). The client will fetch module contents from {@link mw.loader.store}
             *    or from the server. The contents should later be received by {@link implement()}.
             * - `loaded`:
             *    The module has been received by {@link implement()}.
             *    Once the module has no more dependencies in-flight, the module will be executed,
             *    controlled via `setAndPropagate()` and `doPropagation()`.
             * - `executing`:
             *    The module is being executed (apply messages and stylesheets, execute scripts)
             *    by `execute()`.
             * - `ready`:
             *    The module has been successfully executed.
             * - `error`:
             *    The module (or one of its dependencies) produced an uncaught error during execution.
             * - `missing`:
             *    The module was registered client-side and requested, but the server denied knowledge
             *    of the module's existence.
             *
             * @param {string} module Name of module
             * @returns {Module.State|null} The state, or null if the module (or its state) is not
             *  in the registry.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.loader.html#.getState
             */
            function getState(module: string): Module.State | null;

            /**
             * Load an external script or one or more modules.
             *
             * This method takes a list of unrelated modules. Use cases:
             *
             * - A web page will be composed of many different widgets. These widgets independently
             *   queue their ResourceLoader modules (`OutputPage::addModules()`). If any of them
             *   have problems, or are no longer known (e.g. cached HTML), the other modules
             *   should still be loaded.
             * - This method is used for preloading, which must not throw. Later code that
             *   calls {@link using()} will handle the error.
             *
             * @param {string|string[]} modules Either the name of a module, array of modules,
             *  or a URL of an external script or style
             * @param {string} [type="text/javascript"] MIME type to use if calling with a URL of an
             *  external script or style; acceptable values are "text/css" and
             *  "text/javascript"; if no type is provided, text/javascript is assumed.
             * @throws {Error} If type is invalid
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.loader.html#.load
             */
            function load(modules: string | string[], type?: "text/css" | "text/javascript"): void;

            /**
             * Register a module, letting the system know about it and its properties.
             *
             * The startup module calls this method.
             *
             * When using multiple module registration by passing an array, dependencies that
             * are specified as references to modules within the array will be resolved before
             * the modules are registered.
             *
             * @param {string|Array} modules Module name or array of arrays, each containing
             *  a list of arguments compatible with this method
             * @param {string|number} [version] Module version hash (falls backs to empty string)
             *  Can also be a number (timestamp) for compatibility with MediaWiki 1.25 and earlier.
             * @param {string[]} [dependencies] Array of module names on which this module depends.
             * @param {string} [group=null] Group which the module is in
             * @param {string} [source='local'] Name of the source
             * @param {string} [skip=null] Script body of the skip function
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.loader-method-register
             */
            function register(
                modules: string,
                version?: string | number,
                dependencies?: string[],
                group?: string | null,
                source?: string,
                skip?: string | null
            ): void;
            function register(
                modules: Array<
                    [
                        module: string,
                        version?: string | number,
                        dependencies?: Array<string | number>,
                        group?: string | null,
                        source?: string,
                        skip?: string | null
                    ]
                >
            ): void;

            /**
             * Change the state of one or more modules.
             *
             * @param {Object.<string, Module.State>} states Object of module name/state pairs
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.loader-method-state
             */
            function state(states: Record<string, Module.State>): void;

            /**
             * Execute a function after one or more modules are ready.
             *
             * Use this method if you need to dynamically control which modules are loaded
             * and/or when they loaded (instead of declaring them as dependencies directly
             * on your module.)
             *
             * This uses the same loader as for regular module dependencies. This means
             * ResourceLoader will not re-download or re-execute a module for the second
             * time if something else already needed it. And the same browser HTTP cache,
             * and localStorage are checked before considering to fetch from the network.
             * And any on-going requests from other dependencies or using() calls are also
             * automatically re-used.
             *
             * @example
             * ```js
             * // Inline dependency on OOjs
             * mw.loader.using( 'oojs', function () {
             *     OO.compare( [ 1 ], [ 1 ] );
             * } );
             * ```
             * @example
             * ```js
             * // Inline dependency obtained via require()
             * mw.loader.using( [ 'mediawiki.util' ], function ( require ) {
             *     var util = require( 'mediawiki.util' );
             * } );
             * ```
             * @since 1.23 - this returns a promise.
             * @since 1.28 - the promise is resolved with a `require` function.
             * @param {string|string[]} dependencies Module name or array of modules names the
             *  callback depends on to be ready before executing
             * @param {function(Module.Require):void} [ready] Callback to execute when all dependencies are ready
             * @param {function(Error, ...any):void} [error] Callback to execute if one or more dependencies failed
             * @returns {JQuery.Promise<Module.Require>} With a `require` function
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.loader.html#.using
             */
            function using(
                dependencies: string | string[],
                ready?: (require: Module.Require) => void,
                error?: (error: Error, ...args: any[]) => void
            ): JQuery.Promise<Module.Require>;

            /**
             * Exposed for testing and debugging only.
             *
             * @private
             */
            const maxQueryLength: number;

            /**
             * The module registry is exposed as an aid for debugging and inspecting page
             * state; it is not a public interface for modifying the registry.
             *
             * @private
             */
            const moduleRegistry: Record<string, Module.RegistryEntry>;

            /**
             * Utility function for execute()
             *
             * @private
             * @since 1.39
             * @param {string} url URL
             * @param {string} [media] Media attribute
             * @param {Node|null} [nextNode]
             * @returns {HTMLLinkElement}
             */
            function addLinkTag(
                url: string,
                media?: string,
                nextNode?: Node | null
            ): HTMLLinkElement;

            /**
             * Load and execute a script.
             *
             * @private
             * @since 1.39
             * @param {string} src URL to script, will be used as the src attribute in the script tag
             * @param {function():void} [callback] Callback to run after request resolution
             * @param {string[]} [modules] List of modules being requested, for state to be marked as error
             * in case the script fails to load
             * @returns {HTMLScriptElement}
             */
            function addScriptTag(
                src: string,
                callback?: () => void,
                modules?: string[]
            ): HTMLScriptElement;

            /**
             * Register a source.
             *
             * The {@link work()} method will use this information to split up requests by source.
             *
             * @example
             * ```js
             * mw.loader.addSource( { mediawikiwiki: 'https://www.mediawiki.org/w/load.php' } );
             * ```
             * @private
             * @param {Object.<string, string>} ids An object mapping ids to load.php end point urls
             * @throws {Error} If source id is already registered
             */
            function addSource(ids: Record<string, string>): void;

            /**
             * Add one or more modules to the module load queue.
             *
             * See also {@link work()}.
             *
             * @private
             * @param {string[]} dependencies Array of module names in the registry
             * @param {function():void} [ready] Callback to execute when all dependencies are ready
             * @param {function(Error, ...any):void} [error] Callback to execute when any dependency fails
             */
            function enqueue(
                dependencies: string[],
                ready?: () => void,
                error?: (error: Error, ...args: any[]) => void
            ): void;

            /**
             * Implement a module given a function which returns the components of the module
             *
             * @private
             * @since 1.41
             * @param {Module.Declarator} declarator The declarator should return an array with the following keys:
             *
             * - 0. {string} module Name of module and current module version. Formatted
             *   as `[name]@[version]`. This version should match the requested version
             *   (from #batchRequest and #registry). This avoids race conditions (T117587).
             *
             * - 1. {ModuleScript} [script] Module code. This can be a function,
             *   a list of URLs to load via `<script src>`, a string for `globalEval()`, or an
             *   object like `{"files": {"foo.js":function, "bar.js": function, ...}, "main": "foo.js"}`.
             *   If an object is provided, the main file will be executed immediately, and the other
             *   files will only be executed if loaded via require(). If a function or string is
             *   provided, it will be executed/evaluated immediately. If an array is provided, all
             *   URLs in the array will be loaded immediately, and executed as soon as they arrive.
             *
             * - 2. {ModuleStyle} [style] Should follow one of the following patterns:
             *
             *   ```js
             *   { "css": [css, ..] }
             *   { "url": { (media): [url, ..] } }
             *   ```
             *
             *   The reason css strings are not concatenated anymore is T33676. We now check
             *   whether it's safe to extend the stylesheet.
             *
             * - 3. {ModuleMessages} [messages] List of key/value pairs to be added to {@link mw.messages}.
             * - 4. {ModuleTemplates} [templates] List of key/value pairs to be added to {@link mw.templates}.
             * - 5. {String|null} [deprecationWarning] Deprecation warning if any
             *
             * The declarator must not use any scope variables, since it will be serialized with
             * {@link Function.prototype.toString()} and later restored and executed in the global scope.
             *
             * The elements are all optional except the name.
             */
            function impl(declarator: Module.Declarator): void;

            /**
             * Implement a module given the components of the module.
             *
             * See {@link impl} for a full description of the parameters.
             *
             * Prior to MW 1.41, this was used internally, but now it is only kept
             * for backwards compatibility.
             *
             * Does not support mw.loader.store caching.
             *
             * @private
             * @since 1.41 - deprecationWarning parameter can be passed.
             * @deprecated since 1.41
             * @param {string} module
             * @param {Module.Script} [script] Module code. This can be a function,
             *  a list of URLs to load via `<script src>`, a string for `domEval()`, or an
             *  object like {"files": {"foo.js":function, "bar.js": function, ...}, "main": "foo.js"}.
             *  If an object is provided, the main file will be executed immediately, and the other
             *  files will only be executed if loaded via require(). If a function or string is
             *  provided, it will be executed/evaluated immediately. If an array is provided, all
             *  URLs in the array will be loaded immediately, and executed as soon as they arrive.
             * @param {Module.Style} [style] Should follow one of the following patterns:
             *
             * ```js
             * { "css": [css, ..] }
             * { "url": { <media>: [url, ..] } }
             * ```
             *
             * The reason css strings are not concatenated anymore is T33676. We now check
             * whether it's safe to extend the stylesheet.
             * @param {Module.Messages} [messages] List of key/value pairs to be added to {@link mw.messages}.
             * @param {Module.Templates} [templates] List of key/value pairs to be added to {@link mw.templates}.
             * @param {string|null} [deprecationWarning] Deprecation warning if any
             */
            function implement(
                module: string,
                script?: Module.Script,
                style?: Module.Style,
                messages?: Module.Messages,
                templates?: Module.Templates,
                deprecationWarning?: string | null
            ): void;

            /**
             * Register a module, letting the system know about it and its properties.
             *
             * The startup module calls this method.
             *
             * When using multiple module registration by passing an array, dependencies that
             * are specified as references to modules within the array will be resolved before
             * the modules are registered.
             *
             * @private
             * @since 1.41 - version can no longer be a number (timestamp).
             * @param {string|Array} modules Module name or array of arrays, each containing
             *  a list of arguments compatible with this method
             * @param {string|number} [version] Module version hash (falls backs to empty string)
             * @param {Array<string|number>} [dependencies] Array of module names on which this module depends.
             * @param {string|null} [group=null] Group which the module is in
             * @param {string} [source="local"] Name of the source
             * @param {string|null} [skip=null] Script body of the skip function
             */
            function register(
                modules: string,
                version?: string | number,
                dependencies?: string[],
                group?: string | null,
                source?: string,
                skip?: string | null
            ): void;
            function register(
                modules: Array<
                    [
                        module: string,
                        version?: string | number,
                        dependencies?: Array<string | number>,
                        group?: string | null,
                        source?: string,
                        skip?: string | null
                    ]
                >
            ): void;

            /**
             * Get the exported value of a module.
             *
             * This static method is publicly exposed for debugging purposes
             * only and must not be used in production code. In production code,
             * please use the dynamically provided `require()` function instead.
             *
             * In case of lazy-loaded modules via {@link mw.loader.using()}, the returned
             * Promise provides the function, see {@link mw.loader.using using()} for examples.
             *
             * @since 1.27
             * @private
             */
            const require: Module.Require;

            /**
             * Get names of module that a module depends on, in their proper dependency order.
             *
             * @private
             * @param {string[]} modules Array of string module names
             * @returns {string[]} List of dependencies, including 'module'.
             * @throws {Error} If an unregistered module or a dependency loop is encountered
             */
            // note: U is required so T is not inferred from the "modules" argument
            function resolve<T extends string, U extends T = T>(modules: U[]): T[];

            /**
             * Change the state of one or more modules.
             *
             * @private
             * @param {Object.<string, Module.State>} states Object of module name/state pairs
             */
            function state(states: Record<string, Module.State>): void;

            /**
             * Start loading of all queued module dependencies.
             *
             * @private
             */
            function work(): void;

            interface Module {
                exports: any;
            }

            namespace Module {
                type Key = `${string}@${string}`;
                type State =
                    | "error"
                    | "executing"
                    | "loaded"
                    | "loading"
                    | "missing"
                    | "ready"
                    | "registered";
                type Messages = Record<string, string>;
                type Style = Record<string, any>;
                type Templates = Record<string, any>;

                interface Declarator {
                    (): [
                        module: string,
                        script?: Script | null,
                        style?: Style | null,
                        messages?: Messages | null,
                        templates?: Templates | null,
                        deprecationWarning?: string | null
                    ];
                }

                interface Require {
                    /**
                     * Get the exported value of a module.
                     *
                     * @param {string} moduleName Module name
                     * @returns {any} Exported value
                     */
                    (moduleName: string): any;
                }

                type Script =
                    | string[]
                    | (($: JQuery, jQuery: JQuery, require: Require, module: Module) => void)
                    | {
                          files: { [key: string]: any };
                          main: string;
                      }
                    | string;

                interface RegistryEntry {
                    /**
                     * @since 1.41
                     */
                    declarator?: Declarator | null;
                    dependencies: string[];
                    /**
                     * @since 1.41
                     */
                    deprecationWarning?: string | null;
                    group: number | null;
                    messages?: Messages | null;
                    module: Module;
                    packageExports: any;
                    script?: Script | null;
                    skip: string | null;
                    source: string;
                    state: "error" | "loaded" | "missing" | "registered" | "ready";
                    version: string;
                }
            }

            namespace store {
                /**
                 * The localStorage key for the entire module store. The key references
                 * $wgDBname to prevent clashes between wikis which share a common host.
                 *
                 * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.loader.store-property-key
                 */
                const key: string;

                /**
                 * A string containing various factors by which the module cache should vary.
                 *
                 * Defined by ResourceLoader\StartupModule::getStoreVary() in PHP.
                 */
                const vary: string;

                /**
                 * Queue the name of a module that the next update should consider storing.
                 *
                 * @since 1.32
                 * @param {string} module Module name
                 */
                function add(module: string): void;

                /**
                 * Clear the entire module store right now.
                 */
                function clear(): void;

                /**
                 * Retrieve a module from the store and update cache hit stats.
                 *
                 * @param {string} module Module name
                 * @returns {string|boolean} Module implementation or false if unavailable
                 */
                function get(module: string): string | false;

                /**
                 * Initialize the store.
                 *
                 * Retrieves store from localStorage and (if successfully retrieved) decoding
                 * the stored JSON value to a plain object.
                 */
                function init(): void;

                /**
                 * Internal helper for {@link init()}. Separated for ease of testing.
                 */
                function load(): void;

                /**
                 * Iterate through the module store, removing any item that does not correspond
                 * (in name and version) to an item in the module registry.
                 */
                function prune(): void;

                /**
                 * Construct a JSON-serializable object representing the content of the store.
                 *
                 * @deprecated Removed since 1.41.
                 * @returns {Json} Module store contents.
                 */
                function toJSON(): Json;

                /**
                 * Whether the store is in use on this page.
                 */
                const enabled: boolean | null;

                /**
                 * The contents of the store, mapping '[name]@[version]' keys
                 * to module implementations.
                 */
                const items: Record<Module.Key, any>;

                /**
                 * Names of modules to be stored during the next update.
                 */
                const queue: string[];

                /**
                 * Cache hit stats.
                 */
                const stats: Stats;

                /**
                 * Add the contents of the named module to the in-memory store.
                 *
                 * This method does not guarantee that the module will be stored.
                 * Inspection of the module's meta data and size will ultimately decide that.
                 *
                 * This method is considered internal to mw.loader.store and must only
                 * be called if the store is enabled.
                 *
                 * @private
                 * @param {string} module Module name
                 */
                function set(module: string): void;

                /**
                 * Request a sync of the in-memory store back to persisted localStorage.
                 *
                 * This function debounces updates. The debouncing logic should account
                 * for the following factors:
                 *
                 * - Writing to localStorage is an expensive operation that must not happen
                 *   during the critical path of initialising and executing module code.
                 *   Instead, it should happen at a later time after modules have been given
                 *   time and priority to do their thing first.
                 *
                 * - This method is called from {@link mw.loader.store.add()}, which will be called
                 *   hundreds of times on a typical page, including within the same call-stack
                 *   and eventloop-tick. This is because responses from load.php happen in
                 *   batches. As such, we want to allow all modules from the same load.php
                 *   response to be written to disk with a single flush, not many.
                 *
                 * - Repeatedly deleting and creating timers is non-trivial.
                 *
                 * - localStorage is shared by all pages from the same origin, if multiple
                 *   pages are loaded with different module sets, the possibility exists that
                 *   modules saved by one page will be clobbered by another. The impact of
                 *   this is minor, it merely causes a less efficient cache use, and the
                 *   problem would be corrected by subsequent page views.
                 *
                 * This method is considered internal to mw.loader.store and must only
                 * be called if the store is enabled.
                 *
                 * @private
                 */
                function requestUpdate(): void;

                interface Json {
                    asOf: number;
                    items: string;
                    vary: string;
                }

                interface Stats {
                    expired: number;
                    failed: number;
                    hits: number;
                    misses: number;
                }
            }
        }
    }
}

/** @deprecated Use {@link mw.loader.store.Stats} instead */
export type ResourceLoaderStoreStats = mw.loader.store.Stats;

export {};
