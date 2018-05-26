<template>
    <div class="home">
        <h1>首页</h1>
        <p>
           <el-button type="primary" @click="dialogVisible = true">添加</el-button>
           <el-button type="primary" @click="delAlls">批量删除</el-button>
            <el-button type="primary"  @click="infoData">刷新</el-button>
            <!-- 搜索 -->
            <el-input style="width:800px" placeholder="请输入内容" v-model="input5" class="input-with-select">         
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                  <el-option label="订单" value="order"></el-option>
                  <el-option label="城市" value="city"></el-option>
                  <el-option label="年龄" value="year"></el-option>
             </el-select>
           <el-button slot="append" @click="findData" icon="el-icon-search"></el-button>
           </el-input>
        </p>
        <!-- 增加  -->
<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
             <p>订单<el-input placeholder="请输入内容" name="order2"  v-model="order2" clearable></el-input></p>
            <p>状态<el-input placeholder="请输入内容" name="state2" v-model="state2" clearable></el-input></p>
            <p>手机号：<el-input placeholder="请输入内容" name="phone2" v-model="phone2" clearable></el-input></p>
            <p>商品：<el-input placeholder="请输入内容" name="goods2" v-model="goods2" clearable></el-input></p>
            <p>价钱：<el-input placeholder="请输入内容" name="price2" v-model="price2" clearable></el-input></p>
            <p>订单时间<el-input placeholder="请输入内容" name="time2" v-model="time2" clearable></el-input></p>
            <p>宠主<el-input placeholder="请输入内容" name="petOwne2r" v-model="petOwner2" clearable></el-input></p>
            <p>地址<el-input placeholder="请输入内容" name="address2" v-model="address2" clearable></el-input></p>
        <span slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible = false">取 消</el-button>
       <el-button type="primary" :plain="true" @click="addData">确 定</el-button>
       </span>
</el-dialog>
<!-- 修改 --> 
<el-dialog title="修改" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
          <p>订单<el-input placeholder="请输入内容" name="order"  v-model="order" clearable></el-input></p>
            <p>状态<el-input placeholder="请输入内容" name="state" v-model="state" clearable></el-input></p>
            <p>手机号：<el-input placeholder="请输入内容" name="phone" v-model="phone" clearable></el-input></p>
            <p>商品：<el-input placeholder="请输入内容" name="goods" v-model="goods" clearable></el-input></p>
            <p>价钱：<el-input placeholder="请输入内容" name="price" v-model="price" clearable></el-input></p>
            <p>订单时间<el-input placeholder="请输入内容" name="time" v-model="time" clearable></el-input></p>
            <p>宠主<el-input placeholder="请输入内容" name="petOwner" v-model="petOwner" clearable></el-input></p>
            <p>地址<el-input placeholder="请输入内容" name="address" v-model="address" clearable></el-input></p>
        <span slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible2 = false">取 消</el-button>
       <el-button type="primary" :plain="true" @click="sendUpdata" >确 定</el-button>
       </span>
</el-dialog>
<!-- 渲染页面 -->
        <el-table   ref="table" :data="this.$store.state.data.arr" style="width: 100%" @select-all='selectAll'  @select='selects'>
           <el-table-column
      type="selection"
      width="55">
    </el-table-column> 

<!-- 折叠面板,下拉 -->
 <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">        
          <el-form-item label="用户">
            <span>{{ props.row.petOwner }}</span>
          </el-form-item>
          <el-form-item label="电话">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="商品">
            <span>{{ props.row.goods }}</span>
          </el-form-item>
          <el-form-item label="价钱">
            <span>{{ props.row.price }}</span>
          </el-form-item>        
        </el-form>
      </template>
    </el-table-column>
   
           <el-table-column label="订单号" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.order }}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.state }}</span>
                </template>
            </el-table-column>
             <el-table-column label="订单创建时间" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.phone }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button size="mini" type="danger" :plain="true" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
         <div class="block">
    <!-- <span class="demonstration">直接前往</span> -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
    </div>
    
</template>

<script>
export default {
  created: function() {
    this.$store.commit({
      type: "initData"
    });
  },
  data() {
    return {
      dialogVisible: false, //增加框
      dialogVisible2: false, //修改框
      delAll: "", //删除全选
      order: "",
      state: "",
      phone: "",
      goods: "",
      price: "",
      time: "",
      petOwner: "",
      address: "",
      id: "",
      input5: "",
      select: "",
      order2: "",
      state2: "",
      phone2: "",
      goods2: "",
      price2: "",
      time2: "",
      petOwner2: "",
      address2: "",
      id2: "",
      currentPage3: 5
    };
  },
  methods: {
    //点击复选框触发事件
    selects(selection) {
      this.delAll = selection;
    },
    //复选框全选
    selectAll(selection) {
      this.delAll = selection;
    },
    //批量删除
    delAlls() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //删除信息
          let arr = this.delAll.map(item => {
            return item._id;
          });
          if (this.delAll != "" && this.delAll.length >= 2) {
            this.$store.dispatch({
              type: "delAll",
              arr
            });
          } else if (this.delAll.length == 1) {
            this.$store.dispatch({
              type: "delData",
              id: arr[0]
            });
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    infoData() {
      this.$store.commit({
        type: "initData"
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //分页
    handleCurrentChange(val) {
      this.$store.commit({
        type: "initData",
        page: val
      });
      console.log(`当前页: ${val}`);
    },
    //查找数据
    findData() {
      console.log(this.select, this.input5);
      this.$store.dispatch({
        type: "findData",
        inputType: this.select,
        msg: this.input5
      });
    },
    //获取选中的数据
    handleEdit(index, row) {
      this.dialogVisible2 = true;
      this.order = row.order;
      this.state = row.state;
      this.phone = row.phone;
      this.goods = row.goods;
      this.price = row.price;
      this.time = row.time;
      this.petOwner = row.petOwner;
      this.address = row.address;
      this.id = row._id;
      console.log(this.id);
      console.log(row);
      console.log(index, row._id);
    },
    //发送修改数据
    sendUpdata() {
      this.$store.dispatch({
        type: "updata",
        id: this.id,
        order: this.order,
        state: this.state,
        phone: this.phone,
        goods: this.goods,
        price: this.price,
        time: this.time,
        petOwner: this.petOwner,
        address: this.address
      });
      this.dialogVisible2 = false;
      this.$message("修改成功");
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //删除信息
          this.id = row._id;
          this.$store.dispatch({
            type: "delData",
            id: this.id
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      console.log(index, row);
      console.log(row._id);
    },
    //添加信息
    addData() {
      this.$store.dispatch({
        type: "addData",
        order: Number(this.order2),
        state: this.state2,
        phone: this.phone2,
        price: this.price2,
        goods: this.goods2,
        time: this.time2,
        petOwner: this.petOwner2,
        address: this.address2
      });
      this.id2 = "";
      this.order2 = "";
      this.state2 = "";
      this.phone2 = "";
      this.goods2 = "";
      this.time2 = "";
      this.petOwner2 = "";
      this.address2 = "";
      this.dialogVisible = false;
      this.$message("添加成功");
    },

    handleClose(done) {
      done();
    }
  }
};
</script>

<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>