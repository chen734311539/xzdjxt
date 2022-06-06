import Vue from 'vue'
import Router from 'vue-router'
import ScreenHomePage from '@/components/ScreenHomePage'
import banner from '@/components/content/Banner'
import jdgl from '@/components/module/jdgl/jdShow'
import wggl from '@/components/module/jdgl/wgShow'
import sqShow from '@/components/module/jdgl/sqShow'
import example from '@/components/datascreen/example/Example'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ScreenHomePage',
      component: ScreenHomePage,
      children:[
        {
          path:'/',
          name:banner,
          component:banner
        },
        {
          path:'/jdgl',
          name:jdgl,
          component:jdgl
        },
        {
          path:'/wggl',
          name:wggl,
          component:wggl
        },
        {
          path:'/sqShow',
          name:sqShow,
          component:sqShow
        },
      ]
    },
    {
      path: '/example',
      name: 'example',
      component: example,
    }
  ]
})
