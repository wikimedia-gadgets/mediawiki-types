import {
    ApiAssert,
    ApiEditPageParams,
    ApiLegacyTokenType,
    ApiParseParams,
    ApiQueryAllMessagesParams,
    ApiQueryTokensParams,
    ApiRollbackParams,
    ApiTokenType,
    ApiUploadParams,
} from "../api_params";
import { TitleLike } from "./Title";

type Tail<T extends any[]> = T extends [] ? T : T extends [any?, ...infer R] ? R : T;

type TypeOrArray<T> = T extends any ? T | T[] : never; // T[] would be a mixed array
type ReplaceValue<T extends U | U[], U, V> = T extends U[] ? V[] : V;

type UnknownApiParams = Record<string, string | number | boolean | string[] | number[] | undefined>;

export type ApiResponse = Record<string, any>; // it will always be a JSON object, the rest is uncertain ...

interface Revision {
    /**
     * Revision content.
     */
    content: string;
    timestamp: string;
}

type EditResult = EditFailureResult | EditNoChangeResult | EditChangedResult;

interface EditFailureResult {
    result: "Failure";
}

interface EditSuccessResult {
    contentmodel: string | false;
    pageid: number;
    result: "Success";
    tempusercreated?: true;
    tempusercreatedredirect?: string;
    title: string;
    watched?: true;
    watchlistexpiry?: string;
}

interface EditNoChangeResult extends EditSuccessResult {
    nochange: true;
}

interface EditChangedResult extends EditSuccessResult {
    newrevid: number;
    newtimestamp: string;
    oldrevid: number;
}

// type alias to fix #45
type AssertUser =
    | {
          assert: "anon";
      }
    | {
          assert: "user";
          assertUser: string;
      };

interface RollbackInfo {
    /**
     * The revision being restored (the last revision before revision(s) by the reverted user).
     */
    last_revid: number;
    /**
     * The revision being reverted (previously the current revision of the page).
     */
    old_revid: number;
    pageid: number;
    revid: number;
    summary: string;
    title: string;
}

export interface FinishUpload {
    /**
     * Call this function to finish the upload.
     *
     * @param {ApiUploadParams} data Additional data for the upload.
     * @returns {mw.Api.Promise<[ApiResponse], mw.Api.RejectArgTuple | [string, ApiResponse]>} API promise for the final upload.
     */
    (data?: ApiUploadParams): mw.Api.Promise<
        [ApiResponse],
        mw.Api.RejectArgTuple | [string, ApiResponse]
    >;
}

