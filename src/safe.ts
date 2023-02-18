import {
	Accesser,
	Enum,
	EnumMore,
	Item,
	Type,
	create,
	data,
	match,
	type,
} from "./unsafe"
import { z } from "zod"

export const EnumError = Enum<{
	format: unknown
	type: unknown
	dataError: unknown
}>()
export type EnumError = typeof EnumError.item

type SafeDef<
	D extends Record<string, z.ZodTypeAny> = Record<string, z.ZodTypeAny>,
> = D
type SafeDef2Def<D extends SafeDef> = { [t in keyof Type<D>]: z.infer<D[t]> }
type SafeResultAccesser<R> = ReturnType<
	typeof Enum<{
		ok: R
		err: EnumError
	}>
>
type SafeResult<R> = Item<SafeResultAccesser<R>>
type Parse<D extends SafeDef> = (
	data: unknown,
) => SafeResult<Item<SafeDef2Def<D>>>
type SafeAccesser<D extends SafeDef> = Accesser<SafeDef2Def<D>> & {
	parse: Parse<D>
	result: SafeResultAccesser<Item<SafeDef2Def<D>>>
	zod: () => ZodTypeSuperEnum<D>
}

class ZodTypeSuperEnum<D extends SafeDef> extends z.ZodType<
	Item<SafeDef2Def<D>>
> {
	enumParse: Parse<D>
	constructor(parse) {
		super({})
		this.enumParse = parse
	}

	_parse(input: z.ParseInput) {
		const res = match(this.enumParse(input.data), {
			ok() {
				return z.OK(this)
			},
			err() {
				
				return z.INVALID
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any) as any
		return res
	}
}

const Result = Enum<{ ok: unknown; err: EnumError }>()

export const SafeEnum = <D extends SafeDef>(def: D): SafeAccesser<D> => {
	const parse = ($data) => {
		if (Array.isArray($data)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const t = type($data as any)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const d = data($data as any)
			if (Reflect.has(def, t)) {
				const zodParseRes = def[t].safeParse(d)
				if (zodParseRes.success) {
					return Result.ok(create(t, d))
				} else {
					return Result.err(EnumError.dataError(d))
				}
			} else {
				return Result.err(EnumError.type(t))
			}
		} else {
			return Result.err(EnumError.format($data))
		}
	}

	return EnumMore({
		parse,
		result: Result,
		zod: () => new ZodTypeSuperEnum(parse),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}) as any
}
