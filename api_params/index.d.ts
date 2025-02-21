// tslint:disable:no-empty-interface

import { UnknownApiParams } from "../mw/Api";

type timestamp = string;
type expiry = string;
type namespace = number;
type limit = number | "max";
type password = string;
type upload = File; // XXX
type OneOrMore<T> = T | T[];

export type ApiAssert = "anon" | "bot" | "user";

export type ApiTokenType =
    | "createaccount"
    | "csrf"
    | "deleteglobalaccount"
    | "login"
    | "patrol"
    | "rollback"
    | "setglobalaccountstatus"
    | "userrights"
    | "watch";

export type ApiLegacyTokenType =
    | "block"
    | "delete"
    | "edit"
    | "email"
    | "import"
    | "move"
    | "options"
    | "protect"
    | "unblock";

export interface ApiParams extends UnknownApiParams {
    action?: string;
    format?: "json" | "jsonfm" | "xml" | "xmlfm" | "php" | "none";
    maxlag?: number;
    smaxage?: number;
    maxage?: number;
    assert?: "user" | "bot" | "anon";
    assertuser?: string;
    requestid?: string;
    servedby?: boolean;
    curtimestamp?: boolean;
    responselanginfo?: boolean;
    origin?: string;
    uselang?: string;
    errorformat?: "bc" | "html" | "none" | "plaintext" | "raw" | "wikitext";
    errorlang?: string;
    errorsuselocal?: boolean;
    centralauthtoken?: string;

    // format=json
    callback?: string;
    utf8?: boolean;
    ascii?: boolean;
    formatversion?: "1" | "2" | "latest";
}

export {};

// AUTOMATICALLY GENERATED FROM HERE:

export interface AbuseFilterApiCheckMatchParams extends ApiParams {
    filter?: string;
    vars?: string;
    rcid?: number;
    logid?: number;
}

export interface AbuseFilterApiCheckSyntaxParams extends ApiParams {
    filter?: string;
}

export interface AbuseFilterApiEvalExpressionParams extends ApiParams {
    expression?: string;
    prettyprint?: boolean;
}

export interface AbuseFilterApiUnblockAutopromoteParams extends ApiParams {
    user?: string;
    token?: string;
}

export interface AbuseFilterApiAbuseLogPrivateDetailsParams extends ApiParams {
    logid?: number;
    reason?: string;
    token?: string;
}

export interface ApiAcquireTempUserNameParams extends ApiParams {}

export interface AntiSpoofApiAntiSpoofParams extends ApiParams {
    username?: string;
}

export interface ApiBlockParams extends ApiParams {
    user?: string;
    userid?: number;
    expiry?: string;
    reason?: string;
    anononly?: boolean;
    nocreate?: boolean;
    autoblock?: boolean;
    noemail?: boolean;
    hidename?: boolean;
    allowusertalk?: boolean;
    reblock?: boolean;
    watchuser?: boolean;
    watchlistexpiry?: expiry;
    tags?: string | string[];
    partial?: boolean;
    pagerestrictions?: string | string[];
    namespacerestrictions?: namespace | namespace[];
    token?: string;
}

export interface BounceHandlerApiBounceHandlerParams extends ApiParams {
    email?: string;
}

export interface CategoryTreeApiCategoryTreeParams extends ApiParams {
    category?: string;
    options?: string;
}

export interface CentralAuthApiCentralAuthTokenParams extends ApiParams {}

export interface ApiCentralNoticeCdnCacheUpdateBannerParams extends ApiParams {
    banner?: string;
    language?: string;
    token?: string;
}

export interface ApiCentralNoticeChoiceDataParams extends ApiParams {
    project?: string;
    language?: string;
}

export interface ApiCentralNoticeQueryCampaignParams extends ApiParams {
    campaign?: string;
}

export interface ApiChangeAuthenticationDataParams extends ApiParams {
    changeauthrequest?: string;
    changeauthtoken?: string;
}

export interface ApiChangeContentModelParams extends ApiParams {
    title?: string;
    pageid?: number;
    summary?: string;
    tags?: string | string[];
    model?:
        | "GadgetDefinition"
        | "JsonSchema"
        | "MassMessageListContent"
        | "Scribunto"
        | "SecurePoll"
        | "css"
        | "javascript"
        | "json"
        | "sanitized-css"
        | "text"
        | "wikitext";
    bot?: boolean;
    token?: string;
}

export interface ApiCheckTokenParams extends ApiParams {
    type?:
        | "createaccount"
        | "csrf"
        | "deleteglobalaccount"
        | "login"
        | "patrol"
        | "rollback"
        | "setglobalaccountstatus"
        | "userrights"
        | "watch";
    token?: string;
    maxtokenage?: number;
}

export interface CirrusSearchApiConfigDumpParams extends ApiParams {
    prop?: OneOrMore<"globals" | "namespacemap" | "profiles" | "replicagroup" | "usertesting">;
}

export interface CirrusSearchApiMappingDumpParams extends ApiParams {}

export interface CirrusSearchApiProfilesDumpParams extends ApiParams {
    verbose?: boolean;
}

export interface CirrusSearchApiSettingsDumpParams extends ApiParams {}

export interface ApiClearHasMsgParams extends ApiParams {}

export interface ApiClientLoginParams extends ApiParams {
    loginrequests?: string | string[];
    loginmessageformat?: "html" | "none" | "raw" | "wikitext";
    loginmergerequestfields?: boolean;
    loginpreservestate?: boolean;
    loginreturnurl?: string;
    logincontinue?: boolean;
    logintoken?: string;
}

export interface CollectionApiCollectionParams extends ApiParams {
    submodule?:
        | "addarticle"
        | "addcategory"
        | "addchapter"
        | "clearcollection"
        | "getbookcreatorboxcontent"
        | "getcollection"
        | "getpopupdata"
        | "postcollection"
        | "removearticle"
        | "removeitem"
        | "renamechapter"
        | "setsorting"
        | "settitles"
        | "sortitems"
        | "suggestarticleaction"
        | "suggestundoarticleaction";
}

export interface ApiComparePagesParams extends ApiParams {
    fromtitle?: string;
    fromid?: number;
    fromrev?: number;
    fromslots?: OneOrMore<"main">;
    frompst?: boolean;
    fromtext?: string;
    fromcontentformat?:
        | "application/json"
        | "application/octet-stream"
        | "application/unknown"
        | "application/x-binary"
        | "text/css"
        | "text/javascript"
        | "text/plain"
        | "text/unknown"
        | "text/x-wiki"
        | "unknown/unknown";
    fromcontentmodel?:
        | "GadgetDefinition"
        | "JsonSchema"
        | "MassMessageListContent"
        | "Scribunto"
        | "SecurePoll"
        | "css"
        | "javascript"
        | "json"
        | "sanitized-css"
        | "text"
        | "unknown"
        | "wikitext";
    fromsection?: string;
    totitle?: string;
    toid?: number;
    torev?: number;
    torelative?: "cur" | "next" | "prev";
    toslots?: OneOrMore<"main">;
    topst?: boolean;
    totext?: string;
    tocontentformat?:
        | "application/json"
        | "application/octet-stream"
        | "application/unknown"
        | "application/x-binary"
        | "text/css"
        | "text/javascript"
        | "text/plain"
        | "text/unknown"
        | "text/x-wiki"
        | "unknown/unknown";
    tocontentmodel?:
        | "GadgetDefinition"
        | "JsonSchema"
        | "MassMessageListContent"
        | "Scribunto"
        | "SecurePoll"
        | "css"
        | "javascript"
        | "json"
        | "sanitized-css"
        | "text"
        | "unknown"
        | "wikitext";
    tosection?: string;
    prop?: OneOrMore<
        | "comment"
        | "diff"
        | "diffsize"
        | "ids"
        | "parsedcomment"
        | "rel"
        | "size"
        | "timestamp"
        | "title"
        | "user"
    >;
    slots?: OneOrMore<"main">;
    difftype?: "inline" | "table" | "unified";
}

export interface ApiAMCreateAccountParams extends ApiParams {
    createrequests?: string | string[];
    createmessageformat?: "html" | "none" | "raw" | "wikitext";
    createmergerequestfields?: boolean;
    createpreservestate?: boolean;
    createreturnurl?: string;
    createcontinue?: boolean;
    createtoken?: string;
}

export interface CentralAuthApiCreateLocalAccountParams extends ApiParams {
    username?: string;
    reason?: string;
    token?: string;
}

export interface ApiCSPReportParams extends ApiParams {
    reportonly?: boolean;
    source?: string;
}

export interface ContentTranslationActionApiContentTranslationDeleteParams extends ApiParams {
    from?: string;
    to?: string;
    sourcetitle?: string;
    token?: string;
}

export interface ContentTranslationActionApiContentTranslationPublishParams extends ApiParams {
    title?: string;
    html?: string;
    from?: string;
    to?: string;
    sourcetitle?: string;
    categories?: string;
    publishtags?: string | string[];
    wpCaptchaId?: string;
    wpCaptchaWord?: string;
    cxversion?: number;
    token?: string;
}

export interface ContentTranslationActionApiSectionTranslationPublishParams extends ApiParams {
    title?: string;
    html?: string;
    sourcelanguage?: string;
    targetlanguage?: string;
    sourcetitle?: string;
    sourcerevid?: string;
    sourcesectiontitle?: string;
    targetsectiontitle?: string;
    sectiontranslationid?: number;
    issandbox?: boolean;
    captchaid?: string;
    captchaword?: string;
    token?: string;
}

export interface ContentTranslationActionApiContentTranslationSaveParams extends ApiParams {
    from?: string;
    to?: string;
    sourcetitle?: string;
    title?: string;
    content?: string;
    sourcerevision?: number;
    progress?: string;
    cxversion?: number;
    sourcecategories?: string;
    targetcategories?: string;
    token?: string;
}

export interface ContentTranslationActionApiContentTranslationSuggestionListParams
    extends ApiParams {
    listname?: string;
    listaction?: "add" | "remove" | "view";
    titles?: string | string[];
    from?: string;
    to?: string;
    token?: string;
}

export interface ContentTranslationActionApiContentTranslationTokenParams extends ApiParams {
    token?: string;
}

export interface ApiDeleteParams extends ApiParams {
    title?: string;
    pageid?: number;
    reason?: string;
    tags?: string | string[];
    deletetalk?: boolean;
    watch?: boolean;
    watchlist?: "nochange" | "preferences" | "unwatch" | "watch";
    watchlistexpiry?: expiry;
    unwatch?: boolean;
    oldimage?: string;
    token?: string;
}

export interface CentralAuthApiDeleteGlobalAccountParams extends ApiParams {
    user?: string;
    reason?: string;
    token?: string;
}

export interface DiscussionToolsApiDiscussionToolsCompareParams extends ApiParams {
    fromtitle?: string;
    fromrev?: number;
    totitle?: string;
    torev?: number;
}

export interface DiscussionToolsApiDiscussionToolsEditParams extends ApiParams {
    paction?: "addcomment" | "addtopic";
    autosubscribe?: "default" | "no" | "yes";
    page?: string;
    token?: string;
    formtoken?: string;
    commentname?: string;
    commentid?: string;
    wikitext?: string;
    html?: string;
    summary?: string;
    sectiontitle?: string;
    allownosectiontitle?: boolean;
    useskin?:
        | "apioutput"
        | "cologneblue"
        | "contenttranslation"
        | "fallback"
        | "minerva"
        | "modern"
        | "monobook"
        | "timeless"
        | "vector"
        | "vector-2022";
    watchlist?: string;
    captchaid?: string;
    captchaword?: string;
    nocontent?: string;
    tags?: string | string[];
    returnto?: string;
    returntoquery?: string;
    returntoanchor?: string;
    mobileformat?: boolean;
}

export interface DiscussionToolsApiDiscussionToolsFindCommentParams extends ApiParams {
    idorname?: string;
    heading?: string;
    page?: string;
}

export interface DiscussionToolsApiDiscussionToolsGetSubscriptionsParams extends ApiParams {
    commentname?: string | string[];
}

export interface DiscussionToolsApiDiscussionToolsPageInfoParams extends ApiParams {
    page?: string;
    oldid?: number;
    prop?: OneOrMore<"threaditemshtml" | "transcludedfrom">;
    excludesignatures?: boolean;
}

export interface DiscussionToolsApiDiscussionToolsPreviewParams extends ApiParams {
    type?: "reply" | "topic";
    page?: string;
    wikitext?: string;
    sectiontitle?: string;
    useskin?:
        | "apioutput"
        | "cologneblue"
        | "contenttranslation"
        | "fallback"
        | "minerva"
        | "modern"
        | "monobook"
        | "timeless"
        | "vector"
        | "vector-2022";
    mobileformat?: boolean;
}

export interface DiscussionToolsApiDiscussionToolsSubscribeParams extends ApiParams {
    page?: string;
    token?: string;
    commentname?: string;
    subscribe?: boolean;
}

export interface NotificationsApiEchoMarkReadParams extends ApiParams {
    wikis?: string | string[];
    list?: string | string[];
    unreadlist?: string | string[];
    all?: boolean;
    sections?: OneOrMore<"alert" | "message">;
    token?: string;
}

export interface NotificationsApiEchoMarkSeenParams extends ApiParams {
    type?: "alert" | "all" | "message";
    timestampFormat?: "ISO_8601" | "MW";
}

export interface NotificationsApiEchoMuteParams extends ApiParams {
    type?: "page-linked-title" | "user";
    mute?: string | string[];
    unmute?: string | string[];
    token?: string;
}

export interface NotificationsPushApiEchoPushSubscriptionsParams extends ApiParams {
    command?: "create" | "delete";
    token?: string;
}

export interface ApiEditPageParams extends ApiParams {
    title?: string;
    pageid?: number;
    section?: string;
    sectiontitle?: string;
    text?: string;
    summary?: string;
    tags?: string | string[];
    minor?: boolean;
    notminor?: boolean;
    bot?: boolean;
    baserevid?: number;
    basetimestamp?: timestamp;
    starttimestamp?: timestamp;
    recreate?: boolean;
    createonly?: boolean;
    nocreate?: boolean;
    watch?: boolean;
    unwatch?: boolean;
    watchlist?: "nochange" | "preferences" | "unwatch" | "watch";
    watchlistexpiry?: expiry;
    md5?: string;
    prependtext?: string;
    appendtext?: string;
    undo?: number;
    undoafter?: number;
    redirect?: boolean;
    contentformat?:
        | "application/json"
        | "application/octet-stream"
        | "application/unknown"
        | "application/x-binary"
        | "text/css"
        | "text/javascript"
        | "text/plain"
        | "text/unknown"
        | "text/x-wiki"
        | "unknown/unknown";
    contentmodel?:
        | "GadgetDefinition"
        | "JsonSchema"
        | "MassMessageListContent"
        | "Scribunto"
        | "SecurePoll"
        | "css"
        | "javascript"
        | "json"
        | "sanitized-css"
        | "text"
        | "unknown"
        | "wikitext";
    token?: string;
    returnto?: string;
    returntoquery?: string;
    returntoanchor?: string;
    captchaword?: string;
    captchaid?: string;
}

export interface MediaWikiMassMessageApiEditMassMessageListParams extends ApiParams {
    spamlist?: string;
    description?: string;
    add?: string | string[];
    remove?: string | string[];
    minor?: boolean;
    watchlist?: "nochange" | "preferences" | "unwatch" | "watch";
    token?: string;
}

export interface ApiEmailUserParams extends ApiParams {
    target?: string;
    subject?: string;
    text?: string;
    ccme?: boolean;
    token?: string;
}

export interface ApiExpandTemplatesParams extends ApiParams {
    title?: string;
    text?: string;
    revid?: number;
    prop?: OneOrMore<
        | "categories"
        | "encodedjsconfigvars"
        | "jsconfigvars"
        | "modules"
        | "parsetree"
        | "properties"
        | "ttl"
        | "volatile"
        | "wikitext"
    >;
    includecomments?: boolean;
    showstrategykeys?: boolean;
    generatexml?: boolean;
    templatesandboxprefix?: string | string[];
    templatesandboxtitle?: string;
    templatesandboxtext?: string;
    templatesandboxcontentmodel?:
        | "GadgetDefinition"
        | "JsonSchema"
        | "MassMessageListContent"
        | "Scribunto"
        | "SecurePoll"
        | "css"
        | "javascript"
        | "json"
        | "sanitized-css"
        | "text"
        | "unknown"
        | "wikitext";
    templatesandboxcontentformat?:
        | "application/json"
        | "application/octet-stream"
        | "application/unknown"
        | "application/x-binary"
        | "text/css"
        | "text/javascript"
        | "text/plain"
        | "text/unknown"
        | "text/x-wiki"
        | "unknown/unknown";
}

export interface ConfirmEditFancyCaptchaApiFancyCaptchaReloadParams extends ApiParams {}

export interface FeaturedFeedsApiFeaturedFeedsParams extends ApiParams {
    feedformat?: "atom" | "rss";
    feed?: "featured" | "onthisday" | "potd";
    language?: string;
}

export interface ApiFeedContributionsParams extends ApiParams {
    feedformat?: "atom" | "rss";
    user?: string;
    namespace?: namespace;
    year?: number;
    month?: number;
    tagfilter?: string | string[];
    deletedonly?: boolean;
    toponly?: boolean;
    newonly?: boolean;
    hideminor?: boolean;
    showsizediff?: boolean;
}

export interface ApiFeedRecentChangesParams extends ApiParams {
    feedformat?: "atom" | "rss";
    namespace?: namespace;
    invert?: boolean;
    associated?: boolean;
    days?: number;
    limit?: number;
    from?: timestamp;
    hideminor?: boolean;
    hidebots?: boolean;
    hideanons?: boolean;
    hideliu?: boolean;
    hidepatrolled?: boolean;
    hidemyself?: boolean;
    hidecategorization?: boolean;
    tagfilter?: string | string[];
    inverttags?: boolean;
    target?: string;
    showlinkedto?: boolean;
}

export interface ApiFeedWatchlistParams extends ApiParams {
    feedformat?: "atom" | "rss";
    hours?: number;
    linktosections?: boolean;
    allrev?: boolean;
    wlowner?: string;
    wltoken?: string;
    wlshow?: OneOrMore<
        | "!anon"
        | "!autopatrolled"
        | "!bot"
        | "!minor"
        | "!patrolled"
        | "!unread"
        | "anon"
        | "autopatrolled"
        | "bot"
        | "minor"
        | "patrolled"
        | "unread"
    >;
    wltype?: OneOrMore<"categorize" | "edit" | "external" | "log" | "new">;
    wlexcludeuser?: string;
}

export interface ApiFileRevertParams extends ApiParams {
    filename?: string;
    comment?: string;
    archivename?: string;
    token?: string;
}

export interface ApiFlagConfigParams extends ApiParams {}

export interface GlobalBlockingApiGlobalBlockParams extends ApiParams {
    target?: string;
    expiry?: expiry;
    unblock?: boolean;
    reason?: string;
    anononly?: boolean;
    modify?: boolean;
    alsolocal?: boolean;
    localblockstalk?: boolean;
    localblocksemail?: boolean;
    localanononly?: boolean;
    token?: string;
}

export interface GlobalPreferencesApiGlobalPreferenceOverridesParams extends ApiParams {
    reset?: boolean;
    resetkinds?: OneOrMore<
        | "all"
        | "registered"
        | "registered-checkmatrix"
        | "registered-multiselect"
        | "special"
        | "unused"
        | "userjs"
    >;
    change?: string | string[];
    optionname?: string;
    optionvalue?: string;
    token?: string;
}

export interface GlobalPreferencesApiGlobalPreferencesParams extends ApiParams {
    reset?: boolean;
    resetkinds?: OneOrMore<
        | "all"
        | "registered"
        | "registered-checkmatrix"
        | "registered-multiselect"
        | "special"
        | "unused"
        | "userjs"
    >;
    change?: string | string[];
    optionname?: string;
    optionvalue?: string;
    token?: string;
}

