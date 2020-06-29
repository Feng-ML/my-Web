<template>
    <div id="register">

        <div class="registerForm">
            <h1>注册</h1>

            <el-form 
                :model="registerForm" 
                status-icon 
                :rules="rules" 
                ref="registerForm" 
                label-width="80px" 
            >
                
                <!-- 邮箱 -->
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerForm.email"></el-input>
                </el-form-item>

                <!-- 用户名 -->
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="registerForm.username" autocomplete="off"></el-input>
                </el-form-item>


                <!-- 密码 -->
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="registerForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                    <el-button @click="resetForm('registerForm')">重置</el-button>
                </el-form-item>



            </el-form>


            <!-- 首页跳转 -->
            <i class="el-icon-s-home" @click="toHome()"></i>

            <div class="toLogin">
                <span>已有账号？</span>
                <router-link to="/login">登录</router-link>
            </div>


        </div>

    </div>
</template>


<script type="text/javascript">
export default {
    data(){
        
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {

            // 表单数据
            registerForm: {
                email: '',
                username: '',
                pass: '',
                checkPass: '',
            },

            // 填写规则
            rules: {
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 30, message: '用户名必须3到30个字符之间', trigger: 'blur'}
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 30, message: '密码必须5到30个字符之间', trigger: 'blur'}
                ],
                checkPass: [
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ]
            }
        };
    },
    methods:{

        //提交数据
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log(this.registerForm)
                    this.$axios
                        .post('/api/users/register',this.registerForm)
                        .then( res =>{
                            this.$message({
                                message: '注册成功！！',
                                type: 'success' 
                            })
                            this.$router.push('/login') 
                        })
                        .catch( err =>{
                            console.log(err)
                        })

                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },

        // 重置数据
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        //首页跳转
        toHome(){
            this.$router.push("/home")
        }
    }
    
}


</script>


<style lang="less">

html,body{
    height: 100%;
    
}

#register{
    height: 100%;
    background: url('../assets/picture/user1.jpg') no-repeat;
    background-size:cover;
}

.registerForm{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    width: 300px;
    height: 300px;
    background-color: rgba(224, 221, 224, 0.6) ;
    margin: auto;
    padding: 40px 70px 40px 40px;

    //标题
    h1{
        position: absolute;
        left: 0;
        right: 0;
        top: -40px;
        margin: auto;
        z-index: 99;
    }


    .toLogin{
        float: right;
    }

    //首页按钮
    .el-icon-s-home{
        position: relative;
        top: -5px;
        font-size: 30px;
        float: left;
    }
    .el-icon-s-home:hover{
        cursor: pointer;
        color: rgb(252, 174, 73);
    }
}

</style>