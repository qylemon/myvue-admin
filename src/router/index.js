import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Login from '@/page/Login'
import Index from '@/page/Index'
import Iframe from '@/page/iframe/iframe'
import ArticleManage from '@/page/article/articleManage'
import User from '@/page/user/index'
import addUser from '@/page/user/addUser'
import Tag from '@/page/tag/index'
import addTag from '@/page/tag/addTag'
import Auth from '@/page/auth/index'
import Note from '@/page/note/index'
import Comment from '@/page/comment/index'
import Druid from '@/page/iframe/druid'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {path: "", component: Index},
        {path:"/articleManage", component:ArticleManage},
        {path:"/Iframe/:path", component:Iframe},
        {path:"/user", component:User},
        {path:"/adduser", component:addUser},
        {path:"/tag", component:Tag},
        {path:"/addtag", component:addTag},
        {path:"/auth", component:Auth},
        {path:"/note", component:Note},
        {path:"/comment", component:Comment},
        {path:"/druid", component:Druid}
      ]
    }
  ]
})