export interface CentralAuthApiGlobalUserRightsParams extends ApiParams {
    user?: string;
    userid?: number;
    add?: OneOrMore<
        | "abusefilter-helper"
        | "abusefilter-maintainer"
        | "apihighlimits-requestor"
        | "captcha-exempt"
        | "founder"
        | "global-bot"
        | "global-deleter"
        | "global-flow-create"
        | "global-interface-editor"
        | "global-ipblock-exempt"
        | "global-rollbacker"
        | "global-sysop"
        | "new-wikis-importer"
        | "oathauth-tester"
        | "ombuds"
        | "recursive-export"
        | "staff"
        | "steward"
        | "sysadmin"
        | "vrt-permissions"
        | "wmf-email-block-override"
        | "wmf-researcher"
    >;
    expiry?: string | string[];
    remove?: OneOrMore<
        | "abusefilter-helper"
        | "abusefilter-maintainer"
        | "apihighlimits-requestor"
        | "captcha-exempt"
        | "founder"
        | "global-bot"
        | "global-deleter"
        | "global-flow-create"
        | "global-interface-editor"
        | "global-ipblock-exempt"
        | "global-rollbacker"
        | "global-sysop"
        | "new-wikis-importer"
        | "oathauth-tester"
        | "ombuds"
        | "recursive-export"
        | "staff"
        | "steward"
        | "sysadmin"
        | "vrt-permissions"
        | "wmf-email-block-override"
        | "wmf-researcher"
    >;
    reason?: string;
    token?: string;
    tags?: string | string[];
}

export interface GrowthExperimentsApiInvalidateImageRecommendationParams extends ApiParams {
    tasktype?: "image-recommendation" | "section-image-recommendation";
    title?: string;
    filename?: string;
    sectiontitle?: string;
    sectionnumber?: number;
    token?: string;
}

export interface GrowthExperimentsApiInvalidatePersonalizedPraiseSuggestionParams
    extends ApiParams {
    mentee?: string;
    reason?: "praised" | "skipped";
    skipreason?: "already-praised" | "not-now" | "not-praiseworthy" | "other";
    token?: string;
}

export interface GrowthExperimentsApiManageMentorListParams extends ApiParams {
    geaction?: "add" | "change" | "remove";
    message?: string;
    weight?: "0" | "1" | "2" | "4";
    isaway?: boolean;
    awaytimestamp?: timestamp;
    summary?: string;
    username?: string;
    token?: string;
}

export interface GrowthExperimentsApiMentorDashboardUpdateDataParams extends ApiParams {
    token?: string;
}

export interface GrowthExperimentsApiSetMenteeStatusParams extends ApiParams {
    state?: "disabled" | "enabled" | "optout";
    token?: string;
}

export interface GrowthExperimentsApiSetMentorParams extends ApiParams {
    mentee?: string;
    mentor?: string;
    reason?: string;
    token?: string;
}

export interface GrowthExperimentsApiStarMenteeParams extends ApiParams {
    gesaction?: "star" | "unstar";
    gesmentee?: string;
    token?: string;
}

export interface ApiHelpParams extends ApiParams {
    modules?: string | string[];
    submodules?: boolean;
    recursivesubmodules?: boolean;
    wrap?: boolean;
    toc?: boolean;
}

export interface GrowthExperimentsApiHelpPanelPostQuestionParams extends ApiParams {
    body?: string;
    source?:
        | "helpdesk"
        | "helppanel"
        | "homepage-mentorship"
        | "mentor-helppanel"
        | "mentor-homepage";
    relevanttitle?: string;
    token?: string;
}

export interface GrowthExperimentsApiQuestionStoreParams extends ApiParams {
    storage?: "growthexperiments-helppanel-questions" | "growthexperiments-mentor-questions";
}

export interface ApiDisabledParams extends ApiParams {}

export interface ApiImportParams extends ApiParams {
    summary?: string;
    xml?: upload;
    interwikiprefix?: string;
    interwikisource?:
        | "commons"
        | "de"
        | "es"
        | "fr"
        | "it"
        | "meta"
        | "nost"
        | "outreachwiki"
        | "pl"
        | "test2wiki";
    interwikipage?: string;
    fullhistory?: boolean;
    templates?: boolean;
    namespace?: namespace;
    assignknownusers?: boolean;
    rootpage?: string;
    tags?: string | string[];
    token?: string;
}

export interface ApiFormatJsonParams extends ApiParams {
    callback?: string;
    utf8?: boolean;
    ascii?: boolean;
    formatversion?: "1" | "2" | "latest";
}

export interface JsonConfigJCApiParams extends ApiParams {
    command?: "reload" | "reset" | "status";
    namespace?: number;
    title?: string;
    content?: string;
}

export interface JsonConfigJCDataApiParams extends ApiParams {
    title?: string;
}

export interface ApiFormatJsonParams extends ApiParams {
    wrappedhtml?: boolean;
    callback?: string;
    utf8?: boolean;
    ascii?: boolean;
    formatversion?: "1" | "2" | "latest";
}

export interface UniversalLanguageSelectorApiLanguageSearchParams extends ApiParams {
    search?: string;
    typos?: number;
}

export interface ApiLinkAccountParams extends ApiParams {
    linkrequests?: string | string[];
    linkmessageformat?: "html" | "none" | "raw" | "wikitext";
    linkmergerequestfields?: boolean;
    linkreturnurl?: string;
    linkcontinue?: boolean;
    linktoken?: string;
}

export interface ApiLoginParams extends ApiParams {
    lgname?: string;
    lgpassword?: password;
    lgdomain?: string;
    lgtoken?: string;
}

export interface ApiLogoutParams extends ApiParams {
    token?: string;
}

export interface ApiManageTagsParams extends ApiParams {
    operation?: "activate" | "create" | "deactivate" | "delete";
    tag?: string;
    reason?: string;
    ignorewarnings?: boolean;
    tags?: string | string[];
    token?: string;
}

export interface MediaWikiMassMessageApiMassMessageParams extends ApiParams {
    "spamlist"?: string;
    "subject"?: string;
    "message"?: string;
    "page-message"?: string;
    "token"?: string;
}

export interface ApiMergeHistoryParams extends ApiParams {
    from?: string;
    fromid?: number;
    to?: string;
    toid?: number;
    timestamp?: timestamp;
    reason?: string;
    token?: string;
}

export interface ApiMoveParams extends ApiParams {
    from?: string;
    fromid?: number;
    to?: string;
    reason?: string;
    movetalk?: boolean;
    movesubpages?: boolean;
    noredirect?: boolean;
    watchlist?: "nochange" | "preferences" | "unwatch" | "watch";
    watchlistexpiry?: expiry;
    ignorewarnings?: boolean;
    tags?: string | string[];
    token?: string;
}

export interface ApiFormatNoneParams extends ApiParams {}

export interface OATHAuthApiModuleApiOATHValidateParams extends ApiParams {
    user?: string;
    data?: string;
    token?: string;
}

export interface ApiOpenSearchParams extends ApiParams {
    search?: string;
    namespace?: namespace | namespace[];
    limit?: limit;
    profile?: "classic" | "engine_autoselect" | "fast-fuzzy" | "fuzzy" | "normal" | "strict";
    suggest?: boolean;
    redirects?: "resolve" | "return";
    format?: "json" | "jsonfm" | "xml" | "xmlfm";
    warningsaserror?: boolean;
}

export interface ApiOptionsParams extends ApiParams {
    reset?: boolean;
    resetkinds?: OneOrMore<
        | "all"
        | "registered"
        | "registered-checkmatrix"
        | "registered-multiselect"
        | "special"
        | "unused"
        | "userjs"
    >;
    change?: string | string[];
    optionname?: string;
    optionvalue?: string;
    token?: string;
}

export interface PageTriageApiPageTriageActionParams extends ApiParams {
    pageid?: number;
    reviewed?: "0" | "1";
    enqueue?: boolean;
    token?: string;
    note?: string;
    skipnotif?: boolean;
    tags?: string | string[];
}

export interface PageTriageApiPageTriageListParams extends ApiParams {
    show_predicted_class_stub?: boolean;
    show_predicted_class_start?: boolean;
    show_predicted_class_c?: boolean;
    show_predicted_class_b?: boolean;
    show_predicted_class_good?: boolean;
    show_predicted_class_featured?: boolean;
    show_predicted_issues_vandalism?: boolean;
    show_predicted_issues_spam?: boolean;
    show_predicted_issues_attack?: boolean;
    show_predicted_issues_none?: boolean;
    show_predicted_issues_copyvio?: boolean;
    showbots?: boolean;
    showautopatrolled?: boolean;
    showredirs?: boolean;
    showothers?: boolean;
    showreviewed?: boolean;
    showunreviewed?: boolean;
    showdeleted?: boolean;
    namespace?: number;
    afc_state?: number;
    no_category?: boolean;
    unreferenced?: boolean;
    no_inbound_links?: boolean;
    recreated?: boolean;
    non_autoconfirmed_users?: boolean;
    learners?: boolean;
    blocked_users?: boolean;
    username?: string;
    date_range_from?: timestamp;
    date_range_to?: timestamp;
    page_id?: number;
    limit?: number;
    offset?: number;
    pageoffset?: number;
    dir?: "newestfirst" | "newestreview" | "oldestfirst" | "oldestreview";
}

export interface PageTriageApiPageTriageStatsParams extends ApiParams {
    show_predicted_class_stub?: boolean;
    show_predicted_class_start?: boolean;
    show_predicted_class_c?: boolean;
    show_predicted_class_b?: boolean;
    show_predicted_class_good?: boolean;
    show_predicted_class_featured?: boolean;
    show_predicted_issues_vandalism?: boolean;
    show_predicted_issues_spam?: boolean;
    show_predicted_issues_attack?: boolean;
    show_predicted_issues_none?: boolean;
    show_predicted_issues_copyvio?: boolean;
    showbots?: boolean;
    showautopatrolled?: boolean;
    showredirs?: boolean;
    showothers?: boolean;
    showreviewed?: boolean;
    showunreviewed?: boolean;
    showdeleted?: boolean;
    namespace?: number;
    afc_state?: number;
    no_category?: boolean;
    unreferenced?: boolean;
    no_inbound_links?: boolean;
    recreated?: boolean;
    non_autoconfirmed_users?: boolean;
    learners?: boolean;
    blocked_users?: boolean;
    username?: string;
    date_range_from?: timestamp;
    date_range_to?: timestamp;
}

export interface PageTriageApiPageTriageTagCopyvioParams extends ApiParams {
    revid?: number;
    untag?: boolean;
    token?: string;
}

export interface PageTriageApiPageTriageTaggingParams extends ApiParams {
    pageid?: number;
    token?: string;
    wikitext?: string;
    deletion?: boolean;
    note?: string;
    taglist?: string | string[];
}

export interface ApiParamInfoParams extends ApiParams {
    modules?: string | string[];
    helpformat?: "html" | "none" | "raw" | "wikitext";
    querymodules?: OneOrMore<
        | "abusefilters"
        | "abuselog"
        | "allcategories"
        | "alldeletedrevisions"
        | "allfileusages"
        | "allimages"
        | "alllinks"
        | "allmessages"
        | "allpages"
        | "allredirects"
        | "allrevisions"
        | "alltransclusions"
        | "allusers"
        | "authmanagerinfo"
        | "babel"
        | "backlinks"
        | "betafeatures"
        | "blocks"
        | "categories"
        | "categoryinfo"
        | "categorymembers"
        | "centralnoticeactivecampaigns"
        | "centralnoticelogs"
        | "checkuser"
        | "checkuserlog"
        | "cirrusbuilddoc"
        | "cirruscompsuggestbuilddoc"
        | "cirrusdoc"
        | "contenttranslation"
        | "contenttranslationcorpora"
        | "contenttranslationlangtrend"
        | "contenttranslationstats"
        | "contenttranslationsuggestions"
        | "contributors"
        | "coordinates"
        | "cxdeletedtranslations"
        | "cxpublishedtranslations"
        | "cxtranslatorstats"
        | "deletedrevisions"
        | "deletedrevs"
        | "description"
        | "duplicatefiles"
        | "embeddedin"
        | "extlinks"
        | "extracts"
        | "exturlusage"
        | "featureusage"
        | "filearchive"
        | "filerepoinfo"
        | "fileusage"
        | "flagged"
        | "gadgetcategories"
        | "gadgets"
        | "geosearch"
        | "globalallusers"
        | "globalblocks"
        | "globalgroups"
        | "globalpreferences"
        | "globalrenamestatus"
        | "globalusage"
        | "globaluserinfo"
        | "growthimagesuggestiondata"
        | "growthmenteestatus"
        | "growthmentorlist"
        | "growthmentormentee"
        | "growthmentorstatus"
        | "growthnextsuggestedtasktype"
        | "growthstarredmentees"
        | "growthtasks"
        | "imageinfo"
        | "images"
        | "imageusage"
        | "info"
        | "isreviewed"
        | "iwbacklinks"
        | "iwlinks"
        | "langbacklinks"
        | "langlinks"
        | "langlinkscount"
        | "languageinfo"
        | "links"
        | "linkshere"
        | "linterrors"
        | "linterstats"
        | "logevents"
        | "mapdata"
        | "mmcontent"
        | "mostviewed"
        | "mystashedfiles"
        | "notifications"
        | "oath"
        | "oldreviewedpages"
        | "ores"
        | "pageassessments"
        | "pageimages"
        | "pagepropnames"
        | "pageprops"
        | "pageswithprop"
        | "pageterms"
        | "pageviews"
        | "prefixsearch"
        | "projectpages"
        | "projects"
        | "protectedtitles"
        | "querypage"
        | "random"
        | "readinglistentries"
        | "readinglists"
        | "recentchanges"
        | "redirects"
        | "revisions"
        | "search"
        | "siteinfo"
        | "siteviews"
        | "stashimageinfo"
        | "tags"
        | "templates"
        | "tokens"
        | "transcludedin"
        | "transcodestatus"
        | "unreadnotificationpages"
        | "usercontribs"
        | "userinfo"
        | "users"
        | "videoinfo"
        | "watchlist"
        | "watchlistraw"
        | "wbentityusage"
        | "wblistentityusage"
        | "wikibase"
        | "wikisets"
    >;
    mainmodule?: string;
    pagesetmodule?: string;
    formatmodules?: OneOrMore<
        "json" | "jsonfm" | "none" | "php" | "phpfm" | "rawfm" | "xml" | "xmlfm"
    >;
}

export interface ApiParseParams extends ApiParams {
    title?: string;
    text?: string;
    revid?: number;
    summary?: string;
    page?: string;
    pageid?: number;
    redirects?: boolean;
    oldid?: number;
    prop?: OneOrMore<
        | "categories"
        | "categorieshtml"
        | "displaytitle"
        | "encodedjsconfigvars"
        | "externallinks"
        | "headhtml"
        | "images"
        | "indicators"
        | "iwlinks"
        | "jsconfigvars"
        | "langlinks"
        | "limitreportdata"
        | "limitreporthtml"
        | "links"
        | "modules"
        | "parsetree"
        | "parsewarnings"
        | "parsewarningshtml"
        | "properties"
        | "revid"
        | "sections"
        | "subtitle"
        | "templates"
        | "text"
        | "wikitext"
        | "headitems"
    >;
    wrapoutputclass?: string;
    parsoid?: boolean;
    pst?: boolean;
    onlypst?: boolean;
    effectivelanglinks?: boolean;
    section?: string;
    sectiontitle?: string;
    disablepp?: boolean;
    disablelimitreport?: boolean;
    disableeditsection?: boolean;
    disablestylededuplication?: boolean;
    showstrategykeys?: boolean;
    generatexml?: boolean;
    preview?: boolean;
    sectionpreview?: boolean;
    disabletoc?: boolean;
    useskin?:
        | "apioutput"
        | "cologneblue"
        | "contenttranslation"
        | "fallback"
        | "minerva"
        | "modern"
        | "monobook"
        | "timeless"
        | "vector"
        | "vector-2022";
    contentformat?:
        | "application/json"
        | "application/octet-stream"
        | "application/unknown"
        | "application/x-binary"
        | "text/css"
        | "text/javascript"
        | "text/plain"
        | "text/unknown"
        | "text/x-wiki"
        | "unknown/unknown";
    contentmodel?:
        | "GadgetDefinition"
        | "JsonSchema"
        | "MassMessageListContent"
        | "Scribunto"
        | "SecurePoll"
        | "css"
        | "javascript"
        | "json"
        | "sanitized-css"
        | "text"
        | "unknown"
        | "wikitext";
    mobileformat?: boolean;
    templatesandboxprefix?: string | string[];
    templatesandboxtitle?: string;
    templatesandboxtext?: string;
    templatesandboxcontentmodel?:
        | "GadgetDefinition"
        | "JsonSchema"
        | "MassMessageListContent"
        | "Scribunto"
        | "SecurePoll"
        | "css"
        | "javascript"
        | "json"
        | "sanitized-css"
        | "text"
        | "unknown"
        | "wikitext";
    templatesandboxcontentformat?:
        | "application/json"
        | "application/octet-stream"
        | "application/unknown"
        | "application/x-binary"
        | "text/css"
        | "text/javascript"
        | "text/plain"
        | "text/unknown"
        | "text/x-wiki"
        | "unknown/unknown";
}

export interface ParserMigrationApiParserMigrationParams extends ApiParams {
    title?: string;
    config?: OneOrMore<"new" | "old">;
    redirect?: string;
}

export interface ApiPatrolParams extends ApiParams {
    rcid?: number;
    revid?: number;
    tags?: string | string[];
    token?: string;
}

export interface ApiFormatPhpParams extends ApiParams {
    formatversion?: "1" | "2" | "latest";
}

export interface ApiFormatPhpParams extends ApiParams {
    wrappedhtml?: boolean;
    formatversion?: "1" | "2" | "latest";
}

export interface ApiProtectParams extends ApiParams {
    title?: string;
    pageid?: number;
    protections?: string | string[];
    expiry?: string | string[];
    reason?: string;
    tags?: string | string[];
    cascade?: boolean;
    watch?: boolean;
    watchlist?: "nochange" | "preferences" | "unwatch" | "watch";
    watchlistexpiry?: expiry;
    token?: string;
}

export interface ApiPurgeParams extends ApiParams {
    forcelinkupdate?: boolean;
    forcerecursivelinkupdate?: boolean;
    continue?: string;
    titles?: string | string[];
    pageids?: number | number[];
    revids?: number | number[];
    generator?:
        | "allcategories"
        | "alldeletedrevisions"
        | "allfileusages"
        | "allimages"
        | "alllinks"
        | "allpages"
        | "allredirects"
        | "allrevisions"
        | "alltransclusions"
        | "backlinks"
        | "categories"
        | "categorymembers"
        | "contenttranslation"
        | "contenttranslationsuggestions"
        | "deletedrevisions"
        | "duplicatefiles"
        | "embeddedin"
        | "exturlusage"
        | "fileusage"
        | "geosearch"
        | "images"
        | "imageusage"
        | "iwbacklinks"
        | "langbacklinks"
        | "links"
        | "linkshere"
        | "mostviewed"
        | "oldreviewedpages"
        | "pageswithprop"
        | "prefixsearch"
        | "projectpages"
        | "protectedtitles"
        | "querypage"
        | "random"
        | "recentchanges"
        | "redirects"
        | "revisions"
        | "search"
        | "templates"
        | "transcludedin"
        | "watchlist"
        | "watchlistraw"
        | "wblistentityusage"
        | "growthtasks"
        | "readinglistentries";
    redirects?: boolean;
    converttitles?: boolean;
}

