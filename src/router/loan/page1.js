export default [
  {
    path: '/page1',
    name: 'page1',
    component: () => import('@page/loan/page1/example.vue'),
    meta: { title: '页面1' }
  }
]