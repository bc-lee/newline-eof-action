import {ensureNewlineEof} from "../src/main"

test("Normal File Test", async () => {
  const buffer = Buffer.from(`Hello, World\n`)
  expect(() => {
    ensureNewlineEof(buffer)
  }).not.toThrow()
})

test("CR Newline Test", async () => {
  const buffer = Buffer.from(`Hello, World\r`)
  expect(() => {
    ensureNewlineEof(buffer)
  }).toThrow(Error)
})

test("Missing last newline", async () => {
  const buffer = Buffer.from(`Hello, World`)
  expect(() => {
    ensureNewlineEof(buffer)
  }).toThrow(Error)
})
