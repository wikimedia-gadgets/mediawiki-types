import { ApiAssert, ApiLegacyTokenType, ApiTokenType } from "../api_params";
import { TitleLike } from "./Title";

type TypeOrArray<T> = T extends any ? T | T[] : never; // T[] would be a mixed array
type ReplaceValue<T extends U | U[], U, V> = T extends U[] ? V[] : V;
type Require<T, K extends keyof T> = T & Required<Pick<T, K>>;

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
type AssertUser = {
    assert: "anon" | "user";
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

interface FinishUpload {
    /**
     * Call this function to finish the upload.
     *
     * @param {Api.Params.Action.Upload} data Additional data for the upload.
     * @returns {JQuery.Promise<ApiResponse>} API promise for the final upload.
     */
    (data?: mw.Api.Params.Action.Upload): JQuery.Promise<ApiResponse>;
}

declare global {
    namespace mw {
        /**
         * Interact with the API of a particular MediaWiki site. mw.Api objects represent the API of
         * one particular MediaWiki site.
         *
         * ```js
         * var api = new mw.Api();
         * api.get( {
         *     action: 'query',
         *     meta: 'userinfo'
         * } ).done( function ( data ) {
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
         * } ).done( function ( data ) {
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
             * @param {Api.Params} parameters Parameters to the API. See also {@link mw.Api.Options.parameters}.
             * @param {JQuery.AjaxSettings} [ajaxOptions] Parameters to pass to jQuery.ajax. See also {@link mw.Api.Options.ajax}.
             * @returns {JQuery.Promise<ApiResponse>} A promise that settles when the API response is processed.
             *   Has an 'abort' method which can be used to abort the request.
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
                parameters: Api.Params,
                ajaxOptions?: JQuery.AjaxSettings
            ): JQuery.Promise<ApiResponse>;

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
            badToken(type: ApiTokenType): void;
            /** @deprecated Use `badToken('csrf')` instead */
            badToken(type: ApiLegacyTokenType): void;
            badToken(type: string): void;

            /**
             * Upload a file in several chunks.
             *
             * @param {File} file
             * @param {Api.Params.Action.Upload} data Other upload options, see `action=upload` API docs for more
             * @param {number} [chunkSize] Size (in bytes) per chunk (default: 5MB)
             * @param {number} [chunkRetries] Amount of times to retry a failed chunk (default: 1)
             * @returns {JQuery.Promise<ApiResponse>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#chunkedUpload
             */
            chunkedUpload(
                file: File,
                data: Omit<
                    Require<Api.Params.Action.Upload, "filename">,
                    "chunk" | "filesize" | "offset"
                >,
                chunkSize?: number,
                chunkRetries?: number
            ): JQuery.Promise<ApiResponse>;

            /**
             * Upload a file to the stash, in chunks.
             *
             * This function will return a promise that will resolve with a function to finish the stash upload.
             * See {@link uploadToStash}.
             *
             * @param {File|HTMLInputElement} file
             * @param {Api.Params.Action.Upload} [data]
             * @param {number} [chunkSize] Size (in bytes) per chunk (default: 5MB)
             * @param {number} [chunkRetries] Amount of times to retry a failed chunk (default: 1)
             * @returns {JQuery.Promise<FinishUpload>} Promise that resolves with a
             *  function that should be called to finish the upload.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#chunkedUploadToStash
             */
            chunkedUploadToStash(
                file: File | HTMLInputElement,
                data?: Pick<
                    Require<Api.Params.Action.Upload, "filename">,
                    "filename" | "ignorewarnings"
                >,
                chunkSize?: number,
                chunkRetries?: number
            ): JQuery.Promise<FinishUpload>;

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
             * @param {Api.Params.Action.Edit} params Edit API parameters
             * @param {string} content Page content
             * @returns {JQuery.Promise<EditResult>} API response
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#create
             */
            create(
                title: TitleLike,
                params: Omit<Api.Params.Action.Edit, "action" | "text" | "title">,
                content: string
            ): JQuery.Promise<EditResult>;

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
             * @returns {JQuery.Promise<EditResult>} Edit API response
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#edit
             */
            edit(title: TitleLike, transform: Api.EditTransform): JQuery.Promise<EditResult>;

            /**
             * Perform API get request. See {@link ajax()} for details.
             *
             * @param {Api.Params} parameters
             * @param {JQuery.AjaxSettings} [ajaxOptions]
             * @returns {JQuery.Promise<ApiResponse>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#get
             */
            get(
                parameters: Api.Params,
                ajaxOptions?: JQuery.AjaxSettings
            ): JQuery.Promise<ApiResponse>;

            /**
             * Get the categories that a particular page on the wiki belongs to.
             *
             * @param {TitleLike} title
             * @returns {JQuery.Promise<false|Title[]>} Promise that resolves with an array of category titles, or with false if the title was not found.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#getCategories
             */
            getCategories(title: TitleLike): JQuery.Promise<false | Title[]>;

            /**
             * Get a list of categories that match a certain prefix.
             *
             * E.g. given "Foo", return "Food", "Foolish people", "Foosball tables"...
             *
             * @param {string} prefix Prefix to match.
             * @returns {JQuery.Promise<string[]>} Promise that resolves with an array of matched categories
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#getCategoriesByPrefix
             */
            getCategoriesByPrefix(prefix: string): JQuery.Promise<string[]>;

            /**
             * API helper to grab a csrf token.
             *
             * @returns {JQuery.Promise<string>} Received token.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#getEditToken
             */
            getEditToken(): JQuery.Promise<string>;

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
             * } ).then( function ( data ) {
             *     mw.notify( 'Success!' );
             * }, function ( code, data ) {
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
             * @param {Api.Params.Action.Query.Meta.AllMessages} [options] Additional parameters for the API call
             * @returns {JQuery.Promise<Object.<string, string>>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#getMessages
             */
            getMessages<T extends string>(
                messages: T | T[],
                options?: Omit<
                    Api.Params.Action.Query.Meta.AllMessages,
                    "action" | "ammessages" | "meta"
                >
            ): JQuery.Promise<Partial<Record<T, string>>>;

            /**
             * Get a token for a certain action from the API.
             *
             * @since 1.22
             * @since 1.25 - assert parameter can be passed.
             * @since 1.35 - additional parameters can be passed as an object instead of `assert`.
             * @param {string} type Token type
             * @param {Api.Params.Action.Query.Meta.Tokens|ApiAssert} [additionalParams] Additional parameters for the API. When given a string, it's treated as the `assert` parameter.
             * @returns {JQuery.Promise<string>} Received token.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#getToken
             */
            getToken(
                type: ApiTokenType,
                additionalParams?: Api.Params.Action.Query.Meta.Tokens | ApiAssert
            ): JQuery.Promise<string>;
            /** @deprecated Use `getToken('csrf')` instead */
            getToken(
                type: ApiLegacyTokenType,
                additionalParams?: Api.Params.Action.Query.Meta.Tokens | ApiAssert
            ): JQuery.Promise<string>;
            getToken(
                type: string,
                additionalParams?: Api.Params.Action.Query.Meta.Tokens | ApiAssert
            ): JQuery.Promise<string>;

            /**
             * Get the current user's groups and rights.
             *
             * @since 1.27
             * @returns {JQuery.Promise<Api.UserInfo>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#getUserInfo
             */
            getUserInfo(): JQuery.Promise<Api.UserInfo>;

            /**
             * Determine if a category exists.
             *
             * @param {TitleLike} title
             * @returns {JQuery.Promise<boolean>} Promise that resolves with a boolean indicating whether the category exists.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#isCategory
             */
            isCategory(title: TitleLike): JQuery.Promise<boolean>;

            /**
             * Load a set of messages and add them to {@link mw.messages}.
             *
             * @since 1.37 - accepts a single string message as parameter.
             * @param {string|string[]} messages Messages to retrieve
             * @param {Api.Params.Action.Query.Meta.AllMessages} [options] Additional parameters for the API call
             * @returns {JQuery.Promise<boolean>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#loadMessages
             */
            loadMessages(
                messages: string | string[],
                options?: Omit<
                    Api.Params.Action.Query.Meta.AllMessages,
                    "action" | "ammessages" | "meta"
                >
            ): JQuery.Promise<boolean>;

            /**
             * Load a set of messages and add them to {@link mw.messages}. Only messages that are not already known
             * are loaded. If all messages are known, the returned promise is resolved immediately.
             *
             * @since 1.27
             * @since 1.42 - accepts a single string message as parameter.
             * @param {string|string[]} messages Messages to retrieve
             * @param {Api.Params.Action.Query.Meta.AllMessages} [options] Additional parameters for the API call
             * @returns {JQuery.Promise<boolean>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#loadMessagesIfMissing
             */
            loadMessagesIfMissing(
                messages: string | string[],
                options?: Omit<
                    Api.Params.Action.Query.Meta.AllMessages,
                    "action" | "ammessages" | "meta"
                >
            ): JQuery.Promise<boolean>;

            /**
             * @param {string} username
             * @param {string} password
             * @returns {JQuery.Promise<ApiResponse>} See {@link post()}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#login
             */
            login(username: string, password: string): JQuery.Promise<ApiResponse>;

            /**
             * Post a new section to the page.
             *
             * @param {TitleLike} title Target page
             * @param {string} header
             * @param {string} message Wikitext message
             * @param {Api.Params.Action.Edit} additionalParams Additional API parameters
             * @returns {JQuery.Promise<ApiResponse>} See {@link postWithEditToken}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#newSection
             */
            newSection(
                title: TitleLike,
                header: string,
                message: string,
                additionalParams?: Omit<
                    Api.Params.Action.Edit,
                    "action" | "section" | "summary" | "text" | "title"
                >
            ): JQuery.Promise<ApiResponse>;

            /**
             * Convenience method for `action=parse`.
             *
             * @param {TitleLike} content Content to parse, either as a wikitext string or a {@link mw.Title}
             * @param {Api.Params.Action.Parse} [additionalParams] Parameters object to set custom settings, e.g.
             *  `redirects`, `sectionpreview`. `prop` should not be overridden.
             * @returns {JQuery.Promise<string>} Promise that resolves with the parsed HTML of `wikitext`
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#parse
             */
            parse(
                content: TitleLike,
                additionalParams?: Omit<
                    Api.Params.Action.Parse,
                    "action" | "page" | "prop" | "text"
                >
            ): JQuery.Promise<string>;

            /**
             * Perform API post request. See {@link ajax()} for details.
             *
             * @param {Api.Params} parameters
             * @param {JQuery.AjaxSettings} [ajaxOptions]
             * @returns {JQuery.Promise<ApiResponse>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#post
             */
            post(
                parameters: Api.Params,
                ajaxOptions?: JQuery.AjaxSettings
            ): JQuery.Promise<ApiResponse>;

            /**
             * Post to API with csrf token. If we have no token, get one and try to post. If we have a cached token try using that, and if it fails, blank out the cached token and start over.
             *
             * @param {Api.Params} params API parameters
             * @param {JQuery.AjaxSettings} [ajaxOptions]
             * @returns {JQuery.Promise<ApiResponse>} See {@link post}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#postWithEditToken
             */
            postWithEditToken(
                params: Api.Params,
                ajaxOptions?: JQuery.AjaxSettings
            ): JQuery.Promise<ApiResponse>;

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
             * @param {Api.Params} params API parameters
             * @param {JQuery.AjaxSettings} [ajaxOptions]
             * @returns {JQuery.Promise<ApiResponse>} See {@link post()}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#postWithToken
             */
            postWithToken(
                tokenType: ApiTokenType,
                params: Api.Params,
                ajaxOptions?: JQuery.AjaxSettings
            ): JQuery.Promise<ApiResponse>;
            /** @deprecated Use `postWithToken('csrf', params)` instead */
            postWithToken(
                tokenType: ApiLegacyTokenType,
                params: Api.Params,
                ajaxOptions?: JQuery.AjaxSettings
            ): JQuery.Promise<ApiResponse>;
            postWithToken(
                tokenType: string,
                params: Api.Params,
                ajaxOptions?: JQuery.AjaxSettings
            ): JQuery.Promise<ApiResponse>;

            /**
             * Convenience method for `action=rollback`.
             *
             * @since 1.28
             * @param {TitleLike} page
             * @param {string} user
             * @param {Api.Params.Action.Rollback} [params] Additional parameters
             * @returns {JQuery.Promise<RollbackInfo>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#rollback
             */
            rollback(
                page: TitleLike,
                user: string,
                params?: Omit<Api.Params.Action.Rollback, "action" | "title" | "user">
            ): JQuery.Promise<RollbackInfo>;

            /**
             * Asynchronously save the value of a single user option using the API.
             * See {@link saveOptions()}.
             *
             * @param {string} name
             * @param {string|null} value
             * @returns {JQuery.Promise<ApiResponse>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#saveOption
             */
            saveOption(name: string, value: string | null): JQuery.Promise<ApiResponse>;

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
             * @param {Object.<string, string|null>} options Options as a `{ name: value, … }` object
             * @returns {JQuery.Promise<ApiResponse>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#saveOptions
             */
            saveOptions(options: Record<string, string | null>): JQuery.Promise<ApiResponse>;

            /**
             * Convenience method for `action=watch&unwatch=1`.
             *
             * @param {TypeOrArray<TitleLike>} pages Full page name or instance of {@link mw.Title}, or an
             *  array thereof. If an array is passed, the return value passed to the promise will also be an
             *  array of appropriate objects.
             * @returns {JQuery.Promise<TypeOrArray<Api.WatchedPage>>} A promise that resolves
             *  with an object (or array of objects) describing each page that was passed in and its
             *  current watched/unwatched status.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#unwatch
             */
            unwatch<P extends TypeOrArray<TitleLike>>(
                pages: P
            ): JQuery.Promise<ReplaceValue<P, TitleLike, Api.WatchedPage>>;

            /**
             * Upload a file to MediaWiki.
             *
             * The file will be uploaded using AJAX and FormData.
             *
             * @param {File|Blob|HTMLInputElement} file HTML `input type=file` element with a file already inside of it, or a File object.
             * @param {Api.Params.Action.Upload} data Other upload options, see `action=upload` API docs for more
             * @returns {JQuery.Promise<ApiResponse>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#upload
             */
            upload(
                file: File | Blob | HTMLInputElement,
                data: Omit<
                    Require<Api.Params.Action.Upload, "filename" | "stash">,
                    "action" | "file"
                >
            ): JQuery.Promise<ApiResponse>;

            /**
             * Finish an upload in the stash.
             *
             * @param {string} filekey
             * @param {Api.Params.Action.Upload} data
             * @returns {JQuery.Promise<ApiResponse>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#uploadFromStash
             */
            uploadFromStash(
                filekey: string,
                data: Omit<Require<Api.Params.Action.Upload, "filename">, "action" | "filekey">
            ): JQuery.Promise<ApiResponse>;

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
             * @param {Api.Params.Action.Upload} [data]
             * @returns {JQuery.Promise<FinishUpload>} Promise that resolves with a
             *  function that should be called to finish the upload.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#uploadToStash
             */
            uploadToStash(
                file: File | HTMLInputElement,
                data?: Api.Params.Action.Upload
            ): JQuery.Promise<FinishUpload>;

            /**
             * Convenience method for `action=watch`.
             *
             * @since 1.35 - expiry parameter can be passed when Watchlist Expiry is enabled.
             * @param {TypeOrArray<TitleLike>} pages Full page name or instance of {@link mw.Title}, or an
             *  array thereof. If an array is passed, the return value passed to the promise will also be an
             *  array of appropriate objects.
             * @param {string} [expiry] When the page should expire from the watchlist. If omitted, the
             *  page will not expire.
             * @returns {JQuery.Promise<TypeOrArray<Api.WatchedPage>>} A promise that resolves
             *  with an object (or array of objects) describing each page that was passed in and its
             *  current watched/unwatched status.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#watch
             */
            watch<P extends TypeOrArray<TitleLike>>(
                pages: P,
                expiry?: string
            ): JQuery.Promise<ReplaceValue<P, TitleLike, Api.WatchedPage>>;

            /**
             * Massage parameters from the nice format we accept into a format suitable for the API.
             *
             * @param {Api.Params} parameters (modified in-place)
             * @param {boolean} useUS Whether to use U+001F when joining multi-valued parameters.
             */
            private preprocessParameters(parameters: Api.Params, useUS: boolean): void;
        }

        namespace Api {
            /**
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#.EditTransform
             */
            interface EditTransform {
                /**
                 * @param {Revision} revision Current revision
                 * @returns {string|Params.Action.Edit|JQuery.Promise<string|Params.Action.Edit>} New content, object with edit API parameters, or promise providing one of those.
                 */
                (revision: Revision):
                    | string
                    | Omit<Params.Action.Edit, "action" | "title">
                    | JQuery.Promise<string>
                    | JQuery.Promise<Omit<Params.Action.Edit, "action" | "title">>;
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
                ajax?: JQuery.AjaxSettings;
                /**
                 * Default query parameters for API requests
                 */
                parameters?: Partial<Params>;
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
        }
    }
}

/** @deprecated Use `mw.Api.Options` instead. Note that `ApiOptions` is strictly equivalent to `Required<mw.Api.Options>` as properties are now optional for consistency. */
export type ApiOptions = Required<mw.Api.Options>;

export {};
