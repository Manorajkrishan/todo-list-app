const apiREQUEST= async(url ='',optionObj=null,errMsg=null)=>{
    try{
        const response=await fetch(url,optionObj)
        //optionobj eka api use karnne awith api denawa mokkda karanna onee wade kiyala [GET,POST.PUSH,DELETE,UPADTE]wage
        if(!response.ok)throw Error("Please reload the app ")

    }catch(err){
        errMsg= err.Message

    }finally{
        return errMsg

    }


}
export default apiREQUEST