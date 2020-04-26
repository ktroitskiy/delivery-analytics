const assert = require('assert');
const app = require('../../src/app');

describe('\'product-variation\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-variation');

    assert.ok(service, 'Registered the service');
  });
});
