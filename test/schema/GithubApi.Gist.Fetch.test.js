const { expect } = require('chai');
require('isomorphic-fetch');
const chaiSubset = require('chai-subset');
const chai = require('chai');

chai.use(chaiSubset);

const body = {
  description: 'Promise #1',
  public: true,
  files: {
    'Readme.md': {
      content: 'Promise #1'
    }
  }
};

describe('Github Delete Testing with fetch', () => {
  describe('Delete M', async () => {
    it('Create', async () => {
      const gist = await fetch.post('https://api.github.com/gists', body);
      expect(gist.status).to.equal(201);
      expect(gist.data).to.containSubset(body);
    });
    it('Gist', async () => {
      const gist = await fetch.get('https://api.github.com/gists');
      expect(gist.data.find((actualGist) => actualGist.description === 'Promise #1')).to.not.equal(undefined);
    });
    it('Delete', async () => {
      const gists = await fetch.get('https://api.github.com/gists');

      const gistID = gists.data.find((actualGist) => actualGist.description === 'Promise #1').id;
      const gistDelete = await fetch.delete(`https://api.github.com/gists/${gistID}`);
      expect(gistDelete.status).to.equal(204);
      const newGists = await fetch.get('https://api.github.com/gists');
      expect(newGists.data.find((actualGist) => actualGist.description === 'Promise #1')).to.equal(undefined);
    });
  });
});
