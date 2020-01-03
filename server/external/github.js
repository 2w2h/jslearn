let GitHub = require('github-api');
let config = require('../../config');

let authParams = {
    token: config.github.token
};
const gh = new GitHub(authParams);

function getStars(username = null) {
    let user = gh.getUser(username);

    // переопределяем listStarredRepos с кастомными параметрами
    // чтобы получить полный список
    user.listStarredRepos = function(cb) {
        let requestOptions = this._getOptionsWithDefaults({
            sort: "created",
            page: 1
        });
        return this._requestAllPages(this.__getScopedUrl('starred'), requestOptions, cb);
    };

    let p = user.listStarredRepos();

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