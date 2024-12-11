"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerifyChangePassword = exports.sendVerifyEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "doank3442@gmail.com",
        pass: "draboltgigrurfsk",
    },
});
const sendVerifyEmail = (emails, id, name) => __awaiter(void 0, void 0, void 0, function* () {
    const actionLink = `https://career-app-ndt9.onrender.com/accounts/verify?id=${id}`;
    const info = yield transporter.sendMail({
        from: `"My Daily" <doank3442@gmail.com>`,
        to: emails.length > 1 ? emails.join(", ") : emails[0],
        subject: "Xác thực tài khoản",
        html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .email-container {
        background-color: #ffffff;
        padding: 20px;
        margin: 0 auto;
        max-width: 600px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #4caf50;
        color: white;
        padding: 10px;
        text-align: center;
        border-radius: 8px;
      }
      .content {
        padding: 20px;
        color: #333;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #4caf50;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Xác thực tài khoản</h1>
      </div>

      <div class="content">
        <p>Xin chào ${name},</p>
        <p>
          Cảm ơn bạn đã đăng ký tài khoản! Vui lòng nhấp vào nút dưới đây để xác
          minh địa chỉ email của bạn.
        </p>

        <!-- Action Button -->
        <a href="${actionLink}" target="_blank" class="button">Xác thực</a>

        <!-- Optional details -->
        <p>Nếu nút xác thực ở trên không hoạt động vui lòng liên hệ:</p>
        <p><a href="doank3442@gmail.com">doank3442@gmail.com</a></p>
      </div>

      <div class="footer">
        <p>Cảm ơn bạn đã sử dụng dịch vụ</p>
        <p>
          Nếu bạn có bất kì câu hỏi nào, vui lòng liên hệ
          <a href="mailto:doank3442@gmail.com">doank3442@gmail.com</a>.
        </p>
      </div>
    </div>
  </body>
</html>
`,
    });
    return info;
});
exports.sendVerifyEmail = sendVerifyEmail;
const sendVerifyChangePassword = (emails, id, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const actionLink = `https://career-app-ndt9.onrender.com/accounts/confirmChangePassword?id=${id}&token=${newPassword}`;
    const info = yield transporter.sendMail({
        from: `"My Daily" <doank3442@gmail.com>`,
        to: emails.length > 1 ? emails.join(", ") : emails[0],
        subject: "Yêu Cầu Đổi Mật Khẩu",
        html: `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yêu Cầu Đổi Mật Khẩu</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      h2 {
        color: #444;
        text-align: center;
      }
      p {
        line-height: 1.5;
        font-size: 16px;
        margin: 20px 0;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
        background-color: #ff6b6b;
        text-align: center;
        border-radius: 5px;
        text-decoration: none;
        transition: background-color 0.3s ease;
      }
      .button:hover {
        background-color: #ff4c4c;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        color: #888;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Yêu Cầu Đổi Mật Khẩu</h2>
      <p>
        Chúng tôi đã nhận được yêu cầu đổi mật khẩu của bạn. Để tiếp tục, vui
        lòng xác nhận bằng cách nhấn vào nút bên dưới.
      </p>
      <div style="text-align: center; margin: 20px 0">
        <a href=${actionLink} class="button" target="_blank"
          >Xác Nhận Đổi Mật Khẩu</a
        >
      </div>
      <p>
        Nếu bạn không yêu cầu đổi mật khẩu, vui lòng bỏ qua email này. Mật khẩu
        hiện tại của bạn vẫn sẽ an toàn.
      </p>
      <div class="footer">
        <p>&copy; 2024 My Daily. Bảo lưu mọi quyền.</p>
      </div>
    </div>
  </body>
</html>
`,
    });
    return info;
});
exports.sendVerifyChangePassword = sendVerifyChangePassword;
