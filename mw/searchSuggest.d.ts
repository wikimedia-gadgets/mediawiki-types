declare global {
    namespace mw {
        /**
         * Convenience library for making searches for titles that match a string.
         * Loaded via the `mediawiki.searchSuggest` ResourceLoader library.
         *
         * @example
         * ```js
         * mw.loader.using('mediawiki.searchSuggest').then(() => {
         *     var api = new mw.Api();
         *     mw.searchSuggest.request(api, 'Dogs that', ( results ) => {
         *         alert( `Results that match: ${results.join( '\n' );}` );
         *     });
         * });
         * ```
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.searchSuggest.html
         */
        namespace searchSuggest {
            /**
             * Queries the wiki and calls response with the result.
             *
             * @param {Api} api
             * @param {string} query
             * @param {ResponseFunction} response
             * @param {string|number} [limit]
             * @param {string|number|string[]|number[]} [namespace]
             * @returns {JQuery.Promise<Api.UnknownResponse>}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.searchSuggest.html#.request
             */
            function request(
                api: Api,
                query: string,
                response: ResponseFunction,
                limit?: number | "max",
                namespace?: number | number[]
            ): JQuery.Promise<Api.UnknownResponse>;

            /**
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.searchSuggest.html#~ResponseFunction
             */
            interface ResponseFunction {
                /**
                 * @param {string[]} titles titles of pages that match search
                 * @param {ResponseMetaData} meta meta data relating to search
                 */
                (titles: string[], meta: ResponseMetaData): void;
            }

            /**
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.searchSuggest.html#~ResponseMetaData
             */
            interface ResponseMetaData {
                query: string;
                /**
                 * The contents of the X-Search-ID response header.
                 */
                searchId: string;
                /**
                 * The contents of the X-OpenSearch-Type response header.
                 */
                type: string;
            }
        }
    }
}

export {};
