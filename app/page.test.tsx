import { expect, test, describe, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import Page from "./page";

describe("Shows main page correctly", () => {

    test("Shows correct headers", async () => {
        mockFetch();
        render(<Page />);
        expect(screen.getByText("Create a new post")).toBeDefined();
        expect(screen.getByText("Articles")).toBeDefined();
    });
    test("Posts are shown", async () => {
        mockFetch();
        render(<Page />);
        await waitFor(() => {
            expect(screen.getByText("t1")).toBeDefined();
            expect(screen.getByText("a1")).toBeDefined();
            expect(screen.getByText("t2")).toBeDefined();
            expect(screen.getByText("a2")).toBeDefined();
        });
    });

    function mockFetch() {
        global.fetch = vi.fn().mockImplementation(
            (_, __) => Promise.resolve(
                {
                    json: () => Promise.resolve([
                        { title: "t1", author: "a1" },
                        { title: "t2", author: "a2" }
                    ])
                }
            )
        );
    }
});