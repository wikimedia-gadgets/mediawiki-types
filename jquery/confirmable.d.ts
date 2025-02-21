declare global {
    interface JQuery {
        /**
         * Enable inline confirmation for given clickable element (like `<a />` or `<button />`).
         *
         * An additional inline confirmation step being shown before the default action is carried out on
         * click.
         *
         * Calling `.confirmable( { handler: function () { … } } )` will fire the handler only after the
         * confirmation step.
         *
         * The element will have the `jquery-confirmable-element` class added to it when it's clicked for
         * the first time, which has `white-space: nowrap;` and `display: inline-block;` defined in CSS.
         * If the computed values for the element are different when you make it confirmable, you might
         * encounter unexpected behavior.
         *
         * To use this {@link jQuery} plugin, load the `jquery.confirmable` module with {@link mw.loader}.
         *
         * @example
         * ```js
         * mw.loader.using( 'jquery.confirmable' ).then( () => {
         *     $( 'button' ).confirmable();
         * } );
         * ```
         * @see https://doc.wikimedia.org/mediawiki-core/master/js/module-jquery.confirmable.html#.$.fn.confirmable
         */
        confirmable: JQuery.Confirmable;
    }

    namespace JQuery {
        interface Confirmable {
            /**
             * @param {Confirmable.Options} [options]
             */
            (options?: Confirmable.Options): this;

            /**
             * Default options. Overridable primarily for internationalisation handling.
             */
            defaultOptions: Confirmable.RequiredOptions;

            handler(event: Event, options: Confirmable.RequiredOptions): void;
        }

        namespace Confirmable {
            type RequiredOptions = Required<Options> & { i18n: mw.RequiredOrUndefined<I18N> };

            interface Options {
                /**
                 * Optional selector used for jQuery event delegation.
                 */
                delegate?: string | null;

                /**
                 * Events to hook to.
                 */
                events?: string;

                /**
                 * Text to use for interface elements.
                 */
                i18n?: I18N;

                /**
                 * Callback to fire when preparing confirmable buttons. It is fired separately for the 'Yes' and 'No' button.
                 * Receives the button jQuery object as the first parameter and 'yes' or 'no' as the second.
                 */
                buttonCallback?($button: JQuery): JQuery;

                /**
                 * Callback to fire when the action is confirmed (user clicks the 'Yes' button).
                 */
                handler?: ((event: Event) => void) | null;

                /**
                 * Callback to fire when preparing confirmable interface.
                 * Receives the interface jQuery object as the only parameter.
                 */
                wrapperCallback?($interface: JQuery): JQuery;
            }

            // tslint:disable-next-line:interface-name
            interface I18N {
                /**
                 * Text to use for the confirmation question.
                 * Defaults to `Are you sure?`.
                 */
                confirm: string;

                /**
                 * Text to use for the 'No' button.
                 * Defaults to `No`.
                 */
                no: string;

                /**
                 * Optional title text to use for the 'No' button.
                 */
                noTitle?: string;

                /**
                 * Word separator to place between the three text messages.
                 * Defaults to ` `.
                 */
                space: string;

                /**
                 * Text to use for the 'Yes' button.
                 * Defaults to `Yes`.
                 */
                yes: string;

                /**
                 * Optional title text to use for the 'Yes' button.
                 */
                yesTitle?: string;
            }
        }
    }
}

export {};
