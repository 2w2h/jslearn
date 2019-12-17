let GitHub = require('github-api');
let config = require('../../config');

let authParams = {
    token: config.github.token
};

const gh = new GitHub(authParams);
let user = gh.getUser();
let p = user.listStarredRepos();

function getStars() {
    return new Promise(function(resolve) {
        p.then(response => {
            let items = response.data.map(x => {
                return {
                    id: x.id,
                    created_at: x.created_at,
                    updated_at: x.updated_at,
                    description: x.description,
                    disabled: x.disabled,
                    full_name: x.full_name,
                    name: x.name,
                    git_url: x.git_url,
                    homepage: x.homepage,
                    language: x.language,
                    size: x.size,
                    forks_count: x.forks_count,
                    stargazers_count: x.stargazers_count,
                    watchers_count: x.watchers_count,
                };
            });
            resolve(items);
        });
    })
}

module.exports = {
    getStars
};