export interface ApiQueryParams extends ApiParams {
    prop?: OneOrMore<
        | "categories"
        | "categoryinfo"
        | "cirrusbuilddoc"
        | "cirruscompsuggestbuilddoc"
        | "cirrusdoc"
        | "contributors"
        | "coordinates"
        | "deletedrevisions"
        | "duplicatefiles"
        | "extlinks"
        | "extracts"
        | "fileusage"
        | "flagged"
        | "globalusage"
        | "growthimagesuggestiondata"
        | "imageinfo"
        | "images"
        | "info"
        | "isreviewed"
        | "iwlinks"
        | "langlinks"
        | "langlinkscount"
        | "links"
        | "linkshere"
        | "mmcontent"
        | "pageassessments"
        | "pageimages"
        | "pageprops"
        | "pageterms"
        | "pageviews"
        | "redirects"
        | "revisions"
        | "stashimageinfo"
        | "templates"
        | "transcludedin"
        | "transcodestatus"
        | "videoinfo"
        | "wbentityusage"
        | "description"
        | "mapdata"
    >;
    list?: OneOrMore<
        | "abusefilters"
        | "abuselog"
        | "allcategories"
        | "alldeletedrevisions"
        | "allfileusages"
        | "allimages"
        | "alllinks"
        | "allpages"
        | "allredirects"
        | "allrevisions"
        | "alltransclusions"
        | "allusers"
        | "backlinks"
        | "betafeatures"
        | "blocks"
        | "categorymembers"
        | "centralnoticeactivecampaigns"
        | "centralnoticelogs"
        | "checkuser"
        | "checkuserlog"
        | "contenttranslation"
        | "contenttranslationcorpora"
        | "contenttranslationlangtrend"
        | "contenttranslationstats"
        | "contenttranslationsuggestions"
        | "cxpublishedtranslations"
        | "cxtranslatorstats"
        | "embeddedin"
        | "exturlusage"
        | "filearchive"
        | "gadgetcategories"
        | "gadgets"
        | "geosearch"
        | "globalallusers"
        | "globalblocks"
        | "globalgroups"
        | "growthmentorlist"
        | "growthmentormentee"
        | "growthstarredmentees"
        | "imageusage"
        | "iwbacklinks"
        | "langbacklinks"
        | "linterrors"
        | "logevents"
        | "mostviewed"
        | "mystashedfiles"
        | "oldreviewedpages"
        | "pagepropnames"
        | "pageswithprop"
        | "prefixsearch"
        | "projectpages"
        | "projects"
        | "protectedtitles"
        | "querypage"
        | "random"
        | "recentchanges"
        | "search"
        | "tags"
        | "usercontribs"
        | "users"
        | "watchlist"
        | "watchlistraw"
        | "wblistentityusage"
        | "wikisets"
        | "deletedrevs"
        | "growthtasks"
        | "readinglistentries"
    >;
    meta?: OneOrMore<
        | "allmessages"
        | "authmanagerinfo"
        | "babel"
        | "featureusage"
        | "filerepoinfo"
        | "globalpreferences"
        | "globalrenamestatus"
        | "globaluserinfo"
        | "growthmenteestatus"
        | "growthmentorstatus"
        | "languageinfo"
        | "linterstats"
        | "notifications"
        | "ores"
        | "siteinfo"
        | "siteviews"
        | "tokens"
        | "unreadnotificationpages"
        | "userinfo"
        | "wikibase"
        | "cxdeletedtranslations"
        | "growthnextsuggestedtasktype"
        | "oath"
        | "readinglists"
    >;
    indexpageids?: boolean;
    export?: boolean;
    exportnowrap?: boolean;
    exportschema?: "0.10" | "0.11";
    iwurl?: boolean;
    continue?: string;
    rawcontinue?: boolean;
    titles?: string | string[];
    pageids?: number | number[];
    revids?: number | number[];
    generator?:
        | "allcategories"
        | "alldeletedrevisions"
        | "allfileusages"
        | "allimages"
        | "alllinks"
        | "allpages"
        | "allredirects"
        | "allrevisions"
        | "alltransclusions"
        | "backlinks"
        | "categories"
        | "categorymembers"
        | "contenttranslation"
        | "contenttranslationsuggestions"
        | "deletedrevisions"
        | "duplicatefiles"
        | "embeddedin"
        | "exturlusage"
        | "fileusage"
        | "geosearch"
        | "images"
        | "imageusage"
        | "iwbacklinks"
        | "langbacklinks"
        | "links"
        | "linkshere"
        | "mostviewed"
        | "oldreviewedpages"
        | "pageswithprop"
        | "prefixsearch"
        | "projectpages"
        | "protectedtitles"
        | "querypage"
        | "random"
        | "recentchanges"
        | "redirects"
        | "revisions"
        | "search"
        | "templates"
        | "transcludedin"
        | "watchlist"
        | "watchlistraw"
        | "wblistentityusage"
        | "growthtasks"
        | "readinglistentries";
    redirects?: boolean;
    converttitles?: boolean;
}

export interface ApiFormatJsonParams extends ApiParams {
    wrappedhtml?: boolean;
}

export interface ReadingListsApiReadingListsParams extends ApiParams {
    command?: "create" | "createentry" | "delete" | "deleteentry" | "setup" | "teardown" | "update";
    token?: string;
}

export interface ApiRemoveAuthenticationDataParams extends ApiParams {
    request?: string;
    token?: string;
}

export interface ApiResetPasswordParams extends ApiParams {
    user?: string;
    email?: string;
    token?: string;
}

export interface ApiReviewParams extends ApiParams {
    revid?: string;
    comment?: string;
    unapprove?: boolean;
    token?: string;
}

export interface ApiRevisionDeleteParams extends ApiParams {
    type?: "archive" | "filearchive" | "logging" | "oldimage" | "revision";
    target?: string;
    ids?: string | string[];
    hide?: OneOrMore<"comment" | "content" | "user">;
    show?: OneOrMore<"comment" | "content" | "user">;
    suppress?: "no" | "nochange" | "yes";
    reason?: string;
    tags?: string | string[];
    token?: string;
}

export interface ApiRollbackParams extends ApiParams {
    title?: string;
    pageid?: number;
    tags?: string | string[];
    user?: string;
    summary?: string;
    markbot?: boolean;
    watchlist?: "nochange" | "preferences" | "unwatch" | "watch";
    watchlistexpiry?: expiry;
    token?: string;
}

export interface ApiRsdParams extends ApiParams {}

export interface KartographerApiSanitizeMapDataParams extends ApiParams {
    title?: string;
    text?: string;
}

export interface ScribuntoApiScribuntoConsoleParams extends ApiParams {
    title?: string;
    content?: string;
    session?: number;
    question?: string;
    clear?: boolean;
    token?: string;
}

export interface SecurePollApiSecurePollAuthParams extends ApiParams {
    token?: string;
    id?: number;
}

export interface CentralAuthApiSetGlobalAccountStatusParams extends ApiParams {
    user?: string;
    locked?: "" | "lock" | "unlock";
    hidden?: "" | "lists" | "suppressed";
    reason?: string;
    statecheck?: string;
    token?: string;
}

export interface ApiSetNotificationTimestampParams extends ApiParams {
    entirewatchlist?: boolean;
    timestamp?: timestamp;
    torevid?: number;
    newerthanrevid?: number;
    continue?: string;
    titles?: string | string[];
    pageids?: number | number[];
    revids?: number | number[];
    generator?:
        | "allcategories"
        | "alldeletedrevisions"
        | "allfileusages"
        | "allimages"
        | "alllinks"
        | "allpages"
        | "allredirects"
        | "allrevisions"
        | "alltransclusions"
        | "backlinks"
        | "categories"
        | "categorymembers"
        | "contenttranslation"
        | "contenttranslationsuggestions"
        | "deletedrevisions"
        | "duplicatefiles"
        | "embeddedin"
        | "exturlusage"
        | "fileusage"
        | "geosearch"
        | "images"
        | "imageusage"
        | "iwbacklinks"
        | "langbacklinks"
        | "links"
        | "linkshere"
        | "mostviewed"
        | "oldreviewedpages"
        | "pageswithprop"
        | "prefixsearch"
        | "projectpages"
        | "protectedtitles"
        | "querypage"
        | "random"
        | "recentchanges"
        | "redirects"
        | "revisions"
        | "search"
        | "templates"
        | "transcludedin"
        | "watchlist"
        | "watchlistraw"
        | "wblistentityusage"
        | "growthtasks"
        | "readinglistentries";
    redirects?: boolean;
    converttitles?: boolean;
    token?: string;
}

export interface ApiSetPageLanguageParams extends ApiParams {
    title?: string;
    pageid?: number;
    lang?:
        | "aae"
        | "ab"
        | "abs"
        | "ace"
        | "acm"
        | "ady"
        | "ady-cyrl"
        | "aeb"
        | "aeb-arab"
        | "aeb-latn"
        | "af"
        | "aln"
        | "alt"
        | "am"
        | "ami"
        | "an"
        | "ang"
        | "ann"
        | "anp"
        | "ar"
        | "arc"
        | "arn"
        | "arq"
        | "ary"
        | "arz"
        | "as"
        | "ase"
        | "ast"
        | "atj"
        | "av"
        | "avk"
        | "awa"
        | "ay"
        | "az"
        | "azb"
        | "ba"
        | "ban"
        | "ban-bali"
        | "bar"
        | "bbc"
        | "bbc-latn"
        | "bcc"
        | "bci"
        | "bcl"
        | "bdr"
        | "be"
        | "be-tarask"
        | "bew"
        | "bg"
        | "bgn"
        | "bh"
        | "bho"
        | "bi"
        | "bjn"
        | "blk"
        | "bm"
        | "bn"
        | "bo"
        | "bpy"
        | "bqi"
        | "br"
        | "brh"
        | "bs"
        | "btm"
        | "bto"
        | "bug"
        | "bxr"
        | "ca"
        | "cbk-zam"
        | "cdo"
        | "ce"
        | "ceb"
        | "ch"
        | "chr"
        | "chy"
        | "ckb"
        | "co"
        | "cps"
        | "cpx"
        | "cpx-hans"
        | "cpx-hant"
        | "cr"
        | "crh"
        | "crh-cyrl"
        | "crh-latn"
        | "crh-ro"
        | "cs"
        | "csb"
        | "cu"
        | "cv"
        | "cy"
        | "da"
        | "dag"
        | "de"
        | "de-at"
        | "de-ch"
        | "de-formal"
        | "default"
        | "dga"
        | "din"
        | "diq"
        | "dsb"
        | "dtp"
        | "dty"
        | "dv"
        | "dz"
        | "ee"
        | "efi"
        | "egl"
        | "el"
        | "eml"
        | "en"
        | "en-ca"
        | "en-gb"
        | "eo"
        | "es"
        | "es-formal"
        | "et"
        | "eu"
        | "ext"
        | "fa"
        | "fat"
        | "ff"
        | "fi"
        | "fit"
        | "fj"
        | "fo"
        | "fon"
        | "fr"
        | "frc"
        | "frp"
        | "frr"
        | "fur"
        | "fy"
        | "ga"
        | "gaa"
        | "gag"
        | "gan"
        | "gan-hans"
        | "gan-hant"
        | "gcf"
        | "gcr"
        | "gd"
        | "gl"
        | "gld"
        | "glk"
        | "gn"
        | "gom"
        | "gom-deva"
        | "gom-latn"
        | "gor"
        | "got"
        | "gpe"
        | "grc"
        | "gsw"
        | "gu"
        | "guc"
        | "gur"
        | "guw"
        | "gv"
        | "ha"
        | "hak"
        | "haw"
        | "he"
        | "hi"
        | "hif"
        | "hif-latn"
        | "hil"
        | "hno"
        | "hr"
        | "hrx"
        | "hsb"
        | "hsn"
        | "ht"
        | "hu"
        | "hu-formal"
        | "hy"
        | "hyw"
        | "ia"
        | "id"
        | "ie"
        | "ig"
        | "igl"
        | "ii"
        | "ik"
        | "ike-cans"
        | "ike-latn"
        | "ilo"
        | "inh"
        | "io"
        | "is"
        | "it"
        | "iu"
        | "ja"
        | "jam"
        | "jbo"
        | "jut"
        | "jv"
        | "ka"
        | "kaa"
        | "kab"
        | "kai"
        | "kbd"
        | "kbd-cyrl"
        | "kbp"
        | "kcg"
        | "kea"
        | "kg"
        | "kge"
        | "khw"
        | "ki"
        | "kiu"
        | "kjh"
        | "kjp"
        | "kk"
        | "kk-arab"
        | "kk-cn"
        | "kk-cyrl"
        | "kk-kz"
        | "kk-latn"
        | "kk-tr"
        | "kl"
        | "km"
        | "kn"
        | "ko"
        | "ko-kp"
        | "koi"
        | "kr"
        | "krc"
        | "kri"
        | "krj"
        | "krl"
        | "ks"
        | "ks-arab"
        | "ks-deva"
        | "ksh"
        | "ksw"
        | "ku"
        | "ku-arab"
        | "ku-latn"
        | "kum"
        | "kus"
        | "kv"
        | "kw"
        | "ky"
        | "la"
        | "lad"
        | "lb"
        | "lbe"
        | "lez"
        | "lfn"
        | "lg"
        | "li"
        | "lij"
        | "liv"
        | "lki"
        | "lld"
        | "lmo"
        | "ln"
        | "lo"
        | "loz"
        | "lrc"
        | "lt"
        | "ltg"
        | "lus"
        | "luz"
        | "lv"
        | "lzh"
        | "lzz"
        | "mad"
        | "mag"
        | "mai"
        | "map-bms"
        | "mdf"
        | "mg"
        | "mhr"
        | "mi"
        | "min"
        | "mk"
        | "ml"
        | "mn"
        | "mnc"
        | "mnc-mong"
        | "mni"
        | "mnw"
        | "mo"
        | "mos"
        | "mr"
        | "mrh"
        | "mrj"
        | "ms"
        | "ms-arab"
        | "mt"
        | "mwl"
        | "my"
        | "myv"
        | "mzn"
        | "na"
        | "nah"
        | "nan"
        | "nap"
        | "nb"
        | "nds"
        | "nds-nl"
        | "ne"
        | "new"
        | "nia"
        | "nit"
        | "niu"
        | "nl"
        | "nl-informal"
        | "nmz"
        | "nn"
        | "nod"
        | "nog"
        | "nov"
        | "nqo"
        | "nrm"
        | "nso"
        | "nv"
        | "ny"
        | "nyn"
        | "nyo"
        | "nys"
        | "oc"
        | "ojb"
        | "olo"
        | "om"
        | "or"
        | "os"
        | "pa"
        | "pag"
        | "pam"
        | "pap"
        | "pcd"
        | "pcm"
        | "pdc"
        | "pdt"
        | "pfl"
        | "pi"
        | "pih"
        | "pl"
        | "pms"
        | "pnb"
        | "pnt"
        | "prg"
        | "ps"
        | "pt"
        | "pt-br"
        | "pwn"
        | "qu"
        | "qug"
        | "rgn"
        | "rif"
        | "rki"
        | "rm"
        | "rmc"
        | "rmy"
        | "rn"
        | "ro"
        | "roa-tara"
        | "rsk"
        | "ru"
        | "rue"
        | "rup"
        | "ruq"
        | "ruq-cyrl"
        | "ruq-latn"
        | "rut"
        | "rw"
        | "ryu"
        | "sa"
        | "sah"
        | "sat"
        | "sc"
        | "scn"
        | "sco"
        | "sd"
        | "sdc"
        | "sdh"
        | "se"
        | "se-fi"
        | "se-no"
        | "se-se"
        | "sei"
        | "ses"
        | "sg"
        | "sgs"
        | "sh"
        | "sh-cyrl"
        | "sh-latn"
        | "shi"
        | "shn"
        | "shy"
        | "shy-latn"
        | "si"
        | "sjd"
        | "sje"
        | "sk"
        | "skr"
        | "skr-arab"
        | "sl"
        | "sli"
        | "sm"
        | "sma"
        | "smn"
        | "sms"
        | "sn"
        | "so"
        | "sq"
        | "sr"
        | "sr-ec"
        | "sr-el"
        | "srn"
        | "sro"
        | "ss"
        | "st"
        | "stq"
        | "sty"
        | "su"
        | "sv"
        | "sw"
        | "syl"
        | "szl"
        | "szy"
        | "ta"
        | "tay"
        | "tcy"
        | "tdd"
        | "te"
        | "tet"
        | "tg"
        | "tg-cyrl"
        | "tg-latn"
        | "th"
        | "ti"
        | "tk"
        | "tl"
        | "tly"
        | "tn"
        | "to"
        | "tok"
        | "tpi"
        | "tr"
        | "tru"
        | "trv"
        | "ts"
        | "tt"
        | "tt-cyrl"
        | "tt-latn"
        | "ttj"
        | "tum"
        | "tw"
        | "ty"
        | "tyv"
        | "tzm"
        | "udm"
        | "ug"
        | "ug-arab"
        | "ug-latn"
        | "uk"
        | "ur"
        | "uz"
        | "ve"
        | "vec"
        | "vep"
        | "vi"
        | "vls"
        | "vmf"
        | "vmw"
        | "vo"
        | "vot"
        | "vro"
        | "wa"
        | "wal"
        | "war"
        | "wls"
        | "wo"
        | "wuu"
        | "wuu-hans"
        | "wuu-hant"
        | "xal"
        | "xh"
        | "xmf"
        | "xsy"
        | "yi"
        | "yo"
        | "yrl"
        | "yue"
        | "yue-hans"
        | "yue-hant"
        | "za"
        | "zea"
        | "zgh"
        | "zh"
        | "zh-cn"
        | "zh-hans"
        | "zh-hant"
        | "zh-hk"
        | "zh-mo"
        | "zh-my"
        | "zh-sg"
        | "zh-tw"
        | "zu";
    reason?: string;
    tags?: string | string[];
    token?: string;
}

export interface UrlShortenerApiShortenUrlParams extends ApiParams {
    url?: string;
    qrcode?: boolean;
}

export interface SiteMatrixApiSiteMatrixParams extends ApiParams {
    smtype?: OneOrMore<"language" | "special">;
    smstate?: OneOrMore<"all" | "closed" | "fishbowl" | "nonglobal" | "private">;
    smlangprop?: OneOrMore<"code" | "dir" | "localname" | "name" | "site">;
    smsiteprop?: OneOrMore<"code" | "dbname" | "lang" | "sitename" | "url">;
    smlimit?: limit;
    smcontinue?: string;
}

export interface SpamBlacklistApiSpamBlacklistParams extends ApiParams {
    url?: string | string[];
}

export interface ApiStabilizeProtectParams extends ApiParams {
    protectlevel?: "autoconfirmed" | "none";
    expiry?: string;
    reason?: string;
    title?: string;
    token?: string;
}

export interface ApiStashEditParams extends ApiParams {
    title?: string;
    section?: string;
    sectiontitle?: string;
    text?: string;
    stashedtexthash?: string;
    summary?: string;
    contentmodel?:
        | "GadgetDefinition"
        | "JsonSchema"
        | "MassMessageListContent"
        | "Scribunto"
        | "SecurePoll"
        | "css"
        | "javascript"
        | "json"
        | "sanitized-css"
        | "text"
        | "unknown"
        | "wikitext";
    contentformat?:
        | "application/json"
        | "application/octet-stream"
        | "application/unknown"
        | "application/x-binary"
        | "text/css"
        | "text/javascript"
        | "text/plain"
        | "text/unknown"
        | "text/x-wiki"
        | "unknown/unknown";
    baserevid?: number;
    token?: string;
}

export interface EventStreamConfigApiStreamConfigsParams extends ApiParams {
    streams?: string | string[];
    constraints?: string | string[];
    all_settings?: boolean;
}

export interface SecurePollApiStrikeVoteParams extends ApiParams {
    option?: "strike" | "unstrike";
    reason?: string;
    voteid?: number;
    token?: string;
}

export interface ContentTranslationActionApiSectionTranslationDeleteParams extends ApiParams {
    sectiontranslationid?: number;
    translationid?: number;
    sectionid?: string;
    token?: string;
}

