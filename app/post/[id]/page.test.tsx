import { expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "./page";

test("Post page displays correct data",
    async () => {
        const postAuthor = "reactAuthor";
        const postTitle = "title";
        const postContent = "content";
        global.fetch = vi.fn().mockImplementation(
            (url: string, _) => {
                expect(url.includes("/2")).true;
                console.log(url);
                if(url.includes("/posts")) {
                    return Promise.resolve(
                        {
                            json: () => Promise.resolve(
                                { author: postAuthor, title: postTitle, content: postContent }
                            )
                        }
                    );
                }
                if(url.includes("/list-comments")) {
                    return Promise.resolve(
                        {
                            json: () => Promise.resolve([
                                { author: "a1", content: "c1" },
                                { author: "a2", content: "c2" }
                            ])
                        }
                    )
                }
                throw new Error("Unexpected path");
            }
        );
        vi.mock('next/navigation', () => ({
            useParams() {
                return {
                    id: 2
                };
            },
        }));
        render(<Page />);
        await waitFor(async () => {
            expect(screen.getByText("Comments")).toBeDefined();
            expect(screen.getByText(postAuthor)).toBeDefined();
            expect(screen.getByText(postTitle)).toBeDefined();
            expect(screen.getByText(postContent)).toBeDefined();
        });
    }
);