declare global {
    namespace mw {
        /**
         * Interact with the MediaWiki API. `mw.Api` is a client library for the
         * {@link https://www.mediawiki.org/wiki/Special:MyLanguage/API:Main_page action API}.
         * An `mw.Api` object represents the API of a MediaWiki site. For the REST API, see {@link mw.Rest}.
         *
         * ```js
         * var api = new mw.Api();
         * api.get( {
         *     action: 'query',
         *     meta: 'userinfo'
         * } ).then( ( data ) => {
         *     console.log( data );
         * } );
         * ```
         *
         * @since 1.25 - multiple values for a parameter can be specified using an array:
         *
         * ```js
         * var api = new mw.Api();
         * api.get( {
         *     action: 'query',
         *     meta: [ 'userinfo', 'siteinfo' ] // same effect as 'userinfo|siteinfo'
         * } ).then( ( data ) => {
         *     console.log( data );
         * } );
         * ```
         *
         * @since 1.26 - boolean values for API parameters can be specified natively. Parameter
         * values set to `false` or `undefined` will be omitted from the request, as required by
         * the API.
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html
         */
        class Api {
            /**
             * Create an instance of {@link mw.Api}.
             *
             * @param {Api.Options} [options] See {@link mw.Api.Options}. This can also be overridden for
             *  each request by passing them to {@link get()} or {@link post()} (or directly to {@link ajax()}) later on.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#Api
             */
            constructor(options?: Api.Options);

            private defaults: Required<Api.Options>;

            /**
             * Abort all unfinished requests issued by this Api object.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#abort
             */
            abort(): void;

            /**
             * Perform the API call.
             *
             * @param {UnknownApiParams} parameters Parameters to the API. See also {@link mw.Api.Options.parameters}.
             * @param {Api.AjaxSettings} [ajaxOptions] Parameters to pass to jQuery.ajax. See also {@link mw.Api.Options.ajax}.
             * @returns {Api.AbortablePromise} A promise that settles when the API response is processed.
             *   Has an 'abort' method which can be used to abort the request.
             *   See {@link mw.Api.AbortablePromise} for an example.
             *
             *   - On success, resolves to `( result, jqXHR )` where `result` is the parsed API response.
             *   - On an API error, rejects with `( code, result, result, jqXHR )` where `code` is the
             *     {@link https://www.mediawiki.org/wiki/Special:MyLanguage/API:Errors_and_warnings API error code}, and `result`
             *     is as above. When there are multiple errors, the code from the first one will be used.
             *     If there is no error code, "unknown" is used.
             *   - On other types of errors, rejects with `( 'http', details )` where `details` is an object
             *     with three fields: `xhr` (the jqXHR object), `textStatus`, and `exception`.
             *     The meaning of the last two fields is as follows:
             *     - When the request is aborted (the abort method of the promise is called), textStatus
             *       and exception are both set to "abort".
             *     - On a network timeout, textStatus and exception are both set to "timeout".
             *     - On a network error, textStatus is "error" and exception is the empty string.
             *     - When the HTTP response code is anything other than 2xx or 304 (the API does not
             *       use such response codes but some intermediate layer might), textStatus is "error"
             *       and exception is the HTTP status text (the text following the status code in the
             *       first line of the server response). For HTTP/2, `exception` is always an empty string.
             *     - When the response is not valid JSON but the previous error conditions aren't met,
             *       textStatus is "parsererror" and exception is the exception object thrown by
             *       {@link JSON.parse}.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#ajax
             */
            ajax(
                parameters: UnknownApiParams,
                ajaxOptions?: Api.AjaxSettings
            ): Api.AbortablePromise;

            /**
             * Extend an API parameter object with an assertion that the user won't change.
             *
             * This is useful for API calls which create new revisions or log entries. When the current
             * page was loaded when the user was logged in, but at the time of the API call the user
             * is not logged in anymore (e.g. due to session expiry), their IP is recorded in the page
             * history or log, which can cause serious privacy issues. Extending the API parameters via
             * this method ensures that that won't happen, by checking the user's identity that was
             * embedded into the page when it was rendered against the active session on the server.
             *
             * When the assertion fails, the API request will fail, with one of the following error codes:
             * - `apierror-assertanonfailed`: when the client-side logic thinks the user is anonymous
             *   but the server thinks it is logged in
             * - `apierror-assertuserfailed`: when the client-side logic thinks the user is logged in but the
             *   server thinks it is anonymous
             * - `apierror-assertnameduserfailed`: when both the client-side logic and the server thinks the
             *   user is logged in but they see it logged in under a different username.
             *
             * @example
             * ```js
             * api.postWithToken( 'csrf', api.assertCurrentUser( { action: 'edit', ... } ) )
             * ```
             * @since 1.27
             * @param {UnknownApiParams} query Query parameters. The object will not be changed
             * @returns {AssertUser}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#assertCurrentUser
             */
            assertCurrentUser<T extends UnknownApiParams>(
                query: T
            ): Omit<T, keyof AssertUser> & AssertUser;

            /**
             * Indicate that the cached token for a certain action of the API is bad.
             *
             * Call this if you get a `badtoken` error when using the token returned by {@link getToken()}.
             * You may also want to use {@link postWithToken()} instead, which invalidates bad cached tokens
             * automatically.
             *
             * @since 1.26
             * @param {string} type Token type
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#badToken
             */
            badToken(type: ApiTokenType | ApiLegacyTokenType): void;
            badToken(type: string): void;

            /**
             * Upload a file in several chunks.
             *
             * @param {File} file
             * @param {ApiUploadParams} data Other upload options, see `action=upload` API docs for more
             * @param {number} [chunkSize] Size (in bytes) per chunk (default: 5MB)
             * @param {number} [chunkRetries] Amount of times to retry a failed chunk (default: 1)
             * @returns {Upload.AbortablePromise}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#chunkedUpload
             */
            chunkedUpload(
                file: File,
                data: ApiUploadParams,
                chunkSize?: number,
                chunkRetries?: number
            ): Upload.AbortablePromise;

            /**
             * Upload a file to the stash, in chunks.
             *
             * This function will return a promise that will resolve with a function to finish the stash upload.
             * See {@link uploadToStash}.
             *
             * @param {File|HTMLInputElement} file
             * @param {ApiUploadParams} [data]
             * @param {number} [chunkSize] Size (in bytes) per chunk (default: 5MB)
             * @param {number} [chunkRetries] Amount of times to retry a failed chunk (default: 1)
             * @returns {Upload.Promise<[FinishUpload]>} Promise that resolves with a
             *  function that should be called to finish the upload.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#chunkedUploadToStash
             */
            chunkedUploadToStash(
                file: File | HTMLInputElement,
                data?: ApiUploadParams,
                chunkSize?: number,
                chunkRetries?: number
            ): Upload.Promise<[FinishUpload]>;

            /**
             * Create a new page.
             *
             * @example
             * ```js
             * new mw.Api().create( 'Sandbox',
             *     { summary: 'Load sand particles.' },
             *     'Sand.'
             * );
             * ```
             * @since 1.28
             * @param {TitleLike} title Page title
             * @param {ApiEditPageParams} params Edit API parameters
             * @param {string} content Page content
             * @returns {Api.Promise<[EditResult]>} API response
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#create
             */
            create(
                title: TitleLike,
                params: ApiEditPageParams,
                content: string
            ): Api.Promise<[EditResult]>;

            /**
             * Edit an existing page.
             *
             * To create a new page, use {@link create()} instead.
             *
             * Simple transformation:
             *
             * ```js
             * new mw.Api()
             *     .edit( 'Sandbox', function ( revision ) {
             *         return revision.content.replace( 'foo', 'bar' );
             *     } )
             *     .then( function () {
             *         console.log( 'Saved!' );
             *     } );
             * ```
             *
             * Set save parameters by returning an object instead of a string:
             *
             * ```js
             * new mw.Api().edit(
             *     'Sandbox',
             *     function ( revision ) {
             *         return {
             *             text: revision.content.replace( 'foo', 'bar' ),
             *             summary: 'Replace "foo" with "bar".',
             *             assert: 'bot',
             *             minor: true
             *         };
             *     }
             * )
             * .then( function () {
             *     console.log( 'Saved!' );
             * } );
             * ```
             *
             * Transform asynchronously by returning a promise.
             *
             * ```js
             * new mw.Api()
             *     .edit( 'Sandbox', function ( revision ) {
             *         return Spelling
             *             .corrections( revision.content )
             *             .then( function ( report ) {
             *                 return {
             *                     text: report.output,
             *                     summary: report.changelog
             *                 };
             *             } );
             *     } )
             *     .then( function () {
             *         console.log( 'Saved!' );
             *     } );
             * ```
             *
             * @since 1.28
             * @param {TitleLike} title Page title
             * @param {Api.EditTransform} transform Callback that prepares the edit
             * @returns {Api.Promise<[EditResult]>} Edit API response
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#edit
             */
            edit(title: TitleLike, transform: Api.EditTransform): Api.Promise<[EditResult]>;

            /**
             * Perform API get request. See {@link ajax()} for details.
             *
             * @param {UnknownApiParams} parameters
             * @param {Api.AjaxSettings} [ajaxOptions]
             * @returns {Api.AbortablePromise}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#get
             */
            get(parameters: UnknownApiParams, ajaxOptions?: Api.AjaxSettings): Api.AbortablePromise;

            /**
             * Get the categories that a particular page on the wiki belongs to.
             *
             * @param {TitleLike} title
             * @returns {Api.AbortablePromise<[false|Title[]]>} Promise that resolves with an array of category titles, or with false if the title was not found.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#getCategories
             */
            getCategories(title: TitleLike): Api.AbortablePromise<[false | Title[]]>;

            /**
             * Get a list of categories that match a certain prefix.
             *
             * E.g. given "Foo", return "Food", "Foolish people", "Foosball tables"...
             *
             * @param {string} prefix Prefix to match.
             * @returns {Api.AbortablePromise<[string[]]>} Promise that resolves with an array of matched categories
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#getCategoriesByPrefix
             */
            getCategoriesByPrefix(prefix: string): Api.AbortablePromise<[string[]]>;

            /**
             * API helper to grab a csrf token.
             *
             * @returns {Api.AbortablePromise<[string]>} Received token.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#getEditToken
             */
            getEditToken(): Api.AbortablePromise<[string]>;

            /**
             * Given an API response indicating an error, get a jQuery object containing a human-readable
             * error message that you can display somewhere on the page.
             *
             * For better quality of error messages, it's recommended to use the following options in your
             * API queries:
             *
             * ```js
             * errorformat: 'html',
             * errorlang: mw.config.get( 'wgUserLanguage' ),
             * errorsuselocal: true,
             * ```
             *
             * Error messages, particularly for editing pages, may consist of multiple paragraphs of text.
             * Your user interface should have enough space for that.
             *
             * @example
             * ```js
             * var api = new mw.Api();
             * // var title = 'Test valid title';
             * var title = 'Test invalid title <>';
             * api.postWithToken( 'watch', {
             *     action: 'watch',
             *     title: title
             * } ).then( ( data ) => {
             *     mw.notify( 'Success!' );
             * }, ( code, data ) => {
             *     mw.notify( api.getErrorMessage( data ), { type: 'error' } );
             * } );
             * ```
             * @param {ApiResponse} data API response indicating an error
             * @returns {JQuery} Error messages, each wrapped in a `<div>`
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#getErrorMessage
             */
            getErrorMessage(data: ApiResponse): JQuery;

            /**
             * Get a set of messages.
             *
             * @since 1.27
             * @since 1.37 - accepts a single string message as parameter.
             * @param {string|string[]} messages Messages to retrieve
             * @param {ApiQueryAllMessagesParams} [options] Additional parameters for the API call
             * @returns {Api.Promise<[Object.<string, string>]>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#getMessages
             */
            getMessages<T extends string>(
                messages: T | T[],
                options?: ApiQueryAllMessagesParams
            ): Api.Promise<[Partial<Record<T, string>>]>;

            /**
             * Get a token for a certain action from the API.
             *
             * @since 1.22
             * @since 1.25 - assert parameter can be passed.
             * @since 1.35 - additional parameters can be passed as an object instead of `assert`.
             * @since 1.44 - ajaxOptions parameter can be passed.
             * @param {string} type Token type
             * @param {ApiQueryTokensParams|ApiAssert} [additionalParams] Additional parameters for the API. When given a string, it's treated as the `assert` parameter.
             * @param {Api.AjaxSettings} [ajaxOptions] See {@link mw.Api.ajax}
             * @returns {Api.AbortablePromise<[string]>} Received token.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#getToken
             */
            getToken(
                type: ApiTokenType | ApiLegacyTokenType,
                additionalParams?: ApiQueryTokensParams | ApiAssert,
                ajaxOptions?: Api.AjaxSettings
            ): Api.AbortablePromise<[string]>;
            getToken(
                type: string,
                additionalParams?: ApiQueryTokensParams | ApiAssert,
                ajaxOptions?: Api.AjaxSettings
            ): Api.AbortablePromise<[string]>;

            /**
             * Get the current user's groups and rights.
             *
             * @since 1.27
             * @returns {Api.Promise<[Api.UserInfo], Api.RejectArgTuple | []>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#getUserInfo
             */
            getUserInfo(): Api.Promise<[Api.UserInfo], Api.RejectArgTuple | []>;

            /**
             * Determine if a category exists.
             *
             * @param {TitleLike} title
             * @returns {Api.AbortablePromise<[boolean]>} Promise that resolves with a boolean indicating whether the category exists.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#isCategory
             */
            isCategory(title: TitleLike): Api.AbortablePromise<[boolean]>;

            /**
             * Load a set of messages and add them to {@link mw.messages}.
             *
             * @since 1.37 - accepts a single string message as parameter.
             * @param {string|string[]} messages Messages to retrieve
             * @param {ApiQueryAllMessagesParams} [options] Additional parameters for the API call
             * @returns {Api.Promise<[boolean]>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#loadMessages
             */
            loadMessages(
                messages: string | string[],
                options?: ApiQueryAllMessagesParams
            ): Api.Promise<[boolean]>;

            /**
             * Load a set of messages and add them to {@link mw.messages}. Only messages that are not already known
             * are loaded. If all messages are known, the returned promise is resolved immediately.
             *
             * @since 1.27
             * @since 1.42 - accepts a single string message as parameter.
             * @param {string|string[]} messages Messages to retrieve
             * @param {ApiQueryAllMessagesParams} [options] Additional parameters for the API call
             * @returns {Api.Promise<[] | [boolean]>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#loadMessagesIfMissing
             */
            loadMessagesIfMissing(
                messages: string | string[],
                options?: ApiQueryAllMessagesParams
            ): Api.Promise<[] | [boolean]>;

            /**
             * @param {string} username
             * @param {string} password
             * @returns {Api.AbortablePromise<[ApiResponse]>} See {@link post()}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#login
             */
            login(username: string, password: string): Api.AbortablePromise<[ApiResponse]>;

            /**
             * Helper for adding support for abortable promises in mw.Api methods.
             *
             * This methods does three things:
             * - Returns an object with an `abort` method that can be used as a base for
             *   an {@link mw.Api.AbortablePromise}.
             * - Updates the provided `ajaxOptions` with a `signal` that will be triggered by said method.
             * - If the `ajaxOptions` already had a `signal`, forwards evens from it to the new one.
             *
             * This ensures that both the signal provided in `ajaxOptions` (if any) and the
             * `abort` method on the returned object can cancel the HTTP requests.
             * It's only needed when supporting the old-style `promise.abort()` method.
             *
             * @since 1.44
             * @param {Api.AjaxSettings} ajaxOptions Options object to modify (will set `ajaxOptions.signal`)
             * @return {Api.Abortable} Base object for {@link mw.Api.AbortablePromise}
             *
             * @example API method only supporting AbortController
             * ```js
             * mw.Api.prototype.getWhatever = function ( params, ajaxOptions ) {
             *     return this.get( Object.assign( { foo: 'bar' }, params ), ajaxOptions )
             *         .then( ... );
             * }
             * ```
             * @example API method supporting promise.abort() method too
             * ```js
             * mw.Api.prototype.getWhatever = function ( params, ajaxOptions ) {
             *     ajaxOptions = ajaxOptions || {};
             *     const abortable = this.makeAbortablePromise( ajaxOptions );
             *     return this.get( Object.assign( { foo: 'bar' }, params ), ajaxOptions )
             *         .then( ... )
             *         .promise( abortable );
             * }
             * ```
             */
            makeAbortablePromise(ajaxOptions: Api.AjaxSettings): Api.Abortable;

            /**
             * Post a new section to the page.
             *
             * @param {TitleLike} title Target page
             * @param {string} header
             * @param {string} message Wikitext message
             * @param {ApiEditPageParams} additionalParams Additional API parameters
             * @returns {Api.AbortablePromise} See {@link postWithEditToken}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#newSection
             */
            newSection(
                title: TitleLike,
                header: string,
                message: string,
                additionalParams?: ApiEditPageParams
            ): Api.AbortablePromise;

            /**
             * Convenience method for `action=parse`.
             *
             * @param {TitleLike} content Content to parse, either as a wikitext string or a {@link mw.Title}
             * @param {ApiParseParams} [additionalParams] Parameters object to set custom settings, e.g.
             *  `redirects`, `sectionpreview`. `prop` should not be overridden.
             * @returns {Api.AbortablePromise<[string]>} Promise that resolves with the parsed HTML of `wikitext`
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#parse
             */
            parse(
                content: TitleLike,
                additionalParams?: ApiParseParams
            ): Api.AbortablePromise<[string]>;

            /**
             * Perform API post request. See {@link ajax()} for details.
             *
             * @param {UnknownApiParams} parameters
             * @param {Api.AjaxSettings} [ajaxOptions]
             * @returns {Api.AbortablePromise}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#post
             */
            post(
                parameters: UnknownApiParams,
                ajaxOptions?: Api.AjaxSettings
            ): Api.AbortablePromise;

            /**
             * Post to API with csrf token. If we have no token, get one and try to post. If we have a cached token try using that, and if it fails, blank out the cached token and start over.
             *
             * @param {UnknownApiParams} params API parameters
             * @param {Api.AjaxSettings} [ajaxOptions]
             * @returns {Api.AbortablePromise} See {@link post}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#postWithEditToken
             */
            postWithEditToken(
                params: UnknownApiParams,
                ajaxOptions?: Api.AjaxSettings
            ): Api.AbortablePromise;

            /**
             * Post to API with the specified type of token. If we have no token, get one and try to post.
             * If we already have a cached token, try using that, and if the request fails using the cached token,
             * blank it out and start over.
             *
             * @example <caption>For example, to change a user option, you could do:</caption>
             * ```js
             * new mw.Api().postWithToken( 'csrf', {
             *     action: 'options',
             *     optionname: 'gender',
             *     optionvalue: 'female'
             * } );
             * ```
             * @since 1.22
             * @param {string} tokenType The name of the token, like `options` or `edit`.
             * @param {UnknownApiParams} params API parameters
             * @param {Api.AjaxSettings} [ajaxOptions]
             * @returns {Api.AbortablePromise} See {@link post()}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#postWithToken
             */
            postWithToken(
                tokenType: ApiTokenType | ApiLegacyTokenType,
                params: UnknownApiParams,
                ajaxOptions?: Api.AjaxSettings
            ): Api.AbortablePromise;
            postWithToken(
                tokenType: string,
                params: UnknownApiParams,
                ajaxOptions?: Api.AjaxSettings
            ): Api.AbortablePromise;

            /**
             * Prepare an extensible API request.
             *
             * This is a utility method to allow mw.hook implementations to add data to params sent
             * with an API request.
             *
             * For example usage, see mediawiki.ready/index.js#logoutViaPost:
             *
             * ```js
             * api.prepareExtensibleApiRequest( 'extendLogout' ).then( ( params ) => { ... } )
             * ```
             *
             * Implementations of `hookName` should do something like the following, where `hookName`
             * is `extendLogout` in this example:
             *
             * ```js
             * mw.hook( 'extendLogout' ).add( ( data ) => {
             *     data.promise = data.promise.then( () => {
             *         // Return a promise
             *         return collectClientHintsData().then( ( userAgentHighEntropyValues ) => {
             *             // Set the data.params.{yourUniqueKey} that will be included in the API
             *             // request
             *             data.params.customData = { clientHints: userAgentHighEntropyValues };
             *         } );
             *     } );
             * } );
             * ```
             *
             * @since 1.44
             * @param {string} hookName Name of the hook to use with mw.hook().fire()
             * @return {JQuery.Promise<Object>} Updated parameter data from implementations
             *   of `hookName` to include with the API request.
             *@see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#prepareExtensibleApiRequest
             */
            prepareExtensibleApiRequest<T extends {} = {}>(hookName: string): JQuery.Promise<T>;

            /**
             * Convenience method for `action=rollback`.
             *
             * @since 1.28
             * @param {TitleLike} page
             * @param {string} user
             * @param {ApiRollbackParams} [params] Additional parameters
             * @returns {Api.Promise<[RollbackInfo]>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#rollback
             */
            rollback(
                page: TitleLike,
                user: string,
                params?: ApiRollbackParams
            ): Api.Promise<[RollbackInfo]>;

            /**
             * Asynchronously save the value of a single user option using the API.
             * See {@link saveOptions()}.
             *
             * @since 1.43 - params parameter can be passed.
             * @param {string} name
             * @param {string|null} value
             * @param {UnknownApiParams} [params] additional parameters for API.
             * @returns {Api.Promise}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#saveOption
             */
            saveOption(name: string, value: string | null, params?: UnknownApiParams): Api.Promise;

            /**
             * Asynchronously save the values of user options using the {@link https://www.mediawiki.org/wiki/Special:MyLanguage/API:Options Options API}.
             *
             * If a value of `null` is provided, the given option will be reset to the default value.
             *
             * Any warnings returned by the API, including warnings about invalid option names or values,
             * are ignored. However, do not rely on this behavior.
             *
             * If necessary, the options will be saved using several sequential API requests. Only one promise
             * is always returned that will be resolved when all requests complete.
             *
             * If a request from a previous {@link saveOptions()} call is still pending, this will wait for it to be
             * completed, otherwise MediaWiki gets sad. No requests are sent for anonymous users, as they
             * would fail anyway. See T214963.
             *
             * @since 1.43 - params parameter can be passed.
             * @param {Object.<string, string|null>} options Options as a `{ name: value, … }` object
             * @param {UnknownApiParams} [params] additional parameters for API.
             * @returns {Api.Promise<[] | [ApiResponse, JQuery.jqXHR<ApiResponse>]>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#saveOptions
             */
            saveOptions<T extends Record<string, string | null>>(
                options: T,
                params?: UnknownApiParams
            ): Api.Promise<({} extends T ? [] : never) | [ApiResponse, JQuery.jqXHR<ApiResponse>]>;

            /**
             * Convenience method for `action=watch&unwatch=1`.
             *
             * @param {TypeOrArray<TitleLike>} pages Full page name or instance of {@link mw.Title}, or an
             *  array thereof. If an array is passed, the return value passed to the promise will also be an
             *  array of appropriate objects.
             * @returns {Api.AbortablePromise<[TypeOrArray<Api.WatchedPage>]>} A promise that resolves
             *  with an object (or array of objects) describing each page that was passed in and its
             *  current watched/unwatched status.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#unwatch
             */
            unwatch<P extends TypeOrArray<TitleLike>>(
                pages: P
            ): Api.AbortablePromise<[ReplaceValue<P, TitleLike, Api.WatchedPage>]>;

            /**
             * Upload a file to MediaWiki.
             *
             * The file will be uploaded using AJAX and FormData.
             *
             * @param {File|Blob|HTMLInputElement} file HTML `input type=file` element with a file already inside of it, or a File object.
             * @param {ApiUploadParams} data Other upload options, see `action=upload` API docs for more
             * @returns {Upload.AbortablePromise}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#upload
             */
            upload(
                file: File | Blob | HTMLInputElement,
                data: ApiUploadParams
            ): Upload.AbortablePromise;

            /**
             * Finish an upload in the stash.
             *
             * @param {string} filekey
             * @param {ApiUploadParams} data
             * @returns {Api.Promise<[ApiResponse], Api.RejectArgTuple | [string, ApiResponse]>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#uploadFromStash
             */
            uploadFromStash(
                filekey: string,
                data: ApiUploadParams
            ): Api.Promise<[ApiResponse], Api.RejectArgTuple | [string, ApiResponse]>;

            /**
             * Upload a file to the stash.
             *
             * This function will return a promise, which when resolved, will pass back a function
             * to finish the stash upload. You can call that function with an argument containing
             * more, or conflicting, data to pass to the server.
             *
             * @example
             * ```js
             * // upload a file to the stash with a placeholder filename
             * api.uploadToStash( file, { filename: 'testing.png' } ).done( function ( finish ) {
             *     // finish is now the function we can use to finalize the upload
             *     // pass it a new filename from user input to override the initial value
             *     finish( { filename: getFilenameFromUser() } ).done( function ( data ) {
             *         // the upload is complete, data holds the API response
             *     } );
             * } );
             * ```
             * @param {File|HTMLInputElement} file
             * @param {ApiUploadParams} [data]
             * @returns {Upload.Promise<[FinishUpload]>} Promise that resolves with a
             *  function that should be called to finish the upload.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#uploadToStash
             */
            uploadToStash(
                file: File | HTMLInputElement,
                data?: ApiUploadParams
            ): Upload.Promise<[FinishUpload]>;

            /**
             * Convenience method for `action=watch`.
             *
             * @since 1.35 - expiry parameter can be passed when Watchlist Expiry is enabled.
             * @param {TypeOrArray<TitleLike>} pages Full page name or instance of {@link mw.Title}, or an
             *  array thereof. If an array is passed, the return value passed to the promise will also be an
             *  array of appropriate objects.
             * @param {string} [expiry] When the page should expire from the watchlist. If omitted, the
             *  page will not expire.
             * @returns {Api.AbortablePromise<[TypeOrArray<Api.WatchedPage>]>} A promise that resolves
             *  with an object (or array of objects) describing each page that was passed in and its
             *  current watched/unwatched status.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#watch
             */
            watch<P extends TypeOrArray<TitleLike>>(
                pages: P,
                expiry?: string
            ): Api.AbortablePromise<[ReplaceValue<P, TitleLike, Api.WatchedPage>]>;

            /**
             * Massage parameters from the nice format we accept into a format suitable for the API.
             *
             * @param {UnknownApiParams} parameters (modified in-place)
             * @param {boolean} useUS Whether to use U+001F when joining multi-valued parameters.
             */
            private preprocessParameters(parameters: UnknownApiParams, useUS: boolean): void;
        }

        namespace Api {
            /**
             * Subset of {@link globalThis.AbortController AbortController} sufficient for the needs of {@link mw.Api}.
             * Used by {@link mw.Api.ajax}, {@link mw.Api.get}, {@link mw.Api.post} and related methods.
             *
             * It may be used as a fallback on browsers that don't support DOM AbortController.
             * However, it's not compliant with the spec, and can't be used as a polyfill for
             * AbortController with `fetch()` or anything else.
             *
             * Aborting requests this way is somewhat verbose in simple cases, see
             * {@link mw.Api.AbortablePromise} for an alternative style. However, it is **much** less verbose
             * when chaining multiple requests and making the whole chain abortable, which would otherwise
             * require carefully keeping track of the "current" promise at every step and forwarding the
             * `.abort()` calls (see T346984), and it's the only style that is fully compatible with native
             * promises (using `async`/`await`).
             *
             * @since 1.44
             * @example Cancelling an API request (using AbortController)
             * ```js
             * const api = new mw.Api();
             * const abort = new AbortController();
             * setTimeout( function() { abort.abort(); }, 500 );
             * api.get( { meta: 'userinfo' }, { signal: abort.signal } ).then( ... );
             * ```
             * @example Cancelling chained API requests
             * ```js
             * const api = new mw.Api();
             * const abort = new AbortController();
             * setTimeout( function() { abort.abort(); }, 500 );
             * const options = { signal: abort.signal };
             * api.get( { meta: 'userinfo' }, options ).then( function ( userinfo ) {
             *     const name = userinfo.query.userinfo.name;
             *     api.get( { list: 'usercontribs', ucuser: name }, options ).then( function ( usercontribs ) {
             *         console.log( usercontribs.query.usercontribs );
             *     } );
             * } ).catch( console.log );
             * // => DOMException: The operation was aborted.
             * ```
             * @example Cancelling chained API requests (using await)
             * ```js
             * const api = new mw.Api();
             * const abort = new AbortController();
             * setTimeout( function() { abort.abort(); }, 500 );
             * const options = { signal: abort.signal };
             * const userinfo = await api.get( { meta: 'userinfo' }, options );
             * // throws DOMException: The operation was aborted.
             * const name = userinfo.query.userinfo.name;
             * const usercontribs = await api.get( { list: 'usercontribs', ucuser: name }, options );
             * console.log( usercontribs.query.usercontribs );
             * ```
             */
            class AbortController extends globalThis.AbortController {
                /**
                 * Cancel the promises using this controller's {@link signal},
                 * rejecting them with the given `reason` and stopping related async operations.
                 *
                 * @param {Error} [reason]
                 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortController/abort)
                 */
                abort(reason?: Error): void;
            }

            interface AjaxSettings<TContext = any> extends JQuery.AjaxSettings<TContext> {
                /**
                 * Signal which can be used to abort the request.
                 * See {@link mw.Api.AbortController} for an example.
                 *
                 * @since 1.44
                 */
                signal?: AbortSignal;
            }

            /**
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#.EditTransform
             */
            interface EditTransform {
                /**
                 * @param {Revision} revision Current revision
                 * @returns {string|ApiEditPageParams|JQuery.Promise<string|ApiEditPageParams>} New content, object with edit API parameters, or promise providing one of those.
                 */
                (revision: Revision):
                    | string
                    | ApiEditPageParams
                    | JQuery.Promise<string>
                    | JQuery.Promise<ApiEditPageParams>;
            }

            /**
             * Default options for {@link jQuery.ajax} calls. Can be overridden by passing
             * `options` to {@link mw.Api} constructor.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#.Options
             */
            interface Options {
                /**
                 * Default options for {@link jQuery.ajax}
                 */
                ajax?: Api.AjaxSettings;
                /**
                 * Default query parameters for API requests
                 */
                parameters?: UnknownApiParams;
                /**
                 * Whether to use U+001F when joining multi-valued parameters (since 1.28).
                 * Default is true if ajax.url is not set, false otherwise for compatibility.
                 */
                useUS?: boolean;
            }

            /**
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#.UserInfo
             */
            interface UserInfo {
                /**
                 * User groups that the user belongs to.
                 */
                groups: string[];
                /**
                 * User's rights.
                 */
                rights: string[];
            }

            /**
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#.WatchedPage
             */
            interface WatchedPage {
                ns: number;
                /**
                 * Full page name.
                 */
                title: string;
                /**
                 * Whether the page is now watched (true) or unwatched (false).
                 */
                watched: boolean;
            }

            /**
             * Extract an argument type from a promise callback {@link ArgTuple}.
             */
            type Arg<T extends ArgTuple, N extends number, TAcc extends never[] = []> = [
                T
            ] extends [[]]
                ? never
                : TAcc["length"] extends N
                ? T[0]
                : Arg<Tail<T>, N, [...TAcc, never]>;

            /**
             * Argument tuple for promise callbacks.
             */
            type ArgTuple = any[];

            interface PromiseBase<
                TResolve extends ArgTuple,
                TReject extends ArgTuple,
                TNotify extends ArgTuple
            > extends JQuery.PromiseBase<
                    Arg<TResolve, 0>,
                    Arg<TReject, 0>,
                    Arg<TNotify, 0>,
                    Arg<TResolve, 1>,
                    Arg<TReject, 1>,
                    Arg<TNotify, 1>,
                    Arg<TResolve, 2>,
                    Arg<TReject, 2>,
                    Arg<TNotify, 2>,
                    Tail<Tail<Tail<TResolve>>>[number],
                    Tail<Tail<Tail<TReject>>>[number],
                    Tail<Tail<Tail<TNotify>>>[number]
                > {}

            /**
             * Something providing an {@link abort()} method.
             */
            interface Abortable {
                /**
                 * Cancel the promise, rejecting it and stopping related async operations.
                 *
                 * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api-AbortablePromise.html#abort
                 */
                abort(): void;
            }

            type Promise<
                TResolve extends ArgTuple = [ApiResponse, JQuery.jqXHR<ApiResponse>],
                TReject extends ArgTuple = RejectArgTuple,
                TNotify extends ArgTuple = []
            > = PromiseBase<TResolve, TReject, TNotify>;

            /**
             * A spec-compliant promise with an extra method that allows it to be cancelled, stopping any async
             * operations that will no longer be needed since we won't use their results, like HTTP requests.
             * Used by {@link mw.Api.ajax}, {@link mw.Api.get}, {@link mw.Api.post} and related methods.
             *
             * This style is inspired by `jQuery.ajax()`, and it's very easy to use in simple cases,
             * but it becomes rather inconvenient when chaining promises using `.then()` or when
             * converting them to native promises (using `async`/`await`), since that causes the extra
             * method to be no longer accessible. It's often easier to use an AbortController instead,
             * see {@link mw.Api.AbortController} for an example.
             *
             * @since 1.22
             * @example Cancelling an API request (using the `.abort()` method)
             * ```js
             * const api = new mw.Api();
             * const promise = api.get( { meta: 'userinfo' } );
             * promise.then( console.log );
             * promise.catch( console.log );
             * // => "http", { xhr: {…}, textStatus: "abort", exception: "abort" }
             * setTimeout( function() { promise.abort(); }, 500 );
             * ```
             * @example INCORRECT – The .abort() method is not accessible after calling .then()
             * ```js
             * const api = new mw.Api();
             * const promise = api.get( { meta: 'userinfo' } ).then( console.log );
             * setTimeout( function() { promise.abort(); }, 500 );
             * // => TypeError: promise.abort is not a function
             * ```
             * @example INCORRECT – The .abort() method is not accessible after converting to a native promise
             * ```js
             * async function getPromise() {
             *     const api = new mw.Api();
             *     return api.get( { meta: 'userinfo' } );
             * }
             * const promise = getPromise();
             * promise.then( console.log );
             * setTimeout( function() { promise.abort(); }, 500 );
             * // => TypeError: promise.abort is not a function
             * ```
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api-AbortablePromise.html
             */
            interface AbortablePromise<
                TResolve extends ArgTuple = [ApiResponse, JQuery.jqXHR<ApiResponse>],
                TReject extends ArgTuple = RejectArgTuple,
                TNotify extends ArgTuple = []
            > extends PromiseBase<TResolve, TReject, TNotify>,
                    Abortable {}

            type RejectArgTuple =
                | Rest.RejectArgTuple
                | [string, string]
                | ["http", Pick<Rest.HttpErrorData, "exception" | "textStatus">]
                | [
                      "ok-but-empty",
                      "OK response but empty result (check HTTP headers?)",
                      "" | null | undefined,
                      JQuery.jqXHR<"" | null | undefined>
                  ]
                | [string, ApiResponse, ApiResponse, JQuery.jqXHR<ApiResponse>];

            namespace Promise {
                /** @deprecated Use {@link Upload.Promise} instead. */
                type Upload<TResolve extends ArgTuple = [ApiResponse]> = Upload.Promise<TResolve>;
            }
        }

        namespace Upload {
            type Promise<TResolve extends Api.ArgTuple = [ApiResponse]> = Api.Promise<
                TResolve,
                RejectArgTuple,
                [number]
            >;

            type AbortablePromise<
                TResolve extends Api.ArgTuple = [ApiResponse]
            > = Api.AbortablePromise<TResolve, RejectArgTuple, [number]>;

            type RejectArgTuple = [Api.RejectArgTuple[0], Api.RejectArgTuple[1]];
        }
    }
}

/** @deprecated Use `mw.Api.Options` instead. Note that `ApiOptions` is strictly equivalent to `Required<mw.Api.Options>` as properties are now optional for consistency. */
export type ApiOptions = Required<mw.Api.Options>;

export {};
