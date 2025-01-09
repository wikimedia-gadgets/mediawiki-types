// This script generates the `api_params/index.d.ts` file,
// by extracting online MediaWiki API module information.
//
// Go to a MediaWiki site, paste this into the browser console,
// and move the generated TS declaration files to `api_params`.

// What it does in practice:
const generateApiParamsTypes = async () => {
    // (1) Load module data from all APIs.
    //
    //                           main
    //                           └─ action=
    //   /w1/api.php   ═══════>     ├─ query
    //                              └─ block
    //
    //                           main
    //                           └─ action=
    //   /w2/api.php   ═══════>     ├─ query
    //                              └─ wbsearch
    //

    const apiModuleLoaders = [
        // base sites
        new APIModuleLoader("https://www.mediawiki.org/w/api.php", "mediawiki"),
        new APIModuleLoader("https://en.wikipedia.org/w/api.php", "wikipedia-en"),
        new APIModuleLoader("https://www.wikidata.org/w/api.php", "wikidata"),
        new APIModuleLoader("https://www.wikifunctions.org/w/api.php", "wikifunctions"),
        // additional sites
        //   (to be sure we are not missing some disabled modules)
        new APIModuleLoader("https://en.wikibooks.org/w/api.php", "wikibooks-en"),
        new APIModuleLoader("https://api.wikimedia.org/w/api.php", "wikimedia-api"),
        new APIModuleLoader("https://commons.wikimedia.org/w/api.php", "wikimedia-commons"),
        new APIModuleLoader("https://incubator.wikimedia.org/w/api.php", "wikimedia-incubator"),
        new APIModuleLoader("https://meta.wikimedia.org/w/api.php", "wikimedia-meta"),
        new APIModuleLoader("https://en.wikinews.org/w/api.php", "wikinews-en"),
        new APIModuleLoader("https://en.wikiquote.org/w/api.php", "wikiquote-en"),
        new APIModuleLoader("https://en.wikisource.org/w/api.php", "wikisource-en"),
        new APIModuleLoader("https://en.wikiversity.org/w/api.php", "wikiversity-en"),
        new APIModuleLoader("https://en.wikivoyage.org/w/api.php", "wikivoyage-en"),
        new APIModuleLoader("https://en.wiktionary.org/w/api.php", "wiktionary-en"),
        // external sites
        //   (to help detecting parameters that are wiki-dependant)
        new APIModuleLoader("https://www.gracesguide.co.uk/api.php", "gracesguide"),
        // test sites
        //   (to include decrecated or upcoming stuff)
        new APIModuleLoader("https://test.wikidata.org/w/api.php", "wikidata-test"),
        new APIModuleLoader(
            "https://test-commons.wikimedia.org/w/api.php",
            "wikimedia-commons-test"
        ),
        new APIModuleLoader("https://test.wikipedia.org/w/api.php", "wikipedia-test"),
        new APIModuleLoader("https://test2.wikipedia.org/w/api.php", "wikipedia-test2"),
    ];
    const apiModuleDicts = await APIModuleLoader.loadAll(apiModuleLoaders);

    // (2) Merge module data into a single hierarchy.
    //
    //   main
    //   └─ action=
    //      ├─ query   ═════╗      main
    //      └─ block        ║      └─ action=
    //                      ╠═══>     ├─ query
    //   main               ║         ├─ block
    //   └─ action=         ║         └─ wbsearch
    //      ├─ query     ═══╝
    //      └─ wbsearch
    //

    const apiModuleRegister = new APIModuleRegister();
    for (const apiModuleDict of apiModuleDicts) {
        // use the `apiModuleLoaders` order above!
        apiModuleRegister.add(apiModuleDict);
    }
    const apiModuleDict = apiModuleRegister.modules;

    // (3) Deduce TS-friendly parameter types and module names.
    //
    //   main                     Params
    //   └─ action=               └─ Action
    //      ├─ query    ═══════>     ├─ Query
    //      ├─ block                 ├─ Block
    //      └─ wbsearch              └─ WBSearch
    //

    Object.assign(TypeExpression.type_aliases, {
        // some type aliases to use to simplify the generated parameter types
        Limit: new TypeExpression("number", ["max"]),
        Assert: new TypeExpression(null, ["anon", "bot", "user"]),
        TokenType: new TypeExpression(null, [
            "createaccount",
            "csrf",
            "deleteglobalaccount",
            "login",
            "patrol",
            "rollback",
            "setglobalaccountstatus",
            "userrights",
            "watch",
        ]),
        LegacyTokenType: new TypeExpression(null, [
            "block",
            "delete",
            "edit",
            "email",
            "import",
            "move",
            "options",
            "protect",
            "unblock",
        ]),
    });
    Object.assign(Module.caps_patterns, {
        // some additional patterns to use to properly capitalize type names
        account: "Account",
        all: "All",
        call: "Call",
        check: "Check",
        embedded: "Embedded",
        file: "File",
        help: "Help",
        homepage: "HomePage",
        image: "Image",
        lang: "Lang",
        links: "Links",
        objects: "Objects",
        panel: "Panel",
        question: "Question",
        section: "Section",
        transcluded: "Transcluded",
        translation: "Translation",
        url: "Url",
        usage: "Usage",
        usages: "Usages",
        value: "Value",

        cx: "CX",
        fm: "FM",
        sx: "SX",
        wb: "WB",
        wbl: "WBL",
        wbs: "WBS",
    });
    const mainModule = Module.fromAPI(apiModuleDict, "main");

    // (4) Format module data into TS type declarations.
    //
    //                             namespace Params
    //                             └─ namespace Action
    //   Params            ╔════>     ├─ interface Query
    //   └─ Action         ║          └─ interface Block
    //      ├─ Query   ════╣
    //      ├─ Block       ║       namespace Params
    //      └─ WBSearch    ╚═══>   └─ namespace Action
    //                                └─ interface WBSearch
    //
    const declarationFile = new DeclarationFile();
    const apiNamespace = new NamespaceDeclaration();
    // add Limit, Assert, TokenType, ...
    for (const [name, type] of Object.entries(TypeExpression.type_aliases)) {
        apiNamespace.addDeclaration(new TypeDeclaration(name, type.toCode()));
    }
    // add UnknownParams
    const unknownParamsType = new TypeDeclaration(
        "UnknownParams",
        "Record<string, string | number | boolean | File | string[] | number[] | undefined>"
    );
    apiNamespace.addDeclaration(unknownParamsType);
    // add Params and its subnamespaces
    apiNamespace.merge(
        mainModule.toNamespace(unknownParamsType, declarationFile.deprecatedAliases)
    );

    // (5) Generate a TS file from type declarations.
    //
    //   namespace Params
    //   └─ namespace Action
    //      ├─ interface Query   ═════════>   index.d.ts
    //      └─ interface Block
    //
    //   namespace Params
    //   └─ namespace Action       ═══════>   Wikibase.d.ts
    //      └─ interface WBSearch
    //

    declarationFile.addToApiNamespace(apiNamespace);
    declarationFile.download("index.d.ts");
};

/**
 * API module data.
 *
 * @typedef ApiModule
 * @property {string} name
 * @property {string[]} classname
 * @property {string} path
 * @property {string} [group]
 * @property {string} prefix
 * @property {string} [source]
 * @property {string} sourcename
 * @property {string} licensetag
 * @property {string} licenselink
 * @property {string} description
 * @property {boolean} [internal]
 * @property {boolean} [readrights]
 * @property {boolean} [writerights]
 * @property {boolean} [mustbeposted]
 * @property {boolean} [deprecated]
 * @property {boolean} [generator]
 * @property {string[]} helpurls
 * @property {ApiModule.Example[]} examples
 * @property {ApiModule.Parameter[]} parameters
 * @property {string} [dynamicparameters]
 */

/**
 * @typedef ApiModule.Example
 * @property {string} query
 * @property {string} description
 */

/**
 * API module parameter data.
 *
 * @typedef ApiModule.Parameter
 * @property {number} index
 * @property {string} name
 * @property {string} description
 * @property {ApiModule.Parameter.Type} type
 * @property {boolean} [required]
 * @property {unknown} [default]
 * @property {boolean} [multi]
 * @property {boolean} [allowsduplicates]
 * @property {number} [limit]
 * @property {number} [lowlimit]
 * @property {number} [highlimit]
 * @property {boolean} [sensitive]
 * @property {boolean} [deprecated]
 * @property {Record<string, string>} [templatevars]
 * @property {ApiModule.Parameter.Info[]} [info]
 * // integer, limit
 * @property {number} [min]
 * @property {number} [max]
 * // limit
 * @property {number} [highmax]
 * // namespace, enum
 * @property {string[]} [allspecifiers]
 * // namespace
 * @property {number[]} [extranamespaces]
 * // string
 * @property {number} [maxbytes]
 * @property {number} [maxchars]
 * @property {string} [tokentype]
 * // title
 * @property {boolean} [mustExist]
 * // user
 * @property {string[]} [subtypes]
 * // enum
 * @property {Record<string, string>} [submodules]
 * @property {string} [submoduleparamprefix]
 * @property {string[]} [internalvalues]
 * @property {string[]} [deprecatedvalues]
 */

/**
 * @typedef {string[]
 *  | "boolean" | "expiry" | "integer" | "limit" | "namespace" | "password"
 *  | "raw" | "string" | "text" | "timestamp" | "title" | "upload" | "user"
 *  } ApiModule.Parameter.Type
 */

/**
 * @typedef ApiModule.Parameter.Info
 * @property {string} name
 */

/**
 * Interface names generated before PR #41.
 * Used to generate deprecated type aliases for compatibility.
 *
 * TODO: to remove in a future release.
 *
 * @type {Record<string, string[]>}
 */
