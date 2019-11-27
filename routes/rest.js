let express = require('express');
let router = express.Router();

let rest = {
    prefix: '/api/v1',
    router,
    /**
     * build find + CRUD
     */
    buildResource(name) {
        this.router.get(this.prefix + '/' + name, (req, res, next) => {
            res.json({
                result: {
                    items: [],
                    total: 0
                },
                errors: null
            })
        });
        this.router.post(this.prefix + '/' + name, (req, res, next) => {
            res.json({result: false, errors: null})
        });
        this.router.get(this.prefix + '/' + name + '/:id', (req, res, next) => {
            res.json({result: null, errors: null})
        });
        this.router.post(this.prefix + '/' + name + '/:id', (req, res, next) => {
            res.json({result: false, errors: null})
        });
        this.router.delete(this.prefix + '/' + name + '/:id', (req, res, next) => {
            res.json({result: false, errors: null})
        })
    }
};
router.get('/', (req, res, next) => {
    res.send('respond with a resource')
});

module.exports = rest;