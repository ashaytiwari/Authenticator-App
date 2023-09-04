import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

import emailType from '@/constants/emailType';
import messages from '@/constants/messages';

import { validateEmail, validatePassword } from '@/utilities/validators';
import ResponseHandler from '@/utilities/responseHandler';
import sendEmail from '@/utilities/mailer';

connect();

export async function POST(request: NextRequest) {

  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;

    if (!username) {
      return ResponseHandler.validationError(messages.usernameRequired);
    }

    if (!email) {
      return ResponseHandler.validationError(messages.emailRequired);
    } else if (validateEmail(email) === true) {
      return ResponseHandler.validationError(messages.emailInvalid);
    }

    if (!password) {
      return ResponseHandler.validationError(messages.passwordRequired);
    } else if (validatePassword(password) === true) {
      return ResponseHandler.validationError(messages.passwordMustBeSixChar);
    }

    // checking user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return ResponseHandler.validationError(messages.userAlreadyExists);
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // sending email verification email
    await sendEmail(email, emailType.VERIFY, savedUser._id);

    return ResponseHandler.success(messages.userAccountSuccessfullyCreated, savedUser);

  } catch (error: any) {
    return ResponseHandler.serverError(messages.internalServerError, error);
  }
}