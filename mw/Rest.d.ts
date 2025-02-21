declare global {
    namespace mw {
        /**
         * Interact with the REST API. `mw.Rest` is a client library for the
         * {@link https://www.mediawiki.org/wiki/Special:MyLanguage/API:REST_API REST API}.
         * An `mw.Rest` object represents the REST API of a MediaWiki site. For the action API, see {@link mw.Api}.
         *
         * @example
         * ```js
         * var api = new mw.Rest();
         * api.get( '/v1/page/Main_Page/html' )
         * .then( function ( data ) {
         *     console.log( data );
         * } );
         *
         * api.post( '/v1/page/Main_Page', {
         *     token: 'anon_token',
         *     source: 'Lörem Ipsüm',
         *     comment: 'tästing',
         *     title: 'My_Page'
         * }, {
         *     'authorization': 'token'
         * } )
         * .then( function ( data ) {
         *     console.log( data );
         * } );
         * ```
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Rest.html
         */
        class Rest {
            /**
             * Create an instance of {@link mw.Rest}.
             *
             * @param {Rest.Options} [options] See {@link mw.Rest.Options}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Rest.html#Rest
             */
            constructor(options?: Rest.Options);

            private defaults: Required<Rest.Options>;

            /**
             * Abort all unfinished requests issued by this Api object.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Rest.html#abort
             */
            abort(): void;

            /**
             * Perform the API call.
             *
             * @param {string} path
             * @param {JQuery.AjaxSettings} [ajaxOptions]
             * @returns {Rest.AbortablePromise} Done: API response data and the jqXHR object.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Api.html#ajax
             */
            ajax(path: string, ajaxOptions?: JQuery.AjaxSettings): Rest.AbortablePromise;

            /**
             * Perform REST API DELETE request.
             *
             * Note: only sending `application/json` is currently supported.
             *
             * @since 1.39
             * @param {string} path
             * @param {Object.<string, any>} body
             * @param {Object.<string, any>} [headers]
             * @returns {Rest.AbortablePromise}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Rest.html#delete
             */
            delete(
                path: string,
                body: Record<string, any>,
                headers?: Record<string, any>
            ): Rest.AbortablePromise;

            /**
             * Perform REST API get request.
             *
             * @param {string} path
             * @param {Object.<string, any>} query
             * @param {Object.<string, any>} [headers]
             * @returns {Rest.AbortablePromise}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Rest.html#get
             */
            get(
                path: string,
                query: Record<string, any>,
                headers?: Record<string, any>
            ): Rest.AbortablePromise;

            /**
             * Perform REST API post request.
             *
             * Note: only sending `application/json` is currently supported.
             *
             * @since 1.42 - body parameter is optional.
             * @param {string} path
             * @param {Object.<string, any>} [body]
             * @param {Object.<string, any>} [headers]
             * @returns {Rest.AbortablePromise}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Rest.html#post
             */
            post(
                path: string,
                body?: Record<string, any>,
                headers?: Record<string, any>
            ): Rest.AbortablePromise;

            /**
             * Perform REST API PUT request.
             *
             * Note: only sending `application/json` is currently supported.
             *
             * @since 1.39
             * @param {string} path
             * @param {Object.<string, any>} body
             * @param {Object.<string, any>} [headers]
             * @returns {Rest.AbortablePromise}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Rest.html#put
             */
            put(
                path: string,
                body: Record<string, any>,
                headers?: Record<string, any>
            ): Rest.AbortablePromise;
        }

        namespace Rest {
            /**
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Rest.html#.Options
             */
            interface Options {
                /**
                 * Default options for {@link Rest.ajax ajax()} calls. Can be overridden by passing `options` to
                 * the {@link mw.Rest} constructor.
                 */
                ajax?: JQuery.AjaxSettings;
            }

            // Unknown JSON object
            type Response = Record<string, any>;

            type Promise<
                TResolve extends Api.ArgTuple = [Response, JQuery.jqXHR<Response>],
                TReject extends Api.ArgTuple = RejectArgTuple,
                TNotify extends Api.ArgTuple = []
            > = Api.Promise<TResolve, TReject, TNotify>;

            type AbortablePromise<
                TResolve extends Api.ArgTuple = [RestResponse, JQuery.jqXHR<RestResponse>],
                TReject extends Api.ArgTuple = RejectArgTuple,
                TNotify extends Api.ArgTuple = []
            > = Api.AbortablePromise<TResolve, TReject, TNotify>;

            type RejectArgTuple = ["http", HttpErrorData];

            interface HttpErrorData<T = any> {
                exception: string;
                textStatus: JQuery.Ajax.ErrorTextStatus;
                xhr: JQuery.jqXHR<T>;
            }
        }
    }
}

/** @deprecated Use {@link mw.Rest.Options} instead. Note that `RestOptions` is strictly equivalent to `Required<mw.Rest.Options>` as properties are now optional for consistency. */
export type RestOptions = Required<mw.Rest.Options>;
/** @deprecated Use {@link mw.Rest.Response} instead */
export type RestResponse = mw.Rest.Response;

export {};
