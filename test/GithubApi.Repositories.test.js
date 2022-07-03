const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const chaiSubset = require('chai-subset');
const chai = require('chai');
const md5 = require('md5');

chai.use(chaiSubset);
const axios = require('axios');

describe('Github Api Test', () => {
  describe('Authentication', () => {
    it('Via OAuth2 Tokens by Header', async () => {
      const response = await axios.get('https://api.github.com/users/aperdomob', {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      expect(response.status).to.equal(StatusCodes.OK);
    });
    it('Via OAuth2 Tokens by parameter', async () => {
      const response = await axios.get(
        'https://api.github.com/users/aperdomob',
        { access_token: process.env.ACCESS_TOKEN }
      );
      expect(response.status).to.equal(StatusCodes.OK);
    });
  });
});
describe('Github Api Test 2', () => {
  describe('testing GET method', () => {
    it('basic features test', async () => {
      const response = await axios.get('https://api.github.com/users/aperdomob');
      expect(response.data.name).to.eql('Alejandro Perdomo');
      expect(response.data.company).to.eql('Perficient Latam');
      expect(response.data.location).to.eql('Colombia');
    });
    it('jasmine repo test', async () => {
      const response = await axios.get('https://api.github.com/users/aperdomob');
      const responseRepo = await axios.get(response.data.repos_url);
      const repository = Array.from(responseRepo.data).find((repo) => repo.name === 'jasmine-json-report');
      expect(repository.full_name).to.eql('aperdomob/jasmine-json-report');
      expect(repository.description).to.eql('A Simple Jasmine JSON Report');

      const downloadRepo = await axios.get(`${repository.svn_url}/archive/${repository.default_branch}.zip`);
      expect(downloadRepo.headers['content-type']).to.eql('application/zip');
      expect(repository.visibility).to.eql('public');
    });
    it('README test', async () => {
      const response = await axios.get('https://api.github.com/users/aperdomob');
      const responseRepo = await axios.get(response.data.repos_url);
      const repository = Array.from(responseRepo.data).find((repo) => repo.name === 'jasmine-json-report');
      const filesURL = repository.contents_url.replace('{+path}', '');
      const responseFiles = await axios.get(filesURL);
      const readme = Array.from(responseFiles.data).find((file) => file.name === 'README.md');
      expect(readme).to.containSubset({
        name: 'README.md', path: 'README.md', sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
      });
    });
    it('MD5 test', async () => {
      const response = await axios.get('https://api.github.com/users/aperdomob');
      const responseRepo = await axios.get(response.data.repos_url);
      const repository = Array.from(responseRepo.data).find((repo) => repo.name === 'jasmine-json-report');
      const filesURL = repository.contents_url.replace('{+path}', '');
      const responseFiles = await axios.get(filesURL);
      const readme = Array.from(responseFiles.data).find((file) => file.name === 'README.md');
      const downloadReadme = await axios.get(readme.download_url);
      const fileContent = downloadReadme.data;
      expect(md5(fileContent)).to.eql('497eb689648cbbda472b16baaee45731');
    });
  });
});