const INTERFACE_COMPATIBILITY = {
    AbuseFilterApiAbuseLogPrivateDetailsParams: ["abuselogprivatedetails"],
    AbuseFilterApiCheckMatchParams: ["abusefiltercheckmatch"],
    AbuseFilterApiCheckSyntaxParams: ["abusefilterchecksyntax"],
    AbuseFilterApiEvalExpressionParams: ["abusefilterevalexpression"],
    AbuseFilterApiQueryAbuseFiltersParams: ["query+abusefilters"],
    AbuseFilterApiQueryAbuseLogParams: ["query+abuselog"],
    AbuseFilterApiUnblockAutopromoteParams: ["abusefilterunblockautopromote"],
    AntiSpoofApiAntiSpoofParams: ["antispoof"],
    ApiAcquireTempUserNameParams: ["acquiretempusername"],
    ApiAMCreateAccountParams: ["createaccount"],
    ApiBlockParams: ["block"],
    ApiCentralNoticeCdnCacheUpdateBannerParams: ["centralnoticecdncacheupdatebanner"],
    ApiCentralNoticeChoiceDataParams: ["centralnoticechoicedata"],
    ApiCentralNoticeLogsParams: ["query+centralnoticelogs"],
    ApiCentralNoticeQueryActiveCampaignsParams: ["query+centralnoticeactivecampaigns"],
    ApiCentralNoticeQueryCampaignParams: ["centralnoticequerycampaign"],
    ApiChangeAuthenticationDataParams: ["changeauthenticationdata"],
    ApiChangeContentModelParams: ["changecontentmodel"],
    ApiCheckTokenParams: ["checktoken"],
    ApiClearHasMsgParams: ["clearhasmsg"],
    ApiClientLoginParams: ["clientlogin"],
    ApiComparePagesParams: ["compare"],
    ApiCSPReportParams: ["cspreport"],
    ApiDeleteParams: ["delete"],
    ApiDisabledParams: ["imagerotate"],
    ApiEditPageParams: ["edit"],
    ApiEmailUserParams: ["emailuser"],
    ApiExpandTemplatesParams: ["expandtemplates"],
    ApiFeatureUsageApiQueryFeatureUsageParams: ["query+featureusage"],
    ApiFeedContributionsParams: ["feedcontributions"],
    ApiFeedRecentChangesParams: ["feedrecentchanges"],
    ApiFeedWatchlistParams: ["feedwatchlist"],
    ApiFileRevertParams: ["filerevert"],
    ApiFlagConfigParams: ["flagconfig"],
    ApiFormatJsonParams: ["json", "jsonfm", "rawfm"],
    ApiFormatNoneParams: ["none"],
    ApiFormatPhpParams: ["php", "phpfm"],
    ApiFormatXmlParams: ["xml", "xmlfm"],
    ApiHelpParams: ["help"],
    ApiImportParams: ["import"],
    ApiLinkAccountParams: ["linkaccount"],
    ApiLoginParams: ["login"],
    ApiLogoutParams: ["logout"],
    ApiManageTagsParams: ["managetags"],
    ApiMergeHistoryParams: ["mergehistory"],
    ApiMoveParams: ["move"],
    ApiOpenSearchParams: ["opensearch"],
    ApiOptionsParams: ["options"],
    ApiParamInfoParams: ["paraminfo"],
    ApiParseParams: ["parse"],
    ApiPatrolParams: ["patrol"],
    ApiProtectParams: ["protect"],
    ApiPurgeParams: ["purge"],
    ApiQueryAllCategoriesParams: ["query+allcategories"],
    ApiQueryAllDeletedRevisionsParams: ["query+alldeletedrevisions"],
    ApiQueryAllImagesParams: ["query+allimages"],
    ApiQueryAllLinksParams: [
        "query+allfileusages",
        "query+alllinks",
        "query+allredirects",
        "query+alltransclusions",
    ],
    ApiQueryAllMessagesParams: ["query+allmessages"],
    ApiQueryAllPagesParams: ["query+allpages"],
    ApiQueryAllRevisionsParams: ["query+allrevisions"],
    ApiQueryAllUsersParams: ["query+allusers"],
    ApiQueryAuthManagerInfoParams: ["query+authmanagerinfo"],
    ApiQueryBacklinksParams: ["query+backlinks", "query+embeddedin", "query+imageusage"],
    ApiQueryBacklinkspropParams: [
        "query+fileusage",
        "query+linkshere",
        "query+redirects",
        "query+transcludedin",
    ],
    ApiQueryBlocksParams: ["query+blocks"],
    ApiQueryCategoriesParams: ["query+categories"],
    ApiQueryCategoryInfoParams: ["query+categoryinfo"],
    ApiQueryCategoryMembersParams: ["query+categorymembers"],
    ApiQueryContributorsParams: ["query+contributors"],
    ApiQueryDeletedRevisionsParams: ["query+deletedrevisions"],
    ApiQueryDeletedrevsParams: ["query+deletedrevs"],
    ApiQueryDuplicateFilesParams: ["query+duplicatefiles"],
    ApiQueryExternalLinksParams: ["query+extlinks"],
    ApiQueryExtLinksUsageParams: ["query+exturlusage"],
    ApiQueryFilearchiveParams: ["query+filearchive"],
    ApiQueryFileRepoInfoParams: ["query+filerepoinfo"],
    ApiQueryFlaggedParams: ["query+flagged"],
    ApiQueryImageInfoParams: ["query+imageinfo"],
    ApiQueryImagesParams: ["query+images"],
    ApiQueryInfoParams: ["query+info"],
    ApiQueryIWBacklinksParams: ["query+iwbacklinks"],
    ApiQueryIWLinksParams: ["query+iwlinks"],
    ApiQueryLangBacklinksParams: ["query+langbacklinks"],
    ApiQueryLangLinksParams: ["query+langlinks"],
    ApiQueryLanguageinfoParams: ["query+languageinfo"],
    ApiQueryLinksParams: ["query+links", "query+templates"],
    ApiQueryLogEventsParams: ["query+logevents"],
    ApiQueryMyStashedFilesParams: ["query+mystashedfiles"],
    ApiQueryOldreviewedpagesParams: ["query+oldreviewedpages"],
    ApiQueryPagePropNamesParams: ["query+pagepropnames"],
    ApiQueryPagePropsParams: ["query+pageprops"],
    ApiQueryPagesWithPropParams: ["query+pageswithprop"],
    ApiQueryParams: ["query"],
    ApiQueryPrefixSearchParams: ["query+prefixsearch"],
    ApiQueryProtectedTitlesParams: ["query+protectedtitles"],
    ApiQueryQueryPageParams: ["query+querypage"],
    ApiQueryRandomParams: ["query+random"],
    ApiQueryRecentChangesParams: ["query+recentchanges"],
    ApiQueryRevisionsParams: ["query+revisions"],
    ApiQuerySearchParams: ["query+search"],
    ApiQuerySiteinfoParams: ["query+siteinfo"],
    ApiQueryStashImageInfoParams: ["query+stashimageinfo"],
    ApiQueryTagsParams: ["query+tags"],
    ApiQueryTokensParams: ["query+tokens"],
    ApiQueryUserContribsParams: ["query+usercontribs"],
    ApiQueryUserInfoParams: ["query+userinfo"],
    ApiQueryUsersParams: ["query+users"],
    ApiQueryWatchlistParams: ["query+watchlist"],
    ApiQueryWatchlistRawParams: ["query+watchlistraw"],
    ApiRemoveAuthenticationDataParams: ["removeauthenticationdata", "unlinkaccount"],
    ApiResetPasswordParams: ["resetpassword"],
    ApiReviewParams: ["review"],
    ApiRevisionDeleteParams: ["revisiondelete"],
    ApiRollbackParams: ["rollback"],
    ApiRsdParams: ["rsd"],
    ApiSetNotificationTimestampParams: ["setnotificationtimestamp"],
    ApiSetPageLanguageParams: ["setpagelanguage"],
    ApiStabilizeProtectParams: ["stabilize"],
    ApiStashEditParams: ["stashedit"],
    ApiTagParams: ["tag"],
    ApiUnblockParams: ["unblock"],
    ApiUndeleteParams: ["undelete"],
    ApiUploadParams: ["upload"],
    ApiUserrightsParams: ["userrights"],
    ApiValidatePasswordParams: ["validatepassword"],
    ApiWatchParams: ["watch"],
    BetaFeaturesApiQueryBetaFeaturesParams: ["query+betafeatures"],
    BounceHandlerApiBounceHandlerParams: ["bouncehandler"],
    CategoryTreeApiCategoryTreeParams: ["categorytree"],
    CentralAuthApiCentralAuthTokenParams: ["centralauthtoken"],
    CentralAuthApiCreateLocalAccountParams: ["createlocalaccount"],
    CentralAuthApiDeleteGlobalAccountParams: ["deleteglobalaccount"],
    CentralAuthApiGlobalUserRightsParams: ["globaluserrights"],
    CentralAuthApiQueryGlobalAllUsersParams: ["query+globalallusers"],
    CentralAuthApiQueryGlobalGroupsParams: ["query+globalgroups"],
    CentralAuthApiQueryGlobalRenameStatusParams: ["query+globalrenamestatus"],
    CentralAuthApiQueryGlobalUserInfoParams: ["query+globaluserinfo"],
    CentralAuthApiQueryWikiSetsParams: ["query+wikisets"],
    CentralAuthApiSetGlobalAccountStatusParams: ["setglobalaccountstatus"],
    CirrusSearchApiConfigDumpParams: ["cirrus-config-dump"],
    CirrusSearchApiMappingDumpParams: ["cirrus-mapping-dump"],
    CirrusSearchApiProfilesDumpParams: ["cirrus-profiles-dump"],
    CirrusSearchApiQueryBuildDocumentParams: ["query+cirrusbuilddoc"],
    CirrusSearchApiQueryCirrusDocParams: ["query+cirrusdoc"],
    CirrusSearchApiQueryCompSuggestBuildDocParams: ["query+cirruscompsuggestbuilddoc"],
    CirrusSearchApiSettingsDumpParams: ["cirrus-settings-dump"],
    CollectionApiCollectionParams: ["collection"],
    ConfirmEditFancyCaptchaApiFancyCaptchaReloadParams: ["fancycaptchareload"],
    ContentTranslationActionApiContentTranslationDeleteParams: ["cxdelete"],
    ContentTranslationActionApiContentTranslationPublishParams: ["cxpublish"],
    ContentTranslationActionApiContentTranslationSaveParams: ["cxsave"],
    ContentTranslationActionApiContentTranslationSuggestionListParams: ["cxsuggestionlist"],
    ContentTranslationActionApiContentTranslationTokenParams: ["cxtoken"],
    ContentTranslationActionApiQueryContentTranslationCorporaParams: [
        "query+contenttranslationcorpora",
    ],
    ContentTranslationActionApiQueryContentTranslationLanguageTrendParams: [
        "query+contenttranslationlangtrend",
    ],
    ContentTranslationActionApiQueryContentTranslationParams: ["query+contenttranslation"],
    ContentTranslationActionApiQueryContentTranslationStatsParams: [
        "query+contenttranslationstats",
    ],
    ContentTranslationActionApiQueryContentTranslationSuggestionsParams: [
        "query+contenttranslationsuggestions",
    ],
    ContentTranslationActionApiQueryDeletedTranslationsParams: ["query+cxdeletedtranslations"],
    ContentTranslationActionApiQueryLangLinksCountParams: ["query+langlinkscount"],
    ContentTranslationActionApiQueryPublishedTranslationsParams: ["query+cxpublishedtranslations"],
    ContentTranslationActionApiQueryTranslatorStatsParams: ["query+cxtranslatorstats"],
    ContentTranslationActionApiSectionTranslationDeleteParams: ["sxdelete"],
    ContentTranslationActionApiSectionTranslationPublishParams: ["cxpublishsection"],
    ContentTranslationActionApiSectionTranslationSaveParams: ["sxsave"],
    DiscussionToolsApiDiscussionToolsCompareParams: ["discussiontoolscompare"],
    DiscussionToolsApiDiscussionToolsEditParams: ["discussiontoolsedit"],
    DiscussionToolsApiDiscussionToolsFindCommentParams: ["discussiontoolsfindcomment"],
    DiscussionToolsApiDiscussionToolsGetSubscriptionsParams: ["discussiontoolsgetsubscriptions"],
    DiscussionToolsApiDiscussionToolsPageInfoParams: ["discussiontoolspageinfo"],
    DiscussionToolsApiDiscussionToolsPreviewParams: ["discussiontoolspreview"],
    DiscussionToolsApiDiscussionToolsSubscribeParams: ["discussiontoolssubscribe"],
    EventStreamConfigApiStreamConfigsParams: ["streamconfigs"],
    FeaturedFeedsApiFeaturedFeedsParams: ["featuredfeed"],
    GadgetsApiQueryGadgetCategoriesParams: ["query+gadgetcategories"],
    GadgetsApiQueryGadgetsParams: ["query+gadgets"],
    GeoDataApiQueryCoordinatesParams: ["query+coordinates"],
    GeoDataApiQueryGeoSearchElasticParams: ["query+geosearch"],
    GlobalBlockingApiGlobalBlockParams: ["globalblock"],
    GlobalBlockingApiQueryGlobalBlocksParams: ["query+globalblocks"],
    GlobalPreferencesApiGlobalPreferenceOverridesParams: ["globalpreferenceoverrides"],
    GlobalPreferencesApiGlobalPreferencesParams: ["globalpreferences"],
    GlobalPreferencesApiQueryGlobalPreferencesParams: ["query+globalpreferences"],
    GlobalUsageApiQueryGlobalUsageParams: ["query+globalusage"],
    GrowthExperimentsApiHelpPanelPostQuestionParams: ["helppanelquestionposter"],
    GrowthExperimentsApiInvalidateImageRecommendationParams: [
        "growthinvalidateimagerecommendation",
    ],
    GrowthExperimentsApiInvalidatePersonalizedPraiseSuggestionParams: [
        "growthinvalidatepersonalizedpraisesuggestion",
    ],
    GrowthExperimentsApiManageMentorListParams: ["growthmanagementorlist"],
    GrowthExperimentsApiMentorDashboardUpdateDataParams: ["growthmentordashboardupdatedata"],
    GrowthExperimentsApiQueryGrowthTasksParams: ["query+growthtasks"],
    GrowthExperimentsApiQueryImageSuggestionDataParams: ["query+growthimagesuggestiondata"],
    GrowthExperimentsApiQueryMenteeStatusParams: ["query+growthmenteestatus"],
    GrowthExperimentsApiQueryMentorListParams: ["query+growthmentorlist"],
    GrowthExperimentsApiQueryMentorMenteeParams: ["query+growthmentormentee"],
    GrowthExperimentsApiQueryMentorStatusParams: ["query+growthmentorstatus"],
    GrowthExperimentsApiQueryNextSuggestedTaskTypeParams: ["query+growthnextsuggestedtasktype"],
    GrowthExperimentsApiQueryStarredMenteesParams: ["query+growthstarredmentees"],
    GrowthExperimentsApiQuestionStoreParams: ["homepagequestionstore"],
    GrowthExperimentsApiSetMenteeStatusParams: ["growthsetmenteestatus"],
    GrowthExperimentsApiSetMentorParams: ["growthsetmentor"],
    GrowthExperimentsApiStarMenteeParams: ["growthstarmentee"],
    JsonConfigJCApiParams: ["jsonconfig"],
    JsonConfigJCDataApiParams: ["jsondata"],
    KartographerApiQueryMapDataParams: ["query+mapdata"],
    KartographerApiSanitizeMapDataParams: ["sanitize-mapdata"],
    MediaWikiBabelApiQueryBabelParams: ["query+babel"],
    MediaWikiCheckUserApiQueryCheckUserLogParams: ["query+checkuserlog"],
    MediaWikiCheckUserApiQueryCheckUserParams: ["query+checkuser"],
    MediaWikiLinterApiQueryLintErrorsParams: ["query+linterrors"],
    MediaWikiLinterApiQueryLinterStatsParams: ["query+linterstats"],
    MediaWikiMassMessageApiEditMassMessageListParams: ["editmassmessagelist"],
    MediaWikiMassMessageApiMassMessageParams: ["massmessage"],
    MediaWikiMassMessageApiQueryMMContentParams: ["query+mmcontent"],
    MediaWikiTimedMediaHandlerApiQueryVideoInfoParams: ["query+videoinfo"],
    MediaWikiTimedMediaHandlerApiTimedTextParams: ["timedtext"],
    MediaWikiTimedMediaHandlerApiTranscodeResetParams: ["transcodereset"],
    MediaWikiTimedMediaHandlerApiTranscodeStatusParams: ["query+transcodestatus"],
    MobileFrontendApiWebappManifestParams: ["webapp-manifest"],
    NotificationsApiEchoMarkReadParams: ["echomarkread"],
    NotificationsApiEchoMarkSeenParams: ["echomarkseen"],
    NotificationsApiEchoMuteParams: ["echomute"],
    NotificationsApiEchoNotificationsParams: ["query+notifications"],
    NotificationsApiEchoUnreadNotificationPagesParams: ["query+unreadnotificationpages"],
    NotificationsPushApiEchoPushSubscriptionsParams: ["echopushsubscriptions"],
    OATHAuthApiModuleApiOATHValidateParams: ["oathvalidate"],
    OATHAuthApiModuleApiQueryOATHParams: ["query+oath"],
    ORESHooksApiQueryORESParams: ["query+ores"],
    PageAssessmentsApiQueryPageAssessmentsParams: ["query+pageassessments"],
    PageAssessmentsApiQueryProjectPagesParams: ["query+projectpages"],
    PageAssessmentsApiQueryProjectsParams: ["query+projects"],
    PageImagesApiQueryPageImagesParams: ["query+pageimages"],
    PageTriageApiIsReviewedParams: ["query+isreviewed"],
    PageTriageApiPageTriageActionParams: ["pagetriageaction"],
    PageTriageApiPageTriageListParams: ["pagetriagelist"],
    PageTriageApiPageTriageStatsParams: ["pagetriagestats"],
    PageTriageApiPageTriageTagCopyvioParams: ["pagetriagetagcopyvio"],
    PageTriageApiPageTriageTaggingParams: ["pagetriagetagging"],
    PageViewInfoApiQueryMostViewedParams: ["query+mostviewed"],
    PageViewInfoApiQueryPageViewsParams: ["query+pageviews"],
    PageViewInfoApiQuerySiteViewsParams: ["query+siteviews"],
    ParserMigrationApiParserMigrationParams: ["parser-migration"],
    ReadingListsApiQueryReadingListEntriesParams: ["query+readinglistentries"],
    ReadingListsApiQueryReadingListsParams: ["query+readinglists"],
    ReadingListsApiReadingListsParams: ["readinglists"],
    ScribuntoApiScribuntoConsoleParams: ["scribunto-console"],
    SecurePollApiSecurePollAuthParams: ["securepollauth"],
    SecurePollApiStrikeVoteParams: ["strikevote"],
    SiteMatrixApiSiteMatrixParams: ["sitematrix"],
    SpamBlacklistApiSpamBlacklistParams: ["spamblacklist"],
    TemplateDataApiTemplateDataParams: ["templatedata"],
    TextExtractsApiQueryExtractsParams: ["query+extracts"],
    ThanksApiCoreThankParams: ["thank"],
    TitleBlacklistApiTitleBlacklistParams: ["titleblacklist"],
    TorBlockApiTorBlockParams: ["torblock"],
    UniversalLanguageSelectorApiLanguageSearchParams: ["languagesearch"],
    UniversalLanguageSelectorApiULSLocalizationParams: ["ulslocalization"],
    UniversalLanguageSelectorApiULSSetLanguageParams: ["ulssetlang"],
    UrlShortenerApiShortenUrlParams: ["shortenurl"],
    VisualEditorApiVisualEditorEditParams: ["visualeditoredit"],
    VisualEditorApiVisualEditorParams: ["visualeditor"],
    WebAuthnApiWebAuthnParams: ["webauthn"],
    WikibaseClientApiClientInfoParams: ["query+wikibase"],
    WikibaseClientApiDescriptionParams: ["query+description"],
    WikibaseClientApiListEntityUsageParams: ["query+wblistentityusage"],
    WikibaseClientApiPageTermsParams: ["query+pageterms"],
    WikibaseClientApiPropsEntityUsageParams: ["query+wbentityusage"],
    WikiLoveApiWikiLoveParams: ["wikilove"],
    WikimediaEventsApiWikimediaEventsBlockedEditParams: ["wikimediaeventsblockededit"],
};

