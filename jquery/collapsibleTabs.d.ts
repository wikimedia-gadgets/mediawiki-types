declare global {
    interface JQueryStatic {
        /**
         * CollapsibleTabsPlugin used in MediaWiki vector skin
         * Copied from {@link https://gerrit.wikimedia.org/r/plugins/gitiles/mediawiki/skins/Vector/+/master/resources/CollapsibleTabsPlugin.d.ts}
         */
        collapsibleTabs: JQuery.CollapsibleTabs.Static;
    }

    interface JQuery {
        /**
         * CollapsibleTabsPlugin used in MediaWiki vector skin
         * Copied from {@link https://gerrit.wikimedia.org/r/plugins/gitiles/mediawiki/skins/Vector/+/master/resources/CollapsibleTabsPlugin.d.ts}
         */
        collapsibleTabs(options: Partial<JQuery.CollapsibleTabs.Options>): void;
    }

    namespace JQuery {
        interface CollapsibleTabs extends CollapsibleTabs.Static, CollapsibleTabs.Options {}

        namespace CollapsibleTabs {
            interface CollapsibleTabs extends CollapsibleTabs.Static, CollapsibleTabs.Options {}

            /**
             * A jQuery plugin that makes collapsible tabs for the Vector skin.
             *
             * @see https://doc.wikimedia.org/mediawiki-skins-Vector/master/js/js/CollapsibleTabsOptions.html
             */
            interface Options {
                /**
                 * Optional menu item selector. Defaults to `#p-cactions ul`.
                 */
                collapsedContainer: string;
                /**
                 * Optional selector for tabs that are collapsible. Defaults to `li.collapsible`.
                 */
                collapsible: string;
                /**
                 * Optional tab selector. Defaults to `#p-views ul`.
                 */
                expandedContainer: string;
                expandedWidth: number;
                shifting: boolean;

                collapseCondition(): boolean;

                expandCondition(eleWidth: number): boolean;
            }

            interface Static {
                defaults: Options;
                instances: JQuery[];

                addData($collapsible: JQuery): void;

                calculateTabDistance(): number;

                getSettings($collapsible: JQuery): Options;

                handleResize(): void;

                moveToCollapsed($moving: JQuery): void;

                moveToExpanded($moving: JQuery): void;
            }
        }
    }
}

export {};
