declare global {
    interface JQuery {
        /**
         * Get the contents of the textarea.
         * Provided by the `jquery.textSelection` ResourceLoader module.
         *
         * @param {string} command Command to execute
         * @returns {string}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#.textSelection
         */
        textSelection(command: "getContents"): string;

        /**
         * Set the contents of the textarea, replacing anything that was there before.
         * Provided by the `jquery.textSelection` ResourceLoader module.
         *
         * @param {string} command Command to execute
         * @param {string} content
         * @returns {JQuery}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#.textSelection
         */
        textSelection(command: "setContents", content: string): this;

        /**
         * Get the currently selected text in this textarea.
         * Provided by the `jquery.textSelection` ResourceLoader module.
         *
         * @param {string} command Command to execute
         * @returns {string}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#.textSelection
         */
        textSelection(command: "getSelection"): string;

        /**
         * Replace the selected text in the textarea with the given text, or insert it at the cursor.
         * Provided by the `jquery.textSelection` ResourceLoader module.
         *
         * @param {string} command Command to execute
         * @param {string} value
         * @returns {JQuery}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#.textSelection
         */
        textSelection(command: "replaceSelection", value: string): this;

        /**
         * Insert text at the beginning and end of a text selection, optionally
         * inserting text at the caret when selection is empty.
         * Provided by the `jquery.textSelection` ResourceLoader module.
         *
         * Also focusses the textarea.
         *
         * @param {string} command Command to execute
         * @param {JQuery.TextSelection.EncapsulateSelectionOptions} [options]
         * @returns {JQuery}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#.textSelection
         */
        textSelection(
            command: "encapsulateSelection",
            options?: JQuery.TextSelection.EncapsulateSelectionOptions
        ): this;

        /**
         * Get the current cursor position (in UTF-16 code units) in a textarea.
         * Provided by the `jquery.textSelection` ResourceLoader module.
         *
         * @param {string} command Command to execute
         * @param {JQuery.TextSelection.GetCaretPositionOptions} [options]
         * @returns {number|number[]} Array with two numbers, for start and end of selection
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#.textSelection
         */
        textSelection(
            command: "getCaretPosition",
            options: JQuery.TextSelection.GetCaretPositionOptions & { startAndEnd: true }
        ): [number, number];
        textSelection(
            command: "getCaretPosition",
            options?: JQuery.TextSelection.GetCaretPositionOptions & { startAndEnd?: false }
        ): number;
        textSelection(
            command: "getCaretPosition",
            options?: JQuery.TextSelection.GetCaretPositionOptions
        ): number | [number, number];

        /**
         * Set the current cursor position (in UTF-16 code units) in a textarea.
         * Provided by the `jquery.textSelection` ResourceLoader module.
         *
         * @param {string} command Command to execute
         * @param {JQuery.TextSelection.SetSelectionOptions} options
         * @returns {JQuery}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#.textSelection
         */
        textSelection(
            command: "setSelection",
            options: JQuery.TextSelection.SetSelectionOptions
        ): this;

        /**
         * Scroll a textarea to the current cursor position. You can set the cursor
         * position with 'setSelection'.
         * Provided by the `jquery.textSelection` ResourceLoader module.
         *
         * @param {string} command Command to execute
         * @param {JQuery.TextSelection.ScrollToCaretPositionOptions} [options]
         * @returns {JQuery}
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#.textSelection
         */
        textSelection(
            command: "scrollToCaretPosition",
            options?: JQuery.TextSelection.ScrollToCaretPositionOptions
        ): this;

        /**
         * Register an alternative textSelection API for this element.
         * Provided by the `jquery.textSelection` ResourceLoader module.
         *
         * @param {string} command Command to execute
         * @param {Object.<string, function(unknown):void>} functions Functions to replace. Keys are command names (as in {@link textSelection},
         *  except 'register' and 'unregister'). Values are functions to execute when a given command is
         *  called.
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#.textSelection
         */
        textSelection(
            command: "register",
            functions: Record<string, (commandOptions: unknown) => any>
        ): void;

        /**
         * Unregister the alternative textSelection API for this element (see 'register').
         * Provided by the `jquery.textSelection` ResourceLoader module.
         *
         * @param {string} command Command to execute
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#.textSelection
         */
        textSelection(command: "unregister"): void;

        /**
         * Do things to the selection in the textarea, using a command from the alternative textSelection API for this element.
         * Provided by the `jquery.textSelection` ResourceLoader module.
         *
         * @example
         * ```js
         * mw.loader.using( 'jquery.textSelection' ).then( () => {
         *     const contents = $( 'textarea' ).textSelection( 'getContents' );
         * } );
         * ```
         * @param {string} command Command to execute
         * @param {any} [commandOptions] Options to pass to the command
         * @returns {any} Depending on the command
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/jQueryPlugins.html#.textSelection
         */
        textSelection(command: string, commandOptions?: unknown): any;
    }

    namespace JQuery.TextSelection {
        interface EncapsulateSelectionOptions {
            /**
             * Put the inserted text on a line of its own. Defaults to false.
             */
            ownline?: boolean;
            /**
             * Text to insert between pre and post and select afterwards.
             */
            peri?: string;
            /**
             * Text to insert after the cursor/selection.
             */
            post?: string;
            /**
             * Text to insert before the cursor/selection.
             */
            pre?: string;
            /**
             * If there is a selection, replace it with peri instead of leaving it alone. Defaults to false.
             */
            replace?: boolean;
            /**
             * Position to end selection at. Defaults to the position to start setection at.
             */
            selectionEnd?: number;
            /**
             * Position to start selection at.
             */
            selectionStart?: number;
            /**
             * Select the peri text if it was inserted (but not if there was a selection and replace==false, or if splitlines==true). Defaults to true.
             */
            selectPeri?: boolean;
            /**
             * If multiple lines are selected, encapsulate each line individually. Defaults to false.
             */
            splitlines?: boolean;
        }

        interface GetCaretPositionOptions {
            /**
             * Return range of the selection rather than just start. Defaults to false.
             */
            startAndEnd?: boolean;
        }

        interface SetSelectionOptions {
            /**
             * Defaults to start.
             */
            end?: number;
            start: number;
        }

        interface ScrollToCaretPositionOptions {
            /**
             * Whether to force a scroll even if the caret position is already visible. Defaults to false.
             */
            force?: boolean;
        }
    }
}

export {};
