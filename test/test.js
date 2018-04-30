// @ts-check

import fs from 'fs'
import test from 'ava'
import b64u from '..'

const testBuffer = fs.readFileSync(__dirname + '/test.jpg')

function base64(s) {
  return Buffer.from(s, 'binary').toString('base64')
}

test('from string to base64url', t => {
  const b64 = base64(testBuffer)
  const b64url = b64u(testBuffer, 'binary')
  t.deepEqual(b64url.indexOf('+'), -1, 'should not contain plus signs')
  t.deepEqual(b64url.indexOf('/'), -1, 'should not contain slashes')
  t.deepEqual(b64url.indexOf('='), -1, 'should not contain equal signs')
  t.deepEqual(b64.indexOf('+'), b64url.indexOf('-'), 'should replace + with -')
  t.deepEqual(b64.indexOf('/'), b64url.indexOf('_'), 'should replace / with _')
})

test('from base64url to base64', t => {
  const b64 = base64(testBuffer)
  const b64url = b64u(testBuffer, 'binary')
  const result = b64u.toBase64(b64url)
  t.deepEqual(result, b64, 'should be able to convert back')
})

test('from base64 to base64url', t => {
  const b64 = base64(testBuffer)
  const b64url = b64u(testBuffer, 'binary')
  const result = b64u.fromBase64(b64)
  t.deepEqual(result, b64url, 'should be able to convert to b64url from b64')
})

test('from base64url to string', t => {
  const b64url = b64u(testBuffer, 'binary')
  const result = b64u.decode(b64url, 'binary')
  t.deepEqual(result, testBuffer.toString('binary'), 'should be able to decode')
})

test('from base64url to string (buffer)', t => {
  const b64url = b64u(testBuffer, 'binary')
  const result = b64u.decode(Buffer.from(b64url), 'binary')
  t.deepEqual(result, testBuffer.toString('binary'), 'should be able to decode')
})

test('from base64url to buffer', t => {
  const b64url = b64u(testBuffer, 'binary')
  const result = b64u.toBuffer(b64url)
  t.deepEqual(result, testBuffer, 'should be able to convert to buffer')
})
