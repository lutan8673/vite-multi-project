export default [
  {
    path: '/',
    redirect: '/cloudLoanView'
  },
  {
    path: '/cloudLoanView',
    name: 'cloudLoanView',
    component: () => import('@page/loan/cloudLoan/cloudLoanView/example.vue'),
    meta: { title: '云贷视图' }
  }
]