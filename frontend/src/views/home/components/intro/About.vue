<script>
import Typical from './Typical'
import wechatPic from '@/assets/images/wechat.png'
import qqPic from '@/assets/images/qq.png'
import ncmPic from '@/assets/images/ncm.png'
import mailPic from '@/assets/images/mail.png'
import { mapGetters } from 'vuex'

export default {
    name: 'About',
    components: { Typical },
    data() {
        return {
            socialList: [
                {
                    title: 'Wechat',
                    imageUrl: wechatPic
                },
                {
                    title: 'QQ',
                    imageUrl: qqPic
                },
                {
                    title: 'NeteaseCloudMusic',
                    imageUrl: ncmPic
                },
                {
                    title: 'E-mail',
                    imageUrl: mailPic
                }
            ]
        }
    },
    computed: {
        ...mapGetters('website', ['getWebsiteInfo'])
    }
}
</script>

<template>
    <div class="about">
        <el-image
            class="about-avatar"
            alt="avatar"
            fit="cover"
            :src="getWebsiteInfo?.host.avatar"
        />
        <div class="about-info">
            <span class="about-info--name">{{ getWebsiteInfo?.name }}</span>
            <p class="about-info--slogan">
                <fa-icon style="padding-right: 6px;" icon="fas fa-quote-left" size="lg" />
                <Typical :text="[getWebsiteInfo.slogan]" />
                <fa-icon style="padding-left: 6px;" icon="fas fa-quote-right" size="lg" />
            </p>
        </div>
        <ul class="about-social">
            <li class="about-social--item" v-for="item in socialList" :key="item.title">
                <el-image
                    class="about-social--pic"
                    fit="cover"
                    :alt="item.title"
                    :title="item.title"
                    :src="item.imageUrl"
                />
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
/* 网站相关信息样式 */
.about {
    position: relative;
    top: 50%;
    max-width: 800px;
    margin: auto;
    transform: translateY(-50%);
}

.about-avatar {
    width: 130px;
    height: 130px;
    margin: auto;
    border: 6px solid $bg-gray-ll;
    border-radius: 50%;
    box-shadow: 0 0 20px $bg-theme;
    transition: transform .8s ease;
    cursor: pointer;

    &:hover {
        transform: rotate(360deg);
    }
}

.about-info {
    width: 63%;
    margin: 32px auto 40px;
    padding: 28px 20px;
    text-align: center;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    background-color: $bg-theme-ll;
}

.about-info--name {
    font-size: 30px;
    font-weight: 700;
}

.about-info--slogan {
    padding-top: 20px;
    font-size: $fz-medium;
}

.about-social {
    display: flex;
    justify-content: center;
    align-items: center;
}

.about-social--item {
    margin: 0 10px;
    cursor: pointer;
}

.about-social--pic {
    width: 50px;
    height: 50px;
    padding: 10px;
    border-radius: 15px;
    background-color: $bg-reverse-l;
}
</style>
