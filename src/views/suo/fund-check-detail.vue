<template>
  <div> 
    <div class="fx-row-end">
      <el-button type="text"> 明细汇总 </el-button>
    </div>  
    <div>
      <el-tabs v-model="activeType" @tab-click="handleTabClick">
        <el-tab-pane v-for="type in typeList" :label="type" :name="type" :key="type"></el-tab-pane>
      </el-tabs>
      <div>
        <el-table :data="dataList">
          <el-table-column v-for="column in activeColumns" :label="column.label" :prop="column.prop" :key="column.prop"></el-table-column>
        </el-table>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'fund-check-detail',
  data() {
    return {
      checkId: '',
      dataList: [],
      activeType: '充值',
      activeColumns: [],
      typeList: [
        '充值',
        '打赏',
        '换课',
        '会员',
        '视频',
        '投资大学',
        '专栏',
      ],
      typeColumns: {
        '充值': [
          {
            label: '头像',
            prop: '头像',
          },
          {
            label: '昵称',
            prop: '昵称',
          },
          {
            label: '充值金额',
            prop: '充值金额',
          },
          {
            label: '手续费',
            prop: '手续费',
          },
          {
            label: '毛收入',
            prop: '毛收入',
          },
          {
            label: '支付状态',
            prop: '支付状态',
          },
          {
            label: '端',
            prop: '端',
          },
          {
            label: '订单号',
            prop: '订单号',
          },
          {
            label: '支付渠道',
            prop: '支付渠道',
          },
          {
            label: '交易单号',
            prop: '交易单号',
          },
          {
            label: '充值时间',
            prop: '充值时间',
          },
        ],
      },

    }
  },
  created() {
    console.log(this.$route)
    this.checkId = this.$route.query.checkId;
  },
  mounted() {
    this.activeTypeChange();
  },
  methods: {
    handleTabClick() {
      this.activeTypeChange();
    },
    activeTypeChange() {
      console.log(this.activeType);
      this.activeColumns = this.typeColumns[this.activeType];
      this.getDataList();
    },
    getDataList() {
      this.$http({
        url: '/suo/fundCheck/detail/list',
        method: 'get',
        params: {
          type: this.activeType,
          checkId: this.checkId,
        }
      }).then(res => {
        console.log(res);
        this.dataList = res.data;
      })
    }
  }
}
</script>
<style scoped></style>