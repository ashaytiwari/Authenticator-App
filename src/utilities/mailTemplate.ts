import emailType from "@/constants/emailType"

function mailTemplate(hashedToken: string, _emailType: string) {

  if (_emailType === emailType.VERIFY) {
    return `<p>Click <a href="${process.env.domain}/verifyEmail?token=${hashedToken}"> here </a> to 
    Verify your email</p>`;
  }

  return `<p>Click <a href="${process.env.domain}/resetPassword?token=${hashedToken}"> here </a> to 
    Reset your password</p>`;

}

export default mailTemplate;