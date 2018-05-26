//储存后台数据
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export default ({
    state: {
        name: '张三',
        arr: []
    },
    methods: {


    },
    //同步
    mutations: {
        //得到初始数据
        initData(context, pages) {//初始化表格  
            console.log(pages.page)            
            axios.post("http://127.0.0.1:3000/page", { page: pages.page, rows: 7 }).then((msg) => {
                context.arr = msg.data.rows;
                console.log(context.arr)
                // context.state.arr=msg.data;
            })
        },
        
        //查找完以后初始化表格 
        againData(context,obj) {              
            context.arr=obj.msg      
      }
    },
    actions: {
         //删除数据
         delData(context, obj) {
            axios.post("http://127.0.0.1:3000/delData", { _id: obj.id}).then((msg) => {
            context.commit({
                type:'initData',
                page:1
            })
            })
        },
         //批量删除数据
         delAll(context, obj) {      
            console.log(obj.arr)         
            axios.post("http://127.0.0.1:3000/delAll", { ids:obj.arr}).then((msg) => {
            context.commit({
                type:'initData',
                page:1
            })
            })
        },
         //查找数据
         findData(context, obj) {   
            let inputType=obj.inputType;         
            let msg=obj.msg;   
           // console.log(obj.inputType)
          //  console.log(obj.msg)//
            axios.post("http://127.0.0.1:3000/findData", {findType:"exact",[obj.inputType]:`${msg}`}).then((msg) => {  
                console.log(msg)          
            context.commit({
                     type:'againData',
                     msg:msg.data
                 })          
            })
        },
        getdata(context) {
            axios.post("http://127.0.0.1:3000/page", {}).then((msg) => {
                console.log(msg)
                console.log(context.state)
            })
        },
        //修改数据
        updata(context, obj) {
            console.log(obj)
            axios.post("http://127.0.0.1:3000/updata", {
                _id: obj.id, 
                order: obj.order,
                state: obj.state,
                phone: obj.phone,
                goods:obj.goods,
                price: obj.price,
                time: obj.time,
                petOwner: obj.petOwner,
                address: obj.address
            }).then((msg) => {
                context.commit({
                    type:'initData',
                    page:1
                })
            })
        },
        //添加信息
        addData(context, obj) {
            axios.post("http://127.0.0.1:3000/addData", obj).then((msg) => {
                context.commit({
                    type:'initData',
                    page:1
                })
            })
        }
    },

})

//store.commit('initData')
