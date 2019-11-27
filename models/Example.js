/**
 * 1. Создание схемы
 */
let userSchema = new mongoose.Schema({
    name: String
});

/**
 * 2. Добавление функционала
 */
userSchema.methods.whois = function () {
    let greeting = "My name is " + this.name;
    console.log(greeting);
};

/**
 * 3. Компиляция модели
 */
let User = mongoose.model('User', userSchema);

/**
 * 4. Использование
 */
let user = new User({ name: 'Иван' });

user.save((err, user) => {
    if (err) return console.error(err);
    user.whois();
});
// user.find({ name: /^Ив/ }, callback);
user.find((err, users) => {
    if (err) return console.error(err);
    console.log(users);
});