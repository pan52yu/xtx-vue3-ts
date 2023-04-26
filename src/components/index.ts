import type {App} from 'vue'
import XtxSkelecton from './skeleton/index.vue'
import XtxCarousel from './carousel/index.vue'
import XtxMore from './more/index.vue'

export default {
    install(app: App) {
        app.component('XtxSkelecton', XtxSkelecton)
        app.component('XtxCarousel', XtxCarousel)
        app.component('XtxMore', XtxMore)
    },
}