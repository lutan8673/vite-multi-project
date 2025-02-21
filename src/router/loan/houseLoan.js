export default [
  {
    path: '/',
    redirect: '/houseLoan'
  },
  {
    path: '/houseLoan',
    name: 'houseLoan',
    component: () => import('@page/loan/houseLoan/example.vue'),
    meta: { title: '房贷' }
  }
]