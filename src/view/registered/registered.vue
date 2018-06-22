<template >
    <div class="main">
        <Header>
            <span>&lt;</span>
            <span>注册717</span>
            <span @click="gotoRegistered">登录</span>
        </Header>
        <div class="box">
            <p><span>账号：</span><input type="tel" v-model="username" placeholder="请输入您手机号"></p>
            <p><span>密码：</span><input type="password" v-model='password' placeholder="请输入您密码"></p>
            <p><span>密码：</span><input type="password" v-model='rpassword' placeholder="请输入您密码"></p>
            <div>
                <button  @click="submit">立即注册</button>
                <span ref='span'>{{msg}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/Header'
export default {
    data(){
        return{
            msg:'请登录',
            rpassword:'',
            username:'',
            password:''
        }
    },
    components:{
        Header
    },
    methods:{
        gotoRegistered(){
            this.$router.push({
                name:'login'
            })
        },
        // 提交
        submit(){
            let phone = /^1[3578]\d{9}$/
            // 匹配任意字符
            let pwd = /[^]{6,}/
            if(!phone.test(this.username)){
                alert('请输入正确格式手机号码')
                return
            }
            if(!pwd.test(this.password)){
                alert('请输入正确格式密码')
                return
            }
            if(this.password !==this.rpassword){
                alert('密码不一致，请重新输入')
                return
            }
            this.$http.post('/api/user/registered',{
                username:this.username,
                password:this.password
            }).then(res=>{
                if(res.code==0){
                    this.msg=res.msg
                }else{
                    this.$router.push({
                        name:'login'
                    }) 
                }
            })
        }
    }
}
</script>
<style src='@/common/css/login.css' scoped>

</style> 

