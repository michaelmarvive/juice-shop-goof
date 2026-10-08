/*
 * Intentionally vulnerable code for demoing Snyk Code (SAST) PR checks.
 */
import fs from 'node:fs'
import { type Request, type Response } from 'express'

export function readLog () {
  return (req: Request, res: Response) => {
    const file = req.query.file as string
    // Vulnerable: user input flows into a file path unsanitized (path traversal)
    const content = fs.readFileSync('logs/' + file, 'utf8')
    res.send(content)
  }
}
