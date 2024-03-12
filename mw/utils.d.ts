export type QueryParams = Record<string, string | number | boolean | null | undefined>;

export type TypeOrArray<T> = T | T[];

export type TypeOrUnionArray<T> = T extends T ? TypeOrArray<T> : never;

export type ReplaceValue<T extends U | U[], U, V> = T extends U[] ? V[] : V;

// Get/PickOrDefault<V, S, TD, TX> extracts values from V using key selection S
//  - TD is the value type of missing properties
//  - TX is the value type of unknown properties

export type GetOrDefault<V, K extends PropertyKey, TD, TX = unknown> = K extends keyof V
    ? V extends Required<Pick<V, K>>
        ? V[K]
        : Required<V>[K] | TD
    : TX | TD;

export type PickOrDefault<
    V,
    S extends TypeOrArray<PropertyKey>,
    TD,
    TX = unknown
> = S extends Array<infer K>
    ? { [P in K & PropertyKey]-?: GetOrDefault<V, P, TD, TX> }
    : GetOrDefault<V, S & PropertyKey, TD, TX>;

export type NoReturn<T extends (...args: any[]) => void> = T extends (
    this: infer U,
    ...args: infer V
) => void
    ? unknown extends U
        ? (...args: V) => void
        : (this: U, ...args: V) => void
    : never;

export {};