import { isEmpty } from 'lodash-es'

export default {
    isLoading: state => state.setting.isLoading,
    theme: state => state.setting.theme,
    emojiJson: state => state.setting.emojiJson,
    scrollTop: state => state.scroll.y,
    scrollRatio: state => Math.min(state.scroll.y / state.scroll.maxTransY, 1),
    navbarVisibility: state => state.scroll.y > state.scroll.maxTransY && state.scroll.delta > 0,
    key: state => state.user.key,
    token: state => state.user.token,
    uid: state => state.user.uid,
    rid: state => state.user.rid,
    isLogin: state => (isEmpty(state.user.token) ? false : true),
    userInfo: state => state.user.userInfo,
    siteInfo: state => state.site.siteInfo,
    articleInfo: state => state.article.articleInfo,
    replyId: state => state.comment.replyId
}
