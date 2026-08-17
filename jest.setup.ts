import "@testing-library/jest-dom";

import { TextDecoder, TextEncoder } from "util";
import { ReadableStream, TransformStream } from "stream/web";
import { MessageChannel, MessagePort } from "worker_threads";

Object.assign(globalThis, {
  TextDecoder,
  TextEncoder,
  ReadableStream,
  TransformStream,
  MessageChannel,
  MessagePort,
});

const { Request, Response, Headers, fetch } = require("undici");

Object.assign(globalThis, {
  Request,
  Response,
  Headers,
  fetch,
});

// MSW is only loaded in tests that specifically need it
// to avoid breaking tests that don't use MSW

