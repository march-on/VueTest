import axios from 'axios'
export default{
    state: {
        nowpage: 1,
        maxpage:0,
        pagecell:12,

        numArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        //通过数据库使用actions发送ajax,提交mutation，来改变数据
        getData: [],
       
    },
    mutations: {
        changeCount(state) {
            state.nowpage++
        },
        people(state, obj) {
            state.getData = obj.data
            state.maxpage=obj.pages

        },
        // maxpage(state,obj){
            
        //     state.maxpage=obj.pages
        //     console.log(state.maxpage)
        // }

    },
    getters: {
        doubleNum(state) {
            return state.numArr.filter(item => item % 2 == 0)

        }

    },
    actions: {
        dataGet(context) {
         
            axios.get('http://127.0.0.1:3000/getData',
                { params: { nowpage: this.state.student.nowpage, pagecell: 7} }).then(function (msg) {
                    console.log(msg.data.rows)
                    console.log(msg.data.maxpage)
                    context.commit({
                        type: 'people',
                        data: msg.data.rows,
                        pages:msg.data.maxpage
                       
                    });
                    // context.commit({
                    //     type: 'maxpage',
                    //     pages:msg.data.maxpage
                    // })
                })

        }
        
    }
    

}