// Where to log process information and errors.
// Final output is unaffected.
const log = mw.log;
const logError = mw.log.error;

/**
 * Check whether all elements from the 2nd set are in the 1st one.
 *
 * @template T
 * @param {Set<T> | undefined} s1
 * @param {Set<T> | undefined} s2
 */
const isSubset = (s1, s2) =>
    s1 === undefined || s1.size === 0 || (s2 !== undefined && s1.isSubsetOf(s2));

/**
 * Uppercase the 1st letter of a string.
 *
 * @param {string} s String.
 */
const firstToUppercase = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Return an of key/value pairs of an object properties, sorted by key.
 *
 * @template T
 * @param {T} o Object.
 * @returns {[keyof T, T[keyof T]][]}
 */
// @ts-ignore
const entriesByKey = (o) => Object.entries(o).sort((e1, e2) => e1[0].localeCompare(e2[0]));

class APIModuleLoader {
    /**
     * All queried modules (or that are being queried).
     * For each we store a promise that resolves when the module has been queried properly.
     *
     * @private
     * @type {Record<string, Promise<void>>}
     */
    modulePromises = {};
    /**
     * All queried modules.
     *
     * @private
     * @type {Record<string, ApiModule>}
     */
    modules = {};

    /**
     * Create an API module loader.
     *
     * @param {string} api URI to the foreign API.
     * @param {string} [name] API name.
     */
    constructor(api, name) {
        /**
         * API name, for debugging purpose.
         */
        this.name = name ?? api;
        /**
         * Base API URI, to use when resolving online documentation links.
         */
        this.uri = new URL(api).origin;
        /**
         * MediaWiki API.
         */
        this.api = new mw.ForeignApi(api, { anonymous: true });
    }

