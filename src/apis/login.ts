import { reqPost } from '@lib/utils'
import auth from '@/jsons/auth.json'

export default {
  login: (data: any) =>
    reqPost(`${auth.name}/sign`, data, {
      type: 'api',
      ignores: ['remember'],
      messages: { succeed: '' }
    }),
  verify: () => reqPost(`${auth.name}/verify`, undefined, { type: 'api' }),
  verifyDeep: () => reqPost(`${auth.name}/verify/deep`, undefined, { type: 'api' })
}