export interface ContentTranslationActionApiSectionTranslationSaveParams extends ApiParams {
    sourcelanguage?: string;
    targetlanguage?: string;
    sourcetitle?: string;
    targettitle?: string;
    content?: string;
    sourcerevision?: number;
    sourcesectiontitle?: string;
    targetsectiontitle?: string;
    sectionid?: string;
    issandbox?: boolean;
    progress?: string;
    token?: string;
}

export interface ApiTagParams extends ApiParams {
    rcid?: number | number[];
    revid?: number | number[];
    logid?: number | number[];
    add?: OneOrMore<
        | "AWB"
        | "AntiVandal script"
        | "Deputy"
        | "Newcomer task"
        | "ProveIt edit"
        | "RedWarn"
        | "STiki"
        | "Single use"
        | "Ultraviolet"
        | "WPCleaner"
        | "WikiLoop Battlefield"
        | "bot trial"
        | "convenient-discussions"
        | "editProtectedHelper"
        | "fixed lint errors"
        | "huggle"
        | "large non-free file"
        | "moveToDraft"
        | "new user moving page out of userspace"
        | "possible birth or death date change"
        | "pronoun-change"
        | "self-published-blog"
        | "self-published source"
        | "shortdesc helper"
        | "talk banner shell conversion"
        | "twinkle"
    >;
    remove?: string | string[];
    reason?: string;
    tags?: string | string[];
    token?: string;
}

export interface TemplateDataApiTemplateDataParams extends ApiParams {
    includeMissingTitles?: boolean;
    doNotIgnoreMissingTitles?: boolean;
    lang?: string;
    titles?: string | string[];
    pageids?: number | number[];
    revids?: number | number[];
    generator?:
        | "allcategories"
        | "alldeletedrevisions"
        | "allfileusages"
        | "allimages"
        | "alllinks"
        | "allpages"
        | "allredirects"
        | "allrevisions"
        | "alltransclusions"
        | "backlinks"
        | "categories"
        | "categorymembers"
        | "contenttranslation"
        | "contenttranslationsuggestions"
        | "deletedrevisions"
        | "duplicatefiles"
        | "embeddedin"
        | "exturlusage"
        | "fileusage"
        | "geosearch"
        | "images"
        | "imageusage"
        | "iwbacklinks"
        | "langbacklinks"
        | "links"
        | "linkshere"
        | "mostviewed"
        | "oldreviewedpages"
        | "pageswithprop"
        | "prefixsearch"
        | "projectpages"
        | "protectedtitles"
        | "querypage"
        | "random"
        | "recentchanges"
        | "redirects"
        | "revisions"
        | "search"
        | "templates"
        | "transcludedin"
        | "watchlist"
        | "watchlistraw"
        | "wblistentityusage"
        | "growthtasks"
        | "readinglistentries";
    redirects?: boolean;
    converttitles?: boolean;
}

export interface ThanksApiCoreThankParams extends ApiParams {
    rev?: number;
    log?: number;
    token?: string;
    source?: string;
}

export interface MediaWikiTimedMediaHandlerApiTimedTextParams extends ApiParams {
    title?: string;
    pageid?: number;
    trackformat?: "srt" | "vtt";
    lang?: string;
}

export interface TitleBlacklistApiTitleBlacklistParams extends ApiParams {
    tbtitle?: string;
    tbaction?: "create" | "createpage" | "createtalk" | "edit" | "move" | "new-account" | "upload";
    tbnooverride?: boolean;
}

export interface TorBlockApiTorBlockParams extends ApiParams {
    ip?: string;
}

export interface MediaWikiTimedMediaHandlerApiTranscodeResetParams extends ApiParams {
    title?: string;
    transcodekey?: string;
    token?: string;
}

export interface UniversalLanguageSelectorApiULSLocalizationParams extends ApiParams {
    language?: string;
}

export interface UniversalLanguageSelectorApiULSSetLanguageParams extends ApiParams {
    languagecode?: string;
    token?: string;
}

export interface ApiUnblockParams extends ApiParams {
    id?: number;
    user?: string;
    userid?: number;
    reason?: string;
    tags?: string | string[];
    watchuser?: boolean;
    watchlistexpiry?: expiry;
    token?: string;
}

export interface ApiUndeleteParams extends ApiParams {
    title?: string;
    reason?: string;
    tags?: string | string[];
    timestamps?: timestamp | timestamp[];
    fileids?: number | number[];
    undeletetalk?: boolean;
    watchlist?: "nochange" | "preferences" | "unwatch" | "watch";
    watchlistexpiry?: expiry;
    token?: string;
}

export interface ApiRemoveAuthenticationDataParams extends ApiParams {
    request?: string;
    token?: string;
}

export interface ApiUploadParams extends ApiParams {
    filename?: string;
    comment?: string;
    tags?: string | string[];
    text?: string;
    watch?: boolean;
    watchlist?: "nochange" | "preferences" | "watch";
    watchlistexpiry?: expiry;
    ignorewarnings?: boolean;
    file?: upload;
    url?: string;
    filekey?: string;
    sessionkey?: string;
    stash?: boolean;
    filesize?: number;
    offset?: number;
    chunk?: upload;
    async?: boolean;
    checkstatus?: boolean;
    token?: string;
}

export interface ApiUserrightsParams extends ApiParams {
    user?: string;
    userid?: number;
    add?: OneOrMore<
        | "abusefilter"
        | "abusefilter-helper"
        | "accountcreator"
        | "autoreviewer"
        | "bot"
        | "bureaucrat"
        | "checkuser"
        | "confirmed"
        | "copyviobot"
        | "eventcoordinator"
        | "extendedconfirmed"
        | "extendedmover"
        | "filemover"
        | "founder"
        | "import"
        | "interface-admin"
        | "ipblock-exempt"
        | "massmessage-sender"
        | "no-ipinfo"
        | "patroller"
        | "push-subscription-manager"
        | "researcher"
        | "reviewer"
        | "rollbacker"
        | "steward"
        | "suppress"
        | "sysop"
        | "templateeditor"
        | "transwiki"
    >;
    expiry?: string | string[];
    remove?: OneOrMore<
        | "abusefilter"
        | "abusefilter-helper"
        | "accountcreator"
        | "autoreviewer"
        | "bot"
        | "bureaucrat"
        | "checkuser"
        | "confirmed"
        | "copyviobot"
        | "eventcoordinator"
        | "extendedconfirmed"
        | "extendedmover"
        | "filemover"
        | "founder"
        | "import"
        | "interface-admin"
        | "ipblock-exempt"
        | "massmessage-sender"
        | "no-ipinfo"
        | "patroller"
        | "push-subscription-manager"
        | "researcher"
        | "reviewer"
        | "rollbacker"
        | "steward"
        | "suppress"
        | "sysop"
        | "templateeditor"
        | "transwiki"
    >;
    reason?: string;
    token?: string;
    tags?: string | string[];
    watchuser?: boolean;
    watchlistexpiry?: expiry;
}

export interface ApiValidatePasswordParams extends ApiParams {
    password?: password;
    user?: string;
    email?: string;
    realname?: string;
}

export interface VisualEditorApiVisualEditorParams extends ApiParams {
    page?: string;
    badetag?: string;
    format?: "json" | "jsonfm";
    paction?: "metadata" | "parse" | "parsefragment" | "templatesused" | "wikitext";
    wikitext?: string;
    section?: string;
    stash?: boolean;
    oldid?: number;
    editintro?: string;
    pst?: boolean;
    preload?: string;
    preloadparams?: string | string[];
}

export interface VisualEditorApiVisualEditorEditParams extends ApiParams {
    paction?: "diff" | "save" | "serialize" | "serializeforcache";
    page?: string;
    token?: string;
    wikitext?: string;
    section?: string;
    sectiontitle?: string;
    basetimestamp?: timestamp;
    starttimestamp?: timestamp;
    oldid?: number;
    minor?: string;
    watchlist?: string;
    html?: string;
    etag?: string;
    summary?: string;
    captchaid?: string;
    captchaword?: string;
    cachekey?: string;
    nocontent?: boolean;
    returnto?: string;
    returntoquery?: string;
    returntoanchor?: string;
    useskin?:
        | "apioutput"
        | "cologneblue"
        | "contenttranslation"
        | "fallback"
        | "minerva"
        | "modern"
        | "monobook"
        | "timeless"
        | "vector"
        | "vector-2022";
    tags?: string | string[];
    plugins?: string | string[];
    mobileformat?: boolean;
}

export interface ApiWatchParams extends ApiParams {
    title?: string;
    expiry?: expiry;
    unwatch?: boolean;
    continue?: string;
    titles?: string | string[];
    pageids?: number | number[];
    revids?: number | number[];
    generator?:
        | "allcategories"
        | "alldeletedrevisions"
        | "allfileusages"
        | "allimages"
        | "alllinks"
        | "allpages"
        | "allredirects"
        | "allrevisions"
        | "alltransclusions"
        | "backlinks"
        | "categories"
        | "categorymembers"
        | "contenttranslation"
        | "contenttranslationsuggestions"
        | "deletedrevisions"
        | "duplicatefiles"
        | "embeddedin"
        | "exturlusage"
        | "fileusage"
        | "geosearch"
        | "images"
        | "imageusage"
        | "iwbacklinks"
        | "langbacklinks"
        | "links"
        | "linkshere"
        | "mostviewed"
        | "oldreviewedpages"
        | "pageswithprop"
        | "prefixsearch"
        | "projectpages"
        | "protectedtitles"
        | "querypage"
        | "random"
        | "recentchanges"
        | "redirects"
        | "revisions"
        | "search"
        | "templates"
        | "transcludedin"
        | "watchlist"
        | "watchlistraw"
        | "wblistentityusage"
        | "growthtasks"
        | "readinglistentries";
    redirects?: boolean;
    converttitles?: boolean;
    token?: string;
}

export interface MobileFrontendApiWebappManifestParams extends ApiParams {}

export interface WebAuthnApiWebAuthnParams extends ApiParams {
    func?: "getAuthInfo" | "getRegisterInfo";
}

export interface WikiLoveApiWikiLoveParams extends ApiParams {
    title?: string;
    text?: string;
    message?: string;
    token?: string;
    subject?: string;
    type?: string;
    email?: string;
    tags?: string | string[];
}

export interface WikimediaEventsApiWikimediaEventsBlockedEditParams extends ApiParams {
    page?: string;
    interface?: "discussiontools" | "mobilefrontend" | "other" | "visualeditor" | "wikieditor";
    platform?: "desktop" | "mobile";
}

export interface ApiFormatXmlParams extends ApiParams {
    xslt?: string;
    includexmlnamespace?: boolean;
}

export interface ApiFormatXmlParams extends ApiParams {
    wrappedhtml?: boolean;
    xslt?: string;
    includexmlnamespace?: boolean;
}

export interface AbuseFilterApiQueryAbuseFiltersParams extends ApiQueryParams {
    abfstartid?: number;
    abfendid?: number;
    abfdir?: "newer" | "older";
    abfshow?: OneOrMore<"!deleted" | "!enabled" | "!private" | "deleted" | "enabled" | "private">;
    abflimit?: limit;
    abfprop?: OneOrMore<
        | "actions"
        | "comments"
        | "description"
        | "hits"
        | "id"
        | "lasteditor"
        | "lastedittime"
        | "pattern"
        | "private"
        | "status"
    >;
}

export interface AbuseFilterApiQueryAbuseLogParams extends ApiQueryParams {
    afllogid?: number;
    aflstart?: timestamp;
    aflend?: timestamp;
    afldir?: "newer" | "older";
    afluser?: string;
    afltitle?: string;
    aflfilter?: string | string[];
    afllimit?: limit;
    aflprop?: OneOrMore<
        | "action"
        | "details"
        | "filter"
        | "hidden"
        | "ids"
        | "result"
        | "revid"
        | "timestamp"
        | "title"
        | "user"
    >;
}

export interface ApiQueryAllCategoriesParams extends ApiQueryParams {
    acfrom?: string;
    accontinue?: string;
    acto?: string;
    acprefix?: string;
    acdir?: "ascending" | "descending";
    acmin?: number;
    acmax?: number;
    aclimit?: limit;
    acprop?: OneOrMore<"hidden" | "size">;
}

export interface ApiQueryAllDeletedRevisionsParams extends ApiQueryParams {
    adrprop?: OneOrMore<
        | "comment"
        | "content"
        | "contentmodel"
        | "flags"
        | "ids"
        | "parsedcomment"
        | "roles"
        | "sha1"
        | "size"
        | "slotsha1"
        | "slotsize"
        | "tags"
        | "timestamp"
        | "user"
        | "userid"
        | "parsetree"
    >;
    adrslots?: OneOrMore<"main">;
    adrlimit?: limit;
    adrexpandtemplates?: boolean;
    adrgeneratexml?: boolean;
    adrparse?: boolean;
    adrsection?: string;
    adrdiffto?: string;
    adrdifftotext?: string;
    adrdifftotextpst?: boolean;
    adrcontentformat?:
        | "application/json"
        | "application/octet-stream"
        | "application/unknown"
        | "application/x-binary"
        | "text/css"
        | "text/javascript"
        | "text/plain"
        | "text/unknown"
        | "text/x-wiki"
        | "unknown/unknown";
    adruser?: string;
    adrnamespace?: namespace | namespace[];
    adrstart?: timestamp;
    adrend?: timestamp;
    adrdir?: "newer" | "older";
    adrfrom?: string;
    adrto?: string;
    adrprefix?: string;
    adrexcludeuser?: string;
    adrtag?: string;
    adrcontinue?: string;
    adrgeneratetitles?: boolean;
}

export interface ApiQueryAllLinksParams extends ApiQueryParams {
    afcontinue?: string;
    affrom?: string;
    afto?: string;
    afprefix?: string;
    afunique?: boolean;
    afprop?: OneOrMore<"ids" | "title">;
    aflimit?: limit;
    afdir?: "ascending" | "descending";
}

export interface ApiQueryAllImagesParams extends ApiQueryParams {
    aisort?: "name" | "timestamp";
    aidir?: "ascending" | "descending" | "newer" | "older";
    aifrom?: string;
    aito?: string;
    aicontinue?: string;
    aistart?: timestamp;
    aiend?: timestamp;
    aiprop?: OneOrMore<
        | "badfile"
        | "bitdepth"
        | "canonicaltitle"
        | "comment"
        | "commonmetadata"
        | "dimensions"
        | "extmetadata"
        | "mediatype"
        | "metadata"
        | "mime"
        | "parsedcomment"
        | "sha1"
        | "size"
        | "timestamp"
        | "url"
        | "user"
        | "userid"
    >;
    aiprefix?: string;
    aiminsize?: number;
    aimaxsize?: number;
    aisha1?: string;
    aisha1base36?: string;
    aiuser?: string;
    aifilterbots?: "all" | "bots" | "nobots";
    aimime?: string | string[];
    ailimit?: limit;
}

export interface ApiQueryAllLinksParams extends ApiQueryParams {
    alcontinue?: string;
    alfrom?: string;
    alto?: string;
    alprefix?: string;
    alunique?: boolean;
    alprop?: OneOrMore<"ids" | "title">;
    alnamespace?: namespace;
    allimit?: limit;
    aldir?: "ascending" | "descending";
}

export interface ApiQueryAllMessagesParams extends ApiQueryParams {
    ammessages?: string | string[];
    amprop?: OneOrMore<"default">;
    amenableparser?: boolean;
    amnocontent?: boolean;
    amincludelocal?: boolean;
    amargs?: string | string[];
    amfilter?: string;
    amcustomised?: "all" | "modified" | "unmodified";
    amlang?: string;
    amfrom?: string;
    amto?: string;
    amtitle?: string;
    amprefix?: string;
}

export interface ApiQueryAllPagesParams extends ApiQueryParams {
    apfrom?: string;
    apcontinue?: string;
    apto?: string;
    apprefix?: string;
    apnamespace?: namespace;
    apfilterredir?: "all" | "nonredirects" | "redirects";
    apfilterlanglinks?: "all" | "withlanglinks" | "withoutlanglinks";
    apminsize?: number;
    apmaxsize?: number;
    apprtype?: OneOrMore<"edit" | "move" | "upload">;
    apprlevel?: OneOrMore<"" | "autoconfirmed" | "extendedconfirmed" | "sysop" | "templateeditor">;
    apprfiltercascade?: "all" | "cascading" | "noncascading";
    apprexpiry?: "all" | "definite" | "indefinite";
    aplimit?: limit;
    apdir?: "ascending" | "descending";
}

export interface ApiQueryAllLinksParams extends ApiQueryParams {
    arcontinue?: string;
    arfrom?: string;
    arto?: string;
    arprefix?: string;
    arunique?: boolean;
    arprop?: OneOrMore<"fragment" | "ids" | "interwiki" | "title">;
    arnamespace?: namespace;
    arlimit?: limit;
    ardir?: "ascending" | "descending";
}

export interface ApiQueryAllRevisionsParams extends ApiQueryParams {
    arvprop?: OneOrMore<
        | "comment"
        | "content"
        | "contentmodel"
        | "flags"
        | "ids"
        | "oresscores"
        | "parsedcomment"
        | "roles"
        | "sha1"
        | "size"
        | "slotsha1"
        | "slotsize"
        | "tags"
        | "timestamp"
        | "user"
        | "userid"
        | "parsetree"
    >;
    arvslots?: OneOrMore<"main">;
    arvlimit?: limit;
    arvexpandtemplates?: boolean;
    arvgeneratexml?: boolean;
    arvparse?: boolean;
    arvsection?: string;
    arvdiffto?: string;
    arvdifftotext?: string;
    arvdifftotextpst?: boolean;
    arvcontentformat?:
        | "application/json"
        | "application/octet-stream"
        | "application/unknown"
        | "application/x-binary"
        | "text/css"
        | "text/javascript"
        | "text/plain"
        | "text/unknown"
        | "text/x-wiki"
        | "unknown/unknown";
    arvuser?: string;
    arvnamespace?: namespace | namespace[];
    arvstart?: timestamp;
    arvend?: timestamp;
    arvdir?: "newer" | "older";
    arvexcludeuser?: string;
    arvcontinue?: string;
    arvgeneratetitles?: boolean;
}

export interface ApiQueryAllLinksParams extends ApiQueryParams {
    atcontinue?: string;
    atfrom?: string;
    atto?: string;
    atprefix?: string;
    atunique?: boolean;
    atprop?: OneOrMore<"ids" | "title">;
    atnamespace?: namespace;
    atlimit?: limit;
    atdir?: "ascending" | "descending";
}

