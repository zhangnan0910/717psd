<template>
    <ul>
        <li>
            <router-link to="">
                <i class="iconfont icon-zhanghuyue"></i>
                <div>
                    <span>账户余额</span>
                    <i class="iconfont icon-right"></i>
                </div>
            </router-link>
        </li>
        <li>
            <router-link to="">
                <i class="iconfont icon-dangdi"></i>
                <div>
                    <span>账户余额</span>
                    <i class="iconfont icon-right"></i>
                </div>
            </router-link>
            
        </li>
        <li>
            <router-link to="">
                <i class="iconfont icon-tubiao-"></i>
                <div>
                    <span>账户余额</span>
                    <i class="iconfont icon-right"></i>
                </div>
            </router-link>
        </li>
    </ul>
</template>
<style lang="less" scoped>

    ul{
        li{
            height: 100/75rem;
            border-bottom: 1px solid #ccc;
            padding: 0 15/75rem;
            a{
                display: flex;
                height: 100%;
                align-items: center;
                div{
                    height: 100%;
                    padding-left: 18/75rem;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
