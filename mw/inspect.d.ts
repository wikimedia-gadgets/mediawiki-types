declare global {
    namespace mw {
        /**
         * Generates a ResourceLoader report using the {@link mw.inspect mediawiki.inspect module}.
         *
         * When invoked without arguments, prints all available reports.
         *
         * @param {...string} [reports]
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.inspect
         */
        function inspect(...reports: inspect.ResourceLoaderReport[]): void;

        /**
         * Tools for inspecting page composition and performance.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mediawiki.inspect.html
         */
        namespace inspect {
            /**
             * @private
             */
            const reports: { [P in ResourceLoaderReport]: () => Array<ResourceLoaderReportMap[P]> };

            /**
             * Given CSS source, count both the total number of selectors it
             * contains and the number which match some element in the current
             * document.
             *
             * @param {string} css CSS source
             * @returns {SelectorCounts} Selector counts
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mediawiki.inspect.html#.auditSelectors
             */
            function auditSelectors(css: string): SelectorCounts;

            /**
             * Print tabular data to the console using console.table.
             *
             * @param {any[]} data Tabular data represented as an array of objects
             *  with common properties.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mediawiki.inspect.html#.dumpTable
             */
            function dumpTable(data: any[]): void;

            /**
             * Return a map of all dependency relationships between loaded modules.
             *
             * @returns {Object.<string, Dependency>} Maps module names to objects. Each sub-object has
             *  two properties, 'requires' and 'requiredBy'.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mediawiki.inspect.html#.getDependencyGraph
             */
            function getDependencyGraph(): Record<string, Dependency>;

            /**
             * Get a list of all loaded ResourceLoader modules.
             *
             * @returns {string[]} List of module names
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mediawiki.inspect.html#.getLoadedModules
             */
            function getLoadedModules(): string[];

            /**
             * Calculate the byte size of a ResourceLoader module.
             *
             * @param {string} moduleName The name of the module
             * @returns {number|null} Module size in bytes or null
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mediawiki.inspect.html#.getModuleSize
             */
            function getModuleSize(moduleName: string): number | null;

            /**
             * Perform a string search across the JavaScript and CSS source code
             * of all loaded modules and return an array of the names of the
             * modules that matched.
             *
             * @param {string|RegExp} pattern String or regexp to match.
             * @returns {string[]} Array of the names of modules that matched.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mediawiki.inspect.html#.grep
             */
            function grep(pattern: string | RegExp): string[];

            /**
             * Generate and print reports.
             *
             * When invoked without arguments, prints all available reports.
             *
             * @param {...ResourceLoaderReport} [reports] One or more of "size", "css", "store", or "time".
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mediawiki.inspect.html#.runReports
             */
            function runReports(...reports: ResourceLoaderReport[]): void;

            interface SelectorCounts {
                /**
                 * Number of matched selectors.
                 */
                matched: number;
                /**
                 * Total number of selectors.
                 */
                total: number;
            }

            interface ResourceLoaderReportMap {
                /**
                 * For each module with styles, count the number of selectors, and
                 * count how many match against some element currently in the DOM.
                 */
                css: ResourceLoaderReport.CSS;

                /**
                 * Generate a breakdown of all loaded modules and their size in
                 * kibibytes. Modules are ordered from largest to smallest.
                 */
                size: ResourceLoaderReport.Size;

                /**
                 * Report stats on mw.loader.store: the number of localStorage
                 * cache hits and misses, the number of items purged from the
                 * cache, and the total size of the module blob in localStorage.
                 */
                store: ResourceLoaderReport.Store;

                /**
                 * Generate a breakdown of all loaded modules and their time
                 * spent during initialisation (measured in milliseconds).
                 *
                 * This timing data is collected by mw.loader.profiler.
                 */
                time: ResourceLoaderReport.Time;
            }

            type ResourceLoaderReport = keyof ResourceLoaderReportMap;

            namespace ResourceLoaderReport {
                interface CSS {
                    allSelectors: number;
                    matchedSelectors: number;
                    module: string;
                    percentMatched: `${number}%` | null;
                }

                interface Size {
                    name: string;
                    size: string;
                    sizeInBytes: number;
                }

                interface Store extends loader.store.Stats {
                    enabled: boolean;
                    totalSize: string;
                    totalSizeInBytes: number;
                }

                interface Time {
                    execute: number;
                    name: string;
                    script: number;
                    total: string;
                    totalInMs: number;
                }
            }

            interface Dependency {
                requires: string[];
                requiredBy: string[];
            }
        }
    }
}

export {};
