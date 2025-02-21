declare global {
    namespace mw {
        /**
         * Convert a byte stream to base64 text.
         *
         * @example
         * ```js
         * return mw.loader.using( 'mediawiki.deflate' ).then( () => mw.deflate( html ) );
         * ```
         * @deprecated Use {@link mw.deflateAsync}
         * @param {string|ArrayBuffer} data Undeflated data
         * @returns {string} Compressed data
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.deflate
         */
        function deflate(data: string | ArrayBuffer): `rawdeflate,${string}`;

        /**
         * Convert a byte stream to base64 text.
         *
         * Uses browser native CompressionStream if available.
         *
         * @example
         * ```js
         * return mw.loader.using( 'mediawiki.deflate' ).then( () => mw.deflateAsync( html ) );
         * ```
         * @param {string|ArrayBuffer} data Undeflated data
         * @return {Promise<string>} Compressed data
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.deflateAsync
         */
        function deflateAsync(data: string | ArrayBuffer): Promise<`rawdeflate,${string}`>;
    }
}

export {};
