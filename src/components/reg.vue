<template>
    <div class="reg">
        <p class="p">手机注册</p>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="iphone">
                <el-input type="text" class="regInput" name='iphone' v-model="ruleForm2.iphone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="短信验证" prop="msg">
                <el-input type="text" class="msg" auto-complete="off"></el-input>
                <el-button type="primary" @click='checkMsg'>获取验证码</el-button>
                <span id="span">{{ ruleForm2.msg}}</span>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" class="regInput" name='pwd' v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" class="regInput" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input class="regInput" v-model.number="ruleForm2.age"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import ElementUI from 'element-ui'
    import Vue from 'vue'
    import 'element-ui/lib/theme-chalk/index.css'
    import axios from 'axios'
    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validateIphone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    if (!(/^1\d{10}/.test(this.ruleForm2.iphone))) {   //   this.ruleForm2.iphone !== ''
                        //this.$refs.ruleForm2.validateField('iphone');
                        callback(new Error('手机号格式不正确!'));
                    }
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    age: '',
                    iphone: '',
                    msg: ''
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    age: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    iphone: [
                        { validator: validateIphone, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {       
                        axios.post("http://127.0.0.1:3000/addUsers", { pwd:this.ruleForm2.pass, acc: this.ruleForm2.iphone }).then((msg) => {
                           alert('submit!');
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            checkMsg() {
                this.ruleForm2.msg = '';
                for (let i = 0; i < 4; i++) {
                    this.ruleForm2.msg += Math.floor(Math.random() * 9 + 1)   //Math.random()*100
                }
                console.log(this.ruleForm2.msg);

            }
        }

    }

</script>

<style>
    .msg {
        width: 200px;
    }
     .regInput {
        width: 600px;
    }
    .p{
        text-align: center;
        color: #5AADB8;
        width:700px;
        font-size: 35px;
    }
</style>