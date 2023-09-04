import emailType from "@/constants/emailType"

function mailTemplate(hashedToken: string, _emailType: string) {

  return `<p>Click <a href="${process.env.domain}/verifyEmail?token=${hashedToken}"> here </a> to 
  ${_emailType === emailType.VERIFY ? 'Verify your email' : 'Reset your Password'}</p>`;

}

export default mailTemplate;