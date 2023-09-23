<script>
import wechatPic from '@/assets/images/wechat.png'
import qqPic from '@/assets/images/qq.png'
import ncmPic from '@/assets/images/ncm.png'
import mailPic from '@/assets/images/mail.png'

import { getRandomWords } from '@/apis/other'
import { mapGetters } from 'vuex'

export default {
    name: 'About',
    data() {
        return {
            sentence: '',
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
        ...mapGetters('site', ['getSiteInfo'])
    },
    created() {
        getRandomWords().then(({ data }) => {
            this.sentence = data.hitokoto
        }).catch(err => {
            this.$message.error(err.errMsg || err)
        })
    }
}
</script>

<template>
    <div class="about">
        <h2 class="about-title">{{ getSiteInfo?.name }}</h2>
        <div class="about-words">
            <p class="about-words--text">
                <fa-icon style="padding-right: 6px;" icon="fas fa-quote-left" />
                <span v-typed="[sentence]"></span>
                <fa-icon style="padding-left: 6px;" icon="fas fa-quote-right" />
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
    user-select: none;
    position: relative;
    top: 50%;
    max-width: 800px;
    margin: auto;
    transform: translateY(-50%);
}

.about-title {
    font-size: 40px;
    text-align: center;
}

.about-words {
    max-width: 63%;
    margin: 32px auto 40px;
    text-align: center;
    font-size: $fz-medium-x;
    font-weight: 700;
}

.about-words--text {
    display: inline-block;
    line-height: 1.5;
    padding: 16px 20px;
    border-radius: 12px;
    background-color: rgba($color: $bg-theme, $alpha: .7);
}

.about-words--text > span {
    padding: 0 2px;
    font-size: $fz-large;
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
