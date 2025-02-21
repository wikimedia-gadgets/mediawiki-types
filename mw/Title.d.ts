declare global {
    namespace mw {
        /**
         * Library for constructing MediaWiki titles.
         *
         * Note that in the constructor and {@link newFromText} method, `namespace` is the **default** namespace
         * only, and can be overridden by a namespace prefix in `title`. If you do not want this behavior,
         * use {@link makeTitle}.
         *
         * @example
         * ```js
         * new mw.Title( 'Foo', NS_TEMPLATE ).getPrefixedText();
         * // => 'Template:Foo'
         * mw.Title.newFromText( 'Foo', NS_TEMPLATE ).getPrefixedText();
         * // => 'Template:Foo'
         * mw.Title.makeTitle( NS_TEMPLATE, 'Foo' ).getPrefixedText();
         * // => 'Template:Foo'
         *
         * new mw.Title( 'Category:Foo', NS_TEMPLATE ).getPrefixedText();
         * // => 'Category:Foo'
         * mw.Title.newFromText( 'Category:Foo', NS_TEMPLATE ).getPrefixedText();
         * // => 'Category:Foo'
         * mw.Title.makeTitle( NS_TEMPLATE, 'Category:Foo' ).getPrefixedText();
         * // => 'Template:Category:Foo'
         *
         * new mw.Title( 'Template:Foo', NS_TEMPLATE ).getPrefixedText();
         * // => 'Template:Foo'
         * mw.Title.newFromText( 'Template:Foo', NS_TEMPLATE ).getPrefixedText();
         * // => 'Template:Foo'
         * mw.Title.makeTitle( NS_TEMPLATE, 'Template:Foo' ).getPrefixedText();
         * // => 'Template:Template:Foo'
         * ```
         * @since 1.18
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html
         */
        class Title {
            /**
             * Store page existence
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#.exist
             */
            static exist: Title.ExistenceStore;

            /**
             * Parse titles into an object structure. Note that when using the constructor
             * directly, passing invalid titles will result in an exception. Use {@link newFromText} to use the
             * logic directly and get null for invalid titles which is easier to work with.
             *
             * @param {string} title Title of the page. If no second argument given,
             *  this will be searched for a namespace
             * @param {number} [namespace=NS_MAIN] If given, will used as default namespace for the given title
             * @throws {Error} When the title is invalid
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#Title
             */
            constructor(title: string, namespace?: number);

            /**
             * Check the title can have an associated talk page.
             *
             * @returns {boolean} The title can have an associated talk page
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#canHaveTalkPage
             */
            canHaveTalkPage(): boolean;

            /**
             * Whether this title exists on the wiki. See {@link mw.Title.exists}.
             *
             * @returns {boolean|null} Boolean if the information is available, otherwise null
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#exists
             */
            exists(): boolean | null;

            /**
             * Get the extension of the page name (if any).
             *
             * @returns {string|null} Name extension or null if there is none
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getExtension
             */
            getExtension(): string | null;

            /**
             * Get the page name as if it is a file name, without extension or namespace prefix,
             * in the human-readable form with spaces instead of underscores. For example, the title
             * `File:Example_image.svg` will be returned as `Example image`.
             *
             * Note that this method will work for non-file titles but probably give nonsensical results.
             * A title like `User:Dr._J._Fail` will be returned as `Dr. J`! Use {@link getMainText} instead.
             *
             * @since 1.40
             * @returns {string}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getFileNameTextWithoutExtension
             */
            getFileNameTextWithoutExtension(): string;

            /**
             * Get the page name as if it is a file name, without extension or namespace prefix,
             * in the canonical form with underscores instead of spaces. For example, the title
             * `File:Example_image.svg` will be returned as `Example_image`.
             *
             * Note that this method will work for non-file titles but probably give nonsensical results.
             * A title like `User:Dr._J._Fail` will be returned as `Dr._J`! Use {@link getMain} instead.
             *
             * @since 1.40
             * @returns {string}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getFileNameWithoutExtension
             */
            getFileNameWithoutExtension(): string;

            /**
             * Get the fragment (if any).
             *
             * Note that this method (by design) does not include the hash character and
             * the value is not url encoded.
             *
             * @returns {string|null}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getFragment
             */
            getFragment(): string | null;

            /**
             * Get the main page name.
             *
             * Example: `Example_image.svg` for `File:Example_image.svg`.
             *
             * @returns {string}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getMain
             */
            getMain(): string;

            /**
             * Get the main page name (transformed by {@link text()}).
             *
             * Example: `Example image.svg` for `File:Example_image.svg`.
             *
             * @returns {string}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getMainText
             */
            getMainText(): string;

            /**
             * Get the page name as if it is a file name, without extension or namespace prefix. Warning,
             * this is usually not what you want! A title like `User:Dr._J._Fail` will be returned as
             * `Dr. J`! Use {@link getMain} or {@link getMainText} for the actual page name.
             *
             * @deprecated since 1.40, use {@link getFileNameWithoutExtension} instead
             * @returns {string} File name without file extension, in the canonical form with underscores
             *  instead of spaces. For example, the title `File:Example_image.svg` will be returned as
             *  `Example_image`.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getName
             */
            getName(): string;

            /**
             * Get the namespace number.
             *
             * Example: 6 for `File:Example_image.svg`.
             *
             * @returns {number}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getNamespaceId
             */
            getNamespaceId(): number;

            /**
             * Get the namespace prefix (in the content language).
             *
             * Example: `File:` for `File:Example_image.svg`.
             * In `NS_MAIN` this is '', otherwise namespace name plus ':'
             *
             * @returns {string}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getNamespacePrefix
             */
            getNamespacePrefix(): string;

            /**
             * Get the page name as if it is a file name, without extension or namespace prefix. Warning,
             * this is usually not what you want! A title like `User:Dr._J._Fail` will be returned as
             * `Dr. J`! Use {@link getMainText} for the actual page name.
             *
             * @deprecated since 1.40, use {@link getFileNameTextWithoutExtension} instead
             * @returns {string} File name without file extension, formatted with spaces instead of
             *  underscores. For example, the title `File:Example_image.svg` will be returned as
             *  `Example image`.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getNameText
             */
            getNameText(): string;

            /**
             * Get the full page name.
             *
             * Example: `File:Example_image.svg`.
             * Most useful for API calls, anything that must identify the "title".
             *
             * @returns {string}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getPrefixedDb
             */
            getPrefixedDb(): string;

            /**
             * Get the full page name (transformed by {@link text()}).
             *
             * Example: `File:Example image.svg` for `File:Example_image.svg`.
             *
             * @returns {string}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getPrefixedText
             */
            getPrefixedText(): string;

            /**
             * Get the page name relative to a namespace.
             *
             * Example:
             *
             * - "Foo:Bar" relative to the Foo namespace becomes "Bar".
             * - "Bar" relative to any non-main namespace becomes ":Bar".
             * - "Foo:Bar" relative to any namespace other than Foo stays "Foo:Bar".
             *
             * @param {number} namespace The namespace to be relative to
             * @returns {string}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getRelativeText
             */
            getRelativeText(namespace: number): string;

            /**
             * Get the title for the subject page of a talk page.
             *
             * @returns {Title|null} The title for the subject page of a talk page, null if not available
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getSubjectPage
             */
            getSubjectPage(): Title | null;

            /**
             * Get the title for the associated talk page.
             *
             * @returns {Title|null} The title for the associated talk page, null if not available
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getTalkPage
             */
            getTalkPage(): Title | null;

            /**
             * Get the URL to this title. See {@link mw.util.getUrl()}.
             *
             * @param {QueryParams} [params] A mapping of query parameter names to values,
             *     e.g. `{ action: 'edit' }`.
             * @returns {string}
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#getUrl
             */
            getUrl(params?: QueryParams): string;

            /**
             * Check if the title is in a talk namespace.
             *
             * @returns {boolean} The title is in a talk namespace
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#isTalkPage
             */
            isTalkPage(): boolean;

            /**
             * Alias of {@link getPrefixedDb}.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#toString
             */
            toString(): string;

            /**
             * Alias of {@link getPrefixedText}.
             *
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#toText
             */
            toText(): string;

            /**
             * Whether this title exists on the wiki.
             *
             * @param {string|Title} title prefixed db-key name (string) or instance of Title
             * @returns {boolean|null} Boolean if the information is available, otherwise null
             * @throws {Error} If title is not a string or mw.Title
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#.exists
             */
            static exists(title: Title.Like): boolean | null;

            /**
             * Check if a given namespace is a talk namespace.
             *
             * See NamespaceInfo::isTalk in PHP
             *
             * @param {number} namespaceId Namespace ID
             * @returns {boolean} Namespace is a talk namespace
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#.isTalkNamespace
             */
            static isTalkNamespace(namespaceId: number): boolean;

            /**
             * Constructor for Title objects with predefined namespace.
             *
             * Unlike {@link newFromText} or the constructor, this function doesn't allow the given `namespace` to be
             * overridden by a namespace prefix in `title`. See the constructor documentation for details about this behavior.
             *
             * The single exception to this is when `namespace` is 0, indicating the main namespace. The
             * function behaves like {@link newFromText} in that case.
             *
             * @param {number} namespace Namespace to use for the title
             * @param {string} title
             * @returns {Title|null} A valid Title object or null if the title is invalid
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#.makeTitle
             */
            static makeTitle(namespace: number, title: string): Title | null;

            /**
             * Sanitizes a file name as supplied by the user, originating in the user's file system
             * so it is most likely a valid MediaWiki title and file name after processing.
             * Returns null on fatal errors.
             *
             * @param {string} uncleanName The unclean file name including file extension but
             *  without namespace
             * @returns {Title|null} A valid Title object or null if the title is invalid
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#.newFromFileName
             */
            static newFromFileName(uncleanName: string): Title | null;

            /**
             * Get the file title from an image element.
             *
             * @example
             * ```js
             * var title = mw.Title.newFromImg( imageNode );
             * ```
             * @param {HTMLElement|JQuery} img The image to use as a base
             * @returns {Title|null} The file title or null if unsuccessful
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#.newFromImg
             */
            static newFromImg(img: HTMLElement | JQuery): Title | null;

            /**
             * Constructor for Title objects with a null return instead of an exception for invalid titles.
             *
             * Note that `namespace` is the **default** namespace only, and can be overridden by a namespace
             * prefix in `title`. If you do not want this behavior, use {@link makeTitle}. See {@link constructor} for
             * details.
             *
             * @param {string} title
             * @param {number} [namespace=NS_MAIN] Default namespace
             * @returns {Title|null} A valid Title object or null if the title is invalid
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#.newFromText
             */
            static newFromText(title: string, namespace?: number): Title | null;

            /**
             * Constructor for Title objects from user input altering that input to
             * produce a title that MediaWiki will accept as legal.
             *
             * @param {string} title
             * @param {number} [defaultNamespace=NS_MAIN]
             *  If given, will used as default namespace for the given title.
             * @param {Title.UserInputOptions} [options] additional options
             * @returns {Title|null} A valid Title object or null if the input cannot be turned into a valid title
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#.newFromUserInput
             */
            static newFromUserInput(
                title: string,
                defaultNamespace?: number,
                options?: Title.UserInputOptions
            ): Title | null;

            /**
             * Normalize a file extension to the common form, making it lowercase and checking some synonyms,
             * and ensure it's clean. Extensions with non-alphanumeric characters will be discarded.
             * Keep in sync with File::normalizeExtension() in PHP.
             *
             * @param {string} extension File extension (without the leading dot)
             * @returns {string} File extension in canonical form
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#.normalizeExtension
             */
            static normalizeExtension(extension: string): string;

            /**
             * PHP's strtoupper differs from {@link String.toUpperCase} in a number of cases (T147646).
             *
             * @param {string} chr Unicode character
             * @returns {string} Unicode character, in upper case, according to the same rules as in PHP
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#.phpCharToUpper
             */
            static phpCharToUpper(chr: string): string;

            /**
             * Check if signature buttons should be shown in a given namespace.
             *
             * See NamespaceInfo::wantSignatures in PHP
             *
             * @param {number} namespaceId Namespace ID
             * @returns {boolean} Namespace is a signature namespace
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#.wantSignaturesNamespace
             */
            static wantSignatureNamespace(namespaceId: number): boolean;
        }

        namespace Title {
            type Like = string | Title;

            /**
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.Title.html#~TitleExistenceStore
             */
            interface ExistenceStore {
                /**
                 * Keyed by title. Boolean true value indicates page does exist.
                 */
                pages: { [title: string]: boolean };

                /**
                 * The setter function. Returns a boolean.
                 *
                 * @example
                 * ```js
                 * // To declare existing titles
                 * Title.exist.set( ['User:John_Doe', ...] );
                 * ```
                 * @example
                 * ```js
                 * // To declare titles nonexistent
                 * Title.exist.set( ['File:Foo_bar.jpg', ...], false );
                 * ```
                 * @param {string|string[]} titles Title(s) in strict prefixedDb title form
                 * @param {boolean} [state=true] State of the given titles
                 * @returns {boolean}
                 */
                set(titles: string | string[], state?: boolean): boolean;
            }

            interface UserInputOptions {
                /**
                 * Makes sure that a file is uploadable under the title returned.
                 * There are pages in the file namespace under which file upload is impossible.
                 * Automatically assumed if the title is created in the Media namespace.
                 * Defaults to true.
                 */
                forUploading?: boolean;
            }
        }
    }
}

/** @deprecated Use {@link mw.Title.Like} instead */
export type TitleLike = mw.Title.Like;

export {};
