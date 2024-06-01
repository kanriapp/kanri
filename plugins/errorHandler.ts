import { error } from "tauri-plugin-log-api";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('vue:error', (err, instance, info) => {
        error("Vue error: " + err + " ; " + info);
    })
})
