import "./Api";
import "./cldr";
import "./config";
import "./confirmCloseWindow";
import "./cookie";
import "./debug";
import "./deflate";
import "./errorLogger";
import "./ForeignApi";
import "./ForeignRest";
import "./ForeignUpload";
import "./global";
import "./hook";
import "./html";
import "./inspect";
import "./language";
import "./loader";
import "./log";
import "./Map";
import "./message";
import "./notification";
import "./pluralRuleParser";
import "./RegExp";
import "./Rest";
import "./searchSuggest";
import "./storage";
import "./template";
import "./tempUserCreated";
import "./Title";
import "./Upload";
import "./Uri";
import "./user";
import "./util";
import "./utils";

declare global {
    /**
     * Base library for MediaWiki.
     *
     * Exposed globally as `mw`, with `mediaWiki` as alias. `mw` code can be considered stable and follows the
     * {@link https://www.mediawiki.org/wiki/Special:MyLanguage/Stable_interface_policy/Frontend frontend stable interface policy}.
     *
     * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html
     */
    const mediaWiki: typeof mw;

    /**
     * Base library for MediaWiki.
     *
     * Exposed globally as `mw`, with `mediaWiki` as alias. `mw` code can be considered stable and follows the
     * {@link https://www.mediawiki.org/wiki/Special:MyLanguage/Stable_interface_policy/Frontend frontend stable interface policy}.
     *
     * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html
     */
    namespace mw {
        /**
         * Empty object for third-party libraries, for cases where you don't
         * want to add a new global, or the global is bad and needs containment
         * or wrapping.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.libs
         */
        namespace libs {}

        /**
         * Store for templates associated with a module.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.templates
         */
        const templates: Map<Record<string, any>>;

        /**
         * OOUI widgets specific to MediaWiki.
         * Initially empty. To expand the amount of available widgets the `mediawiki.widget` module can be loaded.
         *
         * types for mw.widgets are out of scope!
         *
         * @example
         * ```js
         * mw.loader.using('mediawiki.widget').then(() => {
         *     OO.ui.getWindowManager().addWindows( [ new mw.widget.AbandonEditDialog() ] );
         * });
         * ```
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.widgets.html
         */
        namespace widgets {}

        /**
         * Format a string. Replace $1, $2 ... $N with positional arguments.
         *
         * Used by {@link mw.Message.parse}.
         *
         * @since 1.25
         * @param {string} formatString Format string
         * @param {...string} parameters Values for $N replacements
         * @returns {string} Formatted string
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.format
         */
        function format(formatString: string, ...parameters: string[]): string;

        /**
         * Get the current time, measured in milliseconds since January 1, 1970 (UTC).
         *
         * On browsers that implement the Navigation Timing API, this function will produce
         * floating-point values with microsecond precision that are guaranteed to be monotonic.
         * On all other browsers, it will fall back to using `Date`.
         *
         * @returns {number} Current time
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.now
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
         * - User input event should be acknowledged within 100ms per {@link https://developers.google.com/web/fundamentals/performance/rail RAIL}.
         * - Idle work should be grouped in blocks of upto 50ms so that enough time
         *   remains for the event handler to execute and any rendering to take place.
         * - Whenever a native event happens (e.g. user input), the deadline for any
         *   running idle callback drops to 0.
         * - As long as the deadline is non-zero, other callbacks pending may be
         *   executed in the same idle period.
         *
         * See also:
         *
         * - {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback}
         * - {@link https://w3c.github.io/requestidlecallback/}
         * - {@link https://developers.google.com/web/updates/2015/08/using-requestidlecallback}
         *
         * @param {Function} callback
         * @param {IdleCallbackOptions} [options]
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.requestIdleCallback
         */
        function requestIdleCallback(
            callback: (...args: any[]) => any,
            options?: IdleCallbackOptions
        ): void;

        /**
         * Track an analytic event.
         *
         * This method provides a generic means for MediaWiki JavaScript code to capture state
         * information for analysis. Each logged event specifies a string topic name that describes
         * the kind of event that it is. Topic names consist of dot-separated path components,
         * arranged from most general to most specific. Each path component should have a clear and
         * well-defined purpose.
         *
         * Data handlers are registered via {@link mw.trackSubscribe}, and receive the full set of
         * events that match their subscription, including buffered events that fired before the handler
         * was subscribed.
         *
         * @param {string} topic Topic name
         * @param {AnalyticEvent.Data} [data] Data describing the event.
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.track
         */
        function track(topic: string, data?: AnalyticEvent.Data): void;

        /**
         * Track `'resourceloader.exception'` event and send it to the window console.
         *
         * This exists for internal use by mw.loader only, to remember and buffer
         * very early events for `mw.trackSubscribe( 'resourceloader.exception' )`
         * even while `mediawiki.base` and `mw.track` are still in-flight.
         *
         * @private
         * @param {AnalyticEvent.ErrorData} data Data describing the event, encoded as an object; see {@link errorLogger.logError}
         */
        function trackError(topic: string, data: AnalyticEvent.ErrorData): void;

        /**
         * Register a handler for subset of analytic events, specified by topic.
         *
         * Handlers will be called once for each tracked event, including for any buffered events that
         * fired before the handler was subscribed. The callback is passed a `topic` string, and optional
         * `data` event object. The `this` value for the callback is a plain object with `topic` and
         * `data` properties set to those same values.
         *
         * @example
         * ```js
         * // To monitor all topics for debugging
         * mw.trackSubscribe( '', console.log );
         * ```
         * @example
         * ```js
         * // To subscribe to any of `foo.*`, e.g. both `foo.bar` and `foo.quux`
         * mw.trackSubscribe( 'foo.', console.log );
         * ```
         * @param {string} topic Handle events whose name starts with this string prefix
         * @param {AnalyticEvent.Callback} callback Handler to call for each matching tracked event
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.trackSubscribe
         */
        function trackSubscribe(topic: string, callback: AnalyticEvent.Callback): void;

        /**
         * Stop handling events for a particular handler.
         *
         * @param {AnalyticEvent.Callback} callback
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.trackUnsubscribe
         */
        function trackUnsubscribe(callback: AnalyticEvent.Callback): void;

        /**
         * List of all analytic events emitted so far.
         *
         * Exposed only for use by `mediawiki.base`.
         *
         * @private
         */
        const trackQueue: AnalyticEvent[];

        interface IdleCallbackOptions {
            /**
             * If set, the callback will be scheduled for
             * immediate execution after this amount of time (in milliseconds) if it didn't run
             * by that time.
             */
            timeout?: number;
        }

        interface AnalyticEvent {
            data: AnalyticEvent.Data;
            topic: string;
        }

        namespace AnalyticEvent {
            type ObjectData = Record<string, any>;
            type Data = ObjectData | number | string | undefined;

            interface ErrorData extends ObjectData {
                exception?: any;
                /**
                 * Name of module which caused the error.
                 */
                module?: string;
                /**
                 * Error source.
                 */
                source: string;
            }

            interface Callback {
                (topic: string, data: Data): void;
            }
        }
    }
}

export {};
