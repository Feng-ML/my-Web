<template>
    <div id="login">

        <div class="loginForm">
            <h1>登录</h1>

            <el-form 
                :model="loginForm" 
                status-icon 
                :rules="rules" 
                ref="loginForm" 
                label-width="80px" 
            >
                
                <!-- 邮箱 -->
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginForm.email"></el-input>
                </el-form-item>


                <!-- 密码 -->
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>


            </el-form>


            <!-- 首页跳转 -->
            <i class="el-icon-s-home" @click="toHome()"></i>

            <div class="toRegister">

                <span>未有账号？</span>    
                <router-link to="/register">注册</router-link>

            </div>
        
        
        </div>
                

    </div>
</template>


<script type="text/javascript">
export default {
    data(){
        
        return {

            // 表单数据
            loginForm: {
                email: '',
                pass: '',
            },

            // 填写规则
            rules: {
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods:{
        
        //提交数据
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                     this.$axios
                        .post('/api/users/login',this.loginForm)
                        .then( res =>{
                              
                            this.$message({
                                message: '登录成功！！',
                                type: 'success' 
                            })
                            // console.log(res)
                            localStorage.setItem("username", res.data.name)
                            localStorage.setItem("useremail", res.data.email)
                            localStorage.setItem("userAvatar", res.data.avatar)
                            
                            this.$router.push('/') 
                            location.reload()

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


#login{
    height: 100%;
    background: url('../assets/picture/user1.jpg') no-repeat;
    background-size:cover;

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


.loginForm{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    width: 300px;
    height: 180px;
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

    .toRegister{
        float: right;
    }
}

</style>