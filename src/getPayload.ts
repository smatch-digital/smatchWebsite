import { getPayload as getPayloadRaw } from 'payload'
import config from '@payload-config'
import type { Payload } from 'payload'

declare global {
  var cachedPayload: {
    client: Payload | null
    promise: Promise<Payload> | null
  }
}

let cached = global.cachedPayload

if (!cached) {
  cached = global.cachedPayload = { client: null, promise: null }
}

export const getPayload = async (): Promise<Payload> => {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = getPayloadRaw({
      config,
    })
  }

  try {
    cached.client = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.client
}
