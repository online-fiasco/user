// @ts-nocheck

import * as mongoose from 'mongoose';
import { config } from 'dotenv';
import { expect } from 'chai';
import UserModel from '../../src/infrastructure/UserModel';

const userData = {
  username: 'testuser',
  password: 'testpassword',
  salt: 'testsalt',
};

describe('/infrastructure/user-model', () => {
  before((done) => {
    config();

    if (mongoose.connection.readyState === 0) {
      const options = { useNewUrlParser: true, useCreateIndex: true };
      mongoose.connect(process.env.TEST_MONGO_URI, options);

      const db = mongoose.connection;
      db.once('open', () => {
        done();
      });
    }
  });

  it('create & save user successfully', async () => {
    const user = new UserModel(userData);
    const savedUser = await user.save();

    const { username, password, salt } = userData;
    expect(savedUser._id).to.not.be.undefined;
    expect(savedUser.username).to.be.equals(username);
    expect(savedUser.password).to.be.equals(password);
    expect(savedUser.salt).to.be.equals(salt);
  });

  it('create without required field should be failed', async () => {
    const requiredField = ['username', 'password', 'salt'];

    const validator = async (field: string) => {
      const userDataWithoutField = { ...userData };
      userDataWithoutField[field] = undefined;

      let err: Error;
      try {
        await new UserModel(userData).save();
      } catch (error) {
        err = error;
      }

      expect(err).to.be.instanceOf(mongoose.Error.ValidationError);
      expect(err.errors[field]).to.not.be.undefined;
    };

    await Promise.all(requiredField.map(validator));
  });
});
