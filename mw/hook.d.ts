declare global {
    namespace mw {
        /**
         * Create an instance of {@link mw.Hook}.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(
            name: "apisandbox.formatRequest"
        ): Hook<
            [
                items: OO.ui.MenuOptionWidget[],
                displayParams: object,
                rawParams: object,
                method: string,
                ajaxOptions: JQuery.AjaxSettings
            ]
        >;

        /**
         * Create an instance of {@link mw.Hook}, fired after EditRecovery has loaded any recovery data, added event handlers, etc.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'editRecovery.loadEnd'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "editRecovery.loadEnd"): Hook<[editRecovery: EditRecovery]>;

        /**
         * Create an instance of {@link mw.Hook}.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'htmlform.enhance'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "htmlform.enhance"): Hook<[$root: JQuery]>;

        /**
         * Create an instance of {@link mw.Hook}, fired after an edit was successfully saved.
         *
         * Does not fire for null edits.
         *
         * Code that fires the postEdit hook should first set `wgRevisionId` and `wgCurRevisionId` to the revision associated with the edit that triggered the postEdit hook, then fire the postEdit hook, e.g.:
         *
         * @example
         * ```js
         * mw.config.set( {
         *     wgCurRevisionId: data.newrevid,
         *     wgRevisionId: data.newrevid
         * } );
         * // Now fire the hook.
         * mw.hook( 'postEdit' ).fire();
         * ```
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'postEdit'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "postEdit"): Hook<[data?: PostEditData]>;

        /**
         * Create an instance of {@link mw.Hook}, fired after the listener for #postEdit removes the notification.
         *
         * @deprecated
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'postEdit.afterRemoval'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "postEdit.afterRemoval"): Hook<[]>;

        /**
         * Create an instance of {@link mw.Hook}.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "prefs.search.buildIndex"): Hook<[index: SearchIndex]>;

        /**
         * Create an instance of {@link mw.Hook}, fired when a trusted UI element to perform a logout has been activated.
         *
         * This will end the user session, and either redirect to the given URL on success, or queue an error message via mw.notification.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'skin.logout'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "skin.logout"): Hook<[href: string]>;

        /**
         * Create an instance of {@link mw.Hook}, fired when initialization of the filtering interface for changes list is complete.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'structuredChangeFilters.ui.initialized'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "structuredChangeFilters.ui.initialized"): Hook<[]>;

        /**
         * Create an instance of {@link mw.Hook}, fired when a portlet is successfully created.
         *
         * @example
         * ```js
         * mw.hook( 'util.addPortlet' ).add( ( p ) => {
         *     p.style.border = 'solid 1px black';
         * } );
         * ```
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'util.addPortlet'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(
            name: "util.addPortlet"
        ): Hook<[portlet: HTMLElement, selectorHint: string | undefined]>;

        /**
         * Create an instance of {@link mw.Hook}, fired when a portlet link is successfully created.
         *
         * @example
         * ```js
         * mw.hook( 'util.addPortletLink' ).add( ( link ) => {
         *     const span = $( '<span class="icon">' );
         *     link.appendChild( span );
         * } );
         * ```
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'util.addPortletLink'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "util.addPortletLink"): Hook<[item: HTMLLIElement, data: object]>;

        /**
         * Create an instance of {@link mw.Hook}, fired when categories are being added to the DOM.
         *
         * It is encouraged to fire it before the main DOM is changed (when $content is still detached).  However, this order is not defined either way, so you should only rely on $content itself.
         *
         * This includes the ready event on a page load (including post-edit loads) and when content has been previewed with LivePreview.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'wikipage.categories'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "wikipage.categories"): Hook<[$content: JQuery]>;

        /**
         * Create an instance of {@link mw.Hook}, fired after collapsible content has been initialized.
         *
         * This gives an option to modify the collapsible behavior.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'wikipage.collapsibleContent'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "wikipage.collapsibleContent"): Hook<[$collapsible: JQuery]>;

        /**
         * Create an instance of {@link mw.Hook}, fired when wiki content has been added to the DOM.
         *
         * This should only be fired after $content has been attached.
         *
         * This includes the ready event on a page load (including post-edit loads) and when content has been previewed with LivePreview.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'wikipage.content'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "wikipage.content"): Hook<[$content: JQuery]>;

        /**
         * Create an instance of {@link mw.Hook}, fired when a diff is added to a page or dynamically displayed to the user.
         *
         * Similar to the wikipage.content hook, `$diff` may still be detached when the hook is fired.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'wikipage.diff'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "wikipage.diff"): Hook<[$table: JQuery<HTMLTableElement>]>;

        /**
         * Create an instance of {@link mw.Hook}.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'wikipage.diff.diffTypeSwitch'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(
            name: "wikipage.diff.diffTypeSwitch"
        ): Hook<[inlineToggleSwitch: OO.ui.ToggleSwitchWidget]>;

        /**
         * Create an instance of {@link mw.Hook}.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'wikipage.diff.wikitextDiffBody'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "wikipage.diff.wikitextBodyUpdate"): Hook<[$wikitextDiffBody: JQuery]>;

        /**
         * Create an instance of {@link mw.Hook}, fired when the editform is added to the edit page.
         *
         * Similar to the wikipage.content hoo $editForm can still be detached when this hook is fired.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'wikipage.editform'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "wikipage.editform"): Hook<[$editForm: JQuery]>;

        /**
         * Create an instance of {@link mw.Hook}, fired when a page's
         * {@link https://www.mediawiki.org/wiki/Special:MyLanguage/Help:Page_status_indicators status indicators}
         * are being added to the DOM or updated.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'wikipage.indicators'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "wikipage.indicators"): Hook<[$indicators: JQuery]>;

        /**
         * Create an instance of {@link mw.Hook}, fired when dynamic changes have been made to the table of contents.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'wikipage.tableOfContents'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(name: "wikipage.tableOfContents"): Hook<[sections: any[]]>;

        /**
         * Create an instance of {@link mw.Hook}, fired when the page watch status has changed.
         *
         * @example
         * ```js
         * mw.hook( 'wikipage.watchlistChange' ).add( ( isWatched, expiry, expirySelected ) => {
         *     // Do things
         * } );
         * ```
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hooks.html#~event:'wikipage.watchlistChange'
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook(
            name: "wikipage.watchlistChange"
        ): Hook<[isWatched: boolean, expiry: string, expirySelected: string]>;

        /**
         * Create an instance of {@link mw.Hook}.
         *
         * @example
         * ```js
         * const hook = mw.hook( 'name' );
         * hook.add( () => alert( 'Hook was fired' ) );
         * hook.fire();
         * ```
         * @param {string} name Name of hook.
         * @returns {Hook}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.hook
         */
        function hook<T extends any[] = any[]>(name: string): Hook<T>;

        /**
         * An instance of a hook, created via {@link mw.hook mw.hook method}.
         *
         * MediaWiki has various interface components that are extended, enhanced
         * or manipulated in some other way by extensions, gadgets and even
         * in core itself.
         *
         * This framework helps streamlining the timing of when these other
         * code paths fire their plugins (instead of using document-ready,
         * which can and should be limited to firing only once).
         *
         * Features like navigating to other wiki pages, previewing an edit
         * and editing itself – without a refresh – can then retrigger these
         * hooks accordingly to ensure everything still works as expected.
         * See {@link Hook}.
         *
         * Example usage:
         *
         * ```js
         * mw.hook( 'wikipage.content' ).add( fn ).remove( fn );
         * mw.hook( 'wikipage.content' ).fire( $content );
         * ```
         *
         * Handlers can be added and fired for arbitrary event names at any time. The same
         * event can be fired multiple times. The last run of an event is memorized
         * (similar to `$(document).ready` and `$.Deferred().done`).
         * This means if an event is fired, and a handler added afterwards, the added
         * function will be fired right away with the last given event data.
         *
         * Like Deferreds and Promises, the {@link mw.Hook} object is both detachable and chainable.
         * Thus allowing flexible use and optimal maintainability and authority control.
         * You can pass around the `add` and/or `fire` method to another piece of code
         * without it having to know the event name (or {@link mw.Hook} for that matter).
         *
         * ```js
         * var h = mw.hook( 'bar.ready' );
         * new mw.Foo( .. ).fetch( { callback: h.fire } );
         * ```
         *
         * The function signature for hooks can be considered {@link https://www.mediawiki.org/wiki/Special:MyLanguage/Stable_interface_policy/Frontend stable}.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hook.html
         */
        interface Hook<T extends any[] = any[]> {
            /**
             * Register a hook handler.
             *
             * @param {...Function} handler Function to bind.
             * @returns {Hook}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hook.html#.add
             */
            add(...handler: Array<(...data: T) => any>): this;

            /**
             * Call hook handlers with data.
             *
             * @param {...any} data
             * @returns {Hook}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hook.html#.fire
             */
            fire(...data: T): this;

            /**
             * Unregister a hook handler.
             *
             * @param {...Function} handler Function to unbind.
             * @returns {Hook}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/Hook.html#.remove
             */
            remove(...handler: Array<(...data: T) => any>): this;
        }

        interface PostEditData {
            /**
             * Message that listeners should use when displaying notifications.
             * String for plain text, use array or jQuery object to pass actual nodes.
             */
            message?: string | JQuery | HTMLElement[];
            /**
             * Whether a temporary user account was created.
             */
            tempUserCreated?: boolean;
            /**
             * User that made the edit.
             */
            user?: string | User;
        }

        interface SearchIndex {
            [k: string]: SearchIndex.Entry[];
        }

        namespace SearchIndex {
            interface Entry {
                $field: JQuery;
                $highlight: JQuery;
                $tabPanel: JQuery;
                $wrapper: JQuery;
            }
        }

        interface EditRecovery {
            fieldChangeHandler(): void;
        }
    }
}

export {};
