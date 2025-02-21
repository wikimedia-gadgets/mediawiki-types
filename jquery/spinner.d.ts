declare global {
    interface JQueryStatic {
        /**
         * Create a spinner element
         *
         * The argument is an object with options used to construct the spinner (see below).
         *
         * It is a good practice to keep a reference to the created spinner to be able to remove it
         * later. Alternatively, one can use the 'id' option and {@link removeSpinner} (but make sure to choose
         * an id that's unlikely to cause conflicts, e.g. with extensions, gadgets or user scripts).
         *
         * CSS classes used:
         *
         * - .mw-spinner for every spinner
         * - .mw-spinner-small / .mw-spinner-large for size
         * - .mw-spinner-block / .mw-spinner-inline for display types
         *
         * @example
         * ```js
         * // Create a large spinner reserving all available horizontal space.
         * const $spinner = $.createSpinner( { size: 'large', type: 'block' } );
         * // Insert above page content.
         * $( '#mw-content-text' ).prepend( $spinner );
         *
         * // Place a small inline spinner next to the "Save" button
         * const $spinner = $.createSpinner( { size: 'small', type: 'inline' } );
         * // Alternatively, just `$.createSpinner();` as these are the default options.
         * $( '#wpSave' ).after( $spinner );
         *
         * // The following two are equivalent:
         * $.createSpinner( 'magic' );
         * $.createSpinner( { id: 'magic' } );
         * ```
         *
         * @ignore
         * @param {string|JQuery.Spinner.Options} [opts] Options. If a string is given, it will be treated as the value
         *  of the {@link JQuery.Spinner.Options.id id} option.
         * @returns {JQuery}
         */
        createSpinner(opts?: string | JQuery.Spinner.Options): JQuery;

        /**
         * Remove a spinner element.
         *
         * @ignore
         * @param {string} id Id of the spinner, as passed to {@link createSpinner}
         * @returns {JQuery} The (now detached) spinner element
         */
        removeSpinner(id: string): JQuery;
    }

    interface JQuery {
        /**
         * Inject a spinner after each element in the collection.
         * Provided by the `jquery.spinner` ResourceLoader module.
         *
         * Inserts spinner as siblings (not children) of the target elements.
         * Collection contents remain unchanged.
         *
         * @param {string|JQuery.Spinner.Options} [opts] Options. If a string is given, it will be treated as the value
         *  of the {@link JQuery.Spinner.Options.id id} option.
         * @returns {JQuery}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#.injectSpinner
         */
        injectSpinner(opts?: string | JQuery.Spinner.Options): this;
    }

    namespace JQuery.Spinner {
        type Size = "large" | "small";
        type Type = "block" | "inline";

        /**
         * Options for {@link JQuery.injectSpinner}.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#~SpinnerOpts
         */
        interface Options {
            /**
             * If given, spinner will be given an id of "mw-spinner-{id}".
             */
            id?: string | undefined;

            /**
             * 'small' or 'large' for a 20-pixel or 32-pixel spinner.
             */
            size?: Size;

            /**
             * 'inline' or 'block'. Inline creates an inline-block with width and height equal to spinner size. Block is a block-level element with width 100%, height equal to spinner size.
             */
            type?: Type;
        }
    }
}

export {};
