const toRegister = require("../models/register_model");
const loginAction = require("../models/login_model");
const updateAction = require("../models/update_model");
const verify = require("../models/verification_model");
const jwt = require("jsonwebtoken");
const config = require("../config/development_config");

module.exports = class Member {
  postRegister(req, res, next) {
    // 獲取client端資料
    const memberData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      create_date: onTime(),
    };
    // 將資料寫入資料庫
    toRegister(memberData).then(
      (result) => {
        // 若寫入成功則回傳
        res.json({
          status: "註冊成功。",
          result: result,
        });
      },
      (err) => {
        // 若寫入失敗則回傳
        res.json({
          result: err,
        });
      }
    );
  }

  postLogin(req, res, next) {
    loginAction(req.body).then((rows) => {
      console.log("test:", rows);
      const checkNull = !rows;
      console.log(checkNull, "---");
      if (checkNull === true) {
        res.json({
          result: {
            status: "登入失敗。",
            err: "請輸入正確的帳號或密碼。",
          },
        });
      } else if (checkNull === false) {
        // 產生token
        const token = jwt.sign(
          {
            algorithm: "HS256",
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // token一個小時後過期。
            data: rows[0].id,
          },
          config.secret
        );
        res.setHeader("token", token);
        res.json({
          result: {
            status: "登入成功。",
            loginMember: "歡迎 " + rows[0].name + " 的登入！",
          },
        });
      }
    });
  }

  putUpdate(req, res, next) {
    const token = req.headers["token"];
    console.log("token:", token);
    //確定token是否有輸入
    const checkNull = !token;
    console.log(checkNull);
    if (checkNull === true) {
      res.json({
        err: "請輸入token！",
      });
    } else if (checkNull === false) {
      verify(token).then((tokenResult) => {
        if (tokenResult === false) {
          res.json({
            result: {
              status: "token錯誤。",
              err: "請重新登入。",
            },
          });
        } else {
          const id = tokenResult;
          const memberUpdateData = {
            name: req.body.name,
            password: req.body.password,
            update_date: onTime(),
          };
          updateAction(id, memberUpdateData).then(
            (result) => {
              res.json({
                result: result,
              });
            },
            (err) => {
              res.json({
                result: err,
              });
            }
          );
        }
      });
    }
  }
};

//取得現在時間，並將格式轉成YYYY-MM-DD HH:MM:SS
const onTime = () => {
  const date = new Date();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const mi = date.getMinutes();
  const ss = date.getSeconds();

  return [
    date.getFullYear(),
    "-" + (mm > 9 ? "" : "0") + mm,
    "-" + (dd > 9 ? "" : "0") + dd,
    " " + (hh > 9 ? "" : "0") + hh,
    ":" + (mi > 9 ? "" : "0") + mi,
    ":" + (ss > 9 ? "" : "0") + ss,
  ].join("");
};
