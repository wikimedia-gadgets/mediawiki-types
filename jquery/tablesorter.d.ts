declare global {
    interface JQueryStatic {
        tablesorter: JQuery.TableSorter;
    }

    interface JQuery {
        /**
         * Create a sortable table with multi-column sorting capabilities.
         *
         * To use this {@link jQuery} plugin, load the `jquery.tablesorter` module with {@link mw.loader}.
         *
         * ```js
         * // Create a simple tablesorter interface
         * $( 'table' ).tablesorter();
         *
         * // Create a tablesorter interface, initially sorting on the first and second column
         * $( 'table' ).tablesorter( { sortList: [ { 0: 'desc' }, { 1: 'asc' } ] } );
         * ```
         *
         * @param {TableSorterOptions} settings
         * @returns {JQuery}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#.tablesorter
         */
        tablesorter(this: JQuery<HTMLTableElement>, settings?: JQuery.TableSorter.Options): this;
    }

    namespace JQuery {
        interface TableSorter {
            dateRegex: [];
            defaultOptions: Required<TableSorter.Options>;
            monthNames: {};

            addParser<T = unknown>(parser: TableSorter.Parser<T>): void;

            clearTableBody(table: HTMLTableElement): void;

            construct<T extends JQuery<HTMLTableElement>>(
                $tables: T,
                settings?: TableSorter.Options
            ): T;

            formatDigit(s: string): number;

            formatFloat(s: string): number;

            formatInt(s: string): number;

            getParser<K extends keyof TableSorter.ParserMap>(id: K): TableSorter.ParserFromKey<K>;
            getParser<T = unknown>(id: string): TableSorter.Parser<T>;

            getParsers(): TableSorter.Parser[];
        }

        namespace TableSorter {
            interface ParserTypeMap {
                numeric: number;
                text: string;
            }

            interface ParserMap {
                currency: "numeric";
                date: "numeric";
                IPAddress: "numeric";
                /**
                 * @deprecated Removed since 1.40.
                 */
                isoDate: "numeric";
                number: "numeric";
                text: "text";
                time: "numeric";
                /**
                 * @deprecated Removed since 1.40.
                 */
                url: "text";
                usLongDate: "numeric";
            }

            type MultiSortKey = "altKey" | "ctrlKey" | "metaKey" | "shiftKey";

            type ParserFromType<K extends keyof ParserTypeMap> = Parser<ParserTypeMap[K], K>;
            type ParserFromKey<K extends keyof ParserMap> = ParserMap[K] extends keyof ParserTypeMap
                ? ParserFromType<ParserMap[K]>
                : Parser;

            interface Parser<T = unknown, K extends string = string> {
                id: string;
                type: K;

                format(s: string): T;

                is(s: string, table: HTMLTableElement): boolean;
            }

            /**
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#~TableSorterOptions
             */
            interface Options {
                /**
                 * Boolean flag indicating iftablesorter should cancel
                 * selection of the table headers text.
                 * Defaults to true.
                 */
                cancelSelection?: boolean;

                columns?: number;

                columnToHeader?: number[];
                /**
                 * A string of the class name to be appended to
                 * sortable tr elements in the thead on a ascending sort.
                 * Defaults to 'headerSortUp'.
                 */
                cssAsc?: string;

                cssChildRow?: string;

                /**
                 * A string of the class name to be appended to
                 * sortable tr elements in the thead on a descending sort.
                 * Defaults to 'headerSortDown'.
                 */
                cssDesc?: string;

                /**
                 * A string of the class name to be appended to sortable
                 * tr elements in the thead of the table.
                 * Defaults to 'headerSort'.
                 */
                cssHeader?: string;

                cssInitial?: string;

                headerList?: HTMLTableCellElement[];

                headerToColumns?: number[][];

                parsers?: Parser[];

                /**
                 * An array containing objects specifying sorting. By passing more
                 * than one object, multi-sorting will be applied. Object structure:
                 *
                 * ```
                 * { <Integer column index>: <String 'asc' or 'desc'> }
                 * ```
                 */
                sortList?: Array<[number, number]>;

                /**
                 * A string of the multi-column sort key.
                 * Defaults to 'shiftKey'.
                 */
                sortMultiSortKey?: MultiSortKey;

                unsortableClass?: string;
            }
        }
    }
}

/** @deprecated Use {@link JQuery.TableSorter.ParserTypeMap} instead */
export type ParserTypeMap = JQuery.TableSorter.ParserTypeMap;
/** @deprecated Use {@link JQuery.TableSorter.ParserMap} instead */
export type ParserMap = JQuery.TableSorter.ParserMap;

export {};
