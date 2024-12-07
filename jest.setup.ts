import "@testing-library/jest-dom/";
import "whatwg-fetch";
import { server } from "./mocks/server";
import { TextEncoder } from "util";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

global.TextEncoder = TextEncoder;
