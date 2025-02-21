declare global {
    namespace mw {
        /**
         * Manage cookies in a way that is syntactically and functionally similar
         * to the `WebRequest#getCookie` and `WebResponse#setcookie` methods in PHP.
         *
         * @example
         * ```js
         * mw.loader.using( 'mediawiki.cookie' ).then( () => {
         *     mw.cookie.set('hello', 'world' );
         * })
         * ```
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.cookie.html
         */
        namespace cookie {
            type SameSite = "none" | "lax" | "strict";

            /**
             * Get the value of a cookie.
             *
             * @param {string} key The key for the cookie
             * @param {string} [prefix] The prefix of the key. If undefined or null, `$wgCookiePrefix` is used
             * @param {string|null} [defaultValue] A value to return if the cookie does not exist
             * @returns {string|null} If the cookie exists, the value of the cookie, otherwise `defaultValue`
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.cookie.html#.get
             */
            function get<D extends string | null>(
                key: string,
                prefix: string | undefined | null,
                defaultValue: D
            ): string | D;
            function get(key: string, prefix?: string | null): string | null;

            /**
             * Get the value of a cookie.
             *
             * @deprecated since 1.43, use {@link mw.cookie.get} instead
             * @param {string} key The key for the cookie
             * @param {string} [prefix] The prefix of the key. If undefined or null, `$wgCookiePrefix` is used
             * @param {string|null} [defaultValue] A value to return if the cookie does not exist
             * @returns {string|null|undefined} If the cookie exists, the value of the cookie, otherwise `defaultValue`
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.cookie.html#.getCrossSite
             */
            function getCrossSite<D extends string | null>(
                key: string,
                prefix: string | undefined | null,
                defaultValue: D
            ): string | D;
            function getCrossSite(key: string, prefix?: string | null): string | null;

            /**
             * Set or delete a cookie.
             *
             * **Note:** If explicitly passing `null` or `undefined` for an options key, that will override the default. This is natural in JavaScript, but noted here because it is contrary to MediaWiki's `WebResponse#setcookie()` method in PHP.
             *
             * When using this for persistent storage of identifiers (e.g. for tracking sessions), be aware that persistence may vary slightly across browsers and browser versions, and can be affected by a number of factors such as storage limits (cookie eviction) and session restore features.
             *
             * Without an expiry, this creates a session cookie. In a browser, session cookies persist for the lifetime of the browser *process*. Including across tabs, page views, and windows, until the browser itself is *fully* closed, or until the browser clears all storage for a given website. An exception to this is if the user evokes a "restore previous session" feature that some browsers have.
             *
             * @param {string} key
             * @param {string|null} value Value of cookie. If `value` is `null` then this method will instead remove a cookie by name of `key`
             * @param {Options|Date|number} [options] Options object, or expiry date
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.cookie.html#.set
             */
            // see https://stackoverflow.com/a/64932909 for <SS>
            function set<SS extends string = SameSite>(
                key: string,
                value: string | null,
                options?: Options<SS> | Date | number
            ): void;

            /**
             * Custom scope for cookie key, must match the way it was set.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.cookie.html#.CookieOptions
             */
            interface Options<SS extends string = SameSite> {
                /**
                 * Custom scope for cookie key. The domain attribute of the cookie.
                 * Defaults to wgCookieDomain.
                 */
                domain?: string;
                /**
                 * Number of days to store the value (when setting).
                 * The expiry date of the cookie, or lifetime in seconds.
                 * If null or 0, then a session cookie is set. Defaults to wgCookieExpiration.
                 */
                expires?: Date | number | null;
                /**
                 * The path attribute of the cookie. Defaults to wgCookiePath.
                 */
                path?: string;
                /**
                 * The prefix of the key. Defaults to wgCookiePrefix.
                 */
                prefix?: string;
                /**
                 * The SameSite flag of the cookie ('None' / 'Lax'
                 * / 'Strict', case-insensitive; default is to omit the flag, which results in Lax on
                 * modern browsers). Set to None AND set secure=true if the cookie needs to be visible on
                 * cross-domain requests.
                 */
                sameSite?: Lowercase<SS> extends SameSite ? SS : SameSite;
                /**
                 * Deprecated, ignored.
                 *
                 * @deprecated
                 */
                sameSiteLegacy?: boolean;
                /**
                 * Whether or not to include the secure attribute. Defaults to false.
                 * (Does **not** use the wgCookieSecure configuration variable)
                 */
                secure?: boolean;
            }
        }
    }
}

export {};
