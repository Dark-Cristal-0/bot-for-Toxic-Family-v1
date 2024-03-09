const fs = require("fs")
const path = require("path")

const TgBot = require("node-telegram-bot-api")

const fetchData = require("./util/fetch.js")
const admin = require("./admin/index.js")

const getData = function(dir1 = undefined,dir2 = undefined,dir3 = undefined ,file = "info.json"){
  let _path = path.join(__dirname,"DB")
    
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
  const jsonData = fs.readFileSync(_path,{encoding:"utf-8"})
  const data = JSON.parse(jsonData)
  return data
}


class Bot extends TgBot{
constructor(TgToken,BsToken,option){

super(TgToken,option);

this.brawlStars = {
  fetch:{
    clubs(teg=undefined){
      fetchData(BsToken,"clubs",teg,undefined)
    },
    allClubs(){
      const fullList = admin.clanList.getData()
      for(let el of fullList){
        this.clubs(el.teg)
      }
    },
    /**
    @param param1 {string}  players , clubs , events , brawlers , rangings ,
    @param param2 {string} тег якщо потрібно
    @param param3 {string} players=>battlelog |  rangings=>clubs , players, powerplay/seasons, powerplay/seasons/{seasonId} ,brawlers/{brawlerId}

    @returns {none}
    */
    data(param1,param2=undefined,param3=undefined){
      fetchData(this.brawlStarsToken,param1,param2,param3)
    }
  },
  get:{
    getData,
    allClubs(){
      const list = admin.clanList.getData()
      const clubs ={

      }
      for(let el of list){
        clubs[el.teg] = getData("clubs",el.teg,undefined)
        clubs[el.teg].name = el.name
        clubs[el.teg].tgHead ={
          userName:el.userNameTgHead,
          url:el.linkTgHead
        }
      }
      return clubs
    }
  }
}
this.brawlStarsToken=BsToken
}
/**
@param param1 {string}  players , clubs , events , brawlers , rangings ,
@param param2 {string} тег якщо потрібно
@param param3 {string} players=>battlelog |  rangings=>clubs , players, powerplay/seasons, powerplay/seasons/{seasonId} ,brawlers/{brawlerId}

@returns {none}
*/
}
function getConfig(){
      const tokens= JSON.parse(fs.readFileSync("./Config/tokens.json",{encoding:"utf-8"}))
      const option = JSON.parse(fs.readFileSync("./Config/botOption.json",{encoding:"utf-8"}))

   return {tokens,option}
}
const _config= getConfig()
const bot = new Bot(_config.tokens.TgToken,_config.tokens.BsToken,_config.option)
module.exports = bot