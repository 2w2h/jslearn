let express = require('express');
let router = express.Router();

let rest = {
    router,
    /**
     * build find + CRUD
     */
    buildResource(name, model) {
        console.log(`buildResource: "${name}"`);

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
            console.log(req.body);
            res.json({result: false, errors: null})
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
    }
};

module.exports = rest;