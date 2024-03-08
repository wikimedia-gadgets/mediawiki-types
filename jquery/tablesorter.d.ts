declare global {
    interface JQueryStatic {
        tablesorter: TableSorter;
    }

    interface JQuery {
        /**
         * Create a sortable table with multi-column sorting capabilities
         *
         * ```js
         * // Create a simple tablesorter interface
         * $( 'table' ).tablesorter();
         *
         * // Create a tablesorter interface, initially sorting on the first and second column
         * $( 'table' ).tablesorter( { sortList: [ { 0: 'desc' }, { 1: 'asc' } ] } );
         * ```
         */
        tablesorter(this: JQuery<HTMLTableElement>, settings?: Partial<Options>): this;
    }
}

export interface ParserTypeMap {
    numeric: number;
    text: string;
}

export interface ParserMap {
    currency: "numeric";
    date: "numeric";
    IPAddress: "numeric";
    number: "numeric";
    text: "text";
    time: "numeric";
    usLongDate: "numeric";
}

type MultiSortKey = "altKey" | "ctrlKey" | "metaKey" | "shiftKey";

type ParserFromType<K extends keyof ParserTypeMap> = ParserBase<ParserTypeMap[K], K>;
type ParserFromKey<K extends keyof ParserMap> = ParserFromType<ParserMap[K]>;

type Parser = { [P in keyof ParserTypeMap]: ParserFromType<P> }[keyof ParserTypeMap];

interface ParserBase<T, K extends string = string> {
    id: string;
    type: K;

    format(s: string): T;

    is(s: string, table: HTMLTableElement): boolean;
}

interface TableSorter {
    dateRegex: [];
    defaultOptions: Options;
    monthNames: {};

    addParser(parser: Parser): void;

    clearTableBody(table: HTMLTableElement): void;

    construct<T extends JQuery<HTMLTableElement>>($tables: T, settings?: Partial<Options>): T;

    formatDigit(s: string): number;

    formatFloat(s: string): number;

    formatInt(s: string): number;

    getParser<K extends keyof ParserMap>(id: K): ParserFromKey<K>;
    getParser(id: string): Parser;

    getParsers(): Parser[];
}

interface Options {
    /**
     * Boolean flag indicating iftablesorter should cancel
     * selection of the table headers text.
     * Defaults to true.
     */
    cancelSelection: boolean;

    columns: number;

    columnToHeader: number[];
    /**
     * A string of the class name to be appended to
     * sortable tr elements in the thead on a ascending sort.
     * Defaults to 'headerSortUp'.
     */
    cssAsc: string;

    cssChildRow: string;

    /**
     * A string of the class name to be appended to
     * sortable tr elements in the thead on a descending sort.
     * Defaults to 'headerSortDown'.
     */
    cssDesc: string;

    /**
     * A string of the class name to be appended to sortable
     * tr elements in the thead of the table.
     * Defaults to 'headerSort'.
     */
    cssHeader: string;

    cssInitial: string;

    headerList: HTMLTableCellElement[];

    headerToColumns: number[][];

    parsers: Parser[];

    /**
     * An array containing objects specifying sorting. By passing more
     * than one object, multi-sorting will be applied. Object structure:
     * ```
     * { <Integer column index>: <String 'asc' or 'desc'> }
     * ```
     */
    sortList: Array<[number, number]>;

    /**
     * A string of the multi-column sort key.
     * Defaults to 'shiftKey'.
     */
    sortMultiSortKey: MultiSortKey;

    unsortableClass: string;
}

export {};
