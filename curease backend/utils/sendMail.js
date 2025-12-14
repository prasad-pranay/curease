import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// 1️⃣ Create Transporter
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});


export const sendMailPatientWelcome = async (to,name) => {
  try {
    // html content
    const htmlContent= `<div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7f9fb; color: #333; padding: 30px;">
  <div style="max-width: 650px; background-color: #fff; margin: auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background: linear-gradient(90deg, #007bff, #00a2ff); padding: 20px; display: flex; align-items: center; gap: 15px; color: white;">
      <img src="https://play-lh.googleusercontent.com/k6XiteU62lOcf-P308bIOaJHq1DmL4rxXV9o6pEd6yIBLd58kOhSkP2-dKlkII0N33g"
           alt="Curease Logo" style="height: 50px; border-radius: 8px;">
      <h2 style="margin: 0;">Welcome to <strong>Curease</strong>!</h2>
    </div>

    <!-- Body -->
    <div style="padding: 30px;">
      <h3 style="font-size: 26px; color: #222;">Welcome ${name} 👋,</h3>
      <p style="font-size: 16px; line-height: 1.6;">
        We’re thrilled to have you as part of <strong>Curease</strong> — your personal health companion built to make
        medical care simpler, faster, and more reliable.
      </p>

      <!-- Buttons -->
      <div style="margin: 25px 0; display: flex; gap: 15px;">
        <a href="https://yourapp.com"
           style="background-color: #007bff; color: #fff; padding: 12px 22px; text-decoration: none;
                  border-radius: 6px; font-weight: 600;">🏠 Visit Website</a>
        <a href="https://yourapp.com/profile-settings"
           style="background-color: #00a884; color: #fff; padding: 12px 22px; text-decoration: none;
                  border-radius: 6px; font-weight: 600;">⚙️ Update Profile</a>
      </div>

      <!-- Why Choose Curease -->
      <div style="margin-top: 30px;">
        <h3 style="color: #007bff;">🌟 Why Choose Curease?</h3>
        <ul style="padding-left: 20px; line-height: 1.6;">
          <li>Fast and reliable online doctor appointments.</li>
          <li>AI-based health predictions and smart symptom checker.</li>
          <li>Emergency support and first-aid guidance when you need it most.</li>
          <li>Easy access to pharmacy, reports, and mental wellness tools.</li>
        </ul>
      </div>

      <!-- Rules & Guidelines -->
      <div style="margin-top: 25px;">
        <h3 style="color: #007bff;">📋 Rules & Guidelines</h3>
        <ul style="padding-left: 20px; line-height: 1.6;">
          <li>Keep your health information up to date for accurate analysis.</li>
          <li>Use the platform responsibly and avoid sharing sensitive details publicly.</li>
          <li>Contact our support team for any medical or technical help.</li>
          <li>Respect privacy — Curease ensures end-to-end data protection.</li>
        </ul>
      </div>

      <p style="margin-top: 30px; font-size: 15px; color: #555;">
        Together, let’s make healthcare more accessible and efficient for everyone.  
      </p>

      <p style="margin-top: 20px;">Best regards,<br>
      <strong>The Curease Team</strong></p>

      <p style="margin-top: 8px; font-size: 13px; color: #777;">💓 from Pranay</p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f0f3f7; text-align: center; padding: 15px; font-size: 12px; color: #777;">
      © 2025 Curease. All rights reserved.  
      <br>
      <a href="https://yourapp.com/privacy" style="color: #007bff; text-decoration: none;">Privacy Policy</a> •
      <a href="https://yourapp.com/terms" style="color: #007bff; text-decoration: none;">Terms of Service</a>
    </div>

  </div>
</div>
`;
    // subject
    const subject = "Welcome to CurEase!"
    // 2️⃣ Define mail options
    const mailOptions = {
      from: `"CurEase Welcome" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    };

    // 3️⃣ Send mail
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

export const forgotMailPassword = async (email,name,password) =>{
  const htmlContent=`<div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7f9fb; color: #333; padding: 30px;">
  <div style="max-width: 650px; background-color: #fff; margin: auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background: linear-gradient(90deg, #007bff, #00a2ff); padding: 20px; display: flex; align-items: center; gap: 15px; color: white;">
      <img src="https://play-lh.googleusercontent.com/k6XiteU62lOcf-P308bIOaJHq1DmL4rxXV9o6pEd6yIBLd58kOhSkP2-dKlkII0N33g"
           alt="Curease Logo" style="height: 50px; border-radius: 8px;">
      <h2 style="margin: 0;">Curease Account Recovery</h2>
    </div>

    <!-- Body -->
    <div style="padding: 30px;">
      <h3 style="font-size: 26px; color: #222;">Hello ${name} 👋,</h3>

      <p style="font-size: 16px; line-height: 1.6;">
        We received a request to recover your <strong>Curease</strong> account login details.
        Below are your account credentials:
      </p>

      <!-- Credentials Card -->
      <div style="background:#f0f6ff; padding:20px; border-radius:10px; margin:20px 0; border-left:4px solid #007bff;">
        <p style="margin: 8px 0; font-size: 16px;"><strong>👤 Username:</strong> ${name}</p>
        <p style="margin: 8px 0; font-size: 16px;"><strong📧 Email:</strong> ${email}</p>
        <p style="margin: 8px 0; font-size: 16px;"><strong>🔑 Password:</strong> ${password}</p>
      </div>

      <p style="font-size: 15px; line-height: 1.6;">
        For your security, we recommend changing your password after logging in.
      </p>

      <!-- Buttons -->
      <div style="margin: 25px 0; display: flex; gap: 15px;">
        <a href="http://localhost:5173/sign-in"
           style="background-color: #007bff; color: #fff; padding: 12px 22px; text-decoration: none;
                  border-radius: 6px; font-weight: 600;">🔐 Login Now</a>

        <a href="http://localhost:5173/"
           style="background-color: #ff4f4f; color: #fff; padding: 12px 22px; text-decoration: none;
                  border-radius: 6px; font-weight: 600;">⚠️ Change Password</a>
      </div>

      <!-- Additional Info -->
      <div style="margin-top: 25px;">
        <h3 style="color: #007bff;">ℹ️ Security Tips</h3>
        <ul style="padding-left: 20px; line-height: 1.6;">
          <li>Never share your password with anyone.</li>
          <li>Use a strong password with letters, numbers & symbols.</li>
          <li>If this request wasn’t made by you, please change your password immediately.</li>
          <li>Curease keeps your data secure with end-to-end protection.</li>
        </ul>
      </div>

      <p style="margin-top: 20px; font-size: 15px; color: #555;">
        If you need further help, our support team is always here for you.
      </p>

      <p style="margin-top: 20px;">Warm regards,<br>
      <strong>The Curease Support Team</strong></p>

      <p style="margin-top: 8px; font-size: 13px; color: #777;">💓 Powered by Pranay</p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f0f3f7; text-align: center; padding: 15px; font-size: 12px; color: #777;">
      © 2025 Curease. All rights reserved.  
      <br>
      <a href="http://localhost:5173/" style="color: #007bff; text-decoration: none;">Privacy Policy</a> •
      <a href="http://localhost:5173/" style="color: #007bff; text-decoration: none;">Terms of Service</a>
    </div>

  </div>
</div>`

try{

  // subject
  const subject = "Curease Account Recovery !!!"
  // 2️⃣ Define mail options
  const mailOptions = {
    from: `"CurEase Welcome" <${process.env.EMAIL_USER}>`,
    to:email,
    subject,
    html: htmlContent,
  };
  
  // 3️⃣ Send mail
  await transporter.sendMail(mailOptions);
  return 1
}catch (error) {
  console.log("error sending email for forgot password",error)
    return 0
  }
}
