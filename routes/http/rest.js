let express = require('express');
let router = express.Router();

let rest = {
    router,
    /**
     * build find + CRUD
     */
    buildResource(name, model) {
        console.log(model);

        this.router.get(name, (req, res, next) => {
            res.json({
                result: {
                    items: [],
                    total: 0
                },
                errors: null
            })
        });
        this.router.post(name, (req, res, next) => {
            res.json({result: false, errors: null})
        });
        this.router.get(name + '/:id', (req, res, next) => {
            res.json({result: null, errors: null})
        });
        this.router.post(name + '/:id', (req, res, next) => {
            res.json({result: false, errors: null})
        });
        this.router.delete(name + '/:id', (req, res, next) => {
            res.json({result: false, errors: null})
        })
    }
};
router.get('/', (req, res, next) => {
    res.send('respond with a resource')
});

module.exports = rest;