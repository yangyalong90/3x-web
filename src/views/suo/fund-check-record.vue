<template>
  <div >
    <div class="fx-row-end">
      <el-button type="text" @click="createVisible = true">新增月份账单</el-button>
    </div>
    <div>
      <el-table :data="fundCheckList">
        <el-table-column label="标识" prop="id"></el-table-column>
        <el-table-column label="月份" prop="month"></el-table-column>
        <el-table-column label="创建时间" prop="startTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="addFundDetail(scope.row)">录入明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog :visible.sync="createVisible" title="新增月份账单">
        <el-input v-model="createObj.month" placeholder="请输入月份，如202312"></el-input>
        <div slot="footer" class="fx-row-end">
          <div>
            <el-button type="" @click="createVisible = false">取消</el-button>
            <el-button type="primary" @click="commitCreate">提交</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fund-check-record',
  data() {
    return {
      createVisible: false,
      createObj: {
        month: ''
      },
      fundCheckList: [],
    }
  },
  mounted() {
    this.getFundCheckList();
  },
  methods: {
    addFundDetail(row) {
      console.log(row)
      this.$router.push({
        path: '/suo/fund/detail',
        query: {
          checkId: row.id
        }
      })
    },
    commitCreate() {
      this.$http({
        url: '/suo/fundCheck/create',
        method: 'post',
        params: this.createObj,
      }).then(res => {
        console.log(res);
        this.$notify({
          type: 'success',
          message: '创建成功'
        });
        this.getFundCheckList();
        this.createVisible = false;
      })
    },
    getFundCheckList() {
      this.$http({
        url: '/suo/fundCheck/list',
        method: 'get',
      }).then(res => {
        console.log(res);
        this.fundCheckList = res.data;
      })
    }
  }

}

</script>

<style scoped>
</style>