<template>
  <div>
    <n-button @click="show_AddModel = true">添加</n-button>
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>序号</th>
          <th>编号</th>
          <th>名称</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(category, index) in category_List">
          <td>{{ index + 1 }}</td>
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>
            <n-space>
              <n-button @click="updateCategory(category)">修改</n-button>
              <n-button @click="deleteCategory(category)">删除</n-button>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>

    <n-modal v-model:show="show_AddModel" preset="dialog" title="Dialog">
      <template #header>
        <div>添加分类</div>
      </template>
      <div>
        <n-input v-model:value="add_Category.name" type="text" placeholder="请输入名称"></n-input>
      </div>
      <template #action>
        <div>
          <n-button @click="add">提交</n-button>
        </div>
      </template>
    </n-modal>

    <n-modal v-model:show="show_UpdateModel" preset="dialog" title="Dialog">
      <template #header>
        <div>修改分类</div>
      </template>
      <div>
        <n-input v-model:value="update_Category.name" type="text" placeholder="请输入名称"></n-input>
      </div>
      <template #action>
        <div>
          <n-button @click="update">提交</n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue';

const axios = inject("axios")
const dialog = inject("dialog")
const message = inject("message")

const category_List = ref([])
const show_AddModel = ref(false)
const show_UpdateModel = ref(false)
const add_Category = reactive({ name: "" })
const update_Category = reactive({
  id: 0,
  name: ''
})

// 在挂载时即加载数据
onMounted(() => {
  loadDatas()
})

const loadDatas = async () => {
  // 调用后端接口
  let res = await axios.get("/category/list")
  category_List.value = res.data.rows
}

// 删除分类
const deleteCategory = async (category) => {
  dialog.warning({
    title: "警告",
    content: "是否删除？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      let res = await axios.delete(`/category/_token/delete?id=${category.id}`)
      if (res.data.code == 200) {
        loadDatas()
        message.info(res.data.msg)
      } else {
        message.error(res.data.msg)
      }
    },
    onNegativeClick: () => { }
  })
}

// 添加分类
const add = async () => {
  let res = await axios.post("/category/_token/add", { name: add_Category.name })
  if (res.data.code == 200) {
    loadDatas()
    message.info(res.data.msg)
  } else {
    message.error(res.data.msg)
  }
  show_AddModel = false
}

// 修改分类
const updateCategory = async (category) => {
  show_UpdateModel.value = true
  update_Category.id = category.id
  update_Category.name = category.name
}
const update = async () => {
  let res = await axios.put("/category/_token/update", { id: update_Category.id, name: update_Category.name })
  if (res.data.code == 200) {
    loadDatas()
    message.info(res.data.msg)
  } else {
    message.error(res.data.msg)
  }
  show_UpdateModel = false
}

</script>

<style lang="scss" scoped>

</style>