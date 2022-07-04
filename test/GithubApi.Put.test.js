const { expect } = require('chai');
const axios = require('axios');

const object = axios.create({
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});

describe('Github Api Test 3', () => {
  describe('Put test', () => {
    it('PUT mt', async () => {
      const response = await object.put('https://api.github.com/user/following/aperdomob');
      expect(response.status).to.equal(204);
      expect(response.data).to.equal('');
    });
    it('Follow the test', async () => {
      const response = await object.get('https://api.github.com/user/following');
      expect(response.data[0].login).to.eql('aperdomob');
      expect(response.data.find((user) => user.login === 'aperdomob')).to.not.eql(undefined);
    });
  });
  describe('idempotence', () => {
    it('PUT ', async () => {
      const response = await object.put('https://api.github.com/user/following/aperdomob');
      expect(response.status).to.equal(204);
      expect(response.data).to.equal('');
    });
    it('Following test', async () => {
      const response = await object.get('https://api.github.com/user/following');
      expect(response.data.find((user) => user.login === 'aperdomob')).to.not.eql(undefined);
    });
  });
});
