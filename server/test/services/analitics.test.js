const assert = require('assert');
const app = require('../../src/app');

describe('\'analitics\' service', () => {
  it('registered the service', () => {
    const service = app.service('analitics');

    assert.ok(service, 'Registered the service');
  });
});
