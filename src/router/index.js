import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/';
import getMenuRoutes from '@/utils/permission';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);
const ayncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    hidden: false,
    icon: 'inbox'
  },
  component: Home,
  children: [{
      path: 'list',
      name: 'ProductList',
      meta: {
        title: '商品列表',
        hidden: false,
        icon: 'unordered-list'
      },
      component: () => import('@/views/page/productList.vue'),
    }, {
      path: 'add',
      name: 'ProductAdd',
      meta: {
        title: '添加商品',
        hidden: false,
        icon: 'file-add'
      },
      component: () => import('@/views/page/productAdd.vue'),
    },
    {
      path: 'edit/:id',
      name: 'ProductEdit',
      meta: {
        title: '编辑商品',
        hidden: true,
        icon: 'file-add'
      },
      component: () => import('@/views/page/productAdd.vue'),
    },
    {
      path: 'category',
      name: 'category',
      meta: {
        title: '类目管理',
        hidden: false,
        icon: 'project'
      },
      component: () => import('@/views/page/category.vue'),
    },
  ],
}];

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home'

    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        hidden: false,
        icon: 'number'
      },
      component: () => import('@/views/page'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true
    },
  },

];

const router = new VueRouter({
  routes,
});

let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.user.role, ayncRouterMap);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  next();
});

export default router;
