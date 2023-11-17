import axios from 'axios'
import { makeRequest } from '@lib/utils'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Model from '@/views/model.vue'
/*return auth ? 'import login from \'../views/login.vue\'' : ''*/
import project from '@/json/project.json'
import models from '@/json/models.json'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: `/${project.name}/`
  },
  {
    path: `/${project.name}/`,
    redirect: `/${project.name}/${Object.keys(models)[0]}`
  },
  {
    path: `/${project.name}/:mname`,
    name: 'model',
    component: Model,
    /*return auth ? 'meta: { reqLogin: true }' : ''*/
  }
  /*return auth ? `,\n{\n    path: \'/${project.name}/login\',\n    name: \'login\',\n    component: login\n  }` : ''*/
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _from, next) => {
  if (to.matched.some(record => record.meta.reqLogin) /*return `&& ${auth != null}`*/) {
    try {
      const result = await makeRequest(
        axios.post([
          '' /*return `\'/${project.name}\'`*/,
          '/api/v1/',
          '' /*return auth ? `\'${auth.name}\'` : ''*/,
          '/verify'
        ].join(''), undefined, {
          headers: { authorization: 'Bearer ' + (localStorage.getItem('token') || '') }
        })
      )
      if (result.error) {
        throw new Error(result.data.error)
      }
      next()
    } catch (e) {
      next({
        path: '//*return project.name*//login',
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
