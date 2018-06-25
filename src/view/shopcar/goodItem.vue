<template>
    <dl>
        <dt><img :src="item.imageurl" alt=""></dt>
        <dd>
            <h4>{{item.wname}}</h4>
            <div class="box">
                <b>￥{{item.jdPrice}}</b>
                <p>
                    <span @click="muise(item)">-</span>
                    <span>{{item.similarEnter}}</span>
                    <span @click="add(item)">+</span>
                </p>
            </div>
        </dd>
        <i :class="flag?'iconfont icon-checked':'iconfont icon-check'" @click="checked(item,$event)"></i>
    </dl>
</template>
<script>
import bus from '@/utits/bus'
export default {
    
    data(){
        return{
            flag:false
        }
    },
    props:['item'],
    watch:{
        flag(n,o){
            bus.$emit('update',{
                name:this.item.wname,
                price: n?this.item.jdPrice*this.item.similarEnter:0,
                off:n?n:false 
            })
        },
        item(n,o){
           
            // bus.$emit('update',{
            //     name:this.item.wname,
            //     price: this.flag?this.item.jdPrice*this.item.similarEnter:0,
            //     // off:n?n:false 
            // })
        }
    },
    mounted(){
        bus.$on('check',(res)=>{
                this.flag = res
            })
    },
    methods:{
        add(item){
            this.$store.dispatch('feachAdd',item)
             bus.$emit('update',{
                name:item.wname,
                price: this.flag?item.jdPrice*item.similarEnter:0  
            })
        },
        muise(item){
            this.$store.dispatch('feachmuise',item)
            bus.$emit('update',{
                name:item.wname,
                price: this.flag?item.jdPrice*item.similarEnter:0  
            })
        },
        checked(item,e){
            this.flag = !this.flag
            //console.log(e.target.getAttribute("class"))
            // bus.$emit('update',{
            //     name:item.wname,
            //     price: this.flag?item.jdPrice*item.similarEnter:0,
            //     // tag:this.flag?e.target:null
            // })
        }
        
    }
}
</script>
<style lang="less" scoped>
dl{
    display: flex;
    padding-left: 70/75rem;
    position: relative;
    dt{
        width: 200/75rem;
        height: 200/75rem;
        flex-shrink: 0;
        img{
            width: 100%;
        }
    }
    dd{
        flex: 1;
        padding: 0 15/75rem;
        position: relative;
        .box{
            position:absolute;
            padding: 0 .2rem;
            bottom:0;
            left: 0;
            align-items: center;
            display:flex;
            justify-content: space-between;
            height: 70/75rem;
            width: 100%;
            p{
                height: 100%;
                span{
                    height:60/75rem;
                    line-height: 60/75rem;
                    display: inline-block;
                    padding:0 20/75rem;
                    border: 1px solid #ccc;
                }
            }
        }
    }
    i.iconfont{
        position: absolute;
        left: 20/75rem;
        top:50%;
        transform: translateY(-50%);
    }
}
</style>

