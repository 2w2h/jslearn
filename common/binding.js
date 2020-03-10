// привязка моделей и вызовов к протоколам обмена данными

module.exports = {
    rest: {
        'user': 'base.user',
        'project': 'learn.project',
        'worklog': 'learn.worklog',
        'js_progress': 'learn.js_progress',
    },
    rpc: [
        'external.githubGetStars',
        'external.githubStarsAddDesc'
    ]
}
