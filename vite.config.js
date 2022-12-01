//stackoverflow.com/questions/71544439/how-do-i-get-vite-to-build-entire-project-instead-of-just-the-index-html-page/71553448#71553448
import { defineConfig } from "vite";
import { resolve } from "path";

// source: https://vitejs.dev/config/#config-intellisense, https://vitejs.dev/guide/build.html#multi-page-app
export default defineConfig({
  // ...
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        barChart: resolve(__dirname, "graph.html"),
        bubbleChart: resolve(__dirname, "bubble-chart.html"),
        villager: resolve(__dirname, "villager.html"),

        // ...
        // List all files you want in your build
      },
    },
  },
});
