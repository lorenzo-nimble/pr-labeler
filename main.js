const core = require("@actions/core");
const github = require("@actions/github");

const pullRequest = github.context.payload.pull_request;

if (!pullRequest) {
    throw new Error("No pull request information found");
}

const baseBranch = pullRequest.base.ref;

const repoToken = core.getInput("repo-token", { required: true });
const octokit = github.getOctokit(repoToken);

const context = { github };

switch(baseBranch){
    case "master": {
        octokit.issues.addLabels({ issue_number: context.issue.number, owner: context.owner, repo: context.repo, labels: ['PROD'] });
        break;
    }
    case "staging": {
        octokit.issues.addLabels({ issue_number: context.issue.number, owner: context.owner, repo: context.repo, labels: ['STG'] });
        break;
    }
}