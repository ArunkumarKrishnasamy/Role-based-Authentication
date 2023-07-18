

const Role = {
    TRANSLATOR : "Translator",
    REVIEWER :"Reviewer",
    ADMIN :"Admin"
}



module.exports ={
    Role :Role,
    users :[
        {id :1, name :"Arun", role:Role.TRANSLATOR},
        {id :2, name :"Kumar", role:Role.REVIEWER},
        {id :3, name :"AK", role :Role.ADMIN}
    ]
}