    /**
     * Replace relative HTML links with absolute ones.
     *
     * @param {string} text HTML text.
     */
    resolveLocalLinks = (text) => text.replace(/(<a.*? href=")(\/.*?")/g, `$1${this.uri}$2`);

    /**
     * Run a query request to load a set of modules from the API.
     *
     * @param {string[]} modules Module paths.
     */
    queryModules = async (modules) => {
        log(`${this.name}: Querying module data...`, modules);

        /** @type {mw.Api.Params.Action.ParamInfo & mw.Api.Params.Format.Json} */
        const params = {
            action: "paraminfo",
            format: "json",
            uselang: "en",
            helpformat: "html",
            modules,
            formatversion: "2",
        };

        const response = await this.api.get(params);

        /** @type {any[]} */
        const queriedModules = response.paraminfo.modules;
        /** @type {Set<string>} */
        const submodulesToQuery = new Set();

        for (const module of queriedModules) {
            this.modules[module.path] = module;

            module.classname = [module.classname];
            module.description = this.resolveLocalLinks(module.description);

            // Merge `parameters` with `templatedparameters`.
            // We do not care about having 2 distinct parameter lists, since a templated parameter
            // can still be distinguished using `templatevars`.
            const parameters = [];
            let i = 0,
                j = 0;
            while (i < module.parameters.length && j < module.templatedparameters.length) {
                parameters.push(
                    module.parameters[i].index < module.templatedparameters[j].index
                        ? module.parameters[i++]
                        : module.templatedparameters[j++]
                );
            }
            parameters.push(...module.parameters.slice(i), ...module.templatedparameters.slice(j));
            module.parameters = parameters;
            delete module.templatedparameters;

            for (const parameter of module.parameters) {
                parameter.description = this.resolveLocalLinks(parameter.description);
                if (parameter.allspecifier !== undefined) {
                    parameter.allspecifiers = [parameter.allspecifier];
                    delete parameter.allspecifier;
                }

                for (const submodule of Object.values(parameter.submodules ?? {})) {
                    submodulesToQuery.add(submodule);
                }
            }
        }

        await this.loadModules(submodulesToQuery);
    };

    /**
     * Load a set of modules from the API.
     * Resolves when all modules have been loaded.
     *
     * @param {Set<string>} paths Module paths.
     */
    loadModules = async (paths) => {
        /** @type {Promise<void>[]} */
        const promises = [];
        /** @type {string[]} */
        const pathsToQuery = [];

        for (const path of paths.values().toArray()) {
            if (path.includes("*") || !(path in this.modulePromises)) {
                pathsToQuery.push(path);
            } else if (!(path in this.modules)) {
                promises.push(this.modulePromises[path]);
            }
        }

        for (let i = 0; i < pathsToQuery.length; i += 50) {
            const batch = pathsToQuery.slice(i, i + 50);
            const batchPromise = this.queryModules(batch);

            promises.push(batchPromise);
            for (const path of pathsToQuery) {
                this.modulePromises[path] = batchPromise;
            }
        }

        return Object.assign({}, ...(await Promise.all(promises)));
    };

    /**
     * Load all (used) modules from the API.
     */
    load = async () => {
        await this.loadModules(new Set(["main"]));
        return this.modules;
    };

    /**
     * Load all modules from a list of API module loaders.
     * Does not return incomplete module data from APIs that failed some of their requests.
     *
     * @param {APIModuleLoader[]} loaders API module loaders.
     */
    static loadAll = async (loaders) => {
        const results = await Promise.allSettled(loaders.map((l) => l.load()));

        const modules = [];
        for (const [i, result] of results.entries().toArray()) {
            if (result.status === "fulfilled") {
                modules.push(result.value);
            } else {
                logError(`${loaders[i].name}: ${result.reason}`);
            }
        }

        return modules;
    };
}

/**
 * Merge two arrays in a new one without duplicates.
 *
 * @template {string | number} T
 * @param {T | T[] | undefined} a1 1st array to merge.
 * @param {T | T[] | undefined} a2 2nd array to merge.
 */
const mergeArray = (a1, a2) => {
    /** @type {T[]} */
    const a = [];

    if (Array.isArray(a1)) {
        a.push(...a1);
    } else if (a1 !== undefined) {
        a.push(a1);
    }

    if (Array.isArray(a2)) {
        a.push(...a2);
    } else if (a2 !== undefined) {
        a.push(a2);
    }

    return new Set(a).values().toArray();
};

/**
 * Registers and merges API module data.
 */
class APIModuleRegister {
    /**
     * Registered modules, per name.
     *
     * @readonly
     * @type {Record<string, ApiModule>}
     */
    modules = {};

    /**
     * Merge a different declaration of an API module parameter.
     *
     * @param {string} key Module key.
     * @param {number} i Parameter index.
     * @param {ApiModule.Parameter} p2 2nd parameter data.
     * @param {string} path Module path, for logging purpose.
     */
    addParameter(key, i, p2, path) {
        const p = this.modules[key].parameters[i];

        if (p.name !== p2.name) {
            // That should never happen.
            logError(`${path}: Different parameter names ("${p.name}" and "${p2.name}").`);
        }

        // If both types are enums, and one includes the other, we take the more generalized one.
        // If both types are enums, but incompatible:
        //     If they contain values, we assume values are wiki-dependent and generalize it back to a string.
        //     If they contain sub-module names, we take all possible values.
        // If one type is an enum and the other generalizes it, we take the generalized one.
        if (typeof p.type === "object" && typeof p2.type === "object") {
            if (p2.type.every(p.type.includes, p.type)) {
                // (ok)
            } else if (p.type.every(p2.type.includes, p2.type)) {
                p.type = p2.type;
            } else if (p.submodules) {
                p.type = mergeArray(p.type, p2.type);
            } else {
                p.type = "string";
            }
        } else if (
            (typeof p.type === "object" && p2.type === "string") ||
            (typeof p2.type === "object" && p.type === "string")
        ) {
            p.type = "string";
        } else if (p.type !== p2.type) {
            logError(`${path}: Incompatible parameter types ("${p.type}" and "${p2.type}").`);
        }

        // If one is optional, we make it optional.
        p.required &&= p2.required;

        // If default values are different, it may be wiki-dependant so we do not take it into account.
        if (p.default !== p2.default) {
            delete p.default;
        }

        if (p.multi !== p2.multi) {
            logError(`${path}: Different parameter multiplicity ("${p.multi}" and "${p2.multi}").`);
        }

        // If one allows duplicates, we allow duplicates.
        p.allowsduplicates ||= p2.allowsduplicates;

        // If one is sensitive, we make it sensitive.
        p.sensitive ||= p2.sensitive;

        // If one is deprecated, we make it deprecated.
        p.deprecated ||= p2.deprecated;

        // If limits are different, we take the least restrictive ones.
        if (p.limit !== undefined && p2.limit !== undefined) {
            p.limit = Math.max(p.limit, p2.limit);
        } else {
            delete p.limit;
        }
        if (p.lowlimit !== undefined && p2.lowlimit !== undefined) {
            p.lowlimit = Math.min(p.lowlimit, p2.lowlimit);
        } else {
            delete p.lowlimit;
        }
        if (p.highlimit !== undefined && p2.highlimit !== undefined) {
            p.highlimit = Math.max(p.highlimit, p2.highlimit);
        } else {
            delete p.highlimit;
        }
        if (p.min !== undefined && p2.min !== undefined) {
            p.min = Math.min(p.min, p2.min);
        } else {
            delete p.min;
        }
        if (p.max !== undefined && p2.max !== undefined) {
            p.max = Math.max(p.max, p2.max);
        } else {
            delete p.max;
        }
        if (p.highmax !== undefined && p2.highmax !== undefined) {
            p.highmax = Math.max(p.highmax, p2.highmax);
        } else {
            delete p.highmax;
        }
        if (p.maxbytes !== undefined && p2.maxbytes !== undefined) {
            p.maxbytes = Math.max(p.maxbytes, p2.maxbytes);
        } else {
            delete p.maxbytes;
        }
        if (p.maxchars !== undefined && p2.maxchars !== undefined) {
            p.maxchars = Math.max(p.maxchars, p2.maxchars);
        } else {
            delete p.maxchars;
        }

        if (p.allspecifiers !== undefined || p2.allspecifiers !== undefined) {
            p.allspecifiers = mergeArray(p.allspecifiers, p2.allspecifiers);
        }

        if (p.extranamespaces !== undefined || p2.extranamespaces !== undefined) {
            p.extranamespaces = mergeArray(p.extranamespaces, p2.extranamespaces);
        }

        if (p.tokentype !== p2.tokentype) {
            logError(
                `${path}: Different token parameter types ("${p.tokentype}" and "${p2.tokentype}").`
            );
        }

        // If one accepts non-existent titles, we accept non-existent titles.
        p.mustExist &&= p2.mustExist;

        // TODO: handle different values for templatevars & info
        p.templatevars ??= p2.templatevars;
        p.info ??= p2.info;

        if (p.subtypes !== undefined || p2.subtypes !== undefined) {
            p.subtypes = mergeArray(p.subtypes, p2.subtypes);
        }

        // Merge submodules.
        if (p.submodules !== undefined && p2.submodules !== undefined) {
            for (const [subkey, submodule] of Object.entries(p2.submodules)) {
                if (!(subkey in p.submodules)) {
                    p.submodules[subkey] = submodule;
                } else if (p.submodules[subkey] !== submodule) {
                    logError(
                        `${path}: Different sub-modules ("${p.submodules[subkey]}" and "${submodule}") for the same parameter value ("${subkey}").`
                    );
                }
            }
        } else {
            p.submodules ??= p2.submodules;
        }

        if (p.submoduleparamprefix !== p2.submoduleparamprefix) {
            logError(
                `${path}: Different sub-module parameter prefix ("${p.submoduleparamprefix}" and "${p2.submoduleparamprefix}").`
            );
        }

        if (p.internalvalues !== undefined || p2.internalvalues !== undefined) {
            p.internalvalues = mergeArray(p.internalvalues, p2.internalvalues);
        }
        if (p.deprecatedvalues !== undefined || p2.deprecatedvalues !== undefined) {
            p.deprecatedvalues = mergeArray(p.deprecatedvalues, p2.deprecatedvalues);
        }
    }

