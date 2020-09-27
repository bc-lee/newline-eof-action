import * as core from "@actions/core"
import {execSync} from "child_process"
import {OpenMode, PathLike, promises as fsPromises} from "fs"

export async function readFile(
  path: PathLike,
  options?: {encoding?: null; flag?: OpenMode} | null
): Promise<Buffer> {
  return fsPromises.readFile(path, options)
}

export function ensureNewlineEof(
  buffer: Buffer,
  fileName: string | null = null
): void {
  if (buffer.includes("\r")) {
    throw new Error(`Sorry, your file ${fileName} contains CR character`)
  }
  if (
    buffer.byteLength > 0 &&
    buffer[buffer.byteLength - 1] !== "\n".charCodeAt(0)
  ) {
    throw new Error(
      `Sorry, your file ${fileName} does not ends with newline character`
    )
  }
}

function debug(msg: string, obj: unknown | null = null): void {
  core.debug(formatLogMessage(msg, obj))
}

function formatLogMessage(msg: string, obj: unknown | null = null): string {
  return obj ? `${msg}: ${JSON.stringify(obj)}` : msg
}

function lsFiles(): string[] {
  return execSync(
    "git grep --cached -Il ''",
    Object({encoding: "utf-8"})
  ).split("\n")
}

async function run(): Promise<void> {
  try {
    const files = lsFiles()
    for (const file of files) {
      // file always have a valid name.
      if (!file) {
        continue
      }
      debug("file", file)
      const data = await readFile(file)
      ensureNewlineEof(data, file)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
