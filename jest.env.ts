const JSDOMEnvironment = require('jest-environment-jsdom').TestEnvironment

/**
 * Custom JSDOM environment para compatibilidade com MSW 2.
 *
 * 1. Usa customExportConditions: [''] para evitar que o MSW
 *    resolva para o path ESM do browser (.mjs).
 * 2. Restaura Web APIs do Node.js 20+ que o jsdom não implementa.
 */
class FixedJSDOMEnvironment extends JSDOMEnvironment {
  constructor(config: any, context: any) {
    super(
      {
        ...config,
        projectConfig: {
          ...config.projectConfig,
          testEnvironmentOptions: {
            ...config.projectConfig.testEnvironmentOptions,
            customExportConditions: [''],
          },
        },
      },
      context
    )

    // MSW 2 precisa dessas APIs que o jsdom não implementa.
    this.global.fetch = fetch
    this.global.Headers = Headers
    this.global.Request = Request
    this.global.Response = Response
    this.global.FormData = FormData
    this.global.ReadableStream = ReadableStream
    this.global.TransformStream = TransformStream
    this.global.WritableStream = WritableStream

    const { TextEncoder, TextDecoder } = require('node:util')
    this.global.TextEncoder = TextEncoder
    this.global.TextDecoder = TextDecoder

    const { MessageChannel, MessagePort } = require('node:worker_threads')
    this.global.MessageChannel = MessageChannel
    this.global.MessagePort = MessagePort

    const { Blob } = require('node:buffer')
    this.global.Blob = Blob

    this.global.structuredClone = structuredClone
  }
}

module.exports = FixedJSDOMEnvironment
