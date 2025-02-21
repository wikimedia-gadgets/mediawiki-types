declare global {
    namespace mw {
        /**
         * Convenience method for loading and accessing the {@link mw.notification.notify mw.notification module}.
         *
         * @param {HTMLElement|HTMLElement[]|JQuery|Message|string} message
         * @param {notification.Options} [options] The options to use for the notification.
         *  See {@link notification.defaults the defaults}.
         * @returns {JQuery.Promise<notification.Notification>} Notification object
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.notify
         */
        function notify(
            message: string | Message | JQuery | HTMLElement | HTMLElement[],
            options?: notification.Options
        ): JQuery.Promise<notification.Notification>;

        /**
         * Library for sending notifications to end users.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.notification.html
         */
        namespace notification {
            /**
             * Maximum number of simultaneous notifications to start auto-hide timers for.
             * Only this number of notifications being displayed will be auto-hidden at one time.
             * Any additional notifications in the list will only start counting their timeout for
             * auto-hiding after the previous messages have been closed.
             *
             * This basically represents the minimal number of notifications the user should
             * be able to process during the {@link notification.defaults default} {@link autoHideSeconds} time.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.notification.html#.autoHideLimit
             */
            const autoHideLimit: number;

            /**
             * Map of predefined auto-hide timeout keys to second values. `short` is
             * used by default, and other values can be added for use in {@link notify}.
             */
            const autoHideSeconds: {
                /**
                 * 5 seconds (default).
                 */
                long: number;
                /**
                 * 30 seconds.
                 */
                short: number;
            };

            /**
             * The defaults for {@link notify} options parameter.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.notification.html#.defaults
             */
            const defaults: Required<Options>;

            /**
             * Display a notification message to the user.
             *
             * @param {HTMLElement|HTMLElement[]|JQuery|Message|string} message
             * @param {Options} [options] The options to use for the notification.
             *  Options not specified default to the values in {@link defaults}.
             * @returns {Notification} Notification object
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.notification.html#.notify
             */
            function notify(
                message: string | Message | JQuery | HTMLElement | HTMLElement[],
                options?: Options
            ): Notification;

            /**
             * Pause auto-hide timers for all notifications.
             * Notifications will not auto-hide until resume is called.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.notification.html#.pause
             */
            function pause(): void;

            /**
             * Resume any paused auto-hide timers from the beginning.
             * Only the first {@link autoHideLimit} timers will be resumed.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.notification.html#.resume
             */
            function resume(): void;

            /**
             * Describes a notification. See {@link mw.notification mw.notification module}. A Notification object for 1 message.
             *
             * The constructor is not publicly accessible; use {@link mw.notification.notify} instead.
             * This does not insert anything into the document. To add to document use
             * {@link mw.notification.notify}.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/Notification.html
             */
            interface Notification {
                $notification: JQuery;
                autoHideSeconds: number;
                isOpen: boolean;
                isPaused: boolean;
                options: Options;
                timeout: {
                    clear: typeof clearTimeout;
                    set: typeof setTimeout;
                };

                /**
                 * Close the notification.
                 *
                 * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.Notification_-method-close
                 */
                close(): void;

                /**
                 * Pause any running auto-hide timer for this notification
                 *
                 * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.Notification_-method-pause
                 */
                pause(): void;

                /**
                 * Start autoHide timer if not already started.
                 * Does nothing if autoHide is disabled.
                 * Either to resume from pause or to make the first start.
                 *
                 * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.Notification_-method-resume
                 */
                resume(): void;

                /**
                 * Start the notification. Called automatically by {@link mw.notification.notify}
                 * (possibly asynchronously on document-ready).
                 *
                 * This inserts the notification into the page, closes any matching tagged notifications,
                 * handles the fadeIn animations and replacement transitions, and starts autoHide timers.
                 *
                 * @private
                 * @see https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.Notification_-method-start
                 */
                start(): void;
            }

            /**
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.notification.html#.NotificationOptions
             */
            interface Options {
                /**
                 * Whether the notification should automatically
                 * be hidden after shown. Or if it should persist.
                 */
                autoHide?: boolean;

                /**
                 * Key to {@link mw.notification.autoHideSeconds} for number of seconds for timeout of auto-hide
                 * notifications.
                 */
                autoHideSeconds?: "long" | "short";

                /**
                 * CSS class names to be set on the notification element.
                 *
                 * @since 1.38
                 */
                classes?: string | string[] | false;

                /**
                 * HTML ID to set on the notification element.
                 */
                id?: string | false;

                /**
                 * An optional string. When a notification is tagged only one message
                 * with that tag will be displayed. Trying to display a new notification
                 * with the same tag as one already being displayed will cause the other
                 * notification to be closed and this new notification to open up inside
                 * the same place as the previous notification.
                 */
                tag?: string | null;

                /**
                 * An optional title for the notification. Will be displayed above the
                 * content. Usually in bold.
                 */
                title?: string | null;

                /**
                 * An optional string for the type of the message used for styling.
                 * Examples: `info`, `warn`, `error`, `success`.
                 */
                type?: "error" | "info" | "success" | "warn" | null;

                /**
                 * A boolean indicating if the autoHide timeout should be based on
                 * time the page was visible to user. Or if it should use wall clock time.
                 */
                visibleTimeout?: boolean;
            }
        }
    }
}

export {};
