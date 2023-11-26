import { expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "./page";

test("Shows main page with posts", async () => {
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
    vi.mock("next-auth/react", () => {
        return {
            useSession: vi.fn(
                () => {
                    return { data: {user: { username: "admin" }}, status: 'authenticated' };
                }
            )
        };
    });
    render(<Page />);
    expect(screen.getByText("Create a new post")).toBeDefined();
    expect(screen.getByText("Articles")).toBeDefined();
    await waitFor(async () => {
        expect(screen.getByText("t1")).toBeDefined();
        expect(screen.getByText("a1")).toBeDefined();
        expect(screen.getByText("t2")).toBeDefined();
        expect(screen.getByText("a2")).toBeDefined();
    });
});