import XtxSkeleton from "@/components/skeleton/index.vue"
import XtxCarousel from "@/components/carousel/index.vue"
import XtxMore from "@/components/more/index.vue"
import XtxCity from "@/components/city/index.vue"
import XtxBread from "@/components/Bread/index.vue"
import XtxBreadItem from "@/components/Bread/item.vue"
import XtxNumbox from "@/components/numbox/index.vue"
import XtxButton from "@/components/button/index.vue"
import XtxCheckbox from '@/components/checkbox/index.vue'
import XtxDialog from '@/components/dialog/index.vue'
import XtxSwitch from '@/components/switch/index.vue'
import XtxTabs from '@/components/tabs/index.vue'
import XtxTabsPane from '@/components/tabs/pane.vue'
// 参考1：https://stackoverflow.com/questions/69010567/how-to-make-vscode-recognize-global-component-in-vue
// 参考2：https://github.com/element-plus/element-plus/blob/dev/global.d.ts
declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        XtxSkeleton: typeof XtxSkeleton
        XtxCarousel: typeof XtxCarousel
        XtxMore: typeof XtxMore
        XtxBread: typeof XtxBread
        XtxBreadItem: typeof XtxBreadItem
        XtxCity: typeof XtxCity
        XtxNumbox: typeof XtxNumbox
        XtxButton: typeof XtxButton
        XtxCheckbox: typeof XtxCheckbox
        XtxDialog: typeof XtxDialog
        XtxSwitch: typeof XtxSwitch
        XtxTabs: typeof XtxTabs
        XtxTabsPane: typeof XtxTabsPane
    }
}
export {}
