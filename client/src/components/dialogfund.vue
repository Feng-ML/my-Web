<template>
    <div>
        

        <!-- 表单标题 -->
        <el-dialog :title="dialog.title" :visible.sync="dialog.show">

        <!-- 表单数据 -->
        <el-form 
            :model="formData" 
            :rules="rules"
            ref='formData'
        >
            <el-form-item label="日期" :label-width="formLabelWidth" prop='date'>
                <el-date-picker
                    v-model="formData.date"
                    type="date"
                    placeholder="选择日期"
                    >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth"  prop='type'>
                <el-select v-model="formData.type" placeholder="请选择收支类型">
                    <el-option label="转账" value="转账"></el-option>
                    <el-option label="提现" value="提现"></el-option>
                    <el-option label="充值" value="充值"></el-option>
                    <el-option label="报销" value="报销"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="详情" :label-width="formLabelWidth" prop='details'>
                <el-input v-model="formData.details" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="收入" :label-width="formLabelWidth" prop='income'>
                <el-input v-model="formData.income" autocomplete="off" type='number'></el-input>
            </el-form-item>
            <el-form-item label="支出" :label-width="formLabelWidth" prop='spending'>
                <el-input v-model="formData.spending" autocomplete="off" type='number'></el-input>
            </el-form-item>
            <el-form-item label="余额" :label-width="formLabelWidth" prop='balance'>
                <span>{{formData.balance}}</span>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onsubmit('formData')">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>


<script type="text/javascript">
    import moment from 'moment'

    export default {
        name: 'dialogfund',
        props: {
            formData: Object,
            dialog: Object
        },
        data(){
            return {
                dialogTableVisible: false,
                
                rules:{
                    date: [
                        { required: true, message: '请选择日期', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择使用类型', trigger: 'blur' }
                    ],
                    details: [
                        { required: true, message: '请输入使用详情', trigger: 'blur' }
                    ],
                    income: [
                        { required: true, message: '请输入收入金额', trigger: 'blur' }
                    ],
                    spending: [
                        { required: true, message: '请输入支出金额', trigger: 'blur' }
                    ]
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            // 提交数据
            onsubmit (formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                                               
                        // 余额不足跳出错误
                        if(this.formData.spending - this.formData.income > this.formData.balance){
                            return this.$message({
                                    message: '资金不足！！',
                                    type: 'error' 
                                })
                        }

                        // 设置存入时间格式
                        this.formData.date = moment(this.formData.date).format('YYYY-MM-DD')

                        //判断是添加数据还是修改数据
                        const url = (this.dialog.option == 'edit')? `fund/edit/${this.formData.id}` : 'fund' 
                        this.$axios
                            .post(`/api/${url}`,this.formData)
                            .then( res =>{
                                this.$message({
                                    message: '提交成功！！',
                                    type: 'success' 
                                })
                                this.dialog.show = false
                                this.$emit('update')
                            })
                            .catch( err =>{
                                console.log(err)
                            })

                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>