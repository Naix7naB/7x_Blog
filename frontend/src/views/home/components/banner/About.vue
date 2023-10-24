<script>
import wechatPic from '@/assets/images/wechat.png'
import qqPic from '@/assets/images/qq.png'
import ncmPic from '@/assets/images/ncm.png'
import mailPic from '@/assets/images/mail.png'

import { getRandomWords } from '@/apis/other'

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
        siteInfo() {
            return this.$store.getters.siteInfo
        }
    },
    methods: {
        randomWords() {
            getRandomWords().then(({ data }) => {
                this.sentence = data.hitokoto
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        }
    },
    created() {
        this.randomWords()
    }
}
</script>

<template>
    <div>
        <h2 class="about-title">{{ siteInfo?.name }}</h2>
        <div class="about-words">
            <span class="about-words--text" @click="randomWords">
                <fa-icon style="padding-right: 6px;" icon="fas fa-quote-left" />
                <span v-typed="[sentence]"></span>
                <fa-icon style="padding-left: 6px;" icon="fas fa-quote-right" />
            </span>
        </div>
        <ul class="about-social">
            <li class="about-social--item" v-for="item in socialList" :key="item.title">
                <el-image
                    class="about-social--pic"
                    fit="cover"
                    :alt="item.title"
                    :title="item.title"
                    :src="item.imageUrl"
                    :lazy="true"
                />
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
/* 网站相关信息样式 */
.about-title {
    text-align: center;
    font-size: $fz-3x;
}

.about-words {
    margin: 32px auto 40px;
    text-align: center;
}

.about-words--text {
    display: inline-block;
    padding: 12px 20px;
    line-height: $lh-xm;
    font-size: $fz-xm;
    font-weight: 700;
    border-radius: 10px;
    background-color: rgba($color: $cl-dark-3, $alpha: .5);
    cursor: pointer;
}

.about-words--text > span {
    padding: 0 2px;
    font-size: $fz-lg;
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
    background-color: rgba($color: $cl-light-1, $alpha: .5);
}
</style>
