const followActGetConf = require('../config/followAct.get.config')
const followActPostConf = require('../config/followAct.post.config')
const followActPutConf = require('../config/followAct.put.config')
const followActDeleteConf = require('../config/followAct.delete.config')

module.exports = class FollowAction {
    static get GET() {
        return followActGetConf
    }
    static get POST() {
        return followActPostConf
    }
    static get PUT() {
        return followActPutConf
    }
    static get DELETE() {
        return followActDeleteConf
    }

    static getAction(method, modelName) {
        return FollowAction[method][modelName] || null
    }
}
