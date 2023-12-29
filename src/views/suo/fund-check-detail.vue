<template>
  <div> 
    <div class="fx-row-end">
      
      <el-upload
        class="upload-demo"
        action="http://0.0.0.0"
        :before-upload="beforeUploadFund">
        <el-button type="text"> 资金核对 </el-button>
      </el-upload>
    </div>  
    <div>
      <el-tabs v-model="activeType" @tab-click="handleTabClick">
        <el-tab-pane v-for="type in typeList" :label="type" :name="type" :key="type">
        
        </el-tab-pane>
      </el-tabs>
      <div>
        <div style="display: flex; flex-direction: row; justify-content: flex-end;">
          <el-upload
            class="upload-demo"
            action="http://0.0.0.0"
            :before-upload="beforeUploadDetail">
            <el-button type="text"> 清单上传 </el-button>
          </el-upload>
        </div>
        <el-table :data="dataList" height="80vh">
          <el-table-column v-for="column in activeColumns" :label="column" :prop="column" :key="column"></el-table-column>
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
        '圈子',
      ],
      typeColumns: {
        '充值': [
          '头像', 
          '昵称',
          '充值金额',
          '手续费',
          '毛收入',
          '支付状态',
          '端',
          '订单号',
          '支付渠道',
          '交易单号',
          '充值时间'
        ],
        '打赏': [
          '头像',
          '会员昵称',
          '主编',
          '栏目',
          '文章',
          '打赏金额',
          '订单号',
          '支付渠道',
          '端',
          '打赏时间',
        ],
        '换课': [
          '是否加赠',
          '工单ID',
          '会员ID',
          '会员头像',
          '昵称',
          '被换圈子',
          '被换金额',
          '被换剩余天数',
          '被换剩余金额',
          '换至圈子',
          '换至圈子天数',
          '工单状态',
          '备注信息',
          '创建时间',
        ],
        '会员': [
          '头像',
          '买家昵称',
          '会员电话',
          '会员种类',
          '会员类型',
          '实付金额',
          '赠送币金额',
          '退款金额',
          '会员有效期',
          '订单信息',
          '订单号',
          '支付渠道',
          '端',
          '下单时间',
        ],
        '视频': [
          '头像',
          '买家昵称',
          '视频名称',
          '单节名称',
          '实付金额',
          '赠送币金额',
          '平账金额',
          '状态',
          '推广来源',
          '订单平台',
          '订单渠道',
          '采集信息',
          '订单号',
          '支付渠道',
          '下单时间',
        ],
        '投资大学': [
          '会员头像',
          '买家昵称',
          '课程',
          '支付金额',
          '赠送币金额',
          '端',
          '订单来源',
          '是否全买',
          '备注',
          '支付渠道',
          '推广来源',
          '部门类别',
          '下单时间',
          '过期时间',
        ],
        '专栏': [
          '会员头像',
          '会员昵称',
          '会员电话',
          '主编',
          '专栏',
          '实付金额',
          '赠送币金额',
          '退款金额',
          '平账金额',
          '专栏有效期',
          '订单号',
          '支付渠道',
          '优惠信息',
          '类型',
          '订单渠道',
          '下单时间',
        ],
        '圈子': [
          '会员头像',
          '买家昵称',
          '会员电话',
          '圈子',
          '购买份数',
          '实付金额',
          '赠送币金额',
          '退款金额',
          '平账金额',
          '有效期',
          '订单号',
          '支付渠道',
          '支付时间',
          '推广来源',
          '端',
          '订单来源',
          '社群推广',
          '部门类别',
        ]
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
    beforeUploadDetail(file) {
      console.log(file);
      const form = new FormData();
      form.append('file', file);
      form.append('checkId', this.checkId);
      form.append('type', this.activeType);
      this.$http({
        url: '/suo/fundCheck/importDetail',
        method: 'post',
        data: form,
      }).then(res => {
        this.$notify({
          type: 'success',
          message: '上传成功'
        })
        this.getDataList();
      })
      return false;
    },
    beforeUploadFund(file) {
      console.log(file);
      const form = new FormData();
      form.append('file', file);
      form.append('checkId', this.checkId);
      this.$http({
        url: '/suo/fundCheck/analysis',
        method: 'post',
        data: form,
        responseType: 'blob',
      }).then(res => {
        const blob = new Blob([res]);
        let blobUrl = window.URL.createObjectURL(blob);
        const fileName = `${new Date().valueOf()}.xlsx`;
        let link = document.createElement('a')
        link.download = fileName;
        link.style.display = 'none';
        link.href = blobUrl;
        // 触发点击
        document.body.appendChild(link)
        link.click()
        // 移除
        document.body.removeChild(link)
      })
      return false;
    },
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