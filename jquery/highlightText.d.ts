declare global {
    interface JQueryStatic {
        highlightText: JQuery.HighlightText;
    }

    interface JQuery {
        /**
         * Highlight certain text in current nodes (by wrapping it in `<span class="highlight">...</span>`).
         *
         * To use this {@link jQuery} plugin, load the `jquery.highlightText` module with {@link mw.loader}.
         *
         * @example
         * ```js
         * mw.loader.using( 'jquery.highlightText' ).then( () => {
         *     // no styling is provided by default.
         *     mw.util.addCSS( `.highlight { background: yellow; }` )
         *     $( '#bodyContent' ).highlightText( 'bear' );
         * } );
         * ```
         * @param {string} matchString String to match
         * @param {JQuery.HighlightText.Options} [options]
         * @returns {JQuery}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-jquery.highlightText.html#.$.fn.highlightText
         */
        highlightText(matchString: string, options?: JQuery.HighlightText.Options): this;
    }

    namespace JQuery {
        interface HighlightText {
            innerHighlight(node: Node, pat: string | RegExp): void;

            prefixHighlight(node: Node, prefix: string): void;

            prefixPlusComboHighlight(node: Node, prefix: string): void;

            splitAndHighlight<T extends Node>(node: T, text: string): T;
        }

        namespace HighlightText {
            type Method = "prefixHighlight" | "prefixPlusComboHighlight" | "splitAndHighlight";

            interface Options {
                /**
                 * Method of matching to use, one of:
                 *
                 * - 'splitAndHighlight': Split `matchString` on spaces, then match each word separately.
                 * - 'prefixHighlight': Match `matchString` at the beginning of text only.
                 * - 'prefixPlusComboHighlight': Match `matchString` plus any combining characters at
                 *   the beginning of text only.
                 */
                method?: Method;
            }
        }
    }
}

export {};
