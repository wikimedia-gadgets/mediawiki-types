declare global {
    namespace mw {
        /**
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.html
         */
        namespace html {
            /**
             * Create an HTML element string, with safe escaping.
             *
             * @param {string} name The tag name.
             * @param {Object} [attrs] An object with members mapping element names to values
             * @param {string|Raw|null} [contents=null] The contents of the element.
             *
             *  - string: Text to be escaped.
             *  - null: The element is treated as void with short closing form, e.g. `<br/>`.
             *  - this.Raw: The raw value is directly included.
             * @return {string} HTML
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.html-method-element
             */
            function element(
                name: string,
                attrs?: Record<string, string>,
                contents?: string | Raw | null
            ): string;

            /**
             * Escape a string for HTML.
             *
             * Converts special characters to HTML entities.
             *
             *     mw.html.escape( '< > \' & "' );
             *     // Returns &lt; &gt; &#039; &amp; &quot;
             *
             * @param {string} s The string to escape
             * @return {string} HTML
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.html-method-escape
             */
            function escape(s: string): string;

            /**
             * Wrapper object for raw HTML passed to mw.html.element().
             *
             * @class mw.html.Raw
             * @constructor
             * @param {string} value
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.html.Raw-method-constructor
             */
            class Raw<V extends string = string> {
                constructor(value: V);
                private value: V;
            }
        }
    }
}

export {};
