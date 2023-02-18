import { z } from "zod"
import { EnumError, SafeEnum } from "./safe"

const Response = SafeEnum({
	success: z.string(),
	err: z.string(),
	loading: z.void(),
})
type Response = typeof Response.item
const data1 = "Hello" as unknown
const data2 = ["other", "Hello"] as unknown
const data3 = ["success", 0] as unknown
const data4 = ["success", "Hello"] as unknown

it("safe enum parse emit itemFormatError", () => {
	expect(Response.parse(data1)).toEqual(
		Response.result.err(EnumError.format(data1)),
	)
})

it("safe enum parse emit itemTypeError", () => {
	expect(Response.parse(data2)).toEqual(
		Response.result.err(EnumError.type(data2[0])),
	)
})

it("safe enum parse emit itemDataError", () => {
	expect(Response.parse(data3)).toStrictEqual(
		Response.result.err(EnumError.dataError(data3[1])),
	)
})

it("safe enum parse and match", () => {
	const zodRes = Response.zod()
	zodRes.parse(data1)
})