    /**
     * Merge a different API parameter list of an API module.
     *
     * @param {string} key Module key.
     * @param {Record<string, ApiModule>} moduleDict API module set.
     * @param {string} path Module path, for logging purpose.
     */
    addParameterArray(key, moduleDict, path) {
        const a = this.modules[key].parameters;
        // copy it, as we may splice it.
        const a2 = [...moduleDict[key].parameters];
        let i = 0,
            i2 = 0;

        while (i < a.length && i2 < a2.length) {
            const p = a[i],
                p2 = a2[i2];
            if (p.name === p2.name) {
                this.addParameter(key, i, p2, `${path}[${i}]`);
                ++i, ++i2;
                continue;
            }

            const i1Next = a.findIndex((p) => p.name === p2.name);
            const i2Next = a2.findIndex((p2) => p.name === p2.name);
            if (i2Next > 0 && i1Next > 0) {
                // Inconsistent parameter order, do not take the one of a2 into account.
                this.addParameter(key, i, a2[i2Next], `${path}[${i}]`);
                ++i;
                a2.splice(i2Next, 1);
            } else if (i1Next > 0) {
                i = i1Next;
            } else if (i2Next > 0) {
                a.splice(i, 0, ...a2.slice(i2, i2Next));
                i += i2Next - i2;
                i2 = i2Next;
            } else {
                ++i;
            }
        }

        a.push(...a2.slice(i2));

        a.forEach((p, i) => (p.index = i));
    }

    /**
     * Merge a different declaration of an API module.
     *
     * @param {string} key Module key.
     * @param {Record<string, ApiModule>} moduleDict API module set.
     * @param {string} path Module path, for logging purpose.
     */
    addModule(key, moduleDict, path) {
        const m = this.modules[key];
        const m2 = moduleDict[key];

        if (m === undefined) {
            this.modules[key] = m2;
            return;
        }

        if (m.name !== m2.name) {
            logError(`${path}: Different module names ("${m.name}" and "${m2.name}").`);
        }

        m.classname = mergeArray(m.classname, m2.classname);

        if (m.path !== m2.path) {
            logError(`${path}: Different module paths ("${m.path}" and "${m2.path}").`);
        }

        if (m.group !== m2.group) {
            logError(`${path}: Different module groups ("${m.group}" and "${m2.group}").`);
        }

        if (m.prefix !== m2.prefix) {
            logError(`${path}: Different module prefixes ("${m.prefix}" and "${m2.prefix}").`);
        }

        // We use what the most up to date site says about module metadata.
        m.source ??= m2.source;

        // If usage restrictions are different, we take the less restrictive ones.
        m.internal &&= m2.internal;
        m.readrights &&= m2.readrights;
        m.writerights &&= m2.writerights;
        m.mustbeposted &&= m2.mustbeposted;

        // If one is deprecated, we make it deprecated.
        m.deprecated ||= m2.deprecated;
        m.generator ||= m2.generator;

        m.helpurls = mergeArray(m.helpurls, m2.helpurls);

        this.addParameterArray(key, moduleDict, path);
        m.dynamicparameters ??= m2.dynamicparameters;
    }

    /**
     * @param {Record<string, ApiModule>} moduleDict API module set.
     */
    add(moduleDict) {
        for (const key in moduleDict) {
            this.addModule(key, moduleDict, moduleDict[key].path);
        }
    }
}

/**
 * Format a TS literal for JSdoc usage.
 *
 * @param {unknown} lit Literal.
 * @param {TypeExpression} [type] Literal type, may help to produce a more fitting formatting.
 * @returns {string}
 */
const formatJSdocLit = (lit, type) => {
    if (lit === undefined || lit === "") {
        return "";
    }

    if (Number.isInteger(lit)) {
        return `${lit}`;
    }

    if (type === undefined || !type.multi) {
        return `\`${lit}\``;
    }

    const litParts = `${lit}`.split("|").map((l) => formatJSdocLit(l));
    if (litParts.length === 1) {
        return litParts[0];
    } else if (litParts.length === 2) {
        return `${litParts[0]} and ${litParts[1]}`;
    } else {
        const lastPart = litParts.pop();
        return `${litParts.join(", ")}, and ${lastPart}`;
    }
};

/**
 * TS type of an API module parameter.
 */
class TypeExpression {
    /**
     * Type aliases to declare (in namespace `mw.Api`) and used to simplify API parameter types.
     *
     * @type {Record<string, TypeExpression>}
     */
    static type_aliases = {};

    /**
     * Native type or map of submodules.
     *
     * @private
     * @type {string?}
     */
    base;
    /**
     * Possible literals, that may not be part of the base type above.
     *
     * @private
     * @type {Set<string>}
     */
    lits;
    /**
     * Whether literals can be specified as a list.
     *
     * @type {boolean}
     */
    multi;
    /**
     * Possible literals, that may not be part of the base type above, and can not be
     * used in a list.
     *
     * @private
     * @type {Set<string>}
     */
    singleLits = new Set();

    /**
     * @param {string?} base
     * @param {string[]} [lits]
     * @param {boolean} [multi]
     */
    constructor(base, lits, multi) {
        this.base = base;
        this.lits = new Set();
        this.multi = multi ?? false;
        if (lits !== undefined) {
            this.addLiterals(lits);
        }
    }

    clone() {
        const other = new TypeExpression(this.base);
        other.lits = new Set(this.lits);
        other.multi = this.multi;
        other.singleLits = new Set(this.singleLits);
        return other;
    }

    /**
     * @param {string[]} lits
     * @param {"multi" | "single"} [dup]
     */
    addLiterals(lits, dup) {
        if (dup !== "single") {
            for (const lit of lits) {
                this.lits.add(lit);
                this.singleLits.delete(lit);
            }
        } else {
            for (const lit of lits) {
                if (!this.lits.has(lit)) {
                    this.singleLits.add(lit);
                }
            }
        }
    }

    /**
     * Simplify the type expression, using registered type aliases.
     */
    normalize() {
        if (this.lits.size === 0 && this.singleLits.size === 0) {
            return;
        }

        // Remove literals that are already covered by the base type.
        /** @type {TypeExpression} */
        let underlying = this;
        while (underlying.base !== null) {
            // `string` covers all literals.
            if (underlying.base === "string") {
                this.lits.clear();
                if (this.multi) {
                    this.singleLits.clear();
                }
                break;
            }

            // Assume any unknown base type does not cover anything.
            if (!(underlying.base in TypeExpression.type_aliases)) {
                break;
            }

            underlying = TypeExpression.type_aliases[underlying.base];
            underlying.lits.forEach(Set.prototype.delete, this.lits);
            underlying.singleLits.forEach(Set.prototype.delete, this.singleLits);
        }

        // Use type aliases to reduce type expressions.
        // Only consider types with literals, as we do not want to replace type synonyms.
        // Note that this approach is linear: we apply the first replacement found in order,
        // without trying to find the best replacement.
        let foundReplacement;
        do {
            foundReplacement = false;
            for (const [name, typeMap] of Object.entries(TypeExpression.type_aliases)) {
                if (
                    (typeMap.base !== null && typeMap.base !== this.base) ||
                    typeMap.lits.size === 0 ||
                    !isSubset(typeMap.lits, this.lits) ||
                    typeMap.multi !== this.multi ||
                    (typeMap.multi && this.multi && !isSubset(typeMap.singleLits, this.singleLits))
                ) {
                    continue;
                }

                this.base = name;
                typeMap.lits.forEach(Set.prototype.delete, this.lits);
                typeMap.singleLits.forEach(Set.prototype.delete, this.singleLits);

                foundReplacement = true;
                break;
            }
        } while (foundReplacement);
    }

    /**
     * Format the type expression to a TS string.
     */
    toCode() {
        /** @type {string[]} */
        let typeUnion = [];

        if (this.base !== null) {
            typeUnion.push(this.base);
        }

        const lits = new Set(this.lits);
        const toggleLits = new Set();
        if (lits.size > 0) {
            for (const lit of lits.values().toArray()) {
                const negLit = `!${lit}`;
                if (lits.has(negLit)) {
                    toggleLits.add(lit);
                    lits.delete(lit);
                    lits.delete(negLit);
                }
            }

            if (toggleLits.size > 0) {
                typeUnion.push(`Toggle<${TypeExpression.formatLitSet(toggleLits).join(" | ")}>`);
            }

            typeUnion.push(...TypeExpression.formatLitSet(lits));
        }

        if (typeUnion.length === 0) {
            // We do not have any information about what this type is about.
            // Assume it is a wiki-dependent enumeration with no specified value,
            // so generalize it back to a string (instead of never).
            return "string";
        }

        if (this.multi) {
            if (typeUnion.length === 1 && this.base !== null) {
                typeUnion.push(
                    `${typeUnion[0]}[]`,
                    ...TypeExpression.formatLitSet(this.singleLits)
                );
            } else {
                typeUnion = [
                    ...TypeExpression.formatLitSet(this.singleLits),
                    `OneOrMore<${typeUnion.join(" | ")}>`,
                ];
            }
        }

        return typeUnion.join(" | ");
    }

    /**
     * Format a set of TS literals as a list of quoted strings.
     *
     * @param {Set<string> | undefined} litSet Set of literals.
     */
    static formatLitSet(litSet) {
        if (litSet === undefined) {
            return [];
        } else {
            return litSet.values().map(quote).toArray().sort();
        }
    }
}

/**
 * Processed API parameter data.
 */
