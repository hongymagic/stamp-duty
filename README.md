# Stamp Duty Calculator

[![Build Status](https://travis-ci.org/hongymagic/stamp-duty.png)](https://travis-ci.org/hongymagic/stamp-duty)

Node module for calculating Stamp Duty in Australia.

# Install

```javascript
> npm install stamp-duty --save
```

# Example

```javascript
var calculator = require('stamp-duty');
var tax = calculator('nsw', 650000);
// 24740
```

# Contribution

1. Write tests
2. Enable editorconfig or local .vimrc support, make sure whitespaces/code
conventions are the same
3. Make sure tests pass
