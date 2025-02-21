declare global {
    interface JQueryStatic {
        /**
         * Set a cookie.
         *
         * To use this {@link jQuery} plugin, load the `mediawiki.cookie` module using {@link mw.loader}.
         *
         * @example
         * ```js
         * mw.loader.using( 'mediawiki.cookie' ).then( () => {
         *     $.cookie( 'name', 'value', {} );
         * } );
         * ```
         * @param {string} [key] Cookie name or (when getting) omit to return an object with all
         *  current cookie keys and values.
         * @param {string|null} [value] Cookie value to set. If `null`, this method will remove the cookie.
         *  If omited, this method will get and return the current value.
         * @param {mw.cookie.Options} [options]
         * @returns {string|Object} The current value (if getting a cookie), or an internal `document.cookie`
         *  expression (if setting or removing).
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-mediawiki.cookie.html#.$.cookie
         */
        cookie(key: string, value: string | null, options?: mw.cookie.Options): string;
        cookie(key: string): unknown;
        cookie(): Record<string, unknown>;

        /**
         * Remove a cookie by key.
         *
         * To use this {@link jQuery} plugin, load the `mediawiki.cookie` module using {@link mw.loader}.
         *
         * @example
         * ```js
         * mw.loader.using( 'mediawiki.cookie' ).then( () => {
         *     $.removeCookie( 'name', {} );
         * } );
         * ```
         * @param {string} key
         * @param {mw.cookie.Options} options
         * @returns {boolean} True if the cookie previously existed
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-mediawiki.cookie.html#.$.removeCookie
         */
        removeCookie(key: string, options: mw.cookie.Options): boolean;
    }
}

export {};
