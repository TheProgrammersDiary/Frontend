import { expect, test, vi } from "vitest";
import NewComment from "./newComment";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("Creates comment", async () => {
    const comment = "my comment";
    global.fetch = vi.fn().mockImplementation(
        (_, __) => Promise.resolve(
            {
                json: () => Promise.resolve({ author: "a1", content: comment })
            }
        )
    );
    render(<NewComment postId={"1"}/>);
    expect(screen.getByText("Your comment")).toBeDefined();
    await userEvent.type(screen.getByLabelText("Your comment"), "comment");
    await userEvent.click(screen.getByRole("button", { name: "Post comment" }));
    expect(global.fetch).toHaveBeenCalledOnce();
});