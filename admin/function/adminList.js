const fs = require("fs")
const path = require("path")

const adminList = {
  path:path.join(__dirname,"../","data","adminList.json"),
  getData:function(){
    fs.readFileSync(this.path,{encoding:"utf-8"})
  }

} 