class Parameter {
    /**
     * Mapping of API parameter types to their associated TS type.
     *
     * @type {Record<string & ApiModule.Parameter.Type, TypeExpression>}
     */
    static php_type_mapping = {
        boolean: new TypeExpression("boolean"),
        expiry: new TypeExpression("string"),
        integer: new TypeExpression("number"),
        limit: new TypeExpression("Limit"),
        namespace: new TypeExpression("number"),
        password: new TypeExpression("string"),
        raw: new TypeExpression("string"),
        string: new TypeExpression("string"),
        text: new TypeExpression("string"),
        timestamp: new TypeExpression("string"),
        title: new TypeExpression("string"),
        upload: new TypeExpression("File"),
        user: new TypeExpression("string"),
    };

    /**
     * Module data.
     *
     * @readonly
     * @type {Module}
     */
    module;
    /**
     * Property name.
     *
     * @type {string}
     */
    key;
    /**
     * Formatted parameter name.
     *
     * @type {string}
     */
    name;
    /**
     * TS type.
     *
     * @type {TypeExpression}
     */
    type;
    /**
     * If the parameter has submodules, a mapping of literals to its associated module.
     *
     * @type {Record<string, Module>?}
     */
    submodules = null;
    /**
     * Whether the type name is a string template or literal.
     *
     * @type {boolean}
     */
    template = false;
    /**
     * Whether the parameter is required or optional.
     *
     * @type {boolean}
     */
    required = false;
    /**
     * Default parameter value.
     *
     * @type {unknown}
     */
    default = undefined;
    /**
     * Base JSdoc to use with generated properties.
     *
     * @type {JSdoc}
     */
    jsdoc = new JSdoc();

    /**
     * @param {Module} module
     * @param {string} key
     * @param {TypeExpression} type
     */
    constructor(module, key, type) {
        this.module = module;
        this.key = key;
        this.name = key;
        this.type = type;
    }

    /**
     * @param {string} [prefix]
     */
    toProperty(prefix) {
        prefix ??= "";

        const property = new PropertyDeclaration(`${prefix}${this.key}`, this.required, this.type);
        property.jsdoc = this.jsdoc.clone();
        property.template = this.template;

        return property;
    }

    /**
     * Process data of an API module parameter.
     *
     * In practice:
     *  - format and capitalize the parameter name.
     *  - deduce the TS parameter type.
     *  - add non-TS info to the JSdoc.
     *  - format JSdoc description from HTML -> markdown.
     *
     * @param {Module} module Processed API module data.
     * @param {Record<string, ApiModule>} apiModuleDict Set of modules the parameter comes from.
     * @param {string} path Path of the module to process.
     * @param {number} i Index of the parameter to process.
     */
    static fromAPI = (module, apiModuleDict, path, i) => {
        const apiModule = apiModuleDict[path];
        const apiParameter = apiModule.parameters[i];

        let type;
        if (typeof apiParameter.type !== "string") {
            if (
                // is its value used as a template variable in any other parameter?
                apiModule.parameters.some((p) =>
                    Object.values(p.templatevars ?? {}).includes(apiParameter.name)
                ) ||
                // does it declare submodules (i.e. new values can be added)?
                apiParameter.submodules !== undefined ||
                // is it a large enum?
                apiParameter.type.length > 100
            ) {
                type = new TypeExpression("string");
            } else {
                type = new TypeExpression(null, apiParameter.type);
            }
        } else if (apiParameter.type in Parameter.php_type_mapping) {
            type = Parameter.php_type_mapping[apiParameter.type].clone();
        } else {
            logError(
                `Could not find an appropriate TS type for parameter type "${apiParameter.type}".`
            );
            type = new TypeExpression(null);
        }

        if (apiParameter.multi) {
            type.multi = true;
        }

        if (apiParameter.allspecifiers !== undefined) {
            type.addLiterals(apiParameter.allspecifiers, "single");
        }

        if (apiParameter.internalvalues !== undefined) {
            type.addLiterals(apiParameter.internalvalues);
        }
        if (apiParameter.deprecatedvalues !== undefined) {
            type.addLiterals(apiParameter.deprecatedvalues);
        }

        type.normalize();

        const parameter = new Parameter(module, apiParameter.name, type);

        if (apiParameter.required) {
            parameter.required = true;
        }

        parameter.jsdoc.description = JSdoc.htmlToMarkdown(apiParameter.description);

        if (apiParameter.default !== undefined) {
            parameter.default = apiParameter.default;
            const jsdocLit = formatJSdocLit(parameter.default, parameter.type) || "an empty string";
            parameter.jsdoc.description.push("", `Defaults to ${jsdocLit}.`);
        }

        if (apiParameter.sensitive) {
            parameter.jsdoc.description.push("", "Sensitive parameter.");
        }

        if (apiParameter.deprecated) {
            parameter.jsdoc.deprecated = true;
        }

        const templatevars = apiParameter.templatevars;
        if (templatevars) {
            const varPattern = new RegExp(`\\{(${Object.keys(templatevars).join("|")})\\}`, "g");
            parameter.template = true;
            parameter.key = parameter.key.replaceAll(varPattern, (_, varName) => {
                const varParam = templatevars[varName];
                const varType = apiModule.parameters.find((p) => p.name === varParam)?.type;
                if (Array.isArray(varType)) {
                    return `\${string}`;
                } else {
                    return `\${${varType}}`;
                }
            });
        }

        parameter.name = firstToUppercase(apiParameter.name);

        if (apiParameter.submodules !== undefined) {
            parameter.submodules = Object.fromEntries(
                Object.entries(apiParameter.submodules).map(([value, submodule]) => [
                    value,
                    Module.fromAPI(apiModuleDict, submodule, apiParameter.submoduleparamprefix, {
                        parameter,
                        value,
                    }),
                ])
            );
        }

        return parameter;
    };
}

/**
 * If it is not an API root module, indicates a parameter and associated value providing this
 * module as a sub-module.
 *
 * @typedef ParentPath
 * @property {Parameter} parameter
 * @property {string} value
 */

/**
 * Stack of parent module parameters of a sub-module.
 *
 * @typedef {ParentStack.Node | Declaration} ParentStack
 *
 * @typedef ParentStack.Node
 * @property {ParentPath} path
 * @property {ParentStack} next
 */

/**
 * Processed API module data.
 */
class Module {
    /**
     * Patterns used to properly capitalize TS type names.
     * By default, PHP namespaces and class name are used to find proper capitalizations, this can be used to
     * override bad deductions or when there is not enough information for the script to capitalize anything.
     *
     * @type {Record<string, string>}
     */
    static caps_patterns = {};

    /**
     * API module path.
     *
     * @readonly
     * @type {string}
     */
    path;
    /**
     * Formatted extension name.
     *
     * @type {string}
     */
    source;
    /**
     * Formatted module name.
     *
     * @type {string}
     */
    name;
    /**
     * Interfaces to inherit from.
     *
     * @type {ParentPath[]}
     */
    parents = [];
    /**
     * Sorted list of properties.
     *
     * @type {Parameter[]}
     */
    parameters = [];
    /**
     * Full parameter prefix.
     *
     * @type {string}
     */
    prefix = "";
    /**
     * Base JSdoc to use with generated types.
     *
     * @type {JSdoc}
     */
    jsdoc = new JSdoc();

    /**
     * @param {string} path
     * @param {string} source
     * @param {string} [name]
     */
    constructor(path, source, name) {
        this.path = path;
        this.source = source;
        this.name = name ?? path;
    }

    /**
     * Generate the full prefix of a parameter name from a stack of parent module parameters.
     *
     * @param {ParentStack} parentStack Stack of parent module parameters.
     */
    getParameterPrefix(parentStack) {
        let prefix = this.prefix;
        for (let parent = parentStack; "path" in parent; parent = parent.next) {
            prefix = `${parent.path.parameter.module.prefix}${prefix}`;
        }
        return prefix;
    }

    /**
     * Format an API module as a set of TS declarations.
     *
     * @param {ParentStack} parentStack Stack of parent module parameters.
     * @param {Record<string, Record<string, string[]>>} [deprecatedAliases] Set of deprecated to aliases to fill in.
     */
    toNamespace(parentStack, deprecatedAliases) {
        const parameterPrefix = this.getParameterPrefix(parentStack);

        const properties = this.parameters.map((p) => p.toProperty(parameterPrefix));

        const baseInterface = new InterfaceDeclaration(this.name, [], properties);
        if (this.jsdoc) {
            baseInterface.jsdoc = this.jsdoc.clone();
        }

        if ("path" in parentStack) {
            const parameter = parentStack.path.parameter;
            const parentParameterPrefix = parameter.module.getParameterPrefix(parentStack.next);

            // Set parent interface
            baseInterface.parents.push(parameter.module.name);

            // Narrow parameter from parent interface
            if (!parameter.type.multi) {
                const narrowedProperty = new PropertyDeclaration(
                    `${parentParameterPrefix}${parameter.key}`,
                    parameter.required,
                    new TypeExpression(null, [parentStack.path.value])
                );
                if (parameter.template) {
                    narrowedProperty.template = true;
                }

                // Make parameter required if not being narrowed with the default value.
                if (
                    !parameter.required &&
                    parameter.default !== undefined &&
                    parameter.default !== parentStack.path.value
                ) {
                    narrowedProperty.required = true;
                }

                baseInterface.properties.unshift(narrowedProperty);
            }
        } else {
            baseInterface.parents.push(parentStack.name);
        }

        const namespace = new NamespaceDeclaration();
        namespace.addDeclaration(baseInterface);

        for (const parameter of this.parameters) {
            if (parameter.submodules !== null) {
                const subnamespace = namespace.getNamespace([this.name, parameter.name]);
                for (const [value, submodule] of entriesByKey(parameter.submodules)) {
                    const path = { parameter, value };
                    subnamespace.merge(
                        submodule.toNamespace({ path, next: parentStack }, deprecatedAliases)
                    );
                }
            }
        }

        let ifacePath = this.name;
        for (let parent = parentStack; "path" in parent; parent = parent.next) {
            const parameter = parent.path.parameter;
            ifacePath = `${parameter.module.name}.${parameter.name}.${ifacePath}`;
        }

        if (deprecatedAliases) {
            for (const [oldName, paths] of Object.entries(INTERFACE_COMPATIBILITY)) {
                if (paths.includes(this.path)) {
                    deprecatedAliases[oldName] ??= {};
                    deprecatedAliases[oldName][this.path] ??= [];
                    deprecatedAliases[oldName][this.path].push(ifacePath);
                }
            }
        }

        return namespace;
    }

