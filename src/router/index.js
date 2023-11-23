import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Home',
        component: () => import('@/layouts/DefaultLayout.vue'),
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('@/views/Dashboard.vue'),
            },
            {
                path: '/alert_list',
                name: 'AlertList',
                component: () => import('@/components/pages/AlertList.vue'),
            },
            {
                path: '/Camera_live',
                name: 'CameraLive',
                component: () => import('@/components/pages/CameraLive.vue'),
            },
            {
                path: '/notify_management',
                name: 'NotifyManagement',
                component: () => import('@/components/pages/NotifyManagement.vue'),
            },
            {
                path: '/channel_management',
                name: 'ChannelManagement',
                component: () => import('@/components/pages/ChannelManagement.vue'),
            },
            {
                path: '/camera_management',
                name: 'CameraManagement',
                component: () => import('@/components/pages/CameraManagement.vue'),
            },
            {
                path: '/account_management',
                name: 'AccountManagement',
                component: () => import('@/components/pages/AccountManagement.vue'),
            },
            {
                path: '*',
                name: 'Page403',
                component: () => import('@/views/pages/Page403.vue'),
              },
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }
    }
})  

export default router