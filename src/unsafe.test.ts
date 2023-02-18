import { Enum } from "./unsafe"

type Data = string
const Response = Enum<{
	success: Data
	loading: void
	error: Error
}>()
type Response = typeof Response.item

const res1 = Response.success("Hello Zenum!")
const res2 = Response.loading()
const res3 = Response.error(new Error("Fetch error!"))
const responses = [res1, res2, res3] as const

it("match with full matchers", () =>
	expect(
		responses.map((res) =>
			Response.match(res, {
				success() {
					return `Received: ${this}`
				},
				loading: () => "Loading",
				error: (err) => `Error: ${err.message}`,
			}),
		),
	).toEqual([`Received: Hello Zenum!`, `Loading`, `Error: Fetch error!`]))

it("match with incomplete matchers", () =>
	expect(
		Response.match(res1 as Response, {
			loading: () => "loading",
			_: () => "success or error",
		}),
	).toEqual("success or error"))

it("acceser", () => {
	expect(Response.success("Hello")).toEqual(["success", "Hello"])
})
