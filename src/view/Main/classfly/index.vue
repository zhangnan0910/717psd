<template>
    <div class="classfly">
        <Header>
            <i>&nbsp;&nbsp;</i>
            <Seartch/>
            <i class="iconfont  icon-xiaoxi"></i>
        </Header>
        <div class="main_box">
            
            <ul ref="ul">
               <li v-for='item in list' @click="getData(item.id,$event)" :key="item.id" >{{item.text}}</li>
            </ul>
           
            <div class="content">
                <div class="classfly_box" v-for="item in listItem">
                    <h1>{{item.goodsTypeName}}</h1>
                    <div class="classfly_right" >
                        <dl v-for="res in item.goodsTypeList">
                            <dt><img :src="res.goodsTypeImgUrl" alt=""></dt>
                            <dd>{{res.goodsTypeName}}</dd>
                        </dl>
                        
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
// 头部组件
import Header from '../../../components/Header'

// 搜索组件
import Seartch from "@/components/inputSearch";

export default {
    data() {
        return {
            list: [],
            listItem:[],
            activated:false
        };
    },
    
    mounted(){
        fetch('/server/data.json').then(res=>res.json()).then(res=>{
             this.list = res.classfly_list
        })
    },
    methods:{
        getData(cid,e){
            if(this.$refs.ul.children){
                let lis = this.$refs.ul.children
                for(let i=0;i<lis.length;i++){
                    lis[i].classList.remove('active')
                }
            }
            if(e.target){
                e.target.classList.add('active')
            }
            // console.log(this.$refs.children)
            fetch(`https://m.gome.com.cn/index.php?ctl=goods_class&act=ajaxGetClassList&cid=${cid}`)
            .then(res=>res.json())
            .then(res=>{
                this.listItem = res.secondLevelCategories
            }) 
        }
    },
    components: {
        Header,
        Seartch
    }
};
</script>
<style lang="less" scoped>
.classfly {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.main_box {
  display: flex;
  flex: 1;

  ul {
    overflow-y: scroll;
    width: 220/75rem;
    background: #eee;
    flex-shrink: 0;
    li {
      height: 98/75rem;
      text-align: center;
      line-height: 98/75rem;
    }
    li.active{
        background: #fff;
        border-left: 2px solid #d81111;
    }
  }
  .content {
    padding: 20/75rem;
    flex: 1;
    overflow-y: auto;
    .classfly_box {
      width: 100%;
      h1 {
        padding: 20/75rem 0;
      }
      .classfly_right {
        display: flex;
        flex-wrap: wrap;
        dl {
          width: 32%;
          margin-right: 2%;
          background: #eee;
          text-align: center;
          margin-top: 15/75rem;
          dt {
            img {
              width: 80%;
            }
          }
        }
        dl:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>



