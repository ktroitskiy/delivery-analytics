const assert = require('assert');
const app = require('../../src/app');

describe('\'parser\' service', () => {
  it('registered the service', () => {
    const service = app.service('parser');

    assert.ok(service, 'Registered the service');
  });
});
