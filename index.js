const bot = require("./bot")
const renderMessage = require("./util/renderMessage")

bot.brawlStars.fetch.allClubs()


const clubObj ={
  clubs:[],
  arrPromise:[
    {comand:"",teg:"",dev:()=>{console.log("good create cmd")}}
  ],
  message:["",""],
  updateMessage:()=>{
    clubObj.message = []
    for(let el of clubObj.clubs){
      clubObj.message.push(renderMessage(el))
    }
  },
  updateClubs:()=>{
    clubObj.clubs=[]
    const _clubs = bot.brawlStars.get.allClubs()
    for(let el of Object.values(_clubs)){
      clubObj.clubs.push(el)
    }
  },
  updateArrPromise:()=>{
    for(let el of clubObj.arrPromise){
      el.dev()
    }
    clubObj.arrPromise =[]
    clubObj.updateClubs()
    const clubs = clubObj.clubs
    for(let _i in clubs){
      new Promise((resolve, reject)=>{
        try{
        let i = _i
        const textCmd = "/"+clubs[i].name.replace(" ","_").toLocaleLowerCase()
        const reg = new RegExp(textCmd)
        console.log(textCmd)
        const tag = clubs[i].tag
        clubObj.arrPromise.push({comand:textCmd,dev:reject,tag:clubs[i].tag})

        bot.onText(reg,(msg,match)=>{
          const obj= clubObj.clubs.filter(el=>el.tag === tag)[0]
          
          const message = renderMessage(obj)
          bot.sendMessage(msg.chat.id,message)
        })
        }catch(err){
          console.log(err)
        }
      })
      
    }
  }


}
clubObj.updateClubs()
clubObj.updateArrPromise()

let commands = [
  
]
for(let el of clubObj.arrPromise){
  commands.push(
    {command:el.comand,description:"print club info"}
  )
}
bot.setMyCommands(commands)

console.log(commands)


setInterval(()=>{
  bot.brawlStars.fetch.allClubs()
  clubObj.updateClubs()
  commands = []
  for(let el of clubObj.arrPromise){
    commands.push(
      {command:el.comand,description:"print club info"}
    )
  }
  
},1000*60*30)




bot.onText(/\/js ?(.*)/sg,(msg, match)=>{
  if(msg.from.id == 1121847657 || msg.from.id == 915193713){
    const [fullMsg,lastMsg,index,inpute,group] =match
    console.log(msg.from.id,"________________")
    const print=(text)=>{
      bot.sendMessage(msg.chat.id,text)
    }
    const updateFullClubs = ()=>{
      bot.brawlStars.fetch.allClubs()
      clubObj.updateClubs()
    }
    const printInfoClub =()=>{
      let temp =()=>{
        
        let message="";
        
        for(let el of clubObj.clubs){
          message+="name: "+el.name+"\n"+"trophies: "+el.trophies+"\n"+"players: "+el.members.length+"\n"+"head: "+ el.tgHead.userName+"\n\n"
        }
        
        return message;
        }
        print(temp())
    }

    let temp
    console.log(fullMsg)
    eval(lastMsg)
  }else{
    bot.sendMessage(msg.chat.id,`you not administraor\n your id: ${msg.from.id}`)
  }
})



