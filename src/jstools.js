/**
 * _tools.js v0.0.1
 * @js底层工具库
 * @yaojia yaojaa@vip.qq.com
 */

(function() {


    var root = this

    var _ = function(obj) {
        if (obj instanceof _) return obj
        if (!(this instanceof _)) return new _(obj)
    }

    _.VERSION = '0.0.1'

    var class2type = {}


    /**
     * 抛出错误
     * @param {String} 错误信息
     */
    _.error = function(msg) {
            throw new Error(msg)
        },

        /**
         * 类型判断
         * @param {} 任意类型的参数
         * @returns {} Boolean Number String Function Array Date RegExp Object Error
         */
        _.type = function(obj) {
            if (obj == null) {
                return obj + ""
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" : // {}.prototype.toSting()
                typeof obj

        }
        /**
         * 迭代器
         * @param {} 
         * @returns {} 
         */
    _.each = function(obj, callback) {
        var length, i = 0

        if (isArrayLike(obj)) {
            length = obj.length
            for (i < length i++) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break
                }
            }
        } else {
            for (i in obj) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break
                }
            }
        }

        return obj
    }





    /**
     * 字符串转JSON
     * @param {} 
     * @returns {} 
     */

    _.parseJSON = function(str) {
        //如果是 object类型 解析会报错，所以直接返回 
        if (_.type(str) === "function") {
            _.error('parseJSON的参数不能是function类型')
        }
        if (_.type(str) === "object") {
            return str
        }


        // Support: Android 2.3
        if (window.JSON && window.JSON.parse) {
            return JSON.parse(str + "")
        }
    }

    // 生成class2type map 替换[object typename]为name 

    _.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    })








    /**
     * 是否为数组或类数组
     * @param {} 
     * @returns { } 
     */

    function isArrayLike(obj) {

        var length = !!obj && "length" in obj && obj.length,
            type = _.type(obj)

        if (type === "function" || isWindow(obj)) {
            return false
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj
    }





    /**
     * 是否为window对象
     * @param {} 
     * @returns {} 
     */

    function isWindow(obj) {
        /* jshint eqeqeq: false */
        return obj != null && obj == obj.window
    }



    /**
     * 合并数组
     * @param {Array} 
     * @returns { Array} 
     */

    _.merge = function(first, secend) {
        var i = 0
        var l = first.length

        while (secend[i] !== 'undefined') {
            first[l++] = secend[i++]

        }

        first.length = l
        return first
    }






    //返回_对象
    root._ = _


}.call(this))
