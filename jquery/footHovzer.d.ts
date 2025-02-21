declare global {
    interface JQueryStatic {
        /**
         * Utility to stack stuff in an overlay fixed on the bottom of the page.
         *
         * @example
         * ```js
         * var hovzer = $.getFootHovzer();
         * hovzer.$.append( $myCollection );
         * hovzer.update();
         * ```
         * @private
         * @returns {JQuery.FootHovzer}
         */
        getFootHovzer(): JQuery.FootHovzer;
    }

    namespace JQuery {
        interface FootHovzer {
            /**
             * The stack container.
             */
            $: JQuery;

            /**
             * Update dimensions of stack to account for changes in the subtree.
             */
            update(): void;
        }
    }
}

export {};