export interface ApiQueryAllUsersParams extends ApiQueryParams {
    aufrom?: string;
    auto?: string;
    auprefix?: string;
    audir?: "ascending" | "descending";
    augroup?: OneOrMore<
        | "abusefilter"
        | "abusefilter-helper"
        | "accountcreator"
        | "autoreviewer"
        | "bot"
        | "bureaucrat"
        | "checkuser"
        | "confirmed"
        | "copyviobot"
        | "eventcoordinator"
        | "extendedconfirmed"
        | "extendedmover"
        | "filemover"
        | "founder"
        | "import"
        | "interface-admin"
        | "ipblock-exempt"
        | "massmessage-sender"
        | "no-ipinfo"
        | "patroller"
        | "push-subscription-manager"
        | "researcher"
        | "reviewer"
        | "rollbacker"
        | "steward"
        | "suppress"
        | "sysop"
        | "templateeditor"
        | "transwiki"
    >;
    auexcludegroup?: OneOrMore<
        | "abusefilter"
        | "abusefilter-helper"
        | "accountcreator"
        | "autoreviewer"
        | "bot"
        | "bureaucrat"
        | "checkuser"
        | "confirmed"
        | "copyviobot"
        | "eventcoordinator"
        | "extendedconfirmed"
        | "extendedmover"
        | "filemover"
        | "founder"
        | "import"
        | "interface-admin"
        | "ipblock-exempt"
        | "massmessage-sender"
        | "no-ipinfo"
        | "patroller"
        | "push-subscription-manager"
        | "researcher"
        | "reviewer"
        | "rollbacker"
        | "steward"
        | "suppress"
        | "sysop"
        | "templateeditor"
        | "transwiki"
    >;
    aurights?: OneOrMore<
        | "abusefilter-bypass-blocked-external-domains"
        | "abusefilter-hidden-log"
        | "abusefilter-hide-log"
        | "abusefilter-log"
        | "abusefilter-log-detail"
        | "abusefilter-log-private"
        | "abusefilter-modify"
        | "abusefilter-modify-blocked-external-domains"
        | "abusefilter-modify-global"
        | "abusefilter-modify-restricted"
        | "abusefilter-privatedetails"
        | "abusefilter-privatedetails-log"
        | "abusefilter-revert"
        | "abusefilter-view"
        | "abusefilter-view-private"
        | "apihighlimits"
        | "applychangetags"
        | "autoconfirmed"
        | "autocreateaccount"
        | "autopatrol"
        | "autoreview"
        | "autoreviewrestore"
        | "badcaptcha"
        | "badoath"
        | "bigdelete"
        | "block"
        | "blockemail"
        | "bot"
        | "browsearchive"
        | "centralauth-createlocal"
        | "centralauth-lock"
        | "centralauth-merge"
        | "centralauth-rename"
        | "centralauth-suppress"
        | "centralauth-unmerge"
        | "changeemail"
        | "changetags"
        | "checkuser"
        | "checkuser-log"
        | "checkuser-temporary-account"
        | "checkuser-temporary-account-log"
        | "checkuser-temporary-account-no-preference"
        | "collectionsaveascommunitypage"
        | "collectionsaveasuserpage"
        | "confirmemail"
        | "createaccount"
        | "createpage"
        | "createpagemainns"
        | "createtalk"
        | "delete"
        | "delete-redirect"
        | "deletechangetags"
        | "deletedhistory"
        | "deletedtext"
        | "deletelogentry"
        | "deleterevision"
        | "edit"
        | "editautopatrolprotected"
        | "editautoreviewprotected"
        | "editcontentmodel"
        | "editeditorprotected"
        | "editextendedsemiprotected"
        | "editinterface"
        | "editmyoptions"
        | "editmyprivateinfo"
        | "editmyusercss"
        | "editmyuserjs"
        | "editmyuserjson"
        | "editmyuserjsredirect"
        | "editmywatchlist"
        | "editprotected"
        | "editsemiprotected"
        | "editsitecss"
        | "editsitejs"
        | "editsitejson"
        | "edittrustedprotected"
        | "editusercss"
        | "edituserjs"
        | "edituserjson"
        | "enrollasmentor"
        | "extendedconfirmed"
        | "flow-create-board"
        | "flow-delete"
        | "flow-edit-post"
        | "flow-hide"
        | "flow-suppress"
        | "gadgets-definition-edit"
        | "globalblock"
        | "globalblock-exempt"
        | "globalblock-whitelist"
        | "globalgroupmembership"
        | "globalgrouppermissions"
        | "growthexperiments-apiqueryimagesuggestiondata"
        | "growthexperimentsuserimpacthandler"
        | "growthmentordashboardupdatedata"
        | "hideuser"
        | "import"
        | "importupload"
        | "ipblock-exempt"
        | "ipinfo"
        | "ipinfo-view-basic"
        | "ipinfo-view-full"
        | "ipinfo-view-log"
        | "linkpurge"
        | "mailpassword"
        | "manage-all-push-subscriptions"
        | "managechangetags"
        | "managementors"
        | "markbotedits"
        | "massmessage"
        | "mergehistory"
        | "minoredit"
        | "move"
        | "move-categorypages"
        | "move-rootuserpages"
        | "move-subpages"
        | "movefile"
        | "movestable"
        | "mwoauthmanageconsumer"
        | "mwoauthmanagemygrants"
        | "mwoauthproposeconsumer"
        | "mwoauthsuppress"
        | "mwoauthupdateownconsumer"
        | "mwoauthviewprivate"
        | "mwoauthviewsuppressed"
        | "newsletter-create"
        | "newsletter-delete"
        | "newsletter-manage"
        | "newsletter-restore"
        | "nominornewtalk"
        | "noratelimit"
        | "nuke"
        | "oathauth-api-all"
        | "oathauth-disable-for-user"
        | "oathauth-enable"
        | "oathauth-verify-user"
        | "oathauth-view-log"
        | "override-antispoof"
        | "override-export-depth"
        | "pagelang"
        | "pagetriage-copyvio"
        | "pagetriage-mark-action"
        | "pagetriage-tagging-action"
        | "patrol"
        | "patrolmarks"
        | "protect"
        | "purge"
        | "read"
        | "renameuser"
        | "renderfile"
        | "renderfile-nonstandard"
        | "reupload"
        | "reupload-own"
        | "reupload-shared"
        | "review"
        | "rollback"
        | "sboverride"
        | "securepoll-create-poll"
        | "securepoll-view-voter-pii"
        | "sendemail"
        | "setmentor"
        | "sfsblock-bypass"
        | "siteadmin"
        | "skipcaptcha"
        | "spamblacklistlog"
        | "stablesettings"
        | "stashbasehtml"
        | "stashedit"
        | "suppressionlog"
        | "suppressredirect"
        | "suppressrevision"
        | "tboverride"
        | "tboverride-account"
        | "templateeditor"
        | "thanks-notification"
        | "titleblacklistlog"
        | "torunblocked"
        | "transcode-reset"
        | "transcode-status"
        | "unblockself"
        | "undelete"
        | "unreviewedpages"
        | "unwatchedpages"
        | "upload"
        | "upload_by_url"
        | "urlshortcode"
        | "urlshortener-create-url"
        | "urlshortener-manage-url"
        | "urlshortener-view-log"
        | "userrights"
        | "userrights-interwiki"
        | "validate"
        | "viewdeletedfile"
        | "viewmyprivateinfo"
        | "viewmywatchlist"
        | "viewsuppressed"
        | "vipsscaler-test"
        | "writeapi"
    >;
    auprop?: OneOrMore<
        | "blockinfo"
        | "centralids"
        | "editcount"
        | "groups"
        | "implicitgroups"
        | "registration"
        | "rights"
    >;
    aulimit?: limit;
    auwitheditsonly?: boolean;
    auactiveusers?: boolean;
    auattachedwiki?: string;
}

export interface ApiQueryAuthManagerInfoParams extends ApiQueryParams {
    amisecuritysensitiveoperation?: string;
    amirequestsfor?:
        | "change"
        | "create"
        | "create-continue"
        | "link"
        | "link-continue"
        | "login"
        | "login-continue"
        | "remove"
        | "unlink";
    amimergerequestfields?: boolean;
    amimessageformat?: "html" | "none" | "raw" | "wikitext";
}

export interface MediaWikiBabelApiQueryBabelParams extends ApiQueryParams {
    babuser?: string;
}

export interface ApiQueryBacklinksParams extends ApiQueryParams {
    bltitle?: string;
    blpageid?: number;
    blcontinue?: string;
    blnamespace?: namespace | namespace[];
    bldir?: "ascending" | "descending";
    blfilterredir?: "all" | "nonredirects" | "redirects";
    bllimit?: limit;
    blredirect?: boolean;
}

export interface BetaFeaturesApiQueryBetaFeaturesParams extends ApiQueryParams {
    bfcounts?: string;
}

export interface ApiQueryBlocksParams extends ApiQueryParams {
    bkstart?: timestamp;
    bkend?: timestamp;
    bkdir?: "newer" | "older";
    bkids?: number | number[];
    bkusers?: string | string[];
    bkip?: string;
    bklimit?: limit;
    bkprop?: OneOrMore<
        | "by"
        | "byid"
        | "expiry"
        | "flags"
        | "id"
        | "range"
        | "reason"
        | "restrictions"
        | "timestamp"
        | "user"
        | "userid"
    >;
    bkshow?: OneOrMore<
        "!account" | "!ip" | "!range" | "!temp" | "account" | "ip" | "range" | "temp"
    >;
    bkcontinue?: string;
}

export interface ApiQueryCategoriesParams extends ApiQueryParams {
    clprop?: OneOrMore<"hidden" | "sortkey" | "timestamp">;
    clshow?: OneOrMore<"!hidden" | "hidden">;
    cllimit?: limit;
    clcontinue?: string;
    clcategories?: string | string[];
    cldir?: "ascending" | "descending";
}

export interface ApiQueryCategoryInfoParams extends ApiQueryParams {
    cicontinue?: string;
}

export interface ApiQueryCategoryMembersParams extends ApiQueryParams {
    cmtitle?: string;
    cmpageid?: number;
    cmprop?: OneOrMore<"ids" | "sortkey" | "sortkeyprefix" | "timestamp" | "title" | "type">;
    cmnamespace?: namespace | namespace[];
    cmtype?: OneOrMore<"file" | "page" | "subcat">;
    cmcontinue?: string;
    cmlimit?: limit;
    cmsort?: "sortkey" | "timestamp";
    cmdir?: "asc" | "ascending" | "desc" | "descending" | "newer" | "older";
    cmstart?: timestamp;
    cmend?: timestamp;
    cmstarthexsortkey?: string;
    cmendhexsortkey?: string;
    cmstartsortkeyprefix?: string;
    cmendsortkeyprefix?: string;
    cmstartsortkey?: string;
    cmendsortkey?: string;
}

export interface ApiCentralNoticeQueryActiveCampaignsParams extends ApiQueryParams {
    cnacincludefuture?: boolean;
}

export interface ApiCentralNoticeLogsParams extends ApiQueryParams {
    campaign?: string;
    user?: string;
    limit?: limit;
    offset?: number;
    start?: timestamp;
    end?: timestamp;
}

export interface MediaWikiCheckUserApiQueryCheckUserParams extends ApiQueryParams {
    curequest?: "actions" | "ipusers" | "userips" | "edits";
    cutarget?: string;
    cureason?: string;
    culimit?: limit;
    cutimecond?: string;
    cuxff?: string;
    cutoken?: string;
}

export interface MediaWikiCheckUserApiQueryCheckUserLogParams extends ApiQueryParams {
    culuser?: string;
    cultarget?: string;
    culreason?: string;
    cullimit?: limit;
    culdir?: "newer" | "older";
    culfrom?: timestamp;
    culto?: timestamp;
    culcontinue?: string;
}

export interface CirrusSearchApiQueryBuildDocumentParams extends ApiQueryParams {
    cbbuilders?: OneOrMore<"content" | "links">;
    cblimiterprofile?: string;
}

export interface CirrusSearchApiQueryCompSuggestBuildDocParams extends ApiQueryParams {
    csbmethod?: string;
}

export interface CirrusSearchApiQueryCirrusDocParams extends ApiQueryParams {
    cdincludes?: string | string[];
}

export interface ContentTranslationActionApiQueryContentTranslationParams extends ApiQueryParams {
    translationid?: string;
    from?: string;
    to?: string;
    sourcetitle?: string;
    sourcesectiontitle?: string;
    limit?: limit;
    offset?: string;
    type?: "draft" | "published";
    usecase?: "desktop-editor-draft" | "translation-corpora-units" | "unified-dashboard";
}

export interface ContentTranslationActionApiQueryContentTranslationCorporaParams
    extends ApiQueryParams {
    translationid?: number;
    striphtml?: boolean;
    types?: OneOrMore<"mt" | "source" | "user">;
}

export interface ContentTranslationActionApiQueryContentTranslationLanguageTrendParams
    extends ApiQueryParams {
    source?: string;
    target?: string;
    interval?: "month" | "week";
}

export interface ContentTranslationActionApiQueryContentTranslationStatsParams
    extends ApiQueryParams {}

export interface ContentTranslationActionApiQueryContentTranslationSuggestionsParams
    extends ApiQueryParams {
    from?: string;
    to?: string;
    listid?: string;
    limit?: limit;
    offset?: string;
    seed?: number;
}

export interface ApiQueryContributorsParams extends ApiQueryParams {
    pcgroup?: OneOrMore<
        | "abusefilter"
        | "abusefilter-helper"
        | "accountcreator"
        | "autoreviewer"
        | "bot"
        | "bureaucrat"
        | "checkuser"
        | "confirmed"
        | "copyviobot"
        | "eventcoordinator"
        | "extendedconfirmed"
        | "extendedmover"
        | "filemover"
        | "founder"
        | "import"
        | "interface-admin"
        | "ipblock-exempt"
        | "massmessage-sender"
        | "no-ipinfo"
        | "patroller"
        | "push-subscription-manager"
        | "researcher"
        | "reviewer"
        | "rollbacker"
        | "steward"
        | "suppress"
        | "sysop"
        | "templateeditor"
        | "transwiki"
    >;
    pcexcludegroup?: OneOrMore<
        | "abusefilter"
        | "abusefilter-helper"
        | "accountcreator"
        | "autoreviewer"
        | "bot"
        | "bureaucrat"
        | "checkuser"
        | "confirmed"
        | "copyviobot"
        | "eventcoordinator"
        | "extendedconfirmed"
        | "extendedmover"
        | "filemover"
        | "founder"
        | "import"
        | "interface-admin"
        | "ipblock-exempt"
        | "massmessage-sender"
        | "no-ipinfo"
        | "patroller"
        | "push-subscription-manager"
        | "researcher"
        | "reviewer"
        | "rollbacker"
        | "steward"
        | "suppress"
        | "sysop"
        | "templateeditor"
        | "transwiki"
    >;
    pcrights?: OneOrMore<
        | "abusefilter-bypass-blocked-external-domains"
        | "abusefilter-hidden-log"
        | "abusefilter-hide-log"
        | "abusefilter-log"
        | "abusefilter-log-detail"
        | "abusefilter-log-private"
        | "abusefilter-modify"
        | "abusefilter-modify-blocked-external-domains"
        | "abusefilter-modify-global"
        | "abusefilter-modify-restricted"
        | "abusefilter-privatedetails"
        | "abusefilter-privatedetails-log"
        | "abusefilter-revert"
        | "abusefilter-view"
        | "abusefilter-view-private"
        | "apihighlimits"
        | "applychangetags"
        | "autoconfirmed"
        | "autocreateaccount"
        | "autopatrol"
        | "autoreview"
        | "autoreviewrestore"
        | "bigdelete"
        | "block"
        | "blockemail"
        | "bot"
        | "browsearchive"
        | "centralauth-createlocal"
        | "centralauth-lock"
        | "centralauth-merge"
        | "centralauth-rename"
        | "centralauth-suppress"
        | "centralauth-unmerge"
        | "changetags"
        | "checkuser"
        | "checkuser-log"
        | "checkuser-temporary-account"
        | "checkuser-temporary-account-log"
        | "checkuser-temporary-account-no-preference"
        | "collectionsaveascommunitypage"
        | "collectionsaveasuserpage"
        | "createaccount"
        | "createpage"
        | "createpagemainns"
        | "createtalk"
        | "delete"
        | "delete-redirect"
        | "deletechangetags"
        | "deletedhistory"
        | "deletedtext"
        | "deletelogentry"
        | "deleterevision"
        | "edit"
        | "editautopatrolprotected"
        | "editautoreviewprotected"
        | "editcontentmodel"
        | "editeditorprotected"
        | "editextendedsemiprotected"
        | "editinterface"
        | "editmyoptions"
        | "editmyprivateinfo"
        | "editmyusercss"
        | "editmyuserjs"
        | "editmyuserjson"
        | "editmyuserjsredirect"
        | "editmywatchlist"
        | "editprotected"
        | "editsemiprotected"
        | "editsitecss"
        | "editsitejs"
        | "editsitejson"
        | "edittrustedprotected"
        | "editusercss"
        | "edituserjs"
        | "edituserjson"
        | "enrollasmentor"
        | "extendedconfirmed"
        | "flow-create-board"
        | "flow-delete"
        | "flow-edit-post"
        | "flow-hide"
        | "flow-suppress"
        | "gadgets-definition-edit"
        | "globalblock"
        | "globalblock-exempt"
        | "globalblock-whitelist"
        | "globalgroupmembership"
        | "globalgrouppermissions"
        | "hideuser"
        | "import"
        | "importupload"
        | "ipblock-exempt"
        | "ipinfo"
        | "ipinfo-view-basic"
        | "ipinfo-view-full"
        | "ipinfo-view-log"
        | "manage-all-push-subscriptions"
        | "managechangetags"
        | "managementors"
        | "markbotedits"
        | "massmessage"
        | "mergehistory"
        | "minoredit"
        | "move"
        | "move-categorypages"
        | "move-rootuserpages"
        | "move-subpages"
        | "movefile"
        | "movestable"
        | "mwoauthmanageconsumer"
        | "mwoauthmanagemygrants"
        | "mwoauthproposeconsumer"
        | "mwoauthsuppress"
        | "mwoauthupdateownconsumer"
        | "mwoauthviewprivate"
        | "mwoauthviewsuppressed"
        | "newsletter-create"
        | "newsletter-delete"
        | "newsletter-manage"
        | "newsletter-restore"
        | "nominornewtalk"
        | "noratelimit"
        | "nuke"
        | "oathauth-api-all"
        | "oathauth-disable-for-user"
        | "oathauth-enable"
        | "oathauth-verify-user"
        | "oathauth-view-log"
        | "override-antispoof"
        | "override-export-depth"
        | "pagelang"
        | "pagetriage-copyvio"
        | "patrol"
        | "patrolmarks"
        | "protect"
        | "read"
        | "renameuser"
        | "reupload"
        | "reupload-own"
        | "reupload-shared"
        | "review"
        | "rollback"
        | "sboverride"
        | "securepoll-create-poll"
        | "securepoll-view-voter-pii"
        | "sendemail"
        | "setmentor"
        | "sfsblock-bypass"
        | "siteadmin"
        | "skipcaptcha"
        | "spamblacklistlog"
        | "stablesettings"
        | "suppressionlog"
        | "suppressredirect"
        | "suppressrevision"
        | "tboverride"
        | "tboverride-account"
        | "templateeditor"
        | "titleblacklistlog"
        | "torunblocked"
        | "transcode-reset"
        | "transcode-status"
        | "unblockself"
        | "undelete"
        | "unreviewedpages"
        | "unwatchedpages"
        | "upload"
        | "upload_by_url"
        | "urlshortener-create-url"
        | "urlshortener-manage-url"
        | "urlshortener-view-log"
        | "userrights"
        | "userrights-interwiki"
        | "validate"
        | "viewdeletedfile"
        | "viewmyprivateinfo"
        | "viewmywatchlist"
        | "viewsuppressed"
        | "vipsscaler-test"
        | "writeapi"
    >;
    pcexcluderights?: OneOrMore<
        | "abusefilter-bypass-blocked-external-domains"
        | "abusefilter-hidden-log"
        | "abusefilter-hide-log"
        | "abusefilter-log"
        | "abusefilter-log-detail"
        | "abusefilter-log-private"
        | "abusefilter-modify"
        | "abusefilter-modify-blocked-external-domains"
        | "abusefilter-modify-global"
        | "abusefilter-modify-restricted"
        | "abusefilter-privatedetails"
        | "abusefilter-privatedetails-log"
        | "abusefilter-revert"
        | "abusefilter-view"
        | "abusefilter-view-private"
        | "apihighlimits"
        | "applychangetags"
        | "autoconfirmed"
        | "autocreateaccount"
        | "autopatrol"
        | "autoreview"
        | "autoreviewrestore"
        | "bigdelete"
        | "block"
        | "blockemail"
        | "bot"
        | "browsearchive"
        | "centralauth-createlocal"
        | "centralauth-lock"
        | "centralauth-merge"
        | "centralauth-rename"
        | "centralauth-suppress"
        | "centralauth-unmerge"
        | "changetags"
        | "checkuser"
        | "checkuser-log"
        | "checkuser-temporary-account"
        | "checkuser-temporary-account-log"
        | "checkuser-temporary-account-no-preference"
        | "collectionsaveascommunitypage"
        | "collectionsaveasuserpage"
        | "createaccount"
        | "createpage"
        | "createpagemainns"
        | "createtalk"
        | "delete"
        | "delete-redirect"
        | "deletechangetags"
        | "deletedhistory"
        | "deletedtext"
        | "deletelogentry"
        | "deleterevision"
        | "edit"
        | "editautopatrolprotected"
        | "editautoreviewprotected"
        | "editcontentmodel"
        | "editeditorprotected"
        | "editextendedsemiprotected"
        | "editinterface"
        | "editmyoptions"
        | "editmyprivateinfo"
        | "editmyusercss"
        | "editmyuserjs"
        | "editmyuserjson"
        | "editmyuserjsredirect"
        | "editmywatchlist"
        | "editprotected"
        | "editsemiprotected"
        | "editsitecss"
        | "editsitejs"
        | "editsitejson"
        | "edittrustedprotected"
        | "editusercss"
        | "edituserjs"
        | "edituserjson"
        | "enrollasmentor"
        | "extendedconfirmed"
        | "flow-create-board"
        | "flow-delete"
        | "flow-edit-post"
        | "flow-hide"
        | "flow-suppress"
        | "gadgets-definition-edit"
        | "globalblock"
        | "globalblock-exempt"
        | "globalblock-whitelist"
        | "globalgroupmembership"
        | "globalgrouppermissions"
        | "hideuser"
        | "import"
        | "importupload"
        | "ipblock-exempt"
        | "ipinfo"
        | "ipinfo-view-basic"
        | "ipinfo-view-full"
        | "ipinfo-view-log"
        | "manage-all-push-subscriptions"
        | "managechangetags"
        | "managementors"
        | "markbotedits"
        | "massmessage"
        | "mergehistory"
        | "minoredit"
        | "move"
        | "move-categorypages"
        | "move-rootuserpages"
        | "move-subpages"
        | "movefile"
        | "movestable"
        | "mwoauthmanageconsumer"
        | "mwoauthmanagemygrants"
        | "mwoauthproposeconsumer"
        | "mwoauthsuppress"
        | "mwoauthupdateownconsumer"
        | "mwoauthviewprivate"
        | "mwoauthviewsuppressed"
        | "newsletter-create"
        | "newsletter-delete"
        | "newsletter-manage"
        | "newsletter-restore"
        | "nominornewtalk"
        | "noratelimit"
        | "nuke"
        | "oathauth-api-all"
        | "oathauth-disable-for-user"
        | "oathauth-enable"
        | "oathauth-verify-user"
        | "oathauth-view-log"
        | "override-antispoof"
        | "override-export-depth"
        | "pagelang"
        | "pagetriage-copyvio"
        | "patrol"
        | "patrolmarks"
        | "protect"
        | "read"
        | "renameuser"
        | "reupload"
        | "reupload-own"
        | "reupload-shared"
        | "review"
        | "rollback"
        | "sboverride"
        | "securepoll-create-poll"
        | "securepoll-view-voter-pii"
        | "sendemail"
        | "setmentor"
        | "sfsblock-bypass"
        | "siteadmin"
        | "skipcaptcha"
        | "spamblacklistlog"
        | "stablesettings"
        | "suppressionlog"
        | "suppressredirect"
        | "suppressrevision"
        | "tboverride"
        | "tboverride-account"
        | "templateeditor"
        | "titleblacklistlog"
        | "torunblocked"
        | "transcode-reset"
        | "transcode-status"
        | "unblockself"
        | "undelete"
        | "unreviewedpages"
        | "unwatchedpages"
        | "upload"
        | "upload_by_url"
        | "urlshortener-create-url"
        | "urlshortener-manage-url"
        | "urlshortener-view-log"
        | "userrights"
        | "userrights-interwiki"
        | "validate"
        | "viewdeletedfile"
        | "viewmyprivateinfo"
        | "viewmywatchlist"
        | "viewsuppressed"
        | "vipsscaler-test"
        | "writeapi"
    >;
    pclimit?: limit;
    pccontinue?: string;
}

