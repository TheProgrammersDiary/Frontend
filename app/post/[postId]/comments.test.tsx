import { expect, test, vi } from "vitest";
import Comments from "./comments";
import { render, screen, waitFor } from "@testing-library/react";

test("Shows comments", async () => {
    global.fetch = vi.fn().mockImplementation(
        (_, __) => Promise.resolve(
            {
                json: () => Promise.resolve([
                    { author: "a1", content: "c1" },
                    { author: "a2", content: "c2" }
                ])
            }
        )
    );
    vi.mock('next/navigation', () => ({
        useParams() {
            return {
                id: 2
            };
        },
    }));
    render(<Comments />);
    await waitFor(async () => {
        expect(screen.getByText("a1")).toBeDefined();
        expect(screen.getByText("c1")).toBeDefined();
        expect(screen.getByText("a2")).toBeDefined();
        expect(screen.getByText("c2")).toBeDefined();
    });
});