const { expect } = require('chai');
const axios = require('axios');
const chaiSubset = require('chai-subset');
const chai = require('chai');

const body = {
  description: 'Promise #1',
  public: true,
  files: {
    'Readme.md': {
      content: 'Promise #1'
    }
  }
};

chai.use(chaiSubset);

const object = axios.create({
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});

describe('Github Delete Testing', () => {
  describe('Delete M', async () => {
    it('Create', async () => {
      const gist = await object.post('https://api.github.com/gists', body);
      expect(gist.status).to.equal(201);
      expect(gist.data).to.containSubset(body);
    });

    it('Gist', async () => {
      const gist = await object.get('https://api.github.com/gists');
      expect(gist.data.find((actualGist) => actualGist.description === 'Promise #1')).to.not.equal(undefined);
    });

    it('Delete', async () => {
      const gists = await object.get('https://api.github.com/gists');

      const gistID = gists.data.find((actualGist) => actualGist.description === 'Promise #1').id;
      const gistDelete = await object.delete(`https://api.github.com/gists/${gistID}`);
      expect(gistDelete.status).to.equal(204);
      const newGists = await object.get('https://api.github.com/gists');
      expect(newGists.data.find((actualGist) => actualGist.description === 'Promise #1')).to.equal(undefined);
    });
  });
});
