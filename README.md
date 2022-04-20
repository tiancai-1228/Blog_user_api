# api deploy in heroku

{post}login : https://robby-user.herokuapp.com/login
header:{
Content-Type
}
query:{
name,
password,
email,
}

{post}checkUser : https://robby-user.herokuapp.com/check
header:{
token,
Content-Type
}
query:{
}

{post}sigin : https://robby-user.herokuapp.com/register
header:{
Content-Type
}
query:{
name,
password,
email,
}

{put}update : https://robby-user.herokuapp.com/update
header:{
token,
Content-Type
}
query:{
name,
password,
email,
}
