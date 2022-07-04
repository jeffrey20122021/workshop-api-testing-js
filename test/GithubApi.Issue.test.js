const { expect } = require('chai');
const axios = require('axios');

const object = axios.create({
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});

describe('Testing 4', () => {
  describe('testing POST and PATCH method', async () => {
    it('User', async () => {
      const user = await object.get('https://api.github.com/user');
      const repos = await object.get(user.data.repos_url);
      expect(repos.data.find((repo) => repo.private === false)).to.not.equal(undefined);
    });
    it('Repo', async () => {
      const user = await object.get('https://api.github.com/user');
      const repos = await object.get(user.data.repos_url);
      const repo = repos.data[0];
      expect(repo.private).to.equal(false);
    });
    it('Issue', async () => {
      const user = await object.get('https://api.github.com/user');
      const repos = await object.get(user.data.repos_url);
      const repo = repos.data[0];
      const issue = await object.post(`https://api.github.com/repos/${user.data.login}/${repo.name}/issues`, { title: 'Issue' });
      expect(issue.data.title).to.equal('Issue');
      expect(issue.data.body).to.equal(null);
    });
    it('PATCH issue , async () => {
      const user = await object.get('https://api.github.com/user');
      const repos = await object.get(user.data.repos_url);
      const repo = repos.data[0];
      const issue = await object.get(`https://api.github.com/repos/${user.data.login}/${repo.name}/issues`);
      // Finds the issue that has the title 'My issue' and gets the number.
      const issueNumber = issue.data.find((iss) => iss.title === 'Issue').number;
      const patch = await object.patch(`https://api.github.com/repos/${user.data.login}/${repo.name}/issues/${issueNumber}`, { body: 'body Issue' });
      expect(patch.data.title).to.equal('Issue');
      expect(patch.data.body).to.equal('body Issue');
    });
  });
});
