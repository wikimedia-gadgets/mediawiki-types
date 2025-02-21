declare global {
    interface JQuery {
        /**
         * Enable collapsible-functionality on all elements in the collection.
         *
         * - Will prevent binding twice to the same element.
         * - Initial state is expanded by default, this can be overridden by adding class
         *   "mw-collapsed" to the "mw-collapsible" element.
         * - Elements made collapsible have jQuery data "mw-made-collapsible" set to true.
         * - The inner content is wrapped in a "div.mw-collapsible-content" (except for tables and lists).
         *
         * To use this {@link jQuery} plugin, load the `jquery.makeCollapsible` module with {@link mw.loader}.
         *
         * @example
         * ```js
         * mw.loader.using( 'jquery.makeCollapsible' ).then( () => {
         *     $( 'table' ).makeCollapsible();
         * } );
         * ```
         * @param {JQuery.MakeCollapsible.Options} [options]
         * @returns {JQuery}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-jquery.makeCollapsible.html#.$.fn.makeCollapsible
         */
        makeCollapsible(options?: JQuery.MakeCollapsible.Options): this;
    }

    namespace JQuery.MakeCollapsible {
        interface Options {
            /**
             * Elements to be used as togglers for this collapsible element. By default, if the collapsible
             * element has an id attribute like 'mw-customcollapsible-XXX', elements with a **class**
             * of 'mw-customtoggle-XXX' are made togglers for it.
             */
            $customTogglers?: JQuery;

            /**
             * Whether to collapse immediately. By default collapse only if the element has the 'mw-collapsed' class.
             */
            collapsed?: boolean;

            /**
             * Text used for the toggler, when clicking it would collapse the element.
             * Default: the 'data-collapsetext' attribute of the collapsible element or the content of 'collapsible-collapse' message.
             */
            collapseText?: string;

            /**
             * Text used for the toggler, when clicking it would expand the element.
             * Default: the 'data-expandtext' attribute of the collapsible element or the content of 'collapsible-expand' message.
             */
            expandText?: string;

            /**
             * Whether to use a "plain mode" when making the element collapsible - that is, hide entire tables
             * and lists (instead of hiding only all rows but first of tables, and hiding each list item
             * separately for lists) and don't wrap other elements in div.mw-collapsible-content.
             * May only be used with custom togglers.
             */
            plainMode?: boolean;
        }
    }
}

export {};
