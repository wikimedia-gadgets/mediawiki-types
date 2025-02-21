declare global {
    interface JQuery<TElement> {
        /**
         * @deprecated
         * @deprecated Removed since 1.41.
         */
        tipsy: JQuery.Tipsy<TElement>;
    }

    namespace JQuery {
        interface Tipsy<T = HTMLElement> {
            (options: true): Tipsy.Tipsy;
            (options?: mw.MethodsOf<Tipsy.Tipsy> | Tipsy.Options<T>): JQuery<T>;

            defaults: Required<Tipsy.Options>;

            /**
             * Yields a closure of the supplied parameters, producing a function that takes
             * no arguments and is suitable for use as an autogravity function like so:
             *
             * @param {number} margin (int) - distance from the viewable region edge that an
             *  element should be before setting its tooltip's gravity to be away
             *  from that edge.
             * @param {Direction} prefer (string, e.g. `n`, `sw`, `w`) - the direction to prefer
             *  if there are no viewable region edges effecting the tooltip's
             *  gravity. It will try to vary from this minimally, for example,
             *  if `sw` is preferred and an element is near the right viewable
             *  region edge, but not the top edge, it will set the gravity for
             *  that element's tooltip to be `se`, preserving the southern
             *  component.
             */
            autoBounds(margin: number, prefer: Tipsy.Direction): Tipsy.Direction;
            autoNS(): boolean;
            autoWE(): boolean;
            elementOptions<T extends Tipsy.Options>(ele: HTMLElement, options: T): T;
        }

        namespace Tipsy {
            type StringProvider<T = HTMLElement> = string | ((ctx: T) => string);

            type Direction = `${Direction.NS}${Direction.EW}`;

            namespace Direction {
                type NS = "n" | "s" | "";
                type EW = "e" | "w" | "";
            }

            interface Options<T = HTMLElement> {
                center?: boolean;
                className?: StringProvider<T> | null;
                delayIn?: number;
                delayOut?: number;
                fade?: boolean;
                fallback?: string;
                gravity?: StringProvider<T>;
                html?: boolean;
                live?: boolean;
                offset?: number;
                opacity?: number;
                title?: StringProvider<T>;
                trigger?: "hover" | "manual";
            }

            interface Tipsy<T = HTMLElement> {
                $element: JQuery<T>;
                enabled: boolean;
                options: Required<Options>;

                closeOnEsc(e: KeyboardEvent): void;
                getTitle(): string;
                fixTitle(): void;
                hide(): void;
                keyHandler(e: KeyboardEvent): void;
                show(): void;
                tip(): JQuery;
                validate(): void;
            }
        }
    }
}

export {};
