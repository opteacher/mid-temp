import { reqPost } from '@lib/utils'

export default {
  login: (data: any) =>
    reqPost('' /*return `\'${auth.name}/sign\'`*/, data, {
      type: 'api',
      ignores: ['remember'],
      messages: { succeed: '' }
    }),
  verify: () => reqPost('' /*return `${auth.name}/verify`*/, undefined, { type: 'api'}),
  verifyDeep: () => reqPost('' /*return `'${auth.name}/verify/deep'`*/, undefined, { type: 'api'})
}