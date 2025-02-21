declare global {
    interface JQuery {
        /**
         * Add suggestions to a text box.
         *
         * To use this {@link jQuery} plugin, load the `jquery.suggestions` module with {@link mw.loader}.
         *
         * @example
         * ```js
         * // Initialize:
         * mw.loader.using( 'jquery.suggestions' ).then(()=> {
         *     $( '#textbox' ).suggestions();
         * });
         * ```
         * @example
         * ```js
         * // Set options:
         * $( '#textbox' ).suggestions( { option1: value1, option2: value2 } );
         * $( '#textbox' ).suggestions( option, value );
         * ```
         * @param {string} property Name of property
         * @param {any} value Value to set property with
         * @returns {JQuery}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#.suggestions
         */
        suggestions<K extends keyof JQuery.Suggestions.Options<T>, T = any>(
            property: K,
            value: JQuery.Suggestions.Options<T>[K]
        ): this;
        suggestions<T = any>(options?: Partial<JQuery.Suggestions.Options<T>>): this;
    }

    namespace JQuery.Suggestions {
        type Device = "keyboard" | "mouse";
        type Direction = "auto" | "end" | "left" | "right" | "start";

        interface Context<T = any> {
            config: Options<T>;
            data: unknown;
        }

        interface Options<T = any> {
            /**
             * Whether to cache results from a fetch. Defaults to false.
             */
            cache: boolean;

            /**
             * Number of milliseconds to cache results from a fetch. Must be higher than 1. Defaults to 1 minute.
             */
            cacheMaxAge: number;

            /**
             * Callback function to call when any pending asynchronous suggestions fetches. Called in context of the text box.
             */
            cancel(this: JQuery): void;

            /**
             * Number of milliseconds to wait for the user to stop typing. Must be between 0 and 1200. Defaults to 120.
             */
            delay: number;

            /**
             * Which direction to offset the suggestion box from.
             * Values 'start' and 'end' translate to left and right respectively depending on the directionality
             * of the current document, according to `$( document.documentElement ).css( 'direction' )`.
             * Valid values: "left", "right", "start", "end", and "auto". Defaults to auto.
             */
            expandFrom: Direction;

            /**
             * Callback that should fetch suggestions and set the suggestions property. Called in context of the text box.
             *
             * @param {string} query
             * @param {function(string[],any):void} response Callback to receive the suggestions with
             * @param {number} maxRows
             */
            fetch(
                this: JQuery,
                query: string,
                response: (suggestions: string[], metadata: T) => void,
                maxRows: number
            ): void;

            /**
             * Whether to highlight matched portions of the input or not. Defaults to false.
             */
            highlightInput: boolean;

            /**
             * Maximum suggestions box width relative to the textbox width.
             * If set to e.g. 2, the suggestions box will never be grown beyond 2 times the width of the textbox.
             * Must be higher than 1. Defaults to 3.
             */
            maxExpandFactor: number;

            /**
             * Maximum number of suggestions to display at one time. Must be between 1 and 100.
             */
            maxRows: number;

            /**
             * Sets `expandFrom=left`, for backwards compatibility.
             */
            positionFromLeft: boolean;

            /**
             * Set of callbacks for rendering and selecting.
             */
            result: Partial<Options.Result<T>>;

            /**
             * Set of callbacks for rendering and selecting.
             */
            special: Partial<Options.Special<T>>;

            /**
             * Whether to submit the form containing the textbox when a suggestion is clicked. Defaults to false.
             */
            submitOnClick: boolean;

            /**
             * Array of suggestions to display.
             */
            suggestions: string[];

            /**
             * Set of callbacks for listening to a change in the text input.
             */
            update: Partial<Options.Update<T>>;

            /**
             * The element to place the suggestions below and match width of. Defaults to the element itself.
             */
            $region: JQuery;
        }

        namespace Options {
            interface Result<T = any> {
                /**
                 * Called in context of the suggestions-result element.
                 */
                render(this: JQuery, suggestion: string, context: Context<T>): void;

                /**
                 * Called in context of the suggestions-result-current element.
                 */
                select(this: JQuery, $textbox: JQuery, device: Device): any;
            }

            interface Special<T = any> {
                /**
                 * Called in context of the suggestions-special element.
                 */
                render(this: JQuery, query: string, context: Context<T>): void;

                /**
                 * Called in context of the suggestions-result-current element.
                 */
                select(this: JQuery, $textbox: JQuery, device: Device): boolean;
            }

            interface Update<T = any> {
                /**
                 * Called after results are updated either from the cache or the API as a result of the user input.
                 */
                after(this: JQuery, metadata: T): void;

                /**
                 * Called right after the user changes the textbox text.
                 */
                before(this: JQuery): void;
            }
        }
    }
}

export {};
