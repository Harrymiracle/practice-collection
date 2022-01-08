/**
 * Created by Administrator on 2017/4/10.
 */


const routes = [
    {path: "/foo", component: Foo},
    {path: "/bar", component: Bar}
];

const router = new VueRouter({
    routes: routes
});

const app = new Vue({
    router: router
}).$mount('#app');

