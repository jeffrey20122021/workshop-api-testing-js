const { expect } = require('chai');
const axios = require('axios');
const chaiSubset = require('chai-subset');
const chai = require('chai');

chai.use(chaiSubset);
const object = axios.create({
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});

describe('Test', () => {
  describe('head', async () => {
    it('HEAD redirection', async () => {
      const response = await object.head('https://github.com/aperdomob/redirect-test');
      expect(response.request.path).to.equal('/aperdomob/new-redirect-test');
    });
    it('GET redirection', async () => {
      const response = await object.get('https://github.com/aperdomob/redirect-test');
      expect(response.data).to.contains('href="https://github.com/aperdomob/new-redirect-test"');
      expect(response.request.path).to.equal('/aperdomob/new-redirect-test');
    }).timeout(10000000);
  });
});