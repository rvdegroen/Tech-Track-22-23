//stackoverflow.com/questions/71544439/how-do-i-get-vite-to-build-entire-project-instead-of-just-the-index-html-page/71553448#71553448
import { defineConfig } from "vite";

// source: https://vitejs.dev/config/#config-intellisense
export default defineConfig({
  // ...
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        barChart: "./graph.html",
        bubbleChart: "./bubbleChart.html",

        // ...
        // List all files you want in your build
      },
    },
  },
});
