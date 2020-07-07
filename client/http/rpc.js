// import mongoose from 'mongoose/dist/browser.umd';
// const model = require('../../common/index');

const binding = require('../../common/binding');

export default {
    setDriver(driver) {
        this.driver = driver;
    },
    getCall (name) {
        if (binding.rpc.includes(name)) {

            return async (params) => {
                let payload = {
                    action: name,
                    params
                };
                return await this.driver.post('/rpc', payload);
            }
        }

        return function() {
            alert('undefined call: ' + name);
        };
    }
};