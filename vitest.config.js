import { configDefaults, defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ["vitestSetup.ts"],
    exclude: [...configDefaults.exclude, 'tests/visual_regression/*']
  },
});