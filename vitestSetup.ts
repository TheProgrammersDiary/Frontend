import { beforeAll, afterEach, vi } from "vitest";

beforeAll(
    () => {
        vi.mock("next/navigation", () => require("next-router-mock"));
    }
);

afterEach(
    () => {
        vi.restoreAllMocks();
    }
);