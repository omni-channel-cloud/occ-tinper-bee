'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./build/occ-tinper-bee.js');
} else {
  module.exports = require('./build/occ-tinper-bee.js');
}
