const fs = require("fs")
const path = require("path")
/**
 * @param {String} teg  
 * @returns {String}
 */
const tokenProcessing=function(teg){
  if(teg.includes("#")){
    let _teg = teg
    _teg = teg.replace("#","%23")
    return _teg
  }else{
    return new Error("teg invalid")
  }
}
/**
 * @param {String} dir1 
 * @param {String} dir2
 * @param {String} dir3 
 * @param {String} data 
 * @param {String} file  
 */
const seveData = function(data,file = "info.json",dir1 = undefined,dir2 = undefined,dir3 = undefined){
  let _path = path.join(__dirname,"../","DB")
    
  if(!fs.existsSync("./DB")){
    fs.mkdirSync("./DB")
  }
  
  if(dir1!==undefined){
    if(!fs.existsSync(`./DB/${dir1}`)){
    fs.mkdirSync(`./DB/${dir1}`)
    }
    _path = path.join(_path,dir1)
  }
  if(dir1!==undefined&&dir2!==undefined){
    if(!fs.existsSync(`./DB/${dir1}/${dir2}`)){
      fs.mkdirSync(`./DB/${dir1}/${dir2}`)
      
    }
    _path = path.join(_path,dir2)
  }
  if(dir1!==undefined&&dir2!==undefined&&dir3!==undefined){
    if(!fs.existsSync(`./DB/${dir1}/${dir2}/${dir3}`)){
      fs.mkdirSync(`./DB/${dir1}/${dir2}/${dir3}`)
      
    }
    _path = path.join(_path,dir3)
  }
  _path = path.join(_path,file)
  fs.writeFileSync(_path,data,{encoding:"utf-8"})
  
}


/**
@param token {string} твій API токен
@param param1 {string}  players , clubs , events , brawlers , rangings ,
@param param2 {string} тег якщо потрібно
@param param3 {string} players=>battlelog |  rangings=>clubs , players, powerplay/seasons, powerplay/seasons/{seasonId} ,brawlers/{brawlerId}

@returns {none}
*/
async function getData(token,param1,param2=undefined,param3=undefined){
  let url = ""
  if(param1 == "clubs"&&param3==undefined){
      
    const _teg = tokenProcessing(param2)
    url = `https://api.brawlstars.com/v1/${param1}/${_teg}`
  }

  else if(param1 == "players"){
    const _teg = tokenProcessing(param2)
    if(param3 == "battlelog"){
      url = `https://api.brawlstars.com/v1/${param1}/${_teg}/${param3}`
    }else{
      url = `https://api.brawlstars.com/v1/${param1}/${_teg}`
    }
  }

  else if(param1 == "events" && param2 == "rotation" && param3 == undefined){
    
    url="https://api.brawlstars.com/v1/events/rotation"
  }

  else if(param1=="brawlers"){
    
    if(param2 !== undefined){
      url=`https://api.brawlstars.com/v1/brawlers/${param2}`
    }else{
      url="https://api.brawlstars.com/v1/brawlers"
    }
  }
  
  
  const response =await fetch(url,{method:"get",headers: {'accept': 'application/json','authorization': `Bearer ${token}`}})
  const data =await response.json()
  data.lastFetch = new Date().getTime()
  const jsonData = JSON.stringify(data,null,2)
  seveData(jsonData,"info.json",param1,param2,param3)
}

module.exports = getData





