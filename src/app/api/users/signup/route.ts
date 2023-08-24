import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

import messages from '@/constants/messages';

import { validateEmail, validatePassword } from '@/utilities/validators';
import ResponseHandler from '@/utilities/responseHandler';

connect();

export async function POST(request: NextRequest) {

  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;

    if (!username) {
      return ResponseHandler.validationError(messages.usernameRequired, null);
    }

    if (!email) {
      return ResponseHandler.validationError(messages.emailRequired, null);
    } else if (validateEmail(email) === true) {
      return ResponseHandler.validationError(messages.emailInvalid, null);
    }

    if (!password) {
      return ResponseHandler.validationError(messages.passwordRequired, null);
    } else if (validatePassword(password) === true) {
      return ResponseHandler.validationError(messages.passwordMustBeSixChar, null);
    }

    // checking user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return ResponseHandler.validationError(messages.userAlreadyExists, null);
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    return ResponseHandler.success(messages.userAccountSuccessfullyCreated, savedUser);

  } catch (error: any) {
    return ResponseHandler.serverError(messages.internalServerError, error);
  }
}