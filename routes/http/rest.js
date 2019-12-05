let express = require('express');
let router = express.Router();

let rest = {
    router,
    /**
     * build find + CRUD
     */
    buildResource(name, model) {
        console.log(`buildResource: "${name}"`);

        // билд объекта без new. Пока удалось обойтись без него
        // function create(constructor) {
        //     var factory = constructor.bind.apply(constructor, arguments);
        //     return new factory();
        // };

        this.router.get('/' + name, (req, res, next) => {
            res.json({
                result: {
                    items: [],
                    total: 0
                },
                errors: null
            })
        });
        this.router.post('/' + name, (req, res, next) => {
            try {
                model.create(req.body, (err, model) => {
                    if (err) {
                        res.json({result: false, errors: this.prepareErrors(err)})
                    } else {
                        console.log('saved!');
                        res.json({result: true, errors: null})
                    }
                });
            } catch (e) {
                console.log(e);
            }
        });
        this.router.get('/' + name + '/:id', (req, res, next) => {
            res.json({result: null, errors: null})
        });
        this.router.post('/' + name + '/:id', (req, res, next) => {
            res.json({result: false, errors: null})
        });
        this.router.delete('/' + name + '/:id', (req, res, next) => {
            res.json({result: false, errors: null})
        })
    },
    prepareErrors(err) {
        let arr = [];
        for (let i in err.errors) {
            arr.push({message: err.errors[i].toString()});
        }
        return arr;
    },
};

module.exports = rest;