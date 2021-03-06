const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

const data = {
  name: 'John',
  age: '31',
  city: 'New York'
};
const query = {
  name: 'J',
  age: '25',
  city: 'New York'
};

describe('First Api Tests', () => {
  it('Consume GET Service', async () => {
    const response = await axios.get('https://httpbin.org/ip');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property('origin');
  });
  it('Consume GET Service with query parameters', async () => {
    const response = await axios.get('https://httpbin.org/get', { query });

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.query).to.eql(query);
  });
  it('Consume HEAD Service', async () => {
    const response = await axios.head('https://httpbin.org/headers');
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.headers).to.have.property('content-type');
    expect(response.data).to.eql('');
  });
  it('Consume PATCH Service', async () => {
    const response = await axios.patch('https://httpbin.org/patch', data);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.data).to.eql(JSON.stringify(data));
    expect(response.data.json).to.eql(data);
  });
  it('Consume PUT Service', async () => {
    const response = await axios.put('https://httpbin.org/put', data);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.eql(data);
  });
  it('Consume DELETE Service', async () => {
    const response = await axios.delete('https://httpbin.org/delete');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.data).to.eql('');
  });
});
