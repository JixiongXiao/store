//最快方法
let arr = [1,2,3,5,6,1,2,7,3,2,1,1];
function unique(old_arr){
    return Array.from(new Set(old_arr));
}
let newArr1 = unique(arr);
Array.prototype.unique = function unique(){
    return Array.from(new Set(this));
}

//自己写的方法
function new_arr(old_arr){
    let newArr = [];
    old_arr.forEach( item=>{
        if(!newArr.includes(item)){
            newArr.push(item);
        } 
    } );
    return newArr;
}