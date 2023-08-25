<template>
  <MainLayout>
    <EditableTable
      :api="{
        all: () => api.all(mname),
        add: (record: any) => api.add(mname, record),
        update: (record: any) => api.update(mname, record.key, record),
        remove: (record: any) => api.remove(mname, record.key)
      }"
      sclHeight="h-full"
      :columns="columns"
      :mapper="mapper"
      :copy="(src: any, tgt?: any, force = true) =>
        gnlCpy(() => genDftFmProps(model.props), src, tgt, { force })
      "
      :emitter="emitter"
      :size="table.size"
      :pagable="table.hasPages"
      :refOptions="table.refresh"
      :dspCols="table.colDspable"
      :editable="table.operable.includes('可编辑')"
      :addable="table.operable.includes('可增加')"
      :delable="table.operable.includes('可删除')"
    />
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/main.vue'
import models from '@/json/models.json'
import { useRoute } from 'vue-router'
import { TinyEmitter as Emitter } from 'tiny-emitter'
import { createByFields } from '@lib/types/mapper'
import api from '@/apis/model'
import { gnlCpy } from '@lib/utils'
import { bsTpDefault } from '@lib/types/index'

const route = useRoute()
const mname = route.params.mname as string
const model = (models as any)[mname]
const table = model.table
const columns = table.columns
const mapper = createByFields(model.form.fields)
const emitter = new Emitter()

function genDftFmProps(props: any[]) {
  const ret = {} as Record<string, any>
  for (const prop of props) {
    ret[prop.name] = bsTpDefault(prop.ptype)
  }
  return ret
}
</script>