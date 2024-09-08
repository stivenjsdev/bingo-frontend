import react from "@vitejs/plugin-react-swc";
// import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // resolve: {
  //   alias: {
  //     "@": fileURLToPath(new URL("./src", import.meta.url)),
  //   },
  // },
});
