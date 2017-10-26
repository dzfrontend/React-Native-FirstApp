export default class ArrayUtils{
	/**
     * 作用：更新数组,若item已存在则将其从数组中删除,若不存在则将其添加到数组
	 * 使用：ArrayUtils.updateArray(array,item)
     * **/
    static updateArray(array,item){
        for (var i = 0, len = array.length; i < len; i++) {
            var temp = array[i];
            if (item=== temp) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }
    /**
     * 克隆一个数组
     * 使用：ArrayUtils.clone(array)
     * @param 参数为array，array为要被克隆的数组
     * @returns {Array} 返回一个新的数组
     **/
    static clone(array){
        if(!array) return []
        let newArray = []
        for(var i=0,len=array.length;i<len;i++){
            newArray[i] = array[i]
        }
        return newArray
    }
}