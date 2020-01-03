let github = require("../external/github");
const model = require('../../common/index');
const mongo = require('mongoose');

// TODO: общее для фоновых задач
const [, , ...args] = process.argv;
if (args.length > 0) {
    console.log(`Args: ${args}`);
}
// Вынести в bootstrap
let con = mongo.connect('mongodb://127.0.0.1/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// TODO END

let startDate = new Date();
let githubUsername = "pilot114";

github.getStars(githubUsername).then(result => {

    let data = {
        username: githubUsername,
        created_at: new Date(),
        duration: new Date() - startDate,
        stars: result,
    };

    con.then(con => {
        let starredModel = model().get('external.githubStar');

        // обновить или создать, если обновить не удалось
        starredModel.findOneAndUpdate(
            {username: data.username},
            data,
            {upsert: true},
            (err, doc) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("save success!");
                }
            }
        );
    });
});
