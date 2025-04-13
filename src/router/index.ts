import axios from 'axios'
import { makeRequest, getProp } from '@lib/utils'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Model from '@/views/model.vue'
import login from '../views/login.vue'
import project from '@/jsons/project.json'
import Home from '@/views/home.vue'
import auth from '@/jsons/auth.json'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: `/${project.name}/`
  },
  {
    path: `/${project.name}/`,
    redirect: `/${project.name}/home`
  },
  {
    path: `/${project.name}/home`,
    name: 'Home',
    component: Home
  },
  {
    path: `/${project.name}/:mname`,
    name: 'model',
    component: Model,
    meta: 'model' in project.auth ? { reqLogin: true } : undefined
  }
]
if ('model' in project.auth) {
  routes.push({
    path: `/${project.name}/login`,
    name: 'login',
    component: login
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _from, next) => {
  if (to.matched.some(record => record.meta.reqLogin) && 'model' in project.auth) {
    try {
      const result = await makeRequest(
        axios.post(`/${project.name}/api/v1/${getProp(auth, 'name')}/verify`, undefined, {
          headers: { authorization: 'Bearer ' + (localStorage.getItem('token') || '') }
        })
      )
      if (result.error) {
        throw new Error(result.data.error)
      }
      next()
    } catch (e) {
      next({
        path: `${project.name}/login`,
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
