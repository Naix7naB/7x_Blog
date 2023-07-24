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
                <fa-icon icon="fas fa-quote-left" size="lg" :style="{ paddingRight: '4px' }" />
                <Typical :text="['秦时明月汉时关，万里长征人未还。']" />
                <fa-icon icon="fas fa-quote-right" size="lg" :style="{ paddingLeft: '4px' }" />
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
.intro-info--card {
    top: 50%;
    max-width: 800PX;
    margin: auto;
    transform: translateY(-50%);
}

.intro-info--avatar {
    text-align: center;
}

.info-avatar--pic {
    @include pointer();
    width: 130PX;
    height: 130PX;
    border: 6PX solid $bg-gray-ll;
    border-radius: 50%;
    box-shadow: 0 0 20PX $bg-theme;
    transition: transform .8s ease;

    &:hover {
        transform: rotate(360deg);
    }
}

.intro-info--desc {
    width: 63%;
    margin: 32PX auto 40PX;
    padding: 28PX 20PX;
    text-align: center;
    border-radius: 12PX;
    backdrop-filter: blur(10PX);
    background-color: $bg-theme-ll;
}

.info-desc--name {
    font-size: 30PX;
}

.info-desc--content {
    padding-top: 20PX;
    font-size: $fz-medium;
}

.intro-info--social {
    display: flex;
    justify-content: center;
    align-items: center;
}

.info-social--item {
    @include pointer();
    margin: 0 10PX;
}

.info-social--pic {
    width: 50PX;
    height: 50PX;
    padding: 10PX;
    border-radius: 15PX;
    background-color: $bg-reverse-l;
}
</style>
