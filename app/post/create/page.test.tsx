import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Page from "./page";

test("Post form submits correct data",
  async () => {
    const postId = 1;
    const postTitle = "title";
    const postContent = "content";
    global.fetch = vi.fn().mockImplementation(
      (_, { body }) => {
        const parsedBody = JSON.parse(body);
        expect(parsedBody).toMatchSnapshot();
        return Promise.resolve({ json: () => Promise.resolve({ id: postId, ...parsedBody }) });
      }
    );
    vi.mock('next/navigation', () => ({
      useRouter() {
        return {
          push: (path) => { expect(path).toMatchSnapshot() }
        };
      },
      useSearchParams() {
        return {
          get: (id) => "abc"
        };
      },
    }));
    vi.mock("next-auth/react", () => {
      return {
        useSession: vi.fn(
          () => {
            return { data: { user: { username: "admin" } }, status: 'authenticated' };
          }
        )
      };
    });
    vi.mock("react-redux", () => {
      return {
        useSelector: vi.fn(
          (_) => {
            return "abc";
          }
        )
      };
    });
    vi.mock('../../MemoryStorage', () => ({
      useAppContext() {
        return {
          csrf: "csrf"
        };
      },
    }));
    render(<Page />);

    await userEvent.type(screen.getByLabelText("Post title"), postTitle);
    await userEvent.type(screen.getByLabelText("Post content"), postContent);
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));
  }
);