<script>
import Typical from './Typical'
import avatarPic from '@/assets/images/avatar-default.png'
import wechatPic from '@/assets/images/wechat.png'
import qqPic from '@/assets/images/qq.png'
import ncmPic from '@/assets/images/ncm.png'
import mailPic from '@/assets/images/mail.png'

export default {
    components: { Typical },
    data() {
        return {
            siteName: '#7x\'s blog',
            defaultAvatar: avatarPic,
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
    }
}
</script>

<template>
    <div class="intro-info--card g-relative">
        <div class="intro-info--avatar">
            <el-image class="info-avatar--pic" alt="avatar" fit="cover" :src="defaultAvatar" />
        </div>
        <div class="intro-info--desc">
            <span class="info-desc--name">{{siteName}}</span>
            <p class="info-desc--content">
                <fa-icon style="padding-right: 6px;" icon="fas fa-quote-left" size="lg" />
                <Typical :text="['秦时明月汉时关，万里长征人未还。']" />
                <fa-icon style="padding-left: 6px;" icon="fas fa-quote-right" size="lg" />
            </p>
        </div>
        <ul class="intro-info--social">
            <li class="info-social--item" v-for="item in socialList" :key="item.title">
                <el-image
                    class="info-social--pic"
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
/* 介绍页信息卡片样式 */
.intro-info--card {
    top: 50%;
    max-width: 800px;
    margin: auto;
    transform: translateY(-50%);
}

.intro-info--avatar {
    text-align: center;
}

.info-avatar--pic {
    width: 130px;
    height: 130px;
    border: 6px solid $bg-gray-ll;
    border-radius: 50%;
    box-shadow: 0 0 20px $bg-theme;
    transition: transform .8s ease;
    cursor: pointer;

    &:hover {
        transform: rotate(360deg);
    }
}

.intro-info--desc {
    width: 63%;
    margin: 32px auto 40px;
    padding: 28px 20px;
    text-align: center;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    background-color: $bg-theme-ll;
}

.info-desc--name {
    font-size: 30px;
    font-weight: 700;
}

.info-desc--content {
    padding-top: 20px;
    font-size: $fz-medium;
}

.intro-info--social {
    display: flex;
    justify-content: center;
    align-items: center;
}

.info-social--item {
    margin: 0 10px;
    cursor: pointer;
}

.info-social--pic {
    width: 50px;
    height: 50px;
    padding: 10px;
    border-radius: 15px;
    background-color: $bg-reverse-l;
}
</style>
