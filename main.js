let core = require("@actions/core");
let github = require("@actions/github");

let pullRequest = github.context.payload.pull_request;

if (!pullRequest) {
    throw new Error("No pull request information found");
}

let baseBranch = pullRequest.base.ref;

let repoToken = core.getInput("repo-token", { required: true });
let octokit = github.getOctokit(repoToken);

switch(baseBranch){
    case "master": {
        octokit.rest.issues.addLabels({ issue_number: pullRequest.number, owner: context.owner, repo: context.repo, labels: ['PROD'] });
        break;
    }
    case "staging": {
        octokit.rest.issues.addLabels({ issue_number: pullRequest.number, owner: context.owner, repo: context.repo, labels: ['STG'] });
        break;
    }
}