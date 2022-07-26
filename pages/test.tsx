import axios from "axios";
import React from "react";

function Test() {
  const sendMail = async () => {
    try {
      //   setMessage("Sending test mail");

      const { data } = await axios.post("/api/send-email", {
        to: "shayana803@gmail.com",
        subject: "Test Transactional Email",
        emailBody: "<h1>This is html inside transactional email</h1>",
      });

      if (data.ok) {
        alert("Successfully send test mail");
      }
    } catch (error) {
      console.log(error);
      // handle the error
    }
  };

  return (
    <div>
      <button onClick={sendMail}>Send Email</button>
    </div>
  );
}

export default Test;
