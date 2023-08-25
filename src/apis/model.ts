import { reqAll, reqDelete, reqPost, reqPut } from '@lib/utils'

export default {
  add: (mname: string, data: any) => reqPost(mname, data),
  remove: (mname: string, key: any) => reqDelete(mname, key),
  update: (mname: string, key: any, data: any) => reqPut(mname, key, data),
  all: (mname: string) => reqAll(mname),
}