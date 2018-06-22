<template>
    <div class="main">
        <Header>
            <span @click='goto'>&lt;</span>
            <span>登录717</span>
            <span @click="gotoRegistered">注册</span>
        </Header>
        <div class="box">
            <p><span>账号：</span><input type="tel" v-model="username"  placeholder="请输入您手机号"></p>
            <p><span>密码：</span><input type="password" v-model="password"  placeholder="请输入您密码"></p>
            <div>
                <button @click="submit">立即登录</button>
                <span>{{msg}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/Header'
import {setCookie}  from '@/utits/cookies'
export default {
    components:{
        Header
    },
    data(){
        return{
            msg:'请登录',
            username:'',
            password:''
        }
    },
    methods:{
        // 点击注册，跳转注册页
        gotoRegistered(){
            this.$router.push({
                name:'registered'
            })
        },
        goto(){
            this.$router.history.go(-1)
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
            this.$http.post('/api/user/login',{
                username:this.username,
                password:this.password
            }).then(res=>{
              
                if(res.code===1){
                    setCookie('token',res.token)
                    // document.cookie = `token=${res.token}`
                    this.$router.push({
                        name:this.$router.history.current.query.from
                    })
                }else if(res.code===2){
                    this.msg = '未注册，请点击右上角注册'
                    
                }else{
                    alert(res.msg)
                }
            })
        }
    }
}
</script>
<style src='@/common/css/login.css' scoped>
    
</style> 

