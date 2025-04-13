import { reqPost } from '@lib/utils'
import auth from '@/jsons/auth.json'

export default {
  login: (data: any) =>
    'name' in auth
      ? reqPost(`${auth.name}/sign`, data, {
          type: 'api',
          ignores: ['remember'],
          messages: { succeed: '' }
        })
      : Promise.reject(),
  verify: () =>
    'name' in auth ? reqPost(`${auth.name}/verify`, undefined, { type: 'api' }) : Promise.reject(),
  verifyDeep: () =>
    'name' in auth
      ? reqPost(`${auth.name}/verify/deep`, undefined, { type: 'api' })
      : Promise.reject()
}
