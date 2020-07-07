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

            // дополнительные пользовательские данные. Общая тенденция - производительность и удобство в пользу чтения
            meta: {
              description: String,
            }
        }
    ],
});

repo.setModel('external.youtubeSubscriptions', {
    username: String, // youtube username, key
    created_at: Date,
    subscriptions: [
        {
            id: String,
            etag: String,
            kind: String,
            snippet: {
                publishedAt: String,
                title: String,
                description: String,
                resourceId: {
                    kind: String,
                    channelId: String,
                },
                channelId: String,
                thumbnails: {
                    default: {
                        url: String,
                    },
                    medium: {
                        url: String,
                    },
                    high: {
                        url: String,
                    }
                },
            }
        }
    ],
});

// Получение данных по звёздам на GitHub конкретного пользователя
// require: username
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

// Обновление пользовательского описания
// require: username, star_id, description
repo.setCall('external.githubStarsAddDesc', function(params) {
    let starredModel = repo.models['external.githubStar'];

    return new Promise((resolve, reject) => {
        starredModel.findOne({username: params.username}, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                  // КЕЙС: upsert в массиве объектов
                  doc.stars = doc.stars.map(x => {
                      if (x.id === params.star_id) {
                        x.meta.description = params.description;
                      }
                      return x;
                });

                starredModel.findByIdAndUpdate(doc._id, doc, (err, doc) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc);
                    }
                });
            }
        });
    });
});

module.exports = repo;
