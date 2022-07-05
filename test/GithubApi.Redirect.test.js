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
it('test', async () => {
  const response = await object.get('https://github.com/aperdomob/redirect-test');
  expect(response.data).to.contains('href="https://github.com/aperdomob/new-redirect-test"');
});
