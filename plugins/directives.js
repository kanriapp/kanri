export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('resizable', {
        mounted: function (el) {
            el.addEventListener('input', function (e) {
                e.target.style.height = 'auto'
                e.target.style.height = (parseInt(e.target.scrollHeight) + 2).toString() + 'px'
            })
        }
    })
})
