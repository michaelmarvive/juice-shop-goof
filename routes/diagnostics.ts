/*
 * Intentionally vulnerable code for testing Snyk PR checks and ignores.
 */
import { exec } from 'child_process'
import { type Request, type Response } from 'express'

export function pingHost () {
  return (req: Request, res: Response) => {
    const host = req.query.host as string
    // Vulnerable: user input is concatenated into a shell command (command injection)
    exec('ping -c 1 ' + host, (error, stdout) => {
      if (error) {
        res.status(500).send(error.message)
        return
      }
      res.send(stdout)
    })
  }
}
