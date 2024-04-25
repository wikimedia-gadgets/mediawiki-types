declare global {
    interface JQueryStatic {
        /**
         * CollapsibleTabsPlugin used in MediaWiki vector skin
         * Copied from {@link https://gerrit.wikimedia.org/r/plugins/gitiles/mediawiki/skins/Vector/+/master/resources/CollapsibleTabsPlugin.d.ts}
         */
        collapsibleTabs: CollapsibleTabsStatic;
    }

    interface JQuery {
        /**
         * CollapsibleTabsPlugin used in MediaWiki vector skin
         * Copied from {@link https://gerrit.wikimedia.org/r/plugins/gitiles/mediawiki/skins/Vector/+/master/resources/CollapsibleTabsPlugin.d.ts}
         */
        collapsibleTabs(options: Partial<CollapsibleTabsOptions>): void;
    }
}

/**
 * A jQuery plugin that makes collapsible tabs for the Vector skin.
 *
 * @see https://doc.wikimedia.org/mediawiki-skins-Vector/master/js/js/CollapsibleTabsOptions.html
 */
interface CollapsibleTabsOptions {
    /**
     * Optional tab selector. Defaults to `#p-views ul`.
     */
    expandedContainer: string;
    /**
     * Optional menu item selector. Defaults to `#p-cactions ul`.
     */
    collapsedContainer: string;
    /**
     * Optional selector for tabs that are collapsible. Defaults to `li.collapsible`.
     */
    collapsible: string;
    shifting: boolean;
    expandedWidth: number;

    expandCondition(eleWidth: number): boolean;

    collapseCondition(): boolean;
}

interface CollapsibleTabsStatic {
    defaults: CollapsibleTabsOptions;
    instances: JQuery[];

    addData($collapsible: JQuery): void;

    getSettings($collapsible: JQuery): CollapsibleTabsOptions;

    handleResize(): void;

    moveToCollapsed($moving: JQuery): void;

    moveToExpanded($moving: JQuery): void;

    calculateTabDistance(): number;
}

interface CollapsibleTabs extends CollapsibleTabsStatic, CollapsibleTabsOptions {}

export {};