export interface GeoDataApiQueryCoordinatesParams extends ApiQueryParams {
    colimit?: limit;
    cocontinue?: string;
    coprop?: OneOrMore<"country" | "dim" | "globe" | "name" | "region" | "type">;
    coprimary?: "all" | "primary" | "secondary";
    codistancefrompoint?: string;
    codistancefrompage?: string;
}

export interface ContentTranslationActionApiQueryDeletedTranslationsParams extends ApiQueryParams {
    dtafter?: timestamp;
    dtnamespace?: namespace;
}

export interface ContentTranslationActionApiQueryPublishedTranslationsParams
    extends ApiQueryParams {
    from?: string;
    to?: string;
    limit?: limit;
    offset?: string;
}

export interface ContentTranslationActionApiQueryTranslatorStatsParams extends ApiQueryParams {
    translator?: string;
}

export interface ApiQueryDeletedRevisionsParams extends ApiQueryParams {
    drvprop?: OneOrMore<
        | "comment"
        | "content"
        | "contentmodel"
        | "flags"
        | "ids"
        | "parsedcomment"
        | "roles"
        | "sha1"
        | "size"
        | "slotsha1"
        | "slotsize"
        | "tags"
        | "timestamp"
        | "user"
        | "userid"
        | "parsetree"
    >;
    drvslots?: OneOrMore<"main">;
    drvlimit?: limit;
    drvexpandtemplates?: boolean;
    drvgeneratexml?: boolean;
    drvparse?: boolean;
    drvsection?: string;
    drvdiffto?: string;
    drvdifftotext?: string;
    drvdifftotextpst?: boolean;
    drvcontentformat?:
        | "application/json"
        | "application/octet-stream"
        | "application/unknown"
        | "application/x-binary"
        | "text/css"
        | "text/javascript"
        | "text/plain"
        | "text/unknown"
        | "text/x-wiki"
        | "unknown/unknown";
    drvstart?: timestamp;
    drvend?: timestamp;
    drvdir?: "newer" | "older";
    drvtag?: string;
    drvuser?: string;
    drvexcludeuser?: string;
    drvcontinue?: string;
}

export interface ApiQueryDeletedrevsParams extends ApiQueryParams {
    drstart?: timestamp;
    drend?: timestamp;
    drdir?: "newer" | "older";
    drfrom?: string;
    drto?: string;
    drprefix?: string;
    drunique?: boolean;
    drnamespace?: namespace;
    drtag?: string;
    druser?: string;
    drexcludeuser?: string;
    drprop?: OneOrMore<
        | "comment"
        | "content"
        | "len"
        | "minor"
        | "parentid"
        | "parsedcomment"
        | "revid"
        | "sha1"
        | "tags"
        | "user"
        | "userid"
        | "token"
    >;
    drlimit?: limit;
    drcontinue?: string;
}

export interface WikibaseClientApiDescriptionParams extends ApiQueryParams {
    desccontinue?: number;
    descprefersource?: "central" | "local";
}

export interface ApiQueryDuplicateFilesParams extends ApiQueryParams {
    dflimit?: limit;
    dfcontinue?: string;
    dfdir?: "ascending" | "descending";
    dflocalonly?: boolean;
}

export interface ApiQueryBacklinksParams extends ApiQueryParams {
    eititle?: string;
    eipageid?: number;
    eicontinue?: string;
    einamespace?: namespace | namespace[];
    eidir?: "ascending" | "descending";
    eifilterredir?: "all" | "nonredirects" | "redirects";
    eilimit?: limit;
}

export interface ApiQueryExternalLinksParams extends ApiQueryParams {
    ellimit?: limit;
    elcontinue?: string;
    elprotocol?:
        | ""
        | "bitcoin"
        | "ftp"
        | "ftps"
        | "geo"
        | "git"
        | "gopher"
        | "http"
        | "https"
        | "irc"
        | "ircs"
        | "magnet"
        | "mailto"
        | "matrix"
        | "mms"
        | "news"
        | "nntp"
        | "redis"
        | "sftp"
        | "sip"
        | "sips"
        | "sms"
        | "ssh"
        | "svn"
        | "tel"
        | "telnet"
        | "urn"
        | "worldwind"
        | "xmpp";
    elquery?: string;
    elexpandurl?: boolean;
}

export interface TextExtractsApiQueryExtractsParams extends ApiQueryParams {
    exchars?: number;
    exsentences?: number;
    exlimit?: limit;
    exintro?: boolean;
    explaintext?: boolean;
    exsectionformat?: "plain" | "raw" | "wiki";
    excontinue?: number;
}

export interface ApiQueryExtLinksUsageParams extends ApiQueryParams {
    euprop?: OneOrMore<"ids" | "title" | "url">;
    eucontinue?: string;
    euprotocol?:
        | ""
        | "bitcoin"
        | "ftp"
        | "ftps"
        | "geo"
        | "git"
        | "gopher"
        | "http"
        | "https"
        | "irc"
        | "ircs"
        | "magnet"
        | "mailto"
        | "matrix"
        | "mms"
        | "news"
        | "nntp"
        | "redis"
        | "sftp"
        | "sip"
        | "sips"
        | "sms"
        | "ssh"
        | "svn"
        | "tel"
        | "telnet"
        | "urn"
        | "worldwind"
        | "xmpp";
    euquery?: string;
    eunamespace?: namespace | namespace[];
    eulimit?: limit;
    euexpandurl?: boolean;
}

export interface ApiFeatureUsageApiQueryFeatureUsageParams extends ApiQueryParams {
    afustart?: timestamp;
    afuend?: timestamp;
    afuagent?: string;
    afufeatures?: string | string[];
}

export interface ApiQueryFilearchiveParams extends ApiQueryParams {
    fafrom?: string;
    fato?: string;
    faprefix?: string;
    fadir?: "ascending" | "descending";
    fasha1?: string;
    fasha1base36?: string;
    faprop?: OneOrMore<
        | "archivename"
        | "bitdepth"
        | "description"
        | "dimensions"
        | "mediatype"
        | "metadata"
        | "mime"
        | "parseddescription"
        | "sha1"
        | "size"
        | "timestamp"
        | "user"
    >;
    falimit?: limit;
    facontinue?: string;
}

export interface ApiQueryFileRepoInfoParams extends ApiQueryParams {
    friprop?: OneOrMore<
        | "canUpload"
        | "descBaseUrl"
        | "descriptionCacheExpiry"
        | "displayname"
        | "favicon"
        | "fetchDescription"
        | "initialCapital"
        | "local"
        | "name"
        | "rootUrl"
        | "scriptDirUrl"
        | "thumbUrl"
        | "url"
    >;
}

export interface ApiQueryBacklinkspropParams extends ApiQueryParams {
    fuprop?: OneOrMore<"pageid" | "redirect" | "title">;
    funamespace?: namespace | namespace[];
    fushow?: OneOrMore<"!redirect" | "redirect">;
    fulimit?: limit;
    fucontinue?: string;
}

export interface ApiQueryFlaggedParams extends ApiQueryParams {}

export interface GadgetsApiQueryGadgetCategoriesParams extends ApiQueryParams {
    gcprop?: OneOrMore<"members" | "name" | "title">;
    gcnames?: string | string[];
}

export interface GadgetsApiQueryGadgetsParams extends ApiQueryParams {
    gaprop?: OneOrMore<"desc" | "id" | "metadata">;
    gacategories?: string | string[];
    gaids?: string | string[];
    gaallowedonly?: boolean;
    gaenabledonly?: boolean;
}

export interface GeoDataApiQueryGeoSearchElasticParams extends ApiQueryParams {
    gscoord?: string;
    gspage?: string;
    gsbbox?: string;
    gsradius?: number;
    gsmaxdim?: number;
    gssort?: "distance" | "relevance";
    gslimit?: limit;
    gsglobe?: "earth";
    gsnamespace?: namespace | namespace[];
    gsprop?: OneOrMore<"country" | "dim" | "globe" | "name" | "region" | "type">;
    gsprimary?: "all" | "primary" | "secondary";
    gsdebug?: boolean;
}

export interface CentralAuthApiQueryGlobalAllUsersParams extends ApiQueryParams {
    agufrom?: string;
    aguto?: string;
    aguprefix?: string;
    agudir?: "ascending" | "descending";
    agugroup?: OneOrMore<
        | "abusefilter-helper"
        | "abusefilter-maintainer"
        | "apihighlimits-requestor"
        | "captcha-exempt"
        | "founder"
        | "global-bot"
        | "global-deleter"
        | "global-flow-create"
        | "global-interface-editor"
        | "global-ipblock-exempt"
        | "global-rollbacker"
        | "global-sysop"
        | "new-wikis-importer"
        | "oathauth-tester"
        | "ombuds"
        | "recursive-export"
        | "staff"
        | "steward"
        | "sysadmin"
        | "vrt-permissions"
        | "wmf-email-block-override"
        | "wmf-researcher"
    >;
    aguexcludegroup?: OneOrMore<
        | "abusefilter-helper"
        | "abusefilter-maintainer"
        | "apihighlimits-requestor"
        | "captcha-exempt"
        | "founder"
        | "global-bot"
        | "global-deleter"
        | "global-flow-create"
        | "global-interface-editor"
        | "global-ipblock-exempt"
        | "global-rollbacker"
        | "global-sysop"
        | "new-wikis-importer"
        | "oathauth-tester"
        | "ombuds"
        | "recursive-export"
        | "staff"
        | "steward"
        | "sysadmin"
        | "vrt-permissions"
        | "wmf-email-block-override"
        | "wmf-researcher"
    >;
    aguprop?: OneOrMore<"existslocally" | "groups" | "lockinfo">;
    agulimit?: limit;
}

export interface GlobalBlockingApiQueryGlobalBlocksParams extends ApiQueryParams {
    bgstart?: timestamp;
    bgend?: timestamp;
    bgdir?: "newer" | "older";
    bgids?: number | number[];
    bgaddresses?: string | string[];
    bgip?: string;
    bglimit?: limit;
    bgprop?: OneOrMore<"address" | "by" | "expiry" | "id" | "range" | "reason" | "timestamp">;
}

export interface CentralAuthApiQueryGlobalGroupsParams extends ApiQueryParams {
    ggpprop?: OneOrMore<"rights">;
}

export interface GlobalPreferencesApiQueryGlobalPreferencesParams extends ApiQueryParams {
    gprprop?: OneOrMore<"localoverrides" | "preferences">;
}

export interface CentralAuthApiQueryGlobalRenameStatusParams extends ApiQueryParams {
    grsuser?: string;
}

export interface GlobalUsageApiQueryGlobalUsageParams extends ApiQueryParams {
    guprop?: OneOrMore<"namespace" | "pageid" | "url">;
    gulimit?: limit;
    gunamespace?: namespace | namespace[];
    gusite?: string | string[];
    gucontinue?: string;
    gufilterlocal?: boolean;
}

export interface CentralAuthApiQueryGlobalUserInfoParams extends ApiQueryParams {
    guiuser?: string;
    guiid?: number;
    guiprop?: OneOrMore<"editcount" | "groups" | "merged" | "rights" | "unattached">;
}

export interface GrowthExperimentsApiQueryImageSuggestionDataParams extends ApiQueryParams {
    gisdtasktype?: "image-recommendation" | "section-image-recommendation";
    gisdcontinue?: string;
}

export interface GrowthExperimentsApiQueryMenteeStatusParams extends ApiQueryParams {}

export interface GrowthExperimentsApiQueryMentorListParams extends ApiQueryParams {}

export interface GrowthExperimentsApiQueryMentorMenteeParams extends ApiQueryParams {
    gemmmentor?: string;
}

export interface GrowthExperimentsApiQueryMentorStatusParams extends ApiQueryParams {}

export interface GrowthExperimentsApiQueryNextSuggestedTaskTypeParams extends ApiQueryParams {
    gnsttactivetasktype?: "copyedit" | "expand" | "links" | "references" | "update";
}

export interface GrowthExperimentsApiQueryStarredMenteesParams extends ApiQueryParams {}

export interface GrowthExperimentsApiQueryGrowthTasksParams extends ApiQueryParams {
    gttasktypes?: OneOrMore<"copyedit" | "expand" | "links" | "references" | "update">;
    gttopics?: OneOrMore<
        | "africa"
        | "architecture"
        | "art"
        | "asia"
        | "biography"
        | "biology"
        | "business-and-economics"
        | "central-america"
        | "chemistry"
        | "comics-and-anime"
        | "computers-and-internet"
        | "earth-and-environment"
        | "education"
        | "engineering"
        | "entertainment"
        | "europe"
        | "fashion"
        | "food-and-drink"
        | "general-science"
        | "history"
        | "literature"
        | "mathematics"
        | "medicine-and-health"
        | "military-and-warfare"
        | "music"
        | "north-america"
        | "oceania"
        | "performing-arts"
        | "philosophy-and-religion"
        | "physics"
        | "politics-and-government"
        | "society"
        | "south-america"
        | "sports"
        | "technology"
        | "transportation"
        | "tv-and-film"
        | "video-games"
        | "women"
    >;
    gttopicsmode?: "AND" | "OR";
    gtlimit?: limit;
    gtoffset?: number;
    gtdebug?: boolean;
    gtexcludepageids?: number | number[];
}

export interface ApiQueryImageInfoParams extends ApiQueryParams {
    iiprop?: OneOrMore<
        | "archivename"
        | "badfile"
        | "bitdepth"
        | "canonicaltitle"
        | "comment"
        | "commonmetadata"
        | "dimensions"
        | "extmetadata"
        | "mediatype"
        | "metadata"
        | "mime"
        | "parsedcomment"
        | "sha1"
        | "size"
        | "thumbmime"
        | "timestamp"
        | "uploadwarning"
        | "url"
        | "user"
        | "userid"
    >;
    iilimit?: limit;
    iistart?: timestamp;
    iiend?: timestamp;
    iiurlwidth?: number;
    iiurlheight?: number;
    iimetadataversion?: string;
    iiextmetadatalanguage?: string;
    iiextmetadatamultilang?: boolean;
    iiextmetadatafilter?: string | string[];
    iiurlparam?: string;
    iibadfilecontexttitle?: string;
    iicontinue?: string;
    iilocalonly?: boolean;
}

export interface ApiQueryImagesParams extends ApiQueryParams {
    imlimit?: limit;
    imcontinue?: string;
    imimages?: string | string[];
    imdir?: "ascending" | "descending";
}

export interface ApiQueryBacklinksParams extends ApiQueryParams {
    iutitle?: string;
    iupageid?: number;
    iucontinue?: string;
    iunamespace?: namespace | namespace[];
    iudir?: "ascending" | "descending";
    iufilterredir?: "all" | "nonredirects" | "redirects";
    iulimit?: limit;
    iuredirect?: boolean;
}

export interface ApiQueryInfoParams extends ApiQueryParams {
    inprop?: OneOrMore<
        | "associatedpage"
        | "displaytitle"
        | "editintro"
        | "linkclasses"
        | "notificationtimestamp"
        | "preloadcontent"
        | "protection"
        | "subjectid"
        | "talkid"
        | "url"
        | "varianttitles"
        | "visitingwatchers"
        | "watched"
        | "watchers"
        | "preload"
        | "readable"
    >;
    inlinkcontext?: string;
    intestactions?: string | string[];
    intestactionsdetail?: "boolean" | "full" | "quick";
    intestactionsautocreate?: boolean;
    inpreloadcustom?: string;
    inpreloadparams?: string | string[];
    inpreloadnewsection?: boolean;
    ineditintrostyle?: "lessframes" | "moreframes";
    ineditintroskip?: string | string[];
    ineditintrocustom?: string;
    incontinue?: string;
}

export interface PageTriageApiIsReviewedParams extends ApiQueryParams {}

export interface ApiQueryIWBacklinksParams extends ApiQueryParams {
    iwblprefix?: string;
    iwbltitle?: string;
    iwblcontinue?: string;
    iwbllimit?: limit;
    iwblprop?: OneOrMore<"iwprefix" | "iwtitle">;
    iwbldir?: "ascending" | "descending";
}

