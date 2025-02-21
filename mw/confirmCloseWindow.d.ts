declare global {
    namespace mw {
        /**
         * Prevent the closing of a window with a confirm message (the onbeforeunload event seems to
         * work in most browsers).
         *
         * Provided by the `mediawiki.confirmCloseWindow` module.
         *
         * This supersedes any previous onbeforeunload handler. If there was a handler before, it is
         * restored when you execute the returned release() function.
         *
         * @example
         * ```js
         * mw.loader.using( 'mediawiki.confirmCloseWindow' ).then(() => {
         *     var allowCloseWindow = mw.confirmCloseWindow();
         *     // ... do stuff that can't be interrupted ...
         *     allowCloseWindow.release();
         *
         *     // The second function returned is a trigger function to trigger the check and an alert
         *     // window manually, e.g.:
         *
         *     var allowCloseWindow = mw.confirmCloseWindow();
         *     // ... do stuff that can't be interrupted ...
         *     if ( allowCloseWindow.trigger() ) {
         *         // don't do anything (e.g. destroy the input field)
         *     } else {
         *         // do whatever you wanted to do
         *     }
         * })
         * ```
         * @param {ConfirmCloseWindow.Options} [options]
         * @returns {ConfirmCloseWindow} An object of functions to work with this module
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.confirmCloseWindow
         */
        function confirmCloseWindow(options?: ConfirmCloseWindow.Options): ConfirmCloseWindow;

        interface ConfirmCloseWindow {
            /**
             * Remove the event listener and don't show an alert anymore, if the user wants to leave
             * the page.
             */
            release(): void;

            /**
             * Trigger the module's function manually.
             *
             * Check, if options.test() returns true and show an alert to the user if he/she want
             * to leave this page. Returns false, if options.test() returns false or the user
             * cancelled the alert window (~don't leave the page), true otherwise.
             *
             * @returns {boolean}
             */
            trigger(): boolean;
        }

        namespace ConfirmCloseWindow {
            interface Options {
                /**
                 * Optional jQuery event namespace, to allow loosely coupled
                 * external code to release your trigger. For example, the VisualEditor extension can use this
                 * remove the trigger registered by mediawiki.action.edit, without strong runtime coupling.
                 */
                namespace?: string;

                /**
                 * @returns {boolean} Whether to show the dialog to the user.
                 */
                test?(): boolean;
            }
        }
    }
}

export {};
