import "./Api";
import "./cldr";
import "./config";
import "./cookie";
import "./Debug";
import "./errorLogger";
import "./ForeignApi";
import "./ForeignRest";
import "./global";
import "./hook";
import "./html";
import "./inspect";
import "./jqueryMsg";
import "./language";
import "./loader";
import "./log";
import "./Map";
import "./message";
import "./notification";
import "./RegExp";
import "./Rest";
import "./storage";
import "./String";
import "./template";
import "./Title";
import "./Uri";
import "./user";
import "./util";
import "./visibleTimeout";

declare global {
    /**
     * Base library for MediaWiki.
     *
     * Exposed globally as `mw`, with `mediaWiki` as alias.
     *
     * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw
     */
    namespace mw {
        /**
         * Empty object for third-party libraries, for cases where you don't
         * want to add a new global, or the global is bad and needs containment
         * or wrapping.
         *
         * @property {Object}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw-property-libs
         */
        const libs: Record<string, any>;

        /**
         * OOUI widgets specific to MediaWiki
         *
         * types for mw.widgets are out of scope!
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/source/mediawiki.base.html#mw-property-libs
         */
        const widgets: any;

        /**
         * Prevent the closing of a window with a confirm message (the onbeforeunload event seems to
         * work in most browsers.)
         *
         * This supersedes any previous onbeforeunload handler. If there was a handler before, it is
         * restored when you execute the returned release() function.
         *
         *     var allowCloseWindow = mw.confirmCloseWindow();
         *     // ... do stuff that can't be interrupted ...
         *     allowCloseWindow.release();
         *
         * The second function returned is a trigger function to trigger the check and an alert
         * window manually, e.g.:
         *
         *     var allowCloseWindow = mw.confirmCloseWindow();
         *     // ... do stuff that can't be interrupted ...
         *     if ( allowCloseWindow.trigger() ) {
         *         // don't do anything (e.g. destroy the input field)
         *     } else {
         *         // do whatever you wanted to do
         *     }
         *
         * @method confirmCloseWindow
         * @member mw
         * @param {Object} [options]
         * @param {string} [options.namespace] Optional jQuery event namespace, to allow loosely coupled
         *  external code to release your trigger. For example, the VisualEditor extension can use this
         *  remove the trigger registered by mediawiki.action.edit, without strong runtime coupling.
         * @param {Function} [options.test]
         * @param {boolean} [options.test.return=true] Whether to show the dialog to the user.
         * @return {Object} An object of functions to work with this module
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw-method-confirmCloseWindow
         */
        function confirmCloseWindow(options?: {
            namespace: any;
            test: (...args: any[]) => any;
        }): {
            /**
             * Remove the event listener and don't show an alert anymore, if the user wants to leave
             * the page.
             *
             * @ignore
             */
            release(): void;
            /**
             * Trigger the module's function manually.
             *
             * Check, if options.test() returns true and show an alert to the user if he/she want
             * to leave this page. Returns false, if options.test() returns false or the user
             * cancelled the alert window (~don't leave the page), true otherwise.
             *
             * @ignore
             * @return {boolean}
             */
            trigger(): boolean;
        };

        /**
         * Format a string. Replace $1, $2 ... $N with positional arguments.
         *
         * Used by Message#parser().
         *
         * @since 1.25
         * @param {string} formatString Format string
         * @param {...any} parameters Values for $N replacements
         * @return {string} Formatted string
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw-method-format
         */
        function format(formatString: string, ...parameters: string[]): string;

        /**
         * Replace `$*` with a list of parameters for `uselang=qqx` support.
         *
         * @since 1.33
         * @private
         * @param {string} formatString Format string
         * @param {Array} parameters Values for $N replacements
         * @return {string} Transformed format string
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw-method-internalDoTransformFormatForQqx
         */
        function internalDoTransformFormatForQqx(
            formatString: string,
            parameters: string[]
        ): string;

        /**
         * Encode page titles in a way that matches `wfUrlencode` in PHP.
         *
         * @private
         * @param {string} str
         * @return {string}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw-method-internalWikiUrlencode
         */
        function internalWikiUrlencode(str: string): string;

        /**
         * Get the current time, measured in milliseconds since January 1, 1970 (UTC).
         *
         * On browsers that implement the Navigation Timing API, this function will produce
         * floating-point values with microsecond precision that are guaranteed to be monotonic.
         * On all other browsers, it will fall back to using `Date`.
         *
         * @return {number} Current time
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw-method-now
         */
        function now(): number;

        /**
         * Schedule a deferred task to run in the background.
         *
         * This allows code to perform tasks in the main thread without impacting
         * time-critical operations such as animations and response to input events.
         *
         * Basic logic is as follows:
         *
         * - User input event should be acknowledged within 100ms per [RAIL].
         * - Idle work should be grouped in blocks of upto 50ms so that enough time
         *   remains for the event handler to execute and any rendering to take place.
         * - Whenever a native event happens (e.g. user input), the deadline for any
         *   running idle callback drops to 0.
         * - As long as the deadline is non-zero, other callbacks pending may be
         *   executed in the same idle period.
         *
         * See also:
         *
         * - <https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback>
         * - <https://w3c.github.io/requestidlecallback/>
         * - <https://developers.google.com/web/updates/2015/08/using-requestidlecallback>
         * [RAIL]: https://developers.google.com/web/fundamentals/performance/rail
         *
         * @member mw
         * @param {Function} callback
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw-method-requestIdleCallback
         */
        function requestIdleCallbackInternal(
            callback: (arg: { didTimeout: boolean; timeRemaining: () => number }) => any
        ): void;
        const requestIdleCallback: typeof requestIdleCallbackInternal;

        /**
         * Track an analytic event.
         *
         * This method provides a generic means for MediaWiki JavaScript code to capture state
         * information for analysis. Each logged event specifies a string topic name that describes
         * the kind of event that it is. Topic names consist of dot-separated path components,
         * arranged from most general to most specific. Each path component should have a clear and
         * well-defined purpose.
         *
         * Data handlers are registered via `mw.trackSubscribe`, and receive the full set of
         * events that match their subscription, including those that fired before the handler was
         * bound.
         *
         * @param {string} topic Topic name
         * @param {Object|number|string} [data] Data describing the event.
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw-method-track
         */
        function track(topic: string, data?: Record<string, any> | number | string): void;

        /**
         * Track an early error event via mw.track and send it to the window console.
         *
         * @private
         * @param {string} topic Topic name
         * @param {Object} data Data describing the event, encoded as an object; see mw#logError
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw-method-trackError
         */
        function trackError(topic: string, data: object): void;

        /**
         * Register a handler for subset of analytic events, specified by topic.
         *
         * Handlers will be called once for each tracked event, including for any buffered events that
         * fired before the handler was subscribed. The callback is passed a `topic` string, and optional
         * `data` event object. The `this` value for the callback is a plain object with `topic` and
         * `data` properties set to those same values.
         *
         * Example to monitor all topics for debugging:
         *
         *     mw.trackSubscribe( '', console.log );
         *
         * Example to subscribe to any of `foo.*`, e.g. both `foo.bar` and `foo.quux`:
         *
         *     mw.trackSubscribe( 'foo.', console.log );
         *
         * @param {string} topic Handle events whose name starts with this string prefix
         * @param {Function} callback Handler to call for each matching tracked event
         * @param {string} callback.topic
         * @param {Object} [callback.data]
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw-method-trackSubscribe
         */
        function trackSubscribe(
            topic: string,
            callback: (topic: string, data: object) => any
        ): void;

        /**
         * Stop handling events for a particular handler
         *
         * @param {Function} callback
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw-method-trackUnsubscribe
         */
        function trackUnsubscribe(callback: (topic: string, data: object) => any): void;

        /**
         * List of all analytic events emitted so far.
         *
         * Exposed only for use by mediawiki.base.
         *
         * @private
         * @property {Array}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw-property-trackQueue
         */
        const trackQueue: Array<{ topic: string; data?: Record<string, any> | number | string }>;
    }
}

export {};
