import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

installGlobals();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    plugins: [remix(), tsconfigPaths()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./app"),
      },
    },
    server:{
      proxy:{
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          secure: false,
        },
      }
    }
    
  };
});
