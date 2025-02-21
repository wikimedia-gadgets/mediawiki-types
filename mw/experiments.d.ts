declare global {
    namespace mw {
        /**
         * Provides an API for bucketing users in experiments.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.experiments.html
         */
        namespace experiments {
            /**
             * Gets the bucket for the experiment given the token.
             *
             * The name of the experiment and the token are hashed. The hash is converted
             * to a number which is then used to get a bucket.
             *
             * @example
             * ```js
             * // The experiment has three buckets: control, A, and B. The user has a 50% chance of
             * // being assigned to the control bucket, and a 25% chance of being assigned to either
             * // the A or B bucket. If the experiment were disabled, then the user would always be
             * // assigned to the control bucket.
             * {
             *     name: 'My first experiment',
             *     enabled: true,
             *     buckets: {
             *         control: 0.5
             *         A: 0.25,
             *         B: 0.25
             *     }
             * }
             * ```
             * @param {Experiment} experiment
             * @param {string} token A token that uniquely identifies the user for the
             *  duration of the experiment
             * @returns {string|undefined} The bucket
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.experiments.html#.getBucket
             */
            function getBucket(experiment: Experiment, token: string): string | undefined;

            interface Experiment {
                /**
                 * A map of bucket name to probability that the user will be assigned to that bucket
                 */
                buckets: Record<string, number>;
                /**
                 * Whether the experiment is enabled. If the experiment is disabled, then the user is always assigned to the control bucket
                 */
                enabled: boolean;
                /**
                 * The name of the experiment
                 */
                name: string;
            }
        }
    }
}

export {};
