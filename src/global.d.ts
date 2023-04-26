import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "@/components/carousel/index.vue";
import XtxMore from '@/components/more/index.vue'
// 参考1：https://stackoverflow.com/questions/69010567/how-to-make-vscode-recognize-global-component-in-vue
// 参考2：https://github.com/element-plus/element-plus/blob/dev/global.d.ts
declare module "vue" {
    export interface GlobalComponents {
        XtxSkeleton: typeof XtxSkeleton;
        XtxCarousel: typeof XtxCarousel;
        XtxMore: typeof XtxMore;
    }
}
export {};
