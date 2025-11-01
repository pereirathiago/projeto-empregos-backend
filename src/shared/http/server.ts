import { config } from '@config/index'
import * as readline from 'readline'
import 'reflect-metadata'
import app from './app'

const defaultPort = config.server.port || 3333

function promptPort(): Promise<number> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.question(`Digite a porta para o servidor (padrão: ${defaultPort}): `, (answer) => {
      const port = answer.trim() ? parseInt(answer.trim(), 10) : defaultPort

      if (isNaN(port) || port < 1 || port > 65535) {
        console.error('Porta inválida! Usando porta padrão:', defaultPort)
        resolve(defaultPort)
      } else {
        resolve(port)
      }

      rl.close()
    })
  })
}

function startServer(port: number) {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`)
  })
}

promptPort().then((port) => {
  startServer(port)
})