export interface ApiQueryIWLinksParams extends ApiQueryParams {
    iwprop?: OneOrMore<"url">;
    iwprefix?: string;
    iwtitle?: string;
    iwdir?: "ascending" | "descending";
    iwlimit?: limit;
    iwcontinue?: string;
    iwurl?: boolean;
}

export interface ApiQueryLangBacklinksParams extends ApiQueryParams {
    lbllang?: string;
    lbltitle?: string;
    lblcontinue?: string;
    lbllimit?: limit;
    lblprop?: OneOrMore<"lllang" | "lltitle">;
    lbldir?: "ascending" | "descending";
}

export interface ApiQueryLangLinksParams extends ApiQueryParams {
    llprop?: OneOrMore<"autonym" | "langname" | "url">;
    lllang?: string;
    lltitle?: string;
    lldir?: "ascending" | "descending";
    llinlanguagecode?: string;
    lllimit?: limit;
    llcontinue?: string;
    llurl?: boolean;
}

export interface ContentTranslationActionApiQueryLangLinksCountParams extends ApiQueryParams {}

export interface ApiQueryLanguageinfoParams extends ApiQueryParams {
    liprop?: OneOrMore<
        "autonym" | "bcp47" | "code" | "dir" | "fallbacks" | "name" | "variantnames" | "variants"
    >;
    licode?: string | string[];
    licontinue?: string;
}

export interface ApiQueryLinksParams extends ApiQueryParams {
    plnamespace?: namespace | namespace[];
    pllimit?: limit;
    plcontinue?: string;
    pltitles?: string | string[];
    pldir?: "ascending" | "descending";
}

export interface ApiQueryBacklinkspropParams extends ApiQueryParams {
    lhprop?: OneOrMore<"pageid" | "redirect" | "title">;
    lhnamespace?: namespace | namespace[];
    lhshow?: OneOrMore<"!redirect" | "redirect">;
    lhlimit?: limit;
    lhcontinue?: string;
}

export interface MediaWikiLinterApiQueryLintErrorsParams extends ApiQueryParams {
    "lntcategories"?: OneOrMore<
        | "bogus-image-options"
        | "deletable-table-tag"
        | "fostered"
        | "html5-misnesting"
        | "misc-tidy-replacement-issues"
        | "misnested-tag"
        | "missing-end-tag"
        | "missing-end-tag-in-heading"
        | "multi-colon-escape"
        | "multiline-html-table-in-list"
        | "multiple-unclosed-formatting-tags"
        | "obsolete-tag"
        | "pwrap-bug-workaround"
        | "self-closed-tag"
        | "stripped-tag"
        | "tidy-font-bug"
        | "tidy-whitespace-bug"
        | "unclosed-quotes-in-heading"
        | "wikilink-in-extlink"
    >;
    "lntinvisible-categories"?: OneOrMore<"large-tables">;
    "lntlimit"?: limit;
    "lntnamespace"?: namespace | namespace[];
    "lntpageid"?: number | number[];
    "lnttitle"?: string;
    "lntfrom"?: number;
}

export interface MediaWikiLinterApiQueryLinterStatsParams extends ApiQueryParams {}

export interface ApiQueryLogEventsParams extends ApiQueryParams {
    leprop?: OneOrMore<
        | "comment"
        | "details"
        | "ids"
        | "parsedcomment"
        | "tags"
        | "timestamp"
        | "title"
        | "type"
        | "user"
        | "userid"
    >;
    letype?:
        | ""
        | "abusefilter"
        | "abusefilterblockeddomainhit"
        | "abusefilterprivatedetails"
        | "block"
        | "checkuser-temporary-account"
        | "contentmodel"
        | "create"
        | "delete"
        | "gblblock"
        | "gblrename"
        | "gblrights"
        | "globalauth"
        | "growthexperiments"
        | "import"
        | "ipinfo"
        | "managetags"
        | "massmessage"
        | "merge"
        | "move"
        | "newusers"
        | "oath"
        | "pagetriage-copyvio"
        | "pagetriage-curation"
        | "patrol"
        | "protect"
        | "renameuser"
        | "review"
        | "rights"
        | "spamblacklist"
        | "stable"
        | "suppress"
        | "tag"
        | "thanks"
        | "timedmediahandler"
        | "titleblacklist"
        | "upload"
        | "urlshortener"
        | "usermerge";
    leaction?:
        | "abusefilter/create"
        | "abusefilter/hit"
        | "abusefilter/modify"
        | "abusefilterblockeddomainhit/*"
        | "abusefilterprivatedetails/access"
        | "block/block"
        | "block/reblock"
        | "block/unblock"
        | "checkuser-private-event/*"
        | "checkuser-temporary-account/*"
        | "contentmodel/change"
        | "contentmodel/new"
        | "create/create"
        | "delete/delete"
        | "delete/delete_redir"
        | "delete/delete_redir2"
        | "delete/event"
        | "delete/restore"
        | "delete/revision"
        | "gblblock/dwhitelist"
        | "gblblock/gblock"
        | "gblblock/gblock2"
        | "gblblock/gunblock"
        | "gblblock/modify"
        | "gblblock/whitelist"
        | "gblrename/merge"
        | "gblrename/promote"
        | "gblrename/rename"
        | "gblrights/deleteset"
        | "gblrights/groupperms"
        | "gblrights/groupprms2"
        | "gblrights/groupprms3"
        | "gblrights/grouprename"
        | "gblrights/newset"
        | "gblrights/setchange"
        | "gblrights/setnewtype"
        | "gblrights/setrename"
        | "gblrights/usergroups"
        | "globalauth/delete"
        | "globalauth/hide"
        | "globalauth/lock"
        | "globalauth/lockandhid"
        | "globalauth/setstatus"
        | "globalauth/unhide"
        | "globalauth/unlock"
        | "growthexperiments/addimage"
        | "growthexperiments/addlink"
        | "growthexperiments/addsectionimage"
        | "growthexperiments/claimmentee"
        | "growthexperiments/claimmentee-no-previous-mentor"
        | "growthexperiments/setmentor"
        | "growthexperiments/setmentor-no-previous-mentor"
        | "import/interwiki"
        | "import/upload"
        | "interwiki/*"
        | "ipinfo/*"
        | "managetags/activate"
        | "managetags/create"
        | "managetags/deactivate"
        | "managetags/delete"
        | "massmessage/*"
        | "massmessage/failure"
        | "massmessage/send"
        | "massmessage/skipbadns"
        | "massmessage/skipnouser"
        | "massmessage/skipoptout"
        | "merge/merge"
        | "move/move"
        | "move/move_redir"
        | "newusers/autocreate"
        | "newusers/byemail"
        | "newusers/create"
        | "newusers/create2"
        | "newusers/forcecreatelocal"
        | "newusers/newusers"
        | "oath/*"
        | "pagetriage-copyvio/delete"
        | "pagetriage-copyvio/insert"
        | "pagetriage-curation/delete"
        | "pagetriage-curation/enqueue"
        | "pagetriage-curation/reviewed"
        | "pagetriage-curation/reviewed-article"
        | "pagetriage-curation/reviewed-redirect"
        | "pagetriage-curation/tag"
        | "pagetriage-curation/unreviewed"
        | "pagetriage-curation/unreviewed-article"
        | "pagetriage-curation/unreviewed-redirect"
        | "patrol/autopatrol"
        | "patrol/patrol"
        | "protect/modify"
        | "protect/move_prot"
        | "protect/protect"
        | "protect/unprotect"
        | "renameuser/renameuser"
        | "review/approve"
        | "review/approve-a"
        | "review/approve-i"
        | "review/approve-ia"
        | "review/approve2"
        | "review/approve2-a"
        | "review/approve2-i"
        | "review/approve2-ia"
        | "review/unapprove"
        | "review/unapprove2"
        | "rights/autopromote"
        | "rights/blockautopromote"
        | "rights/erevoke"
        | "rights/restoreautopromote"
        | "rights/rights"
        | "spamblacklist/*"
        | "stable/config"
        | "stable/modify"
        | "stable/move_stable"
        | "stable/reset"
        | "suppress/block"
        | "suppress/cadelete"
        | "suppress/delete"
        | "suppress/event"
        | "suppress/hide-afl"
        | "suppress/reblock"
        | "suppress/revision"
        | "suppress/setstatus"
        | "suppress/unhide-afl"
        | "tag/update"
        | "thanks/*"
        | "timedmediahandler/resettranscode"
        | "titleblacklist/*"
        | "upload/overwrite"
        | "upload/revert"
        | "upload/upload"
        | "urlshortener/*"
        | "usermerge/*";
    lestart?: timestamp;
    leend?: timestamp;
    ledir?: "newer" | "older";
    leuser?: string;
    letitle?: string;
    lenamespace?: namespace;
    leprefix?: string;
    letag?: string;
    lelimit?: limit;
    lecontinue?: string;
}

export interface KartographerApiQueryMapDataParams extends ApiQueryParams {
    mpdgroups?: string;
    mpdlimit?: limit;
    mpdcontinue?: number;
}

export interface MediaWikiMassMessageApiQueryMMContentParams extends ApiQueryParams {}

export interface PageViewInfoApiQueryMostViewedParams extends ApiQueryParams {
    pvimmetric?: "pageviews";
    pvimlimit?: limit;
    pvimoffset?: number;
}

export interface ApiQueryMyStashedFilesParams extends ApiQueryParams {
    msfprop?: OneOrMore<"size" | "type">;
    msflimit?: limit;
    msfcontinue?: string;
}

export interface NotificationsApiEchoNotificationsParams extends ApiQueryParams {
    notwikis?: string | string[];
    notfilter?: OneOrMore<"!read" | "read">;
    notprop?: OneOrMore<"count" | "list" | "seenTime">;
    notsections?: OneOrMore<"alert" | "message">;
    notgroupbysection?: boolean;
    notformat?: "flyout" | "html" | "model" | "special";
    notlimit?: limit;
    notcontinue?: string;
    notunreadfirst?: boolean;
    nottitles?: string | string[];
    notbundle?: boolean;
    notnotifiertypes?: OneOrMore<"email" | "push" | "web">;
    notalertcontinue?: string;
    notalertunreadfirst?: boolean;
    notmessagecontinue?: string;
    notmessageunreadfirst?: boolean;
    notcrosswikisummary?: boolean;
}

export interface OATHAuthApiModuleApiQueryOATHParams extends ApiQueryParams {
    oathuser?: string;
    oathreason?: string;
}

export interface ApiQueryOldreviewedpagesParams extends ApiQueryParams {
    orstart?: timestamp;
    orend?: timestamp;
    ordir?: "newer" | "older";
    ormaxsize?: number;
    orfilterwatched?: "all" | "watched";
    ornamespace?: namespace | namespace[];
    orcategory?: string;
    orfilterredir?: "all" | "nonredirects" | "redirects";
    orlimit?: limit;
}

export interface ORESHooksApiQueryORESParams extends ApiQueryParams {}

export interface PageAssessmentsApiQueryPageAssessmentsParams extends ApiQueryParams {
    pacontinue?: string;
    palimit?: limit;
    pasubprojects?: boolean;
}

export interface PageImagesApiQueryPageImagesParams extends ApiQueryParams {
    piprop?: OneOrMore<"name" | "original" | "thumbnail">;
    pithumbsize?: number;
    pilimit?: limit;
    pilicense?: "any" | "free";
    picontinue?: number;
    pilangcode?: string;
}

export interface ApiQueryPagePropNamesParams extends ApiQueryParams {
    ppncontinue?: string;
    ppnlimit?: limit;
}

export interface ApiQueryPagePropsParams extends ApiQueryParams {
    ppcontinue?: string;
    ppprop?: string | string[];
}

export interface ApiQueryPagesWithPropParams extends ApiQueryParams {
    pwppropname?: string;
    pwpprop?: OneOrMore<"ids" | "title" | "value">;
    pwpcontinue?: string;
    pwplimit?: limit;
    pwpdir?: "ascending" | "descending";
}

export interface WikibaseClientApiPageTermsParams extends ApiQueryParams {
    wbptcontinue?: number;
    wbptlanguage?:
        | "aa"
        | "aae"
        | "ab"
        | "abs"
        | "ace"
        | "acm"
        | "ady"
        | "ady-cyrl"
        | "aeb"
        | "aeb-arab"
        | "aeb-latn"
        | "af"
        | "agq"
        | "aln"
        | "als"
        | "alt"
        | "am"
        | "ami"
        | "an"
        | "ang"
        | "ann"
        | "anp"
        | "ar"
        | "arc"
        | "arn"
        | "arq"
        | "ary"
        | "arz"
        | "as"
        | "ase"
        | "ast"
        | "atj"
        | "av"
        | "avk"
        | "awa"
        | "ay"
        | "az"
        | "azb"
        | "ba"
        | "bag"
        | "ban"
        | "ban-bali"
        | "bar"
        | "bas"
        | "bat-smg"
        | "bax"
        | "bbc"
        | "bbc-latn"
        | "bbj"
        | "bcc"
        | "bci"
        | "bcl"
        | "bdr"
        | "be"
        | "be-tarask"
        | "be-x-old"
        | "bew"
        | "bfd"
        | "bg"
        | "bgn"
        | "bh"
        | "bho"
        | "bi"
        | "bjn"
        | "bkc"
        | "bkh"
        | "bkm"
        | "blk"
        | "bm"
        | "bn"
        | "bo"
        | "bpy"
        | "bqi"
        | "bqz"
        | "br"
        | "brh"
        | "bs"
        | "btm"
        | "bto"
        | "bug"
        | "bxr"
        | "byv"
        | "ca"
        | "cak"
        | "cal"
        | "cbk-zam"
        | "cdo"
        | "ce"
        | "ceb"
        | "ch"
        | "cho"
        | "chr"
        | "chy"
        | "ckb"
        | "cnh"
        | "co"
        | "cps"
        | "cpx"
        | "cpx-hans"
        | "cpx-hant"
        | "cpx-latn"
        | "cr"
        | "crh"
        | "crh-cyrl"
        | "crh-latn"
        | "crh-ro"
        | "cs"
        | "csb"
        | "cu"
        | "cv"
        | "cy"
        | "da"
        | "dag"
        | "de"
        | "de-at"
        | "de-ch"
        | "de-formal"
        | "dga"
        | "din"
        | "diq"
        | "dsb"
        | "dtp"
        | "dty"
        | "dua"
        | "dv"
        | "dz"
        | "ee"
        | "efi"
        | "egl"
        | "el"
        | "eml"
        | "en"
        | "en-ca"
        | "en-gb"
        | "en-us"
        | "eo"
        | "es"
        | "es-419"
        | "es-formal"
        | "et"
        | "eto"
        | "etu"
        | "eu"
        | "ewo"
        | "ext"
        | "fa"
        | "fat"
        | "ff"
        | "fi"
        | "fit"
        | "fiu-vro"
        | "fj"
        | "fkv"
        | "fmp"
        | "fo"
        | "fon"
        | "fr"
        | "frc"
        | "frp"
        | "frr"
        | "fur"
        | "fy"
        | "ga"
        | "gaa"
        | "gag"
        | "gan"
        | "gan-hans"
        | "gan-hant"
        | "gcf"
        | "gcr"
        | "gd"
        | "gl"
        | "gld"
        | "glk"
        | "gn"
        | "gom"
        | "gom-deva"
        | "gom-latn"
        | "gor"
        | "got"
        | "gpe"
        | "grc"
        | "gsw"
        | "gu"
        | "guc"
        | "gur"
        | "guw"
        | "gv"
        | "gya"
        | "ha"
        | "hak"
        | "haw"
        | "he"
        | "hi"
        | "hif"
        | "hif-latn"
        | "hil"
        | "hno"
        | "ho"
        | "hr"
        | "hrx"
        | "hsb"
        | "hsn"
        | "ht"
        | "hu"
        | "hu-formal"
        | "hy"
        | "hyw"
        | "hz"
        | "ia"
        | "id"
        | "ie"
        | "ig"
        | "igl"
        | "ii"
        | "ik"
        | "ike-cans"
        | "ike-latn"
        | "ilo"
        | "inh"
        | "io"
        | "is"
        | "isu"
        | "it"
        | "iu"
        | "ja"
        | "jam"
        | "jbo"
        | "jut"
        | "jv"
        | "ka"
        | "kaa"
        | "kab"
        | "kai"
        | "kbd"
        | "kbd-cyrl"
        | "kbp"
        | "kcg"
        | "kea"
        | "ker"
        | "kg"
        | "kge"
        | "khw"
        | "ki"
        | "kiu"
        | "kj"
        | "kjh"
        | "kjp"
        | "kk"
        | "kk-arab"
        | "kk-cn"
        | "kk-cyrl"
        | "kk-kz"
        | "kk-latn"
        | "kk-tr"
        | "kl"
        | "km"
        | "kn"
        | "ko"
        | "ko-kp"
        | "koi"
        | "kr"
        | "krc"
        | "kri"
        | "krj"
        | "krl"
        | "ks"
        | "ks-arab"
        | "ks-deva"
        | "ksf"
        | "ksh"
        | "ksw"
        | "ku"
        | "ku-arab"
        | "ku-latn"
        | "kum"
        | "kus"
        | "kv"
        | "kw"
        | "ky"
        | "la"
        | "lad"
        | "lb"
        | "lbe"
        | "lem"
        | "lez"
        | "lfn"
        | "lg"
        | "li"
        | "lij"
        | "liv"
        | "lki"
        | "lld"
        | "lmo"
        | "ln"
        | "lns"
        | "lo"
        | "loz"
        | "lrc"
        | "lt"
        | "ltg"
        | "lus"
        | "luz"
        | "lv"
        | "lzh"
        | "lzz"
        | "mad"
        | "mag"
        | "mai"
        | "map-bms"
        | "mcn"
        | "mcp"
        | "mdf"
        | "mg"
        | "mh"
        | "mhr"
        | "mi"
        | "min"
        | "mk"
        | "ml"
        | "mn"
        | "mnc"
        | "mnc-latn"
        | "mnc-mong"
        | "mni"
        | "mnw"
        | "mo"
        | "mos"
        | "mr"
        | "mrh"
        | "mrj"
        | "ms"
        | "ms-arab"
        | "mt"
        | "mua"
        | "mus"
        | "mwl"
        | "my"
        | "myv"
        | "mzn"
        | "na"
        | "nah"
        | "nan"
        | "nan-hani"
        | "nap"
        | "nb"
        | "nds"
        | "nds-nl"
        | "ne"
        | "new"
        | "ng"
        | "nge"
        | "nia"
        | "nit"
        | "niu"
        | "nl"
        | "nl-informal"
        | "nla"
        | "nmg"
        | "nmz"
        | "nn"
        | "nnh"
        | "nnz"
        | "no"
        | "nod"
        | "nog"
        | "nov"
        | "nqo"
        | "nrm"
        | "nso"
        | "nv"
        | "ny"
        | "nyn"
        | "nyo"
        | "nys"
        | "oc"
        | "ojb"
        | "olo"
        | "om"
        | "or"
        | "os"
        | "osa-latn"
        | "ota"
        | "pa"
        | "pag"
        | "pam"
        | "pap"
        | "pap-aw"
        | "pcd"
        | "pcm"
        | "pdc"
        | "pdt"
        | "pfl"
        | "pi"
        | "pih"
        | "pl"
        | "pms"
        | "pnb"
        | "pnt"
        | "prg"
        | "ps"
        | "pt"
        | "pt-br"
        | "pwn"
        | "qu"
        | "quc"
        | "qug"
        | "rgn"
        | "rif"
        | "rki"
        | "rm"
        | "rmc"
        | "rmf"
        | "rmy"
        | "rn"
        | "ro"
        | "roa-rup"
        | "roa-tara"
        | "rsk"
        | "ru"
        | "rue"
        | "rup"
        | "ruq"
        | "ruq-cyrl"
        | "ruq-latn"
        | "rut"
        | "rw"
        | "rwr"
        | "ryu"
        | "sa"
        | "sah"
        | "sat"
        | "sc"
        | "scn"
        | "sco"
        | "sd"
        | "sdc"
        | "sdh"
        | "se"
        | "se-fi"
        | "se-no"
        | "se-se"
        | "sei"
        | "ses"
        | "sg"
        | "sgs"
        | "sh"
        | "sh-cyrl"
        | "sh-latn"
        | "shi"
        | "shi-latn"
        | "shi-tfng"
        | "shn"
        | "shy"
        | "shy-latn"
        | "si"
        | "simple"
        | "sjd"
        | "sje"
        | "sju"
        | "sk"
        | "skr"
        | "skr-arab"
        | "sl"
        | "sli"
        | "sm"
        | "sma"
        | "smj"
        | "smn"
        | "sms"
        | "sn"
        | "so"
        | "sq"
        | "sr"
        | "sr-ec"
        | "sr-el"
        | "srn"
        | "sro"
        | "srq"
        | "ss"
        | "st"
        | "stq"
        | "sty"
        | "su"
        | "sv"
        | "sw"
        | "syl"
        | "szl"
        | "szy"
        | "ta"
        | "tay"
        | "tcy"
        | "tdd"
        | "te"
        | "tet"
        | "tg"
        | "tg-cyrl"
        | "tg-latn"
        | "th"
        | "ti"
        | "tk"
        | "tl"
        | "tly"
        | "tly-cyrl"
        | "tn"
        | "to"
        | "tok"
        | "tpi"
        | "tpv"
        | "tr"
        | "tru"
        | "trv"
        | "ts"
        | "tt"
        | "tt-cyrl"
        | "tt-latn"
        | "ttj"
        | "tum"
        | "tvu"
        | "tw"
        | "ty"
        | "tyv"
        | "tzm"
        | "udm"
        | "ug"
        | "ug-arab"
        | "ug-latn"
        | "uk"
        | "ur"
        | "uselang"
        | "uz"
        | "uz-cyrl"
        | "uz-latn"
        | "ve"
        | "vec"
        | "vep"
        | "vi"
        | "vls"
        | "vmf"
        | "vmw"
        | "vo"
        | "vot"
        | "vro"
        | "vut"
        | "wa"
        | "wal"
        | "war"
        | "wes"
        | "wls"
        | "wo"
        | "wuu"
        | "wuu-hans"
        | "wuu-hant"
        | "wya"
        | "xal"
        | "xh"
        | "xmf"
        | "xsy"
        | "yas"
        | "yat"
        | "yav"
        | "ybb"
        | "yi"
        | "yo"
        | "yrl"
        | "yue"
        | "yue-hans"
        | "yue-hant"
        | "za"
        | "zea"
        | "zgh"
        | "zh"
        | "zh-classical"
        | "zh-cn"
        | "zh-hans"
        | "zh-hant"
        | "zh-hk"
        | "zh-min-nan"
        | "zh-mo"
        | "zh-my"
        | "zh-sg"
        | "zh-tw"
        | "zh-yue"
        | "zu";
    wbptterms?: OneOrMore<"alias" | "description" | "label">;
}

