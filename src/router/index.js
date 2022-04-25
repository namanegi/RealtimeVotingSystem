import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)

const routes = [
    {
        path: '/teacher',
        name: 'teacher',
        component: resolve => require(['@/components/Teacher'], resolve),
        meta: {
            title: '講師視点'
        }
    },
    {
        path: '/',
        name: 'Home'
    },
    {
        path: '/student',
        name: 'helloworld',
        component: resolve => require(['@/components/HelloWorld'], resolve),
        meta: {
            title: 'Hello World'
        }
    },
]

const router = new VueRouter({
    mode:'hash',
    base:'/',
    routes,
})
export default router
