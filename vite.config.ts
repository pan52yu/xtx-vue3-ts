import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            // 响应式配置
            reactivityTransform: true,
        }),
        vueSetupExtend(),
        vueJsx()
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                additionalData: `
          @import "@/assets/styles/variables.less";
          @import "@/assets/styles/mixins.less";
        `,
            },
        },
    },
});
