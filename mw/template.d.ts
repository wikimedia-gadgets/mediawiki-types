declare global {
    namespace mw {
        /**
         * An extensible library for rendering templates in different template languages.
         * Requires `mediawiki.template` ResourceLoader module.
         *
         * By default only the `html` template library is provided.
         * The Mustache library is also provided in mediawiki core via the mediawiki.template.mustache library.
         *
         * @example
         * ```js
         * // returns $( '<div>hello world</div>' );
         * const $node = mw.template.compile( '<div>hello world</div>', 'html' ).render();
         *
         * // also returns $( '<div>hello world</div>' );
         * mw.loader.using( 'mediawiki.template.mustache' ).then( () => {
         *     const $node = mw.template.compile( '<div>{{ >Foo }}</div>', 'mustache' ).render( {
         *         text: 'Hello world'
         *     }, {
         *         Foo: mw.template.compile( '{{text}}', 'mustache' )
         *     } );
         * } );
         * ```
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.template.html
         */
        namespace template {
            /**
             * Register a template associated with a module.
             *
             * Precompiles the newly added template based on the suffix in its name.
             *
             * @param {string} moduleName Name of the ResourceLoader module the template is associated with
             * @param {string} templateName Name of the template (including suffix)
             * @param {string} templateBody Contents of the template (e.g. html markup)
             * @returns {Renderer} Compiled template
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.template.html#.add
             */
            function add(moduleName: string, templateName: string, templateBody: string): Renderer;

            /**
             * Compile a string of template markup with an engine of choice.
             *
             * @param {string} templateBody Template body
             * @param {string} compilerName The name of a registered compiler.
             * @returns {Renderer} Compiled template
             * @throws {Error} when unknown compiler name provided.
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.template.html#.compile
             */
            function compile(templateBody: string, compilerName: string): Renderer;

            /**
             * Get a compiled template by module and template name.
             *
             * @param {string} moduleName Name of the module to retrieve the template from
             * @param {string} templateName Name of template to be retrieved
             * @returns {Renderer} Compiled template
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.template.html#.get
             */
            function get(moduleName: string, templateName: string): Renderer;

            /**
             * Get a compiler via its name.
             *
             * @param {string} name Name of a compiler
             * @returns {Compiler} The compiler
             * @throws {Error} when unknown compiler provided
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.template.html#.getCompiler
             */
            function getCompiler(name: string): Compiler;

            /**
             * Get the name of the associated compiler based on a template name.
             *
             * @param {string} templateName Name of a template (including suffix)
             * @returns {string} Name of a compiler
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.template.html#.getCompilerName
             */
            function getCompilerName(templateName: string): string;

            /**
             * Register a new compiler.
             *
             * A compiler is any object that implements a {@link mw.template.compile} method. The compile() method must
             * return a Template interface with a method {@link Renderer.render render()} that returns HTML.
             *
             * The compiler name must correspond with the name suffix of templates that use this compiler.
             *
             * @param {string} name Compiler name
             * @param {Compiler} compiler
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.template.html#.registerCompiler
             */
            function registerCompiler(name: string, compiler: Compiler): void;

            /**
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.template.html#~TemplateRenderer
             */
            interface Renderer {
                /**
                 * Compiles a template for rendering.
                 *
                 * @param {Object} [data] for the template
                 * @param {Object} [partials] additional partial templates
                 * @returns {JQuery}
                 * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.template.html#~TemplateCompileFunction
                 */
                render(data?: unknown, partials?: unknown): JQuery;
            }

            /**
             * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.template.html#~TemplateCompiler
             */
            interface Compiler {
                /**
                 * Compiles a template for rendering.
                 *
                 * @param {string} src source of the template
                 * @returns {Renderer} for rendering
                 * @see https://doc.wikimedia.org/mediawiki-core/master/js/mw.template.html#~TemplateCompileFunction
                 */
                compile(src: string): Renderer;
            }
        }
    }
}

export {};
