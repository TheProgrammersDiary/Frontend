import { expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "./page";

test("Post page displays correct data",
    async () => {
        const postTitle = "title";
        const postContent = "content";
        vi.mock("next-auth/react", () => {
            return {
                useSession: vi.fn(
                    () => {
                        return { data: {user: { username: "reactAuthor" }}, status: 'authenticated' };
                    }
                )
            };
        });
        global.fetch = vi.fn().mockImplementation(
            (url: string, _) => {
                expect(url.includes("/2")).true;
                    return Promise.resolve(
                        {
                            json: () => Promise.resolve(
                                { author: "reactAuthor", title: postTitle, content: postContent }
                            )
                        }
                    );
            }
        );
        vi.mock('next/navigation', () => ({
            useParams() {
                return {
                    id: 2
                };
            },
        }));
        vi.mock('./comments', () => ({ default: () => {return <></>;} }));
        render(<Page />);
        await waitFor(async () => {
            expect(screen.getByText("Comments")).toBeDefined();
            expect(screen.getByText("reactAuthor")).toBeDefined();
            expect(screen.getByText(postTitle)).toBeDefined();
            expect(screen.getByText(postContent)).toBeDefined();
        });
    }
);