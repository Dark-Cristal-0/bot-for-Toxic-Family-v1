const fs = require("fs")
const path = require("path")
const clanList = {
  path: path.join(__dirname,"../","../","DB","botData","clanList.json"),
  getData: function(){
    const path = this.path
    return JSON.parse(fs.readFileSync(path,{encoding:"utf-8"}))
  },
  addData: function(obj){
    if("name" in obj&&"teg" in obj&&"linkTgHead" in obj&&"userNameTgHead" in obj){
      const data= this.getData()
        if(data.findIndex(item=>item.teg===obj.teg)===-1){
          data.push(obj)
           fs.writeFileSync(this.path,JSON.stringify(data,null,2))
      return data
        }else{
          return "Error this teg is already in the list"
        }
    }else{
      return "Error invalid obj"
    }
  },
  removeData: function(teg){
    const data= this.getData()
    const remIndex= data.findIndex(item=>item.teg===teg)
    if(remIndex!==-1){
    data.splice(remIndex,1)
    fs.writeFileSync(this.path,JSON.stringify(data,null,2))
      return data
    }else{
      return "Error element not found"
    }
  }
}
module.exports = clanList









