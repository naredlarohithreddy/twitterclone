$(document).ready(()=>{
    $.get("/api/chat",(results)=>{
        console.log(results);
        createchathtml(results);
    })
})

function createchathtml(results){
    var element=$(".supplynew");
    element.html("");
    results.forEach(result=>{
        var html=createchattab(result);
        var selectedtab=$(html)
        selectedtab.click(()=>{
            window.location.href=`/chats/${result._id}`;
        })
        element.append(selectedtab);
    })
    if(results.length==0){
        element.html("<span>NO RESULTS FOUND</span>")
    }
}

function createchattab(result){
    
    var chatname=result.chatname;
    var latestmessage="NEW CHAT";
    if(result.latestmessage!=null)
        latestmessage= `${result.latestmessage.sentuser.username} : ${result.latestmessage.content}`;
    if(chatname==="newchat" || result.chatname===""){
        chatname="";
        result.users.forEach(x=>{
            chatname+=x.username
            chatname+=','
        });
        chatname=chatname.slice(0,-1);
    }

    var profileimg="";

    result.users.forEach(x=>{
        if(x.profilepicture!==undefined){
            var src=`${x.profilepicture}`;
            profileimg+=`<img src=${src} alt="default"/>`
        }
    });

    return `
        <div class="onechat" data-id=${result._id}>
            <div class="chatimg ">${profileimg}</div>
            <div class="chattab">
                <div class="chatname ellipsis">${chatname}</div>
                <div class="latestmessage ellipsis">${latestmessage}</div>
            </div>
        </div>
    `

}