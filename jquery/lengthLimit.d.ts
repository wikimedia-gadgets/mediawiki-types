declare global {
    interface JQueryStatic {
        /**
         * Utility function to trim down a string, based on byteLimit
         * and given a safe start position.
         *
         * It supports insertion anywhere in the string, so "foo" to "fobaro" if
         * limit is 4 will result in "fobo", not "foba". Basically emulating the
         * native maxlength by reconstructing where the insertion occurred.
         *
         * @deprecated Use `require( 'mediawiki.String' ).trimByteLength` instead.
         * @param {string} safeVal Known value that was previously returned by this
         * function, if none, pass empty string.
         * @param {string} newVal New value that may have to be trimmed down.
         * @param {number} byteLimit Number of bytes the value may be in size.
         * @param {JQuery.LengthLimit.FilterFunction} [filterFunction] Function to call on the string before assessing the length.
         * @returns {JQuery.LengthLimit.TrimResult}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-jquery.lengthLimit.html#.'$.fn.trimByteLength'
         */
        trimByteLength(
            safeVal: string,
            newVal: string,
            byteLimit: number,
            filterFunction?: JQuery.LengthLimit.FilterFunction
        ): JQuery.LengthLimit.TrimResult;
    }

    interface JQuery {
        /**
         * Enforces a byte limit on an input field, assuming UTF-8 encoding, for situations
         * when, for example, a database field has a byte limit rather than a character limit.
         * Plugin rationale: Browser has native maxlength for number of characters (technically,
         * UTF-16 code units), this plugin exists to limit number of bytes instead.
         *
         * Can be called with a custom limit (to use that limit instead of the maxlength attribute
         * value), a filter function (in case the limit should apply to something other than the
         * exact input value), or both. Order of parameters is important!
         *
         * @param {number} [limit] Limit to enforce, fallsback to maxLength-attribute,
         *  called with fetched value as argument.
         * @param {JQuery.LengthLimit.FilterFunction} [filterFunction] Function to call on the string before assessing the length.
         * @returns {JQuery}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-jquery.lengthLimit.html#.$.fn.byteLimit
         */
        byteLimit(limit: number, filterFunction?: JQuery.LengthLimit.FilterFunction): this;
        byteLimit(filterFunction?: JQuery.LengthLimit.FilterFunction): this;

        /**
         * Enforces a codepoint (character) limit on an input field.
         *
         * For unfortunate historical reasons, browsers' native maxlength counts
         * {@link https://www.w3.org/TR/html5/sec-forms.html#limiting-user-input-length-the-maxlength-attribute the number of UTF-16
         * code units rather than Unicode codepoints}, which means that codepoints outside the Basic
         * Multilingual Plane (such as many emojis) count as 2 characters each. This plugin exists to
         * correct this.
         *
         * Can be called with a custom limit (to use that limit instead of the maxlength attribute
         * value), a filter function (in case the limit should apply to something other than the
         * exact input value), or both. Order of parameters is important!
         *
         * @param {number} [limit] Limit to enforce, fallsback to maxLength-attribute,
         *  called with fetched value as argument.
         * @param {JQuery.LengthLimit.FilterFunction} [filterFunction] Function to call on the string before assessing the length.
         * @returns {JQuery}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-jquery.lengthLimit.html#.$.fn.codePointLimit
         */
        codePointLimit(limit: number, filterFunction?: JQuery.LengthLimit.FilterFunction): this;
        codePointLimit(filterFunction?: JQuery.LengthLimit.FilterFunction): this;
    }

    namespace JQuery.LengthLimit {
        interface FilterFunction {
            (str: string): string;
        }

        interface TrimResult {
            newVal: string;
            trimmed: boolean;
        }
    }
}

export {};
