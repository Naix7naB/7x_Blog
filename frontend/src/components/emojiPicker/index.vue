<script>
import VueEmojiPicker from 'vue-emoji-picker'

export default {
    name: 'EmojiPicker',
    components: { VueEmojiPicker },
    methods: {
        insert2text(emoji) {
            this.$emit('insert', emoji)
        }
    }
}
</script>

<template>
    <vue-emoji-picker class="emoji-wrapper" @emoji="insert2text">
        <div class="emoji-invoker" slot="emoji-invoker" slot-scope="{ events: { click: open } }">
            <fa-icon @click.stop="open" icon="far fa-face-laugh" />
        </div>
        <ul class="emoji-picker" slot="emoji-picker" slot-scope="{ emojis, insert }">
            <li v-for="(emojiGroup, category) in emojis" :key="category">
                <p class="emoji-category">{{category}}</p>
                <div class="emoji-content">
                    <span
                        v-for="(emoji, emojiName) in emojiGroup"
                        :key="emojiName"
                        :title="emojiName"
                        @click="insert(emoji)"
                    >
                        {{ emoji }}
                    </span>
                </div>
            </li>
        </ul>
    </vue-emoji-picker>
</template>

<style lang="scss" scoped>
/* emoji表情容器样式 */
.emoji-wrapper {
    user-select: none;
    position: relative;
}

.emoji-invoker {
    transition: transform .2s;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }
}

.emoji-picker {
    overflow: hidden scroll;
    z-index: 100;
    position: absolute;
    top: 140%;
    left: 140%;
    width: 240px;
    height: 320px;
    padding: 12px 0 12px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: #fff;
    box-shadow: 1px 1px 8px #c7dbe6;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 6px;
        background-color: #c1c1c1;
    }

    &::-webkit-scrollbar-track {
        border-radius: 6px;
        background-color: #f1f1f1;
    }

    &::-webkit-scrollbar-corner {
        background-color: transparent;
    }
}

.emoji-picker li ~ li {
    margin-top: 12px;
}

.emoji-category {
    margin-bottom: 6px;
    font-size: $fz-large;
    color: #aaaaaa;
}

.emoji-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, 32px);
    grid-auto-rows: 30px;
    justify-items: center;
    align-items: center;
}

.emoji-content span {
    padding: 6px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #ececec;
    }
}
</style>
