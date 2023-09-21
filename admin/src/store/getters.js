export default {
    key: state => state.user.key,
    token: state => state.user.token,
    roles: state => state.user.roles,
    userInfo: state => state.user.userInfo,
    categories: state => state.article.categories,
    tags: state => state.article.tags
}
