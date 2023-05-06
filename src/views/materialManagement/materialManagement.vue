<template>
  <div class="container">
    <div class="header">
      <el-input
        id="input"
        v-model="input1"
        placeholder="Please input"
        size="large"
      >
        <template #prepend>搜索:</template>
      </el-input>
      <el-button>重置</el-button>
      <el-button type="primary">查询</el-button>
    </div>
    <div class="main">
      <div class="crumb">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-icon :size="30">
              <svg
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                data-v-78e17ca8=""
              >
                <path
                  fill="currentColor"
                  d="M896 324.096c0-42.368-2.496-55.296-9.536-68.48a52.352 52.352 0 0 0-22.144-22.08c-13.12-7.04-26.048-9.536-68.416-9.536H228.096c-42.368 0-55.296 2.496-68.48 9.536a52.352 52.352 0 0 0-22.08 22.144c-7.04 13.12-9.536 26.048-9.536 68.416v375.808c0 42.368 2.496 55.296 9.536 68.48a52.352 52.352 0 0 0 22.144 22.08c13.12 7.04 26.048 9.536 68.416 9.536h567.808c42.368 0 55.296-2.496 68.48-9.536a52.352 52.352 0 0 0 22.08-22.144c7.04-13.12 9.536-26.048 9.536-68.416V324.096zm64 0v375.808c0 57.088-5.952 77.76-17.088 98.56-11.136 20.928-27.52 37.312-48.384 48.448-20.864 11.136-41.6 17.088-98.56 17.088H228.032c-57.088 0-77.76-5.952-98.56-17.088a116.288 116.288 0 0 1-48.448-48.384c-11.136-20.864-17.088-41.6-17.088-98.56V324.032c0-57.088 5.952-77.76 17.088-98.56 11.136-20.928 27.52-37.312 48.384-48.448 20.864-11.136 41.6-17.088 98.56-17.088H795.84c57.088 0 77.76 5.952 98.56 17.088 20.928 11.136 37.312 27.52 48.448 48.384 11.136 20.864 17.088 41.6 17.088 98.56z"
                ></path>
                <path
                  fill="currentColor"
                  d="M64 320h896v64H64v-64zm0 128h896v64H64v-64zm128 192h256v64H192z"
                ></path>
              </svg>
            </el-icon>
            <span>全部</span>
          </el-col>
          <el-col :span="16"><div class="grid-content ep-bg-purple" /></el-col>
          <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
        </el-row>
      </div>
      <el-button type="primary" @click="upload">上传素材</el-button>
      <el-icon :size="30" @click="changeShow">
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          data-v-78e17ca8=""
        >
          <path
            fill="currentColor"
            d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"
          ></path>
        </svg>
      </el-icon>
      <div class="list-scroll" v-if="show === true">
        <div class="toolbar">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-radio-group v-model="radio">
                <el-radio :label="3">全部</el-radio>
                <el-radio :label="6">图片</el-radio>
                <el-radio :label="9">视频</el-radio>
                <el-radio :label="12">音频</el-radio>
                <el-radio :label="15">艺术</el-radio>
                <el-radio :label="18">党建</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="12">
              <el-button>取消选择</el-button>
              <el-button type="primary">全选</el-button>
              <el-button>批量删除</el-button>
              <el-button type="primary" @click="newFolder">
                新建文件夹
              </el-button>
              <el-dialog
                v-model="newFolderVisible"
                title="新建文件夹"
                width="fit-content"
                :before-close="handleClose"
              >
                <el-divider />
                <el-form :model="form" label-position="top">
                  <el-form-item
                    label="文件夹名称"
                    :label-width="formLabelWidth"
                  >
                    <el-input v-model="form.name" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="Please select a class"
                    >
                      <el-option label="图片" value="图片" />
                      <el-option label="音频" value="音频" />
                      <el-option label="视频" value="视频" />
                    </el-select>
                  </el-form-item>
                </el-form>

                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="handleClose">
                      取消
                    </el-button>
                    <el-button type="primary" @click="addFolder">
                      确认
                    </el-button>
                  </span>
                </template>
              </el-dialog>
              <el-dialog
                v-model="uploadVisible"
                title="上传素材"
                width="fit-content"
                :before-close="handleClose"
              >
                <el-divider />
                <el-button @click="newFolder" primary>
                  新建文件夹
                </el-button>
                <el-divider />
                <el-upload
                  v-model:file-list="fileList"
                  class="upload-demo"
                  action=""
                  multiple
                  auto-upload="false"
                  :http-request="uploadMode"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :before-remove="beforeRemove"
                  :before-upload="beforeUpload"
                  :on-change="handleChange"
                  :on-progress="handleProgress"
                  :on-exceed="handleExceed"
                  :limit="3"
                >
                  <el-button type="primary">选取</el-button>
                  <template #tip>
                    <div class="el-upload__tip">
                      jpg/png files with a size less than 500KB.
                    </div>
                  </template>
                </el-upload>

                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="handleClose">
                      取消
                    </el-button>
                    <el-button type="primary" @click="uploadFile">
                      确认
                    </el-button>
                  </span>
                </template>
              </el-dialog>
            </el-col>
          </el-row>
        </div>
        <div class="material-list">
          <ul id="nav">
            <li v-for="(item, i) in itemlist" v-bind:key="i">
              <input type="radio" name="select" id="select" />
              <img src="~@/assets/img/folder.png" alt="" />
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <material-index></material-index>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import materialIndex from './materialIndex.vue'
import axios from 'axios'
export default {
  components: { materialIndex },
  setup() {
    const state = reactive({
      show: true,
      itemlist: [
        {
          name: 'aaa',
          type: '图片',
        },
        {
          name: 'aaa',
          type: '图片',
        },
      ],
      formLabelWidth: '200px',
      newFolderVisible: false,
      uploadVisible: false,
      form: {
        name: '',
        region: '',
      },
      fileList: [],
      fileInfo: [
        {
          author: 'aa',
        },
      ],
      uploadUrl: '/api/uploadFile',
    })
    return {
      ...toRefs(state),
    }
  },
  methods: {
    //新建文件夹
    newFolder() {
      // this.$message({
      //   message: '新建文件夹',
      //   type: 'success',
      // })
      this.newFolderVisible = true
    },
    addFolder() {
      this.itemlist.push({
        name: this.form.name,
        type: this.form.region,
      })
      this.newFolderVisible = false
    },
    uploadMode(param) {},
    uploadFile() {
      let fd = new FormData()
      this.fileList.forEach(file => {
        console.log(file)
        fd.append('fileName', file.raw)
      })
      fd.append('author', this.fileInfo[0].author)

      axios
        .post('api/file/upload', fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log(response.data.rspCode)
          if (response.data.rspCode === '200') {
            this.$message({
              message: '上传成功',
              type: 'success',
            })
            this.uploadVisible = false
          } else {
            this.$message({
              message: '上传失败',
              type: 'error',
            })
          }
          this.fileList = []
        })
    },
    upload() {
      this.uploadVisible = true
    },
    //关闭弹窗
    handleClose() {
      if (this.newFolderVisible) {
        this.newFolderVisible = false
      }
      if (this.uploadVisible) {
        this.uploadVisible = false
      }
    },
    //预览图片
    handlePreview(file) {
      this.$preview(file)
    },
    //删除图片
    handleRemove(file) {
      this.$message({
        message: '删除了' + file.name,
        type: 'success',
      })
    },
    //上传成功
    handleSuccess(response, file) {
      console.log(response)
      console.log(file)
      this.$message({
        message: '上传成功',
        type: 'success',
      })
    },
    handleChange(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
      console.log(this.fileList)
    },
    changeShow() {
      this.show = !this.show
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-input-group {
  width: 85%;
}
.crumb {
  width: 100%;
  height: 50px;
  display: block;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
}
.crumb span {
  font-size: 20px;
  color: rgb(0, 0, 0);
  top: -10px;
  left: 10px;
  position: relative;
}
.el-icon {
  padding: 0 7px;
}
.material-list {
  width: 100%;
  height: 550px;
  overflow-y: scroll;
}
#nav {
  background-color: rgb(158, 239, 250);
}
#nav ul {
  list-style: none;
  margin-left: 50px;
}

#nav li {
  display: inline-block;
  margin-top: 20px;
  text-align: center;
  width: 300px;
}
#nav li:hover {
  background-color: rgb(52, 138, 179);
  input[type='radio'] {
    position: relative;
    top: 12px;
    right: -36px;
    display: block;
  }
}
#nav li input {
  display: none;
}
#nav li span {
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
}
#nav li img {
  margin: 0 auto;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
