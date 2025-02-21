declare global {
    namespace mw {
        /**
         * User library provided by `mediawiki.user` ResourceLoader module.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html
         */
        const user: User;

        interface User {
            /**
             * Manage client preferences.
             *
             * For skins that enable the `clientPrefEnabled` option (see Skin class in PHP),
             * this feature allows you to store preferences in the browser session that will
             * switch one or more the classes on the HTML document.
             *
             * This is only supported for unregistered users. For registered users, skins
             * and extensions must use user preferences (e.g. hidden or API-only options)
             * and swap class names server-side through the Skin interface.
             *
             * This feature is limited to page views by unregistered users. For logged-in requests,
             * store preferences in the database instead, via UserOptionsManager or {@link mw.Api.saveOption}
             * (may be hidden or API-only to exclude from Special:Preferences), and then include the
             * desired classes directly in Skin::getHtmlElementAttributes.
             *
             * Classes toggled by this feature must be named as `<feature>-clientpref-<value>`,
             * where `value` contains only alphanumerical characters (a-z, A-Z, and 0-9), and `feature`
             * can also include hyphens.
             *
             * @since 1.41
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.clientPrefs.html
             */
            clientPrefs: {
                /**
                 * Retrieve the current value of the feature from the HTML document element.
                 *
                 * @param {string} feature
                 * @returns {false|string} returns false if the feature is not recognized.
                 *  returns string if a feature was found.
                 * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.clientPrefs.html#.get
                 */
                get(feature: string): false | string;

                /**
                 * Change the class on the HTML document element, and save the value in a cookie.
                 *
                 * @param {string} feature
                 * @param {string} value
                 * @returns {boolean} True if feature was stored successfully, false if the value
                 *  uses a forbidden character or the feature is not recognised
                 *  e.g. a matching class was not defined on the HTML document element.
                 * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.clientPrefs.html#.set
                 */
                set(feature: string, value: string): boolean;
            };

            /**
             * Map of user preferences and their values.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.options
             */
            // TODO: add types for items in the options map
            options: Map;

            /**
             * Map of retrieved user tokens.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.tokens
             */
            tokens: Map<User.Tokens>;

            /**
             * Acquire a temporary user username and stash it in the current session, if temp account creation
             * is enabled and the current user is logged out. If a name has already been stashed, returns the
             * same name.
             *
             * If the user later performs an action that results in temp account creation, the stashed username
             * will be used for their account. It may also be used in previews. However, the account is not
             * created yet, and the name is not visible to other users.
             *
             * @since 1.41
             * @returns {JQuery.Promise<string>} Promise resolved with the username if we succeeded,
             *  or resolved with `null` if we failed
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.acquireTempUserName
             */
            acquireTempUserName(): JQuery.Promise<string>;

            /**
             * Generate a random user session ID.
             *
             * This information would potentially be stored in a cookie to identify a user during a
             * session or series of sessions. Its uniqueness should not be depended on unless the
             * browser supports the crypto API.
             *
             * Known problems with {@link Math.random()}:
             * Using the `Math.random` function we have seen sets
             * with 1% of non uniques among 200,000 values with Safari providing most of these.
             * Given the prevalence of Safari in mobile the percentage of duplicates in
             * mobile usages of this code is probably higher.
             *
             * Rationale:
             * We need about 80 bits to make sure that probability of collision
             * on 155 billion  is <= 1%
             *
             * See {@link https://en.wikipedia.org/wiki/Birthday_attack#Mathematics}
             *
             * `n(p;H) = n(0.01,2^80)= sqrt (2 * 2^80 * ln(1/(1-0.01)))`
             *
             * @returns {string} 80 bit integer (20 characters) in hex format, padded
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.generateRandomSessionId
             */
            generateRandomSessionId(): string;

            /**
             * Get date user first registered, if available.
             *
             * @since 1.42
             * @returns {false|null|Date} False for anonymous users, null if data is
             *  unavailable, or Date for when the user registered. For temporary users
             *  that is when their temporary account was created.
             */
            getFirstRegistration(): false | null | Date;

            /**
             * Get the current user's groups.
             *
             * @param {function(string[]):any} [callback]
             * @returns {JQuery.Promise<string[]>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.getGroups
             */
            getGroups<T>(callback: (groups: string[]) => T): JQuery.Promise<T>;
            getGroups(): JQuery.Promise<string[]>;

            /**
             * Get the current user's database id.
             *
             * Not to be confused with {@link id}.
             *
             * @returns {number} Current user's id, or 0 if user is anonymous
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.getId
             */
            getId(): number;

            /**
             * Get the current user's name.
             *
             * @returns {string|null} User name string or null if user is anonymous
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.getName
             */
            getName(): string | null;

            /**
             * A sticky generateRandomSessionId for the current JS execution context,
             * cached within this class (also known as a page view token).
             *
             * @since 1.32
             * @returns {string} 80 bit integer in hex format, padded
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.getPageviewToken
             */
            getPageviewToken(): string;

            /**
             * Get date user registered, if available.
             *
             * @returns {false|null|Date} False for anonymous users, null if data is
             *  unavailable, or Date for when the user registered.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.getRegistration
             */
            getRegistration(): false | null | Date;

            /**
             * Get the current user's rights.
             *
             * @param {function(string[]):any} [callback]
             * @returns {JQuery.Promise<string[]>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.getRights
             */
            getRights<T>(callback: (rights: string[]) => T): JQuery.Promise<T>;
            getRights(): JQuery.Promise<string[]>;

            /**
             * Get the current user's name or the session ID.
             *
             * Not to be confused with {@link getId}.
             *
             * @returns {string} User name or random session ID
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.id
             */
            id(): string;

            /**
             * Check whether the current user is anonymous.
             *
             * @returns {boolean}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.isAnon
             */
            isAnon(): boolean;

            /**
             * Check whether the user is a normal non-temporary registered user.
             *
             * @since 1.40
             * @returns {boolean}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.isNamed
             */
            isNamed(): boolean;

            /**
             * Check whether the user is an autocreated temporary user.
             *
             * @since 1.40
             * @returns {boolean}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.isTemp
             */
            isTemp(): boolean;

            /**
             * Retrieve a random ID, generating it if needed.
             *
             * This ID is shared across windows, tabs, and page views. It is persisted
             * for the duration of one browser session (until the browser app is closed),
             * unless the user evokes a "restore previous session" feature that some browsers have.
             *
             * **Note:** Server-side code must never interpret or modify this value.
             *
             * @returns {string} Random session ID (20 hex characters)
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.user.html#.sessionId
             */
            sessionId(): string;

            /**
             * Get the current user's groups or rights.
             *
             * @private
             * @returns {JQuery.Promise<Api.UserInfo>}
             */
            getUserInfo(): JQuery.Promise<Api.UserInfo>;
        }

        namespace User {
            interface Tokens extends Record<string, string> {
                csrfToken: string;
                patrolToken: string;
                watchToken: string;
            }
        }
    }
}

/** @deprecated Use {@link mw.Api.UserInfo} instead. */
export type UserInfo = mw.Api.UserInfo;
/** @deprecated Use {@link mw.User} instead */
export type User = mw.User;

export {};
