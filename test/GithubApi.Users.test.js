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
  describe('Parameters', async () => {
    it('default', async () => {
      const response = await object.get('https://api.github.com/users');
      expect(response.data.length).to.equal(30);
    });
    it('10 users', async () => {
      const body = {
        since: 0,
        per_page: 10
      };
      const response = await object.get('https://api.github.com/users', { params: body });
      expect(response.data.length).to.equal(10);
    });
    it('100 users', async () => {
      const body = {
        since: 0,
        per_page: 100
      };
      const response = await object.get('https://api.github.com/users', { params: body });
      expect(response.data.length).to.equal(100);
    });
  });
});
