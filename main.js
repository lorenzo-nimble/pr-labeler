let core = require("@actions/core");
let github = require("@actions/github");

let pullRequest = github.context.payload.pull_request;

if (!pullRequest) {
    throw new Error("No pull request information found");
}

let baseBranch = pullRequest.base.ref;

let repoToken = core.getInput("repo-token", { required: true });
let octokit = new github.Github(repoToken);

let context = { github };

switch(baseBranch){
    case "master": {
        await octokit.issues.addLabels({ issue_number: context.issue.number, owner: context.owner, repo: context.repo, labels: ['PROD'] });
        break;
    }
    case "staging": {
        await octokit.issues.addLabels({ issue_number: context.issue.number, owner: context.owner, repo: context.repo, labels: ['STG'] });
        break;
    }
}