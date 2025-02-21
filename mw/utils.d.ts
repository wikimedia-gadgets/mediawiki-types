declare global {
    namespace mw {
        type QueryParams = Record<string, string | number | boolean | null | undefined>;

        type TypeOrArray<T> = T | T[];

        type TypeOrUnionArray<T> = T extends T ? TypeOrArray<T> : never;

        type Tail<T extends any[]> = T extends [] ? T : T extends [any?, ...infer R] ? R : T;

        type ReplaceValue<T extends U | U[], U, V> = T extends U[] ? V[] : V;

        // Get/PickOrDefault<V, S, TD, TX> extracts values from V using key selection S
        //  - TD is the value type of missing properties
        //  - TX is the value type of unknown properties

        type GetOrDefault<V, K extends PropertyKey, TD, TX = unknown> = K extends keyof V
            ? V extends Required<Pick<V, K>>
                ? V[K]
                : Required<V>[K] | TD
            : TX | TD;

        type PickOrDefault<
            V,
            S extends TypeOrArray<PropertyKey>,
            TD,
            TX = unknown
        > = S extends Array<infer K>
            ? { [P in K & PropertyKey]-?: GetOrDefault<V, P, TD, TX> }
            : GetOrDefault<V, S & PropertyKey, TD, TX>;

        type NoReturn<T extends (...args: any[]) => void> = T extends (
            this: infer U,
            ...args: infer V
        ) => void
            ? unknown extends U
                ? (...args: V) => void
                : (this: U, ...args: V) => void
            : never;

        // make all properties required, replacing optional values with undefined,
        // whether "exactOptionalPropertyTypes" is enabled or not.
        type RequiredOrUndefined<T> = {
            [P in keyof Required<T>]: T[P];
        };

        type MethodsOf<T> = {
            [P in keyof T]: T[P] extends (...args: unknown[]) => void ? P : never;
        }[keyof T];
    }
}

export {};
