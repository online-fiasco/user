// @ts-nocheck

import * as sinon from 'sinon';

import { expect } from 'chai';
import * as mongoose from 'mongoose';

const userData = {
  username: 'testuser',
  password: 'testpassword',
  salt: 'test salt',
};

describe('/infrastructure/user', () => {
  before(async () => {
    if (mongoose.connection.readyState === 0) {
      const options = { useNewUrlParser: true, useCreateIndex: true };

      await mongoose.connect(global.TEST_MONGO_URI, options);
    }
  });

  it('Create new user', async () => {
    const saveMock = sinon.stub(mongoose.Document.prototype, 'save');
    saveMock.resolves({ ...userData, id: 'test user id' });

    const user = await UserDAO.createUser(userData);
    const { id, username, password, salt } = user;

    expect(saveMock.called).is.true();
    expect(id).is.equals('test user id');
    expect(username).is.equals(userData.username);
    expect(password).is.equals(userData.password);
    expect(salt).is.equals(userData.salt);
  });

  it('Get specific user', async () => {
    const findMock = sinon.stub(mongoose.Model, 'findOne');
    findMock.resolves({ id: 'sampleUser', ...userData });

    const user = await UserDAO.findUser('sampleUser');
    const { id, username, password, salt } = user;

    expect(findMock.calledWith({ id: 'sampleUser' })).is.true();
    expect(id).is.equals('sampleUser');
    expect(username).is.equals(userData.username);
    expect(password).is.equals(userData.password);
    expect(salt).is.equals(userData.salt);
  });
});
