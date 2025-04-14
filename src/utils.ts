export * from '@lib/utils'
import { typeDftVal } from '@lib/types'

export function genDftFmProps(props: any[]) {
  const ret = {} as Record<string, any>
  for (const prop of props) {
    ret[prop.name] = typeDftVal(prop.ptype)
  }
  return ret
}