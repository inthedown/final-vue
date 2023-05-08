<template>
    <el-row :gutter="20" style="padding-bottom: 10px">
        <el-col :span="8">
            <div class="ve-card ve_card1">
                <img src="/src/assets/img/设备.png">
                <div>
                    <p>开课数量</p>
                    <span>{{courseNum}}</span>
                </div>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="ve-card ve_card1">
                <img src="/src/assets/img/节目.png">
                <div>
                    <p>反馈数量</p>
                    <span>{{feedbackNum}}</span>
                </div>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="ve-card ve_card1">
                <img src="/src/assets/img/计划.png">
                <div>
                    <p>学生数量</p>
                    <span>{{studentNum}}</span>
                </div>
            </div>
        </el-col>
    
    </el-row>
</template>
<script>
import { reactive,toRefs } from 'vue'
import * as VISUAL from '@/api/visual'
export default {
    name: "Shortcuts",
    setup() {
        const state = reactive({
            courseNum: 0,
            feedbackNum: 0,
            studentNum: 0,
        });
        return {
            ...toRefs(state),
        }
    },
    mounted() {
        VISUAL.getMap().then(res => {
            if(res.rspCode=='200'){
                this.courseNum=res.data.courseNum;
                this.feedbackNum=res.data.feedbackNum;
                this.studentNum=res.data.studentNum;
            }
        })
    },


}
</script>

<style lang="scss" scoped>
.el-row {
    height: 50%;

    padding-right: 10px;
}
.ve-card {
    border-radius: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    transition: all 500ms;
    color: #fff;
    &:hover {
        box-shadow: 3px 3px 6px 1px rgba(0, 0, 0, 0.2);
        background: #fff;
    }
    i {
        font-size: 100px;
        margin: 0 20px;
    }
    div {
        flex: 1;
        padding-right: 12px;
        p {
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        span {
            font-size: 60px;
            font-weight: bold;
        }
    }
}
.ve_card1 {
    background: #409eff;
    &:hover {
        color: #409eff;
    }
}

</style>