    /**
     * Process data of an API module.
     *
     * In practice:
     *  - format and capitalize the module name.
     *  - add prefixes to parameter names, duplicating modules if necessary.
     *  - format JSdoc description from HTML -> markdown.
     *
     * @param {Record<string, ApiModule>} apiModuleDict Set of modules the module comes from.
     * @param {string} path Path of the module to process.
     * @param {string} [prefix] Full parameter name prefix.
     * @param {ParentPath} [parent] Data of the module this one is an extension of.
     */
    static fromAPI = (apiModuleDict, path, prefix, parent) => {
        const apiModule = apiModuleDict[path];

        const { name, source } = Module.findName(apiModule);

        const module = new Module(apiModule.path, source, name);
        module.prefix = `${prefix ?? ""}${apiModule.prefix}`;

        if (parent) {
            module.parents.push(parent);
        }

        const apiParameters = apiModule.parameters.toSorted((p1, p2) => p1.index - p2.index);

        module.parameters = apiParameters.map((_, i) =>
            Parameter.fromAPI(module, apiModuleDict, path, i)
        );

        module.jsdoc.description = JSdoc.htmlToMarkdown(apiModule.description);
        module.jsdoc.seelinks = apiModule.helpurls;
        if (apiModule.internal) {
            module.jsdoc.private = true;
        }
        if (apiModule.deprecated) {
            module.jsdoc.deprecated = true;
        }

        return module;
    };

    /**
     * Try to find a suitable type name (and source if not from MediaWiki) for a module.
     *
     * @param {ApiModule} apiModule API module data.
     */
    static findName = (apiModule) => {
        const result = {
            name: apiModule.name,
            source:
                apiModule.source === undefined || apiModule.source === "MediaWiki"
                    ? ""
                    : apiModule.source.replace(/[\s-]/g, ""),
        };

        // Main module.
        if (!apiModule.group) {
            result.name = "Params";
            return result;
        }

        // Try to properly capitalize the module name.
        result.name = result.name.split(/[-_]/g).map(firstToUppercase).join("");

        // We generate patterns from the source, presets, and class name, then we try to find the
        // best combination to match the full name. Not that we test all possible combinations, but
        // only keep the ones with maximized pattern lengths.

        const plainClassNames = apiModule.classname.map(
                (n) => n.replace(/Api|Extensions?|\\/g, "") + "s"
            ),
            possibleReplacements = Object.entries({
                ...Object.fromEntries(
                    result.source.matchAll(/[A-Z][^A-Z]*/g).map((m) => [m[0].toLowerCase(), m[0]])
                ),
                ...Module.caps_patterns,
            });
        possibleReplacements.sort(([p1], [p2]) => p2.length - p1.length);

        /**
         * Recursively replace prefixes and suffixes of the module name.
         *
         * @param {string} name Module name (or substring).
         * @returns {{ name: string, optimal?: true }} Name capitalization with maximized pattern
         *   lengths, may be annotated `optimal` if all name parts have been properly capitalized.
         */
        function findBestReplacement(name) {
            for (const plainClassName of plainClassNames) {
                const nameIndex = plainClassName.toLowerCase().indexOf(name.toLowerCase());
                if (nameIndex >= 0) {
                    return {
                        name: plainClassName.substring(nameIndex, nameIndex + name.length),
                        optimal: true,
                    };
                }
            }

            let bestReplacement = firstToUppercase(name),
                bestRemainingLength = name.length;
            for (const [p, v] of possibleReplacements) {
                const remainingLength = name.length - p.length;
                if (remainingLength < 0) {
                    continue;
                }

                if (name.toLowerCase().startsWith(p)) {
                    const repl = findBestReplacement(name.substring(p.length));
                    repl.name = `${v}${repl.name}`;
                    if (repl.optimal) {
                        return repl;
                    }
                    if (remainingLength < bestRemainingLength) {
                        bestReplacement = repl.name;
                        bestRemainingLength = remainingLength;
                    }
                }

                if (name.toLowerCase().endsWith(p)) {
                    const repl = findBestReplacement(name.substring(0, remainingLength));
                    repl.name = `${repl.name}${v}`;
                    if (repl.optimal) {
                        return repl;
                    }
                    if (remainingLength < bestRemainingLength) {
                        bestReplacement = repl.name;
                        bestRemainingLength = remainingLength;
                    }
                }
            }

            return { name: bestReplacement };
        }

        const bestRepl = findBestReplacement(
            result.name.split(/[-_]/g).map(firstToUppercase).join("")
        );
        result.name = bestRepl.name;
        if (!bestRepl.optimal) {
            log(
                `Could not find a proper name capitalization for module "${apiModule.name}", using "${result.name}".`
            );
        }

        return result;
    };
}

/**
 * Add quotes around a TS string, unescaping any raw quotes it might contain.
 *
 * @param {string} s String to quote.
 */
const quote = (s) => `"${s.replaceAll('"', '\\"')}"`;

/**
 * Indent a line by 1 level.
 *
 * @param {string} s
 */
const indent = (s) => (s !== "" ? " ".repeat(4) : "") + s;

/**
 * Flatten multiple code blocks into a single code block, putting an empty line between blocks.
 *
 * @param {...string[]} blocks Code blocks.
 */
const flatWithLine = (...blocks) => {
    if (blocks.length === 0) {
        return [];
    }

    const newBlock = [...blocks[0]];
    for (let i = 1; i < blocks.length; ++i) {
        newBlock.push("", ...blocks[i]);
    }

    return newBlock;
};

/**
 * JSdoc declaration, associated to something.
 */
class JSdoc {
    /**
     * JSdoc-compatible description.
     *
     * @type {string[]}
     */
    description = [];
    /**
     * True if the thing is private (and that can not be expressed with the TS type system),
     * false or undefined otherwise.
     *
     * @type {boolean}
     */
    private = false;
    /**
     * True or a JSdoc-compatible message if the thing is deprecated, false or undefined
     * otherwise.
     *
     * @type {string | boolean}
     */
    deprecated = false;
    /**
     * List of related links to include at the end of the JSdoc.
     *
     * @type {string[]}
     */
    seelinks = [];

    clone() {
        const other = new JSdoc();
        other.description = [...this.description];
        other.private = this.private;
        other.deprecated = this.deprecated;
        other.seelinks = [...this.seelinks];
        return other;
    }

    /**
     * Generate a TS code block from a JSdoc declaration.
     */
    toCode() {
        /** @type {string[][]} */
        const lineBlocks = [];

        if (this.description.length > 0) {
            lineBlocks.push(this.description);
        }

        /** @type {string[]} */
        const tags = [];

        if (typeof this.deprecated === "string") {
            tags.push(`@deprecated ${this.deprecated}`);
        } else if (this.deprecated) {
            tags.push("@deprecated");
        }

        if (this.private) {
            tags.push("@private");
        }

        if (this.seelinks.length) {
            tags.push(...this.seelinks.map((l) => `@see ${l}`));
        }

        if (tags.length) {
            lineBlocks.push(tags);
        }

        return lineBlocks.length
            ? ["/**", ...flatWithLine(...lineBlocks).map((l) => ` * ${l}`), " */"]
            : [];
    }

    /**
     * Convert HTML syntax to JSdoc-friendly markdown.
     *
     * @param {string} text HTML text.
     */
    static htmlToMarkdown = (text) => {
        // div, span --> nothing
        text = text.replace(/<\/?(div|span).*?>/g, "");

        // p --> paragraph
        text = text.replace(/<p.*?>/g, "").replace(/<\/p>\s*/g, "\n\n");

        // em, strong --> bold
        text = text.replace(/<\/?(em|strong).*?>/g, "**");

        // i --> italic
        text = text.replace(/<\/?i.*?>/g, "_");

        // code, kbd, samp, var --> code block
        text = text.replace(/<\/?(code|kbd|samp|var).*?>/g, "`");

        // a --> @link
        text = text.replace(/<a.*?href="(.*?)".*?>(.*?)<\/a>/g, "{@link $1 $2}");

        // ol, ul --> list
        // dl     --> list (with bold term)
        text = text.replace(/<\/?(dd|dl|ol|ul).*?>/g, "");
        text = text.replace(/\n?<dt.*?>/g, "\n- **").replace(/<\/dt>\s*/g, "**: ");
        text = text.replace(/\n?<li.*?>/g, "\n- ").replace(/<\/li>/g, "");

        text = text.replace(/\n{3,}/g, "\n\n");

        // Move code blocks out of links.
        // `{@link X Y}` --> {@link X `Y`}
        text = text.replace(/`\{@link (.*?) (.*?)\}`/g, "{@link $1 `$2`}");
        text = text.replace(/`\{@link (.*?)\}`/g, "{@link $1 `$1`}");

        // Timestamps: use a generic string description to prevent spurious changes when
        // re-generating the type declarations. We assume all timestamps refer to this exact time.
        text = text.replace(/`\d{4}(?:-\d{2}){2}T\d{2}(?::\d{2}){2}Z`/g, "the current timestamp");

        // Replace HTML entities.
        const textArea = document.createElement("textarea");
        textArea.innerHTML = text;
        text = textArea.value;

        return text.trim().split("\n");
    };
}

/**
 * Declaration modifier.
 *
 * @typedef {"export" | "declare" | "export declare" | null} DeclarationModifier
 */

/**
 * Something that is a type-like declaration.
 *
 * @abstract
 */
class AbstractDeclaration {
    /**
     * JSdoc declaration.
     *
     * @type {JSdoc}
     */
    jsdoc = new JSdoc();
    /**
     * Type name.
     *
     * @readonly
     * @type {string}
     */
    name;
    /**
     * Declaration modifier.
     *
     * @type {DeclarationModifier}
     */
    modifier = null;
    /**
     * List of template type variables.
     *
     * @type {string[]}
     */
    template = [];

    /**
     * @param {string} name
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * @param {string} declType
     * @param {string[]} content
     * @param {string[]} [preRules]
     */
    toCode(declType, content, preRules) {
        let intro = `${declType} ${this.name}`;

        if (this.modifier !== null) {
            intro = `${this.modifier} ${intro}`;
        }

        if (this.template.length > 0) {
            intro = `${intro}<${this.template.join(", ")}>`;
        }

        if (content.length > 0) {
            content[0] = `${intro} ${content[0]}`;
        } else {
            content.push(intro);
        }

        preRules ??= [];
        return [
            ...this.jsdoc.toCode(),
            ...preRules.map(AbstractDeclaration.getDisableRuleLine),
            ...content,
        ];
    }

