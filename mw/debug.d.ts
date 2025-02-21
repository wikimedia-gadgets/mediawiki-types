declare global {
    namespace mw {
        /**
         * Access the debug toolbar. Enabled server-side through `$wgDebugToolbar`.
         *
         * @since 1.19
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Debug.html
         */
        namespace Debug {
            type LogEntryType = "deprecated" | "log" | "warn";

            /**
             * Toolbar container element.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Debug.html#.$container
             */
            const $container: JQuery;

            /**
             * Object containing data for the debug toolbar.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Debug.html#.data
             */
            const data: Data;

            /**
             * Build the console panel.
             *
             * @returns {JQuery} Console panel
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Debug.html#.buildConsoleTable
             */
            function buildConsoleTable(): JQuery;

            /**
             * Build legacy debug log pane.
             *
             * @returns {JQuery}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Debug.html#.buildDebugLogTable
             */
            function buildDebugLogTable(): JQuery;

            /**
             * Construct the HTML for the debugging toolbar.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Debug.html#.buildHtml
             */
            function buildHtml(): void;

            /**
             * Build included files pane.
             *
             * @returns {JQuery}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Debug.html#.buildIncludesPane
             */
            function buildIncludesPane(): JQuery;

            /**
             * Build query list pane.
             *
             * @returns {JQuery}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Debug.html#.buildQueryTable
             */
            function buildQueryTable(): JQuery;

            /**
             * Build request information pane.
             *
             * @returns {JQuery}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Debug.html#.buildRequestPane
             */
            function buildRequestPane(): JQuery;

            /**
             * Initialize the debugging pane.
             *
             * Shouldn't be called before the document is ready
             * (since it binds to elements on the page).
             *
             * @param {Data} [data] Defaults to 'debugInfo' from {@link mw.config}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Debug.html#.init
             */
            function init(data?: Data): void;

            /**
             * Switch between panes.
             *
             * Should be called with an HTMLElement as its thisArg,
             * because it's meant to be an event handler.
             *
             * @param {JQuery.Event} e
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Debug.html#.switchPane
             */
            function switchPane(e: JQuery.Event): void;

            interface Data {
                debugLog: string[];
                gitBranch: string | false;
                gitRevision: string | false;
                gitViewUrl: string | false;
                includes: File[];
                log: LogEntry[];
                memory: string;
                memoryPeak: string;
                mwVersion: string;
                phpVersion: string;
                queries: Query[];
                time: number;
            }

            interface File {
                name: string;
                size: string;
            }

            interface LogEntry {
                caller: string;
                msg: string;
                type: LogEntryType;
                typeText?: string;
            }

            interface Query {
                function: string;
                sql: string;
                time: number;
            }
        }
    }
}

export {};
