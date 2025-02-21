export default [
  {
    path: '/',
    redirect: '/cloudLoanList'
  },
  {
    path: '/cloudLoanList',
    name: 'cloudLoanList',
    component: () => import('@page/loan/cloudLoan/cloudLoanList/example.vue'),
    meta: { title: '云贷视图列表' }
  }
]