export interface PageViewInfoApiQueryPageViewsParams extends ApiQueryParams {
    pvipmetric?: "pageviews";
    pvipdays?: number;
    pvipcontinue?: string;
}

export interface ApiQueryPrefixSearchParams extends ApiQueryParams {
    pssearch?: string;
    psnamespace?: namespace | namespace[];
    pslimit?: limit;
    psoffset?: number;
    psprofile?: "classic" | "engine_autoselect" | "fast-fuzzy" | "fuzzy" | "normal" | "strict";
}

export interface PageAssessmentsApiQueryProjectPagesParams extends ApiQueryParams {
    wppassessments?: boolean;
    wppprojects?: string | string[];
    wpplimit?: limit;
    wppcontinue?: string;
}

export interface PageAssessmentsApiQueryProjectsParams extends ApiQueryParams {
    pjsubprojects?: boolean;
}

export interface ApiQueryProtectedTitlesParams extends ApiQueryParams {
    ptnamespace?: namespace | namespace[];
    ptlevel?: OneOrMore<"autoconfirmed" | "extendedconfirmed" | "sysop" | "templateeditor">;
    ptlimit?: limit;
    ptdir?: "newer" | "older";
    ptstart?: timestamp;
    ptend?: timestamp;
    ptprop?: OneOrMore<
        "comment" | "expiry" | "level" | "parsedcomment" | "timestamp" | "user" | "userid"
    >;
    ptcontinue?: string;
}

export interface ApiQueryQueryPageParams extends ApiQueryParams {
    qppage?:
        | "Ancientpages"
        | "BrokenRedirects"
        | "Deadendpages"
        | "DisambiguationPageLinks"
        | "DisambiguationPages"
        | "DoubleRedirects"
        | "Fewestrevisions"
        | "GadgetUsage"
        | "GloballyWantedFiles"
        | "ListDuplicatedFiles"
        | "Listredirects"
        | "Lonelypages"
        | "Longpages"
        | "MediaStatistics"
        | "MostGloballyLinkedFiles"
        | "Mostcategories"
        | "Mostimages"
        | "Mostinterwikis"
        | "Mostlinked"
        | "Mostlinkedcategories"
        | "Mostlinkedtemplates"
        | "Mostrevisions"
        | "OrphanedTimedText"
        | "Shortpages"
        | "Uncategorizedcategories"
        | "Uncategorizedimages"
        | "Uncategorizedpages"
        | "Uncategorizedtemplates"
        | "UnconnectedPages"
        | "Unusedcategories"
        | "Unusedimages"
        | "Unusedtemplates"
        | "Unwatchedpages"
        | "Wantedcategories"
        | "Wantedfiles"
        | "Wantedpages"
        | "Wantedtemplates"
        | "Withoutinterwiki";
    qpoffset?: number;
    qplimit?: limit;
}

export interface ApiQueryRandomParams extends ApiQueryParams {
    rnnamespace?: namespace | namespace[];
    rnfilterredir?: "all" | "nonredirects" | "redirects";
    rnredirect?: boolean;
    rnlimit?: limit;
    rncontinue?: string;
}

export interface ReadingListsApiQueryReadingListEntriesParams extends ApiQueryParams {
    rlelists?: number | number[];
    rlechangedsince?: timestamp;
    rlesort?: "name" | "updated";
    rledir?: "ascending" | "descending";
    rlelimit?: limit;
    rlecontinue?: string;
}

export interface ReadingListsApiQueryReadingListsParams extends ApiQueryParams {
    rllist?: number;
    rlproject?: string;
    rltitle?: string;
    rlchangedsince?: timestamp;
    rlsort?: "name" | "updated";
    rldir?: "ascending" | "descending";
    rllimit?: limit;
    rlcontinue?: string;
}

export interface ApiQueryRecentChangesParams extends ApiQueryParams {
    rcstart?: timestamp;
    rcend?: timestamp;
    rcdir?: "newer" | "older";
    rcnamespace?: namespace | namespace[];
    rcuser?: string;
    rcexcludeuser?: string;
    rctag?: string;
    rcprop?: OneOrMore<
        | "comment"
        | "flags"
        | "ids"
        | "loginfo"
        | "oresscores"
        | "parsedcomment"
        | "patrolled"
        | "redirect"
        | "sha1"
        | "sizes"
        | "tags"
        | "timestamp"
        | "title"
        | "user"
        | "userid"
    >;
    rcshow?: OneOrMore<
        | "!anon"
        | "!autopatrolled"
        | "!bot"
        | "!minor"
        | "!oresreview"
        | "!patrolled"
        | "!redirect"
        | "anon"
        | "autopatrolled"
        | "bot"
        | "minor"
        | "oresreview"
        | "patrolled"
        | "redirect"
        | "unpatrolled"
    >;
    rclimit?: limit;
    rctype?: OneOrMore<"categorize" | "edit" | "external" | "log" | "new">;
    rctoponly?: boolean;
    rctitle?: string;
    rccontinue?: string;
    rcgeneraterevisions?: boolean;
    rcslot?: "main";
}

export interface ApiQueryBacklinkspropParams extends ApiQueryParams {
    rdprop?: OneOrMore<"fragment" | "pageid" | "title">;
    rdnamespace?: namespace | namespace[];
    rdshow?: OneOrMore<"!fragment" | "fragment">;
    rdlimit?: limit;
    rdcontinue?: string;
}

export interface ApiQueryRevisionsParams extends ApiQueryParams {
    rvprop?: OneOrMore<
        | "comment"
        | "content"
        | "contentmodel"
        | "flagged"
        | "flags"
        | "ids"
        | "oresscores"
        | "parsedcomment"
        | "roles"
        | "sha1"
        | "size"
        | "slotsha1"
        | "slotsize"
        | "tags"
        | "timestamp"
        | "user"
        | "userid"
        | "parsetree"
    >;
    rvslots?: OneOrMore<"main">;
    rvlimit?: limit;
    rvexpandtemplates?: boolean;
    rvgeneratexml?: boolean;
    rvparse?: boolean;
    rvsection?: string;
    rvdiffto?: string;
    rvdifftotext?: string;
    rvdifftotextpst?: boolean;
    rvcontentformat?:
        | "application/json"
        | "application/octet-stream"
        | "application/unknown"
        | "application/x-binary"
        | "text/css"
        | "text/javascript"
        | "text/plain"
        | "text/unknown"
        | "text/x-wiki"
        | "unknown/unknown";
    rvstartid?: number;
    rvendid?: number;
    rvstart?: timestamp;
    rvend?: timestamp;
    rvdir?: "newer" | "older";
    rvuser?: string;
    rvexcludeuser?: string;
    rvtag?: string;
    rvcontinue?: string;
}

export interface ApiQuerySearchParams extends ApiQueryParams {
    srsearch?: string;
    srnamespace?: namespace | namespace[];
    srlimit?: limit;
    sroffset?: number;
    srqiprofile?:
        | "classic"
        | "classic_noboostlinks"
        | "empty"
        | "engine_autoselect"
        | "growth_underlinked"
        | "mlr-1024rs"
        | "popular_inclinks"
        | "popular_inclinks_pv"
        | "wsum_inclinks"
        | "wsum_inclinks_pv";
    srwhat?: "nearmatch" | "text" | "title";
    srinfo?: OneOrMore<"rewrittenquery" | "suggestion" | "totalhits">;
    srprop?: OneOrMore<
        | "categorysnippet"
        | "extensiondata"
        | "isfilematch"
        | "redirectsnippet"
        | "redirecttitle"
        | "sectionsnippet"
        | "sectiontitle"
        | "size"
        | "snippet"
        | "timestamp"
        | "titlesnippet"
        | "wordcount"
        | "hasrelated"
        | "score"
    >;
    srinterwiki?: boolean;
    srenablerewrites?: boolean;
    srsort?:
        | "create_timestamp_asc"
        | "create_timestamp_desc"
        | "incoming_links_asc"
        | "incoming_links_desc"
        | "just_match"
        | "last_edit_asc"
        | "last_edit_desc"
        | "none"
        | "random"
        | "relevance"
        | "user_random";
}

export interface ApiQuerySiteinfoParams extends ApiQueryParams {
    siprop?: OneOrMore<
        | "autocreatetempuser"
        | "autopromote"
        | "autopromoteonce"
        | "clientlibraries"
        | "dbrepllag"
        | "defaultoptions"
        | "extensions"
        | "extensiontags"
        | "fileextensions"
        | "functionhooks"
        | "general"
        | "interwikimap"
        | "languages"
        | "languagevariants"
        | "libraries"
        | "magicwords"
        | "namespacealiases"
        | "namespaces"
        | "protocols"
        | "restrictions"
        | "rightsinfo"
        | "showhooks"
        | "skins"
        | "specialpagealiases"
        | "statistics"
        | "uploaddialog"
        | "usergroups"
        | "variables"
    >;
    sifilteriw?: "!local" | "local";
    sishowalldb?: boolean;
    sinumberingroup?: boolean;
    siinlanguagecode?: string;
}

export interface PageViewInfoApiQuerySiteViewsParams extends ApiQueryParams {
    pvismetric?: "pageviews" | "uniques";
    pvisdays?: number;
}

export interface ApiQueryStashImageInfoParams extends ApiQueryParams {
    siifilekey?: string | string[];
    siisessionkey?: string | string[];
    siiprop?: OneOrMore<
        | "badfile"
        | "bitdepth"
        | "canonicaltitle"
        | "commonmetadata"
        | "dimensions"
        | "extmetadata"
        | "metadata"
        | "mime"
        | "sha1"
        | "size"
        | "thumbmime"
        | "timestamp"
        | "url"
    >;
    siiurlwidth?: number;
    siiurlheight?: number;
    siiurlparam?: string;
}

export interface ApiQueryTagsParams extends ApiQueryParams {
    tgcontinue?: string;
    tglimit?: limit;
    tgprop?: OneOrMore<
        "active" | "defined" | "description" | "displayname" | "hitcount" | "source"
    >;
}

export interface ApiQueryLinksParams extends ApiQueryParams {
    tlnamespace?: namespace | namespace[];
    tllimit?: limit;
    tlcontinue?: string;
    tltemplates?: string | string[];
    tldir?: "ascending" | "descending";
}

export interface ApiQueryTokensParams extends ApiQueryParams {
    type?: OneOrMore<
        | "createaccount"
        | "csrf"
        | "deleteglobalaccount"
        | "login"
        | "patrol"
        | "rollback"
        | "setglobalaccountstatus"
        | "userrights"
        | "watch"
    >;
}

export interface ApiQueryBacklinkspropParams extends ApiQueryParams {
    tiprop?: OneOrMore<"pageid" | "redirect" | "title">;
    tinamespace?: namespace | namespace[];
    tishow?: OneOrMore<"!redirect" | "redirect">;
    tilimit?: limit;
    ticontinue?: string;
}

export interface MediaWikiTimedMediaHandlerApiTranscodeStatusParams extends ApiQueryParams {}

export interface NotificationsApiEchoUnreadNotificationPagesParams extends ApiQueryParams {
    unpwikis?: string | string[];
    unpgrouppages?: boolean;
    unplimit?: limit;
}

export interface ApiQueryUserContribsParams extends ApiQueryParams {
    uclimit?: limit;
    ucstart?: timestamp;
    ucend?: timestamp;
    uccontinue?: string;
    ucuser?: string | string[];
    ucuserids?: number | number[];
    ucuserprefix?: string;
    uciprange?: string;
    ucdir?: "newer" | "older";
    ucnamespace?: namespace | namespace[];
    ucprop?: OneOrMore<
        | "comment"
        | "flags"
        | "ids"
        | "oresscores"
        | "parsedcomment"
        | "patrolled"
        | "size"
        | "sizediff"
        | "tags"
        | "timestamp"
        | "title"
    >;
    ucshow?: OneOrMore<
        | "!autopatrolled"
        | "!minor"
        | "!new"
        | "!oresreview"
        | "!patrolled"
        | "!top"
        | "autopatrolled"
        | "minor"
        | "new"
        | "oresreview"
        | "patrolled"
        | "top"
    >;
    uctag?: string;
    uctoponly?: boolean;
}

export interface ApiQueryUserInfoParams extends ApiQueryParams {
    uiprop?: OneOrMore<
        | "acceptlang"
        | "blockinfo"
        | "cancreateaccount"
        | "centralids"
        | "changeablegroups"
        | "editcount"
        | "email"
        | "groupmemberships"
        | "groups"
        | "hasmsg"
        | "implicitgroups"
        | "latestcontrib"
        | "options"
        | "ratelimits"
        | "realname"
        | "registrationdate"
        | "rights"
        | "theoreticalratelimits"
        | "unreadcount"
    >;
    uiattachedwiki?: string;
}

export interface ApiQueryUsersParams extends ApiQueryParams {
    usprop?: OneOrMore<
        | "blockinfo"
        | "cancreate"
        | "centralids"
        | "editcount"
        | "emailable"
        | "gender"
        | "groupmemberships"
        | "groups"
        | "implicitgroups"
        | "registration"
        | "rights"
    >;
    usattachedwiki?: string;
    ususers?: string | string[];
    ususerids?: number | number[];
}

export interface MediaWikiTimedMediaHandlerApiQueryVideoInfoParams extends ApiQueryParams {
    viprop?: OneOrMore<
        | "archivename"
        | "badfile"
        | "bitdepth"
        | "canonicaltitle"
        | "comment"
        | "commonmetadata"
        | "derivatives"
        | "dimensions"
        | "extmetadata"
        | "mediatype"
        | "metadata"
        | "mime"
        | "parsedcomment"
        | "sha1"
        | "size"
        | "thumbmime"
        | "timedtext"
        | "timestamp"
        | "uploadwarning"
        | "url"
        | "user"
        | "userid"
    >;
    vilimit?: limit;
    vistart?: timestamp;
    viend?: timestamp;
    viurlwidth?: number;
    viurlheight?: number;
    vimetadataversion?: string;
    viextmetadatalanguage?: string;
    viextmetadatamultilang?: boolean;
    viextmetadatafilter?: string | string[];
    viurlparam?: string;
    vibadfilecontexttitle?: string;
    vicontinue?: string;
    vilocalonly?: boolean;
}

export interface ApiQueryWatchlistParams extends ApiQueryParams {
    wlallrev?: boolean;
    wlstart?: timestamp;
    wlend?: timestamp;
    wlnamespace?: namespace | namespace[];
    wluser?: string;
    wlexcludeuser?: string;
    wldir?: "newer" | "older";
    wllimit?: limit;
    wlprop?: OneOrMore<
        | "comment"
        | "expiry"
        | "flags"
        | "ids"
        | "loginfo"
        | "notificationtimestamp"
        | "oresscores"
        | "parsedcomment"
        | "patrol"
        | "sizes"
        | "tags"
        | "timestamp"
        | "title"
        | "user"
        | "userid"
    >;
    wlshow?: OneOrMore<
        | "!anon"
        | "!autopatrolled"
        | "!bot"
        | "!minor"
        | "!oresreview"
        | "!patrolled"
        | "!unread"
        | "anon"
        | "autopatrolled"
        | "bot"
        | "minor"
        | "oresreview"
        | "patrolled"
        | "unread"
    >;
    wltype?: OneOrMore<"categorize" | "edit" | "external" | "log" | "new">;
    wlowner?: string;
    wltoken?: string;
    wlcontinue?: string;
}

export interface ApiQueryWatchlistRawParams extends ApiQueryParams {
    wrcontinue?: string;
    wrnamespace?: namespace | namespace[];
    wrlimit?: limit;
    wrprop?: OneOrMore<"changed">;
    wrshow?: OneOrMore<"!changed" | "changed">;
    wrowner?: string;
    wrtoken?: string;
    wrdir?: "ascending" | "descending";
    wrfromtitle?: string;
    wrtotitle?: string;
}

export interface WikibaseClientApiPropsEntityUsageParams extends ApiQueryParams {
    wbeuprop?: OneOrMore<"url">;
    wbeuaspect?: OneOrMore<"C" | "D" | "L" | "O" | "S" | "T" | "X">;
    wbeuentities?: string | string[];
    wbeulimit?: limit;
    wbeucontinue?: string;
}

export interface WikibaseClientApiListEntityUsageParams extends ApiQueryParams {
    wbleuprop?: OneOrMore<"url">;
    wbleuaspect?: OneOrMore<"C" | "D" | "L" | "O" | "S" | "T" | "X">;
    wbleuentities?: string | string[];
    wbleulimit?: limit;
    wbleucontinue?: string;
}

export interface WikibaseClientApiClientInfoParams extends ApiQueryParams {
    wbprop?: OneOrMore<"siteid" | "url">;
}

export interface CentralAuthApiQueryWikiSetsParams extends ApiQueryParams {
    wsfrom?: string;
    wsprop?: OneOrMore<"type" | "wikisincluded" | "wikisnotincluded">;
    wslimit?: limit;
    wsorderbyname?: boolean;
}
