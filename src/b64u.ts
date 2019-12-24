function padString(input: string): string {
  const segmentLength = 4
  const stringLength = input.length
  const diff = stringLength % segmentLength

  if (!diff) {
    return input
  }

  let position = stringLength
  let padLength = segmentLength - diff

  const paddedStringLength = stringLength + padLength
  const buffer = Buffer.alloc(paddedStringLength)

  buffer.write(input)

  while (padLength--) {
    buffer.write('=', position++)
  }

  return buffer.toString()
}

function encode(input: string | Buffer, encoding: BufferEncoding = 'utf8'): string {
  if (Buffer.isBuffer(input)) {
    return fromBase64(input.toString('base64'))
  }
  return fromBase64(Buffer.from(input, encoding).toString('base64'))
}

function decode(base64url: string, encoding: BufferEncoding = 'utf8'): string {
  return Buffer.from(toBase64(base64url), 'base64').toString(encoding)
}

function toBase64(base64url: string | Buffer): string {
  base64url = base64url.toString()
  return padString(base64url)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
}

function fromBase64(base64: string): string {
  return base64
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function toBuffer(base64url: string): Buffer {
  return Buffer.from(toBase64(base64url), 'base64')
}

export interface Base64Url {
  (input: string | Buffer, encoding?: BufferEncoding): string
  encode(input: string | Buffer, encoding?: BufferEncoding): string
  decode(base64url: string | Buffer, encoding?: BufferEncoding): string
  toBase64(base64url: string | Buffer): string
  fromBase64(base64: string): string
  toBuffer(base64url: string): Buffer
}

const b64u = encode as Base64Url

b64u.encode = encode
b64u.decode = decode
b64u.toBase64 = toBase64
b64u.fromBase64 = fromBase64
b64u.toBuffer = toBuffer

export default b64u
