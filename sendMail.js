if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let text = "";
if (process.argv[4] === "In") {
    text = process.argv.slice(2, process.argv.length).join(" ");
} else {
    text = "Decision is out! All the best boi"; // Decision in email is too scary lmao
}

const message = {
    to: process.env.SENDER_EMAIL,
    from: process.env.SENDER_EMAIL,
    subject: "ASU Application status",
    text: text,
};
sgMail
    .send(message)
    .then(() => console.log("sent"))
    .catch((err) => console.log(err));
