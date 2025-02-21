export default [
  {
    path: '/',
    redirect: '/custSearch'
  },
  {
    path: '/custSearch',
    name: 'custSearch',
    component: () => import('@page/cust/custSearch/custSearch.vue'),
    meta: { title: '客户搜索' }
  }
]