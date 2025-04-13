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
      :new-fun="() => genDftFmProps(model.props)"
      :emitter="emitter"
      :mapper="mapper"
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
import { watch, ref, onMounted, reactive } from 'vue'
import MainLayout from '@/layouts/main.vue'
import models from '@/jsons/models.json'
import { useRoute } from 'vue-router'
import { TinyEmitter as Emitter } from 'tiny-emitter'
import Mapper, { createByFields } from '@lib/types/mapper'
import api from '@/apis/model'
import { genDftFmProps } from '@/utils'
import Column from '@lib/types/column'
import Model from '@/types/model'
import Table from '@/types/table'

const route = useRoute()
const mname = ref<string>('')
const model = reactive<Model>(new Model())
const table = reactive<Table>(new Table())
const columns = ref<Column[]>([])
const mapper = ref<Mapper>(new Mapper())
const emitter = new Emitter()

onMounted(refresh)
watch(() => route.params.mname, refresh)

function refresh() {
  mname.value = route.params.mname as string
  Model.copy(models.data.find((mdl: any) => mdl.name === mname.value), model, true)
  Table.copy(model.table, table, true)
  columns.value = table.columns.map((col: any) => Column.copy(col))
  mapper.value = createByFields(model.form.fields)
  emitter.emit('update:mapper', mapper.value)
  emitter.emit('refresh')
}
</script>
