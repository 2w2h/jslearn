import mongoose from 'mongoose/dist/browser.umd';

const model = require('../../common/index');
const binding = require('../../common/binding');

export default {
    setDriver(driver) {
        this.driver = driver;
    },
    getResource(name) {
        let instanceSchema = model().get(binding.rest[name]);

        return {
            driver: this.driver,
            schema: instanceSchema,
            doc: this.doc,
            validate(data) {
                this.doc = new mongoose.Document(data, instanceSchema);
                return this.prepareErrors(this.doc.validateSync());
            },
            prepareErrors(err) {
                let arr = [];
                if (!err) return arr;

                for (let i in err.errors) {
                    arr.push({message: err.errors[i].toString()});
                }
                return arr;
            },
            buildEmpty: () => {
                let empty = {};
                for (let path in instanceSchema.paths) {
                    empty[path] = null;
                }
                return empty;
            },
            /**
             * async/await запросы
             *
             * save - create / update (если с _id)
             * load - find / read (если с _id)
             * remove - delete
             */
            save: async (params) => {
                try {
                    let urlId = params._id ? ('/' + params._id) : '';
                    const response = await this.driver.post('/' + name + urlId, params);
                    return response.data;
                } catch (error) {
                    // console.error(error);
                }
            },
            load: async (params) => {
                try {
                    let urlId = params._id ? ('/' + params._id) : '';
                    const response = await this.driver.get('/' + name + urlId, params);
                    return response.data;
                } catch (error) {
                    // console.error(error);
                }
            },
            remove: async (params) => {
                try {
                    const response = await this.driver.delete('/' + name + '/' + params._id, params);
                    return response.data;
                } catch (error) {
                    // console.error(error);
                }
            },
        }
    }
};
