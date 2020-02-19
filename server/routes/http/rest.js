let rest = {
    router: null,
    /**
     * build find + CRUD
     */
    buildResource(name, model) {
        console.log(`buildResource: "${name}"`);

        // find
        this.router.get('/' + name, (req, res, next) => {
            try {
                model.find(req.body, (err, docs) => {
                    if (err) {
                        res.json({result: false, errors: this.prepareErrors(err)})
                    } else {
                        console.log('finded!');
                        // TODO - фильтры полей на find
                        // let filtered = docs.map(x => {
                        //     return {_id: x.id, login: x.login};
                        // });
                        res.json({result: {items: docs, total: docs.length}, errors: null})
                    }
                });
            } catch (e) {
                console.log(e);
            }
        });
        // create
        this.router.post('/' + name, (req, res, next) => {
            try {
                model.create(req.body, (err, doc) => {
                    if (err) {
                        console.log(err);
                        console.log(err.errors);
                        console.log(this.prepareErrors(err));
                        res.json({result: false, errors: this.prepareErrors(err)})
                    } else {
                        console.log('created!');
                        res.json({result: true, errors: null})
                    }
                });
            } catch (e) {
                console.log(e);
            }
        });
        // read
        this.router.get('/' + name + '/:id', (req, res, next) => {
            try {
                model.findById(req.params.id, (err, doc) => {
                    if (err) {
                        res.json({result: false, errors: this.prepareErrors(err)})
                    } else {
                        console.log('readed!');
                        res.json({result: doc, errors: null})
                    }
                });
            } catch (e) {
                console.log(e);
            }
        });

        // update
        this.router.post('/' + name + '/:id', (req, res, next) => {
            try {
                model.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
                    if (err) {
                        res.json({result: false, errors: this.prepareErrors(err)})
                    } else {
                        console.log('updated!');
                        res.json({result: true, errors: null})
                    }
                });
            } catch (e) {
                console.log(e);
            }
        });

        // delete
        this.router.delete('/' + name + '/:id', (req, res, next) => {
            try {
                model.findByIdAndDelete(req.params.id, (err, doc) => {
                    if (err) {
                        res.json({result: false, errors: this.prepareErrors(err)})
                    } else {
                        console.log('deleted!');
                        res.json({result: true, errors: null})
                    }
                });
            } catch (e) {
                console.log(e);
            }
        })
    },
    prepareErrors(err) {
        if (!err.errors) {
            return err.toString();
        }
        let arr = [];
        for (let i in err.errors) {
            arr.push({message: err.errors[i].toString()});
        }
        return arr;
    },
};

module.exports = rest;