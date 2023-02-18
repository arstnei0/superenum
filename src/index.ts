export type Def<D extends Record<string, unknown> = Record<string, unknown>> = D
export type Type<D extends Def, T extends keyof D = keyof D> = T
export type Data<D extends Def, T extends Type<D> = Type<D>> = D[T]
export type Item<D extends Def, T extends Type<D> = Type<D>> = [T, Data<D, T>]

type Matcher<Result, D extends Def, T extends Type<D> = Type<D>> = (
	this: Data<D, T>,
	data: Data<D, T>,
) => Result
export type Matchers<Result, D extends Def, T extends Type<D> = Type<D>> =
	| { [t in T]: Matcher<Result, D, t> }
	| ({
			[t in T]?: Matcher<Result, D, t>
	  } & { _: Matcher<Result, D, T> })
type Match<D extends Def> = <Result, T extends Type<D>>(
	item: Item<D, T>,
	matchers: Matchers<Result, D, T>,
) => Result
type PeekType<D extends Def> = <T extends Type<D>>(item: Item<D, T>) => T
type PeekData<D extends Def> = <T extends Type<D>>(
	item: Item<D, T>,
) => Data<D, T>

export const type = <D extends Def, T extends Type<D>>(item: Item<D, T>): T =>
	item[0]
export const data = <D extends Def, T extends Type<D>>(
	item: Item<D, T>,
): Data<D, T> => item[1]
export const create = <D extends Def, T extends Type<D>>(
	t: T,
	data: Data<D, T>,
): Item<D, T> => [t, data]
export const match = <Result, D extends Def, T extends Type<D>>(
	item: Item<D, T>,
	matchers: Matchers<Result, D, T>,
): Result =>
	(($) =>
		(
			matchers[type(item)] ??
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(matchers as any)._ ??
			(() => {
				throw new Error("Zenum: No matchers found.")
			})
		).call($, $))(data(item))

export type Accesser<D extends Def> = {
	item: Item<D>
	create: <T extends Type<D>>(t: T, data: Data<D, T>) => Item<D, T>
	type: PeekType<D>
	data: PeekData<D>
	match: Match<D>
} & {
	[T in Type<D>]: Data<D, T> extends void | undefined
		? () => Item<D, T>
		: (data: Data<D, T>) => Item<D, T>
}

export const EnumMore = <D extends Def, More extends Record<string, unknown>>(
	more: More,
): Accesser<D> & More =>
	new Proxy(
		{
			...more,
			type: type,
			create,
			data: data,
			match,
		},
		{
			get: (target, t) =>
				Reflect.has(target, t)
					? target[t as string]
					: (data: Data<D>) => create(t as Type<D>, data),
		},
	) as Accesser<D> & More

// eslint-disable-next-line @typescript-eslint/ban-types
export const Enum = <D extends Def>(): Accesser<D> => EnumMore<D, {}>({})
