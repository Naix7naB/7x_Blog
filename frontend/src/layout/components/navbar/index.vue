<script>
import Logo from './Logo'
import Menu from './Menu'
import SearchBar from './SearchBar'

export default {
    components: { Logo, Menu, SearchBar },
    data() {
        SearchBar
        return {
            activeIndex: 'Home',
            navigations: [
                {
                    name: 'Home',
                    title: '主页',
                    icon: 'home'
                },
                {
                    name: 'Comment',
                    title: '留言板',
                    icon: 'comments'
                },
                {
                    name: 'Article',
                    title: '文章',
                    icon: 'book'
                },
                {
                    name: 'Essay',
                    title: '随笔',
                    icon: 'pen-to-square'
                },
                {
                    name: 'Photos',
                    title: '相册',
                    icon: 'image'
                }
            ]
        }
    }
}
</script>

<template>
    <el-row type="flex" align="middle" style="height: 80px; padding: 1% 5%;">
        <el-col :span="6">
            <Logo />
        </el-col>
        <el-col :span="16">
            <div class="navbar-container">
                <SearchBar />
                <Menu :list="navigations" />
            </div>
        </el-col>
        <el-col :span="2">Avatar</el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.navbar-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
