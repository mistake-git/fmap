const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const adminEmail = functions.config().admin.email;

// 送信に使用するメールサーバーの設定
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// 管理者用のメールテンプレート
const adminContents = (data: any) => {
  return `以下内容でホームページよりお問い合わせを受けました。
お名前：
${data.name}
メールアドレス：
${data.email}
お問い合わせの種類：
${data.type}
お問い合わせ内容：
${data.content}
`;
};

exports.sendMail = functions.https.onCall((data: any) => {
  // メール設定
  let adminMail = {
    from: gmailEmail,
    to: adminEmail,
    subject: "Fishing Map お問い合わせ",
    text: adminContents(data)
  };

  // 管理者へのメール送信
  mailTransport.sendMail(adminMail, (error: any) => {
    if (error) {
      return console.error(`send failed. ${error}`);
    }
    return console.log("send success.");
  });
});