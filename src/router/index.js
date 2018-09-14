/*
* @Author: Star
* @Date:   2018-08-04 23:50:26
* @Last Modified by:   Star
* @Last Modified time: 2018-09-14 15:48:52
*/
import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'
import Disc from 'components/disc/disc'


Vue.use(Router)

export default new Router({
  routes: [
    {
      // 设置默认路径
      path: '/',
      redirect: 'recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
