import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "@/components/carousel/index.vue";
import XtxMore from '@/components/more/index.vue'
import XtxBread from '@/components/Bread/index.vue'
import XtxBreadItem from '@/components/Bread/item.vue'
// 参考1：https://stackoverflow.com/questions/69010567/how-to-make-vscode-recognize-global-component-in-vue
// 参考2：https://github.com/element-plus/element-plus/blob/dev/global.d.ts
declare module "vue" {
    export interface GlobalComponents {
        XtxSkeleton: typeof XtxSkeleton;
        XtxCarousel: typeof XtxCarousel;
        XtxMore: typeof XtxMore;
        XtxBread: typeof XtxBread;
        XtxBreadItem: typeof XtxBreadItem;
    }
}
export {};
