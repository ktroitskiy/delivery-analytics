const _ = require('lodash');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      async hook => {
        const { app, data } = hook;
        const sequelizeClient = await app.get('sequelizeClient');
        const { analitics: analiticsModel } = sequelizeClient.models;

        const existingAnalitics = await analiticsModel.findOne({
          where: {
            entityId: data.entityId,
            name: data.name,
          },
          raw: true
        });

        if (!_.isNil(existingAnalitics)) {
          app.service('analitics').remove(existingAnalitics.id);
        }

        return hook;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
