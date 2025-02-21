declare global {
    namespace mw {
        /**
         * Map of configuration values.
         *
         * Check out {@link https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#mw.config the complete list of configuration values}
         * on mediawiki.org.
         *
         * If `$wgLegacyJavaScriptGlobals` is true, this Map will add its values to the
         * global `window` object.
         *
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.html#.config
         */
        const config: Map.Extensible<{
            /**
             * Since MediaWiki 1.36+, 0 means debug mode is off, and a positive non-zero number means debug mode is on (e.g. 1 or 2).
             *
             * In MediaWiki 1.35 and earlier, false and true were used (phab:T85805).
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#debug
             */
            debug: boolean | number;
            /**
             * The internal name of the currently used skin.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#skin
             */
            skin: string;
            /**
             * Full URL to the root directory for skins, containing stylesheets and skin-specific scripts. The path does not contain the skin subdirectory, and is not terminated by a "/".
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#stylepath
             */
            stylepath: string;
            wgActionPaths: Record<string, string>;
            /**
             * Local path, starting at the root, to reference articles, containing a "$1" placeholder that may be replaced by a page title to get a valid URL to that page. Given a valid page title title, a valid URL may be constructed using wgArticlePath.replace('$1', title). See also $wgArticlePath.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgArticlePath
             */
            wgArticlePath: string;
            /**
             * The IDs of the namespaces treated as case-sensitive by MediaWiki. Determined by the values of them $wgCapitalLinks and $wgCapitalLinksOverrides configuration variables.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgCaseSensitiveNamespaces
             */
            wgCaseSensitiveNamespaces: number[];
            wgCommentCodePointLimit: number;
            /**
             * The language code for the default content language of the wiki.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgContentLanguage
             */
            wgContentLanguage: string;
            /**
             * The IDs of the namespaces considered "content namespaces" by MediaWiki. Equivalent to the value of the $wgContentNamespaces configuration variable, with 0 included if it is not already.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgContentNamespaces
             */
            wgContentNamespaces: number[];
            /**
             * The name of the wiki's database.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgDBname
             */
            wgDBname: string;
            /**
             * Root path used for extension static assets (e.g. images). Append '/' then the name of the extension to get the root path for a given extension.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgExtensionAssetsPath
             */
            wgExtensionAssetsPath: string;
            wgExtraSignatureNamespaces: number[];
            /**
             * Gives a mapping from namespace IDs to localized namespace names. For each namespace, the object has one entry that has the stringified namespace number as the key and the namespace name as its value. Aliases or canonical names are not included.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgFormattedNamespaces
             */
            wgFormattedNamespaces: Record<number, string>;
            wgIllegalFileChars: string;
            wgLegalTitleChars: string;
            /**
             * Gives a mapping from namespace names to namespace IDs. For each namespace name, including localized and canonical names as well as aliases, the object has one entry that has namespace name as the key and the namespace ID as its integer value. The keys are all lowercase, with spaces replaced by underscores.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgNamespaceIds
             */
            wgNamespaceIds: Record<string, number>;
            /**
             * Full path to the main access point script, starting at the root, including the full script name with extension. On WMF wikis, normally "/w/index.php". See also $wgScript.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgScript
             */
            wgScript: string;
            /**
             * The path part of wgScript, without trailing "/". This is the path to use for direct calls to the php access points such as index.php or api.php. See also $wgScriptPath.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgScriptPath
             */
            wgScriptPath: string;
            /**
             * The server URL, not terminated by "/". The combination wgServer + wgScriptPath + "/api.php", for instance, results in a valid URL to the API access point script.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgServer
             */
            wgServer: string;
            /**
             * The name of the server, without the protocol or trailing slash (e.g. "en.wikipedia.org").
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgServerName
             */
            wgServerName: string;
            /**
             * The name of the site, as defined by $wgSitename.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgSiteName
             */
            wgSiteName: string;
            wgTranslateNumerals: boolean;
            wgUrlProtocols: string;
            /**
             * If a wiki has language variants (such as the Chinese and the Serbian Wikipedias), set to a path beginning at the root for language variants other than wgContentLanguage. The path contains two placeholders: "$1" is to be replaced by the page title, and "$2" is to be replaced by the language code of the language variant (e.g. "zh-tw"). If the wiki does not have language variants, set to false. See also $wgVariantArticlePath.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgVariantArticlePath
             */
            wgVariantArticlePath: string | false;
            /**
             * Identifies the version of MediaWiki that served the page.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgVersion
             */
            wgVersion: string;
            /**
             * The wiki identifier. Should be preferred over wgDBname.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgWikiID
             */
            wgWikiID: string;
            /**
             * The action performed, e.g. "edit" for edit pages, or "view" for page views. See {@link https://www.mediawiki.org/wiki/Manual:Parameters_to_index.php#Actions Manual:Parameters to index.php}.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgAction
             */
            wgAction: string;
            /**
             * The internal ID (page ID) of the page. For non-existent pages and special pages, it is zero.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgArticleId
             */
            wgArticleId: number;
            /**
             * The canonical (i.e., not localized or aliased) namespace name of the page.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgCanonicalNamespace
             */
            wgCanonicalNamespace: string;
            /**
             * On special pages, the canonical (i.e., not localized or aliased) name of the special page; otherwise it is not defined at all (up to and including MW 1.15) or is set to false (since MW 1.16).
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgCanonicalSpecialPageName
             */
            wgCanonicalSpecialPageName: string | false;
            /**
             * The list of all the categories a page belongs to. This is essentially a JavaScript version of the category box shown on the page (grey box at bottom of page, in Monobook/Vector). If the category box is not shown on the current page (as is the case when editing/viewing history), wgCategories will be an empty array.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgCategories
             */
            wgCategories: string[];
            /**
             * The top revision ID of the currently viewed page at the time the page was served. Also set on diff and history pages; zero for special pages.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgCurRevisionId
             */
            wgCurRevisionId: number;
            /**
             * true if the page displays the content of a wiki page, e.g. when viewing a page (regardless of namespace), or when viewing an old revision or diff with rendered content below it. It is false for anything else (edit form, history page, special pages, most generated pages, etc.).
             *
             * This variable is badly named – it is not related to a page being a main namespace "article".
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgIsArticle
             */
            wgIsArticle: boolean;
            /**
             * True if the page is probably editable (based on Title::quickUserCan) by the current user. The 'probably' is necessary for performance reasons. An exact editability check is too costly here, due to cascading protection and hook-based extensions like TitleBlacklist that may be enabled. If this is true, it is likely to be editable. If it is false, it is definitely not editable.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgIsProbablyEditable
             */
            wgIsProbablyEditable: boolean;
            /**
             * true if the page is a redirect to a wiki page using `#REDIRECT [[Target page name]]`. It is false for anything else (normal pages, special pages, most generated pages, etc.).
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgIsRedirect
             */
            wgIsRedirect: boolean;
            /**
             * The number of the namespace the page is in.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgNamespaceNumber
             */
            wgNamespaceNumber: number;
            /**
             * Language code of the page content language (according to `$context->getTitle()->getPageLanguage()`)
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgPageContentLanguage
             */
            wgPageContentLanguage: string;
            /**
             * 'wikitext' on typical wiki pages, 'javascript' on pages interpreted as JavaScript, 'css' on pages interpreted as CSS, 'Scribunto' on pages interpreted as Scribunto (Lua).
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgPageContentModel
             */
            wgPageContentModel: string;
            /**
             * The full name of the page, including the localized namespace name, if the namespace has a name (the main namespace (number 0) doesn't), and with spaces replaced by underscores. To get only the title without the namespace, use wgTitle.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgPageName
             */
            wgPageName: string;
            /**
             * Parser limit report for the page when parser data is available. Includes data about parset limits, Lua statistics when Scribunto extension is enabled and parser cache information.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgPageParseReport
             */
            wgPageParseReport: PageParseReport;
            /**
             * When redirected contains the title of the page we were redirected from. If the page was not redirected, the value is omitted entirely (absent in mw.config). Uses the same format as wgPageName
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgRedirectedFrom
             */
            wgRedirectedFrom?: string;
            /**
             * The full name of the page to which content actions and navigation links (e.g. a skin's tabs) apply. The AJAX watch function uses this to work correctly on special pages such as Special:MovePage and Special:WhatLinksHere.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgRelevantPageName
             */
            wgRelevantPageName: string;
            /**
             * The relevant name of the user to which content actions and some extra navigation links (e.g. link to user rights or user contributions) apply.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgRelevantUserName
             */
            wgRelevantUserName?: string;
            /**
             * Like wgIsProbablyEditable, but applied to the contextually relevant page name from wgRelevantPageName instead of strictly the current page being viewed. For example, when viewing a page "Special:MovePage/Example" this will indicate whether the subject page is editable.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgRelevantPageIsProbablyEditable
             */
            wgRelevantPageIsProbablyEditable: boolean;
            /**
             * If the page is editable at all (and is not a special page) and editing of the page is restricted to some user groups, the array contains the minimum user group a user must be in in order to edit the page. For semi-protected pages, it'd contain ["autoconfirmed"]; for fully protected pages ["sysop"]. If there are no explicit restrictions, the value is [] (an array with no elements).
             *
             * This array contains only explicit protections. Namespace-wide protections (e.g. MediaWiki namespace, $wgNamespaceProtection), cascading protections, or "protections" brought about by the TitleBlacklist extension's "noedit" attribute, are ignored by this array. On such pages, the value is normally [], unless additional protections have been applied specifically to that page.
             *
             * If the page does not exist, the variable is not set.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgRestrictionEdit
             */
            wgRestrictionEdit?: string[];
            /**
             * If the page is movable at all (and is not a special page) and moving of the page is restricted to some user groups, the array contains the minimum user group a user must be in in order to move the page. For semi-moveprotected pages, it'd contain ["autoconfirmed"]; for fully moveprotected pages ["sysop"]. If there are no explicit restrictions, the value is [] (an array with no elements).
             *
             * This array contains only explicit protections. Namespace-wide protections (e.g. MediaWiki namespace, $wgNamespaceProtection), cascading protections, or "protections" brought about by the TitleBlacklist extension's "moveonly" attribute, are ignored by this array. On such pages, the value is normally [], unless additional protections have been applied specifically to that page.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgRestrictionMove
             */
            wgRestrictionMove: string[];
            /**
             * The revision ID of the currently viewed revision, or the right revision for diff views (But 0 when diffonly=yes, task T231744). Also set on diff pages; zero for special pages, history pages, or anywhere else inapplicable.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgRevisionId
             */
            wgRevisionId: number;
            /**
             * The name of the search backend used to execute search requests.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgSearchType
             */
            wgSearchType: string | null;
            /**
             * The page title, without the namespace. May contain spaces – does not contain underscores. To get the title including the namespace, use wgPageName.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgTitle
             */
            wgTitle: string;
            /**
             * The number of edits the current user made (null if not logged in).
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgUserEditCount
             */
            wgUserEditCount?: number;
            /**
             * An array containing all the (local) user groups the current user is a member of, or null for non-logged-in users. User groups are identified by the internal user group names, e.g. "sysop", "autoconfirmed", "bureaucrat", and so on. The default user group is named "*".
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgUserGroups
             */
            wgUserGroups: string[] | null;
            /**
             * The numeric ID of the current user (null if not logged in).
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgUserId
             */
            wgUserId?: number;
            /**
             * The language code for the user's interface language, as set in Special→Preferences (which may be overridden by a uselang= parameter in the URL).
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgUserLanguage
             */
            wgUserLanguage: string;
            /**
             * The user name of the user currently viewing the page, if it's a logged-in user. For non-logged-in users, it is null (not the user's IP address, unlike PHP $wgUser->getName() on the server).
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgUserName
             */
            wgUserName: string | null;
            /**
             * The time and date on which the current user registered, represented as milliseconds since epoch. Null if not logged in.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgUserRegistration
             */
            wgUserRegistration?: number;
            /**
             * true if the current page is the main page of the wiki. Omitted entirely otherwise (defaulting to null in mw.config).
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgIsMainPage
             */
            wgIsMainPage?: true;
            /**
             * If the wiki has language variants, the language code of the user's preferred variant. If the wiki does not have variants, the variable is not configured (does not exist), i.e.:
             *
             * ```js
             * mw.config.exists( 'wgUserVariant' ); // false
             * mw.config.get( 'wgUserVariant' ); // null.
             * ```
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgUserVariant
             */
            wgUserVariant?: string;
            /**
             * "saved" if the user just saved this page. "created" if the user just created this page. "restored" if the user just restored this page by going to the history page, clicked on a timestamp link for an old revision, clicked on edit and then saved. null otherwise. Note that:
             *
             * On null edits, this is null, not "saved"
             *
             * When using "undo", this is "saved"
             *
             * On rollback, this is null
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgPostEdit
             */
            wgPostEdit?: "created" | "restored" | "saved";
            /**
             * Revision ID of the "old" revision when viewing a diff. Only available when viewing a revision comparison.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgDiffOldId
             */
            wgDiffOldId?: number;
            /**
             * Revision ID of the "new" revision when viewing a diff. Only available when viewing a revision comparison.
             *
             * @see https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Interface/JavaScript#wgDiffNewId
             */
            wgDiffNewId?: number;
        }>;

        interface PageParseReport {
            cachereport: PageParseReport.Cache;
            limitreport: PageParseReport.Limit;
        }

        namespace PageParseReport {
            interface Cache {
                timestamp: `${number}`;
                transientcontent: boolean;
                ttl: number;
            }

            interface Limit {
                "cputime": `${number}`;
                "expansiondepth": LimitValue;
                "expensivefunctioncount": LimitValue;
                "postexpandincludesize": LimitValue;
                "ppvisitednodes": LimitValue;
                "templateargumentsize": LimitValue;
                "timingprofile": string[];
                "unstrip-depth": LimitValue;
                "unstrip-size": LimitValue;
            }

            interface LimitValue {
                limit: number;
                value: number;
            }
        }
    }
}

export {};