    /**
     * Generate a TS line to disable a linter rule for the next line.
     *
     * @private
     * @param {string} name Rule name.
     */
    static getDisableRuleLine = (name) => `// tslint:disable-next-line:${name}`;
}

/**
 * Type alias declaration.
 */
class TypeDeclaration extends AbstractDeclaration {
    /**
     * Type expression.
     *
     * @readonly
     * @type {string}
     */
    type;

    /**
     * @param {string} name
     * @param {string} type
     */
    constructor(name, type) {
        super(name);
        this.type = type;
    }

    /**
     * Generate a TS code block from a type alias declaration.
     */
    toCode() {
        return super.toCode("type", [`= ${this.type};`]);
    }
}

/**
 * Possible replacement of a deprecated type alias.
 *
 * @typedef DeprecationTarget
 *
 * @property {string} type
 * Replacement type expression.
 *
 * @property {string} [link]
 * Link to put on the replacement type expression, used in JSdoc.
 */

/**
 * Deprecated type alias declaration.
 */
class DeprecatedTypeDeclaration extends TypeDeclaration {
    /**
     * @param {string} name
     * @param {DeprecationTarget[]} targets
     * @param {string} [type]
     */
    constructor(name, targets, type) {
        super(name, type ?? targets[0].type);

        /** @type {DeclarationModifier} */
        this.modifier = "export";
        this.jsdoc.deprecated = `Use ${targets
            .map((t) => `{@link ${t.link ?? t.type} \`${t.type}\`}`)
            .join(" / ")} instead.`;
    }
}

/**
 * Interface property declaration.
 */
class PropertyDeclaration {
    /**
     * JSdoc declaration.
     *
     * @type {JSdoc}
     */
    jsdoc = new JSdoc();
    /**
     * Property name, as an interpolated TS string if `template`,
     * otherwise as a string literal.
     *
     * @type {string}
     */
    name;
    /**
     * True if the property is required, false if it is optional.
     *
     * @type {boolean}
     */
    required;
    /**
     * Property type.
     *
     * @type {string}
     */
    type;
    /**
     * True if the property name is an interpolated TS string,
     * false if it is a single literal.
     *
     * @type {boolean}
     */
    template = false;

    /**
     * @param {string} name
     * @param {boolean} required
     * @param {string | TypeExpression} type
     */
    constructor(name, required, type) {
        this.name = name;
        this.required = required;
        if (type instanceof TypeExpression) {
            type = type?.toCode();
        }
        this.type = type;
    }

    /**
     * Generate a TS string from an interface property declaration.
     */
    toCode() {
        let name = this.name;
        if (this.template) {
            name = `[k: \`${name}\`]`;
        } else {
            if (!name.match(/^[0-9a-z]+$/i)) {
                name = quote(name);
            }

            if (!this.required) {
                name = `${name}?`;
            }
        }

        return [...this.jsdoc.toCode(), `${name}: ${this.type};`];
    }
}

/**
 * Interface declaration.
 */
class InterfaceDeclaration extends AbstractDeclaration {
    /**
     * Set of parent types to inherit from.
     *
     * @type {string[]}
     */
    parents;
    /**
     * Ordered list of properties.
     *
     * @type {PropertyDeclaration[]}
     */
    properties;

    /**
     * @param {string} name
     * @param {string[]} [parents]
     * @param {PropertyDeclaration[]} [properties]
     */
    constructor(name, parents, properties) {
        super(name);
        this.parents = parents ?? [];
        this.properties = properties ?? [];
    }

    /**
     * Generate a TS code block from an interface declaration.
     */
    toCode() {
        /** @type {string[]} */
        const preRules = [];

        if (this.name.match(/^I[^a-z]/)) {
            preRules.push("interface-name");
        }

        let intro = "{";
        if (this.parents.length > 0) {
            intro = `extends ${this.parents.join(", ")} ${intro}`;
        }

        let content;
        if (this.properties.length > 0) {
            content = [intro, ...this.properties.flatMap((p) => p.toCode()).map(indent), "}"];
        } else {
            preRules.push("no-empty-interface");
            content = [`${intro}}`];
        }

        return super.toCode("interface", content, preRules);
    }
}

/**
 * Type declaration (either a type alias or interface).
 *
 * @typedef {TypeDeclaration | InterfaceDeclaration} Declaration
 */

/**
 * Namespace declaration.
 */
class NamespaceDeclaration {
    /**
     * JSdoc declaration.
     *
     * @type {JSdoc}
     */
    jsdoc = new JSdoc();
    /**
     * Type declarations.
     *
     * @type {Declaration[]}
     */
    declarations = [];
    /**
     * Sub-namespaces.
     *
     * @type {Record<string, NamespaceDeclaration>}
     */
    subnamespaces = {};

    /**
     * Add a type declaration to the namespace or one of its subnamespaces.
     *
     * @param {Declaration} declaration Type declaration.
     * @param {string[]} [path] Subnamespace path of where to put the declaration.
     */
    addDeclaration(declaration, path) {
        if (path === undefined || path.length === 0) {
            this.declarations.push(declaration);
            return;
        }

        const [subnamespace, ...subpath] = path;
        this.subnamespaces[subnamespace] ??= new NamespaceDeclaration();
        this.subnamespaces[subnamespace].addDeclaration(declaration, subpath);
    }

    /**
     * @param {string[]} path
     */
    getNamespace(path) {
        /** @type {NamespaceDeclaration} */
        let subnamespace = this;
        for (const name of path) {
            subnamespace = subnamespace.subnamespaces[name] ??= new NamespaceDeclaration();
        }
        return subnamespace;
    }

    /**
     * Merge two declarations of a same TS namespace, within the 1st one.
     *
     * @param {NamespaceDeclaration} other Other namespace declaration.
     */
    merge(other) {
        this.declarations.push(...other.declarations);

        for (const [subname, subnamespace] of Object.entries(other.subnamespaces)) {
            if (subname in this.subnamespaces) {
                this.subnamespaces[subname].merge(subnamespace);
            } else {
                this.subnamespaces[subname] = subnamespace;
            }
        }
    }

    /**
     * Generate a TS code block from a namespace declaration.
     *
     * @param {string} [name] Namespace name, if it should be enclosed in braces.
     * @returns {string[]}
     */
    toCode(name) {
        const subnamespaces = Object.entries(this.subnamespaces);

        const content = flatWithLine(
            ...this.declarations.map((declaration) => declaration.toCode()),
            ...subnamespaces.map(([subname, subnamespace]) => subnamespace.toCode(subname))
        );

        if (name === undefined) {
            return content;
        }

        if (subnamespaces.length === 1 && this.declarations.length === 0) {
            // namespace X { namespace Y { ... } }  -->  namespace X.Y { ... }
            const [subname, subnamespace] = subnamespaces[0];
            return subnamespace.toCode(`${name}.${subname}`);
        }

        return [`namespace ${name} {`, ...content.map(indent), "}"];
    }
}

class DeclarationFile {
    /**
     * Global `mw.Api` namespace.
     *
     * @private
     */
    apiNamespace = new NamespaceDeclaration();
    /**
     * Set of deprecated type aliases, with the list of types that can be used as replacement.
     * Replacements are grouped by module source (to keep a consistent order).
     *
     * @type {Record<string, Record<string, string[]>>}
     */
    deprecatedAliases = {};

    /**
     * @param {NamespaceDeclaration} [namespace] Declarations to add to the `mw.Api` namespace.
     */
    constructor(namespace) {
        if (namespace !== undefined) {
            this.apiNamespace.merge(namespace);
        }
    }

    /**
     * Add some TS declarations to the exposed `mw.Api` namespace.
     *
     * @param {NamespaceDeclaration | TypeDeclaration} decl Declaration to add, or namespace with declarations.
     */
    addToApiNamespace(decl) {
        if (decl instanceof NamespaceDeclaration) {
            this.apiNamespace.merge(decl);
        } else {
            this.apiNamespace.addDeclaration(decl);
        }
    }

    /**
     * Generate a TS code block from a global namespace declaration.
     * Also puts imports/exports and some stuff around, as it generates a full declaration file.
     */
    toCode() {
        // Local declarations.
        const local = new NamespaceDeclaration();

        const multiType = new TypeDeclaration("OneOrMore", "T | T[]");
        multiType.template.push("T");
        local.addDeclaration(multiType);

        // Global declarations.
        const global = new NamespaceDeclaration();
        const globalMwApi = global.getNamespace(["mw", "Api"]);

        const toggleType = new TypeDeclaration("Toggle", "{ [V in T]: V | `!${V}` }[T]");
        toggleType.template.push("T extends string");
        globalMwApi.addDeclaration(toggleType);

        globalMwApi.merge(this.apiNamespace);

        // Deprecated type aliases.
        const deprecations = new NamespaceDeclaration();
        deprecations.addDeclaration(
            new DeprecatedTypeDeclaration("ApiAssert", [{ type: "mw.Api.Assert" }])
        );
        deprecations.addDeclaration(
            new DeprecatedTypeDeclaration("ApiTokenType", [{ type: "mw.Api.TokenType" }])
        );
        deprecations.addDeclaration(
            new DeprecatedTypeDeclaration("ApiLegacyTokenType", [
                { type: "mw.Api.LegacyTokenType" },
            ])
        );
        for (const [name, targetMap] of Object.entries(this.deprecatedAliases)) {
            const targetIfaces = INTERFACE_COMPATIBILITY[name].flatMap((path) =>
                targetMap[path].sort((t1, t2) => t1.length - t2.length)
            );
            const targets = targetIfaces.map((target) => ({
                type: `Partial<mw.Api.${target}>`,
                link: `mw.Api.${target}`,
            }));
            deprecations.addDeclaration(new DeprecatedTypeDeclaration(name, targets));
        }

        return flatWithLine(
            ["// AUTOMATICALLY GENERATED (see scripts/api-types-generator.js)"],
            local.toCode(),
            flatWithLine(["declare global {", ...global.toCode().map(indent), "}"]),
            deprecations.toCode(),
            ["export {};"]
        );
    }

    /**
     * Generate and automatically download a TS declaration file.
     *
     * @param {string} fileName File name.
     */
    download(fileName) {
        const content = encodeURIComponent(this.toCode().join("\n"));

        const element = document.createElement("a");
        element.setAttribute("href", `data:text/plain;charset=utf-8,${content}`);
        element.setAttribute("download", fileName);
        element.style.display = "none";

        document.body.append(element);
        element.click();
        element.remove();
    }
}

generateApiParamsTypes();
