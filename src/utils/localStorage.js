/**
 * Created by Administrator on 2017/6/19 0019.
 */
export const LocalStore = {
    getItem: function (key) {
        let value;
        try {
            value = localStorage.getItem(key)
        } catch (ex) {
            // 开发环境下提示error
            console.error('localStorage.getItem报错, ', ex.message)
        } finally {
            return value;
        }
    },
    setItem: function (key, value) {
        try {
            // ios safari 无痕模式下，直接使用 localStorage.setItem 会报错
            localStorage.setItem(key, value)
        } catch (ex) {
            // 开发环境下提示 error
            console.error('localStorage.setItem报错, ', ex.message)
        }
    }
};