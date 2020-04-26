const assert = require('assert');
const app = require('../../src/app');

describe('\'product-variation-history\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-variation-history');

    assert.ok(service, 'Registered the service');
  });
});
