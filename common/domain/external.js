let repo = require('../repo');

/**
 * Кэш данных из сторонних источников, заполняется
 * фоновыми задачами из server/bin
 *
 * У всех моделей есть ключевое поле, created_at, duration (продолжительность задачи)
 */
repo.setName('external');
repo.setModel('external.githubStar', {
    username: String, // github username, key
    created_at: Date,
    duration: Number,
    stars: [
        {
            id: Number,
            created_at: Date,
            updated_at: Date,
            description: String,
            disabled: Boolean,
            full_name: String,
            name: String,
            git_url: String,
            homepage: String,
            language: String,
            size: Number,
            forks_count: Number,
            stargazers_count: Number,
            watchers_count: Number,
        }
    ],
});
repo.setCall('external.githubGetStars', function(params) {
    let starredModel = repo.models['external.githubStar'];

    return new Promise((resolve, reject) => {
        starredModel.findOne({username: params.username}, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                if (params.lang) {
                    doc.stars = doc.stars.filter(x => x.language === params.lang);
                }
                doc.stars = doc.stars.sort((a, b) => b.stargazers_count - a.stargazers_count);


                resolve(doc);
            }
        });
    });
});

module.exports = repo;