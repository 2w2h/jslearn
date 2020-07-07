let rpc = {
    router: null,
    calls: {},
    registerEndpoint(name) {
        this.router.post('/rpc', (req, res, next) => {
            if (!req.body.action || !req.body.params) {
                res.json({result: null, errors: {message: 'Format error'}});
                return;
            }

            if (!this.calls[req.body.action]) {
                res.json({result: null, errors: {message: 'Undefined action: ' + req.body.action}});
                return;
            }

            try {
                let result = this.calls[req.body.action](req.body.params);

                console.log(req.body);

                if (result.then) {
                    result.then(r => {
                        res.json({result: r, errors: null});
                    });
                } else {
                    res.json({result, errors: null});
                }

            } catch (e) {
                res.json({result: null, errors: e});
            }
        });
    },
    buildCall(name, call) {
        console.log(`buildCall: "${name}"`);
        this.calls[name] = call;
    },
    prepareErrors(err) {
        let arr = [];
        for (let i in err.errors) {
            arr.push({message: err.errors[i].toString()});
        }
        return arr;
    },
};

module.exports = rpc;