# Stamp Duty Calculator

_Rates updated on 1/08/2014._

[![browser support](https://ci.testling.com/hongymagic/stamp-duty.png)](https://ci.testling.com/hongymagic/stamp-duty)
[![Build Status](https://travis-ci.org/hongymagic/stamp-duty.png)](https://travis-ci.org/hongymagic/stamp-duty)

JavaScript module for calculating Stamp Duty in Australia. Available for node,
broswer and whereever else JavaScript can run on.

# Installing via npm

```javascript
> npm install --save stamp-duty
```

## Example in node

```javascript
var calculator = require('stamp-duty');
var tax = calculator('nsw', 650000);
// 24740
```

# Installing via bower

```javascript
> bower install --save stamp-duty
```

## Example in browser

```javascript
stampduty('nsw', 650000);
// 24740
```

# Valid states

```
['nsw', 'qld', 'vic', 'tas', 'nt', 'sa', 'wa', 'act'];
```

# Assumptions made

For all states:

- Primary place of residence;
- No first home buyer's grants;
- No tax-exemptions of any sort;
- No off-the-plan concessions;

For Western Australia:

- For properties under $200,000, concessional rates apply as per S147;

# Contribution

1. Write tests
2. Enable editorconfig or local .vimrc support, make sure whitespaces/code
conventions are the same
3. Make sure tests pass
