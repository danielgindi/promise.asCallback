# promise.asCallback

[![npm Version](https://badge.fury.io/js/promise.asCallback.png)](https://npmjs.org/package/promise.asCallback)

Converts a native Promise to a node.js-style callback.

## Installation:

```
npm install --save promise.asCallback
```
  
## Usage example:

```javascript

const asCallback = require('promise.asCallback');

asCallback(myPromise, function (err, value) {

	// Promise.catch is also forwarded here
	
});

```

You can also patch `Promise.prototype` to have a chainable `asCallback` method.
```javascript

require('promise.asCallback').patch();

myPromise
	.asCallback(function (err, value) {

		// Promise.catch is also forwarded here
		
	});

```

## Notes

The name `asCallback` is inspired by Bluebird library, as most of the asCallback/promisifying libraries out there.  
But there one big difference - all libraries out there that I've encountered by the time of publishing this module,
 did not forward the thrown error to the callback. Maybe for a good reason,
 but I find it more natural to forward it to the callback - as the node.js callback convention has an error argument.

## Contributing

If you have anything to contribute, or functionality that you lack - you are more than welcome to participate in this!
If anyone wishes to contribute unit tests - that also would be great :-)

## Me
* Hi! I am Daniel Cohen Gindi. Or in short- Daniel.
* danielgindi@gmail.com is my email address.
* That's all you need to know.

## Help

If you want to buy me a beer, you are very welcome to
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=G6CELS3E997ZE)
 Thanks :-)

## License

All the code here is under MIT license. Which means you could do virtually anything with the code.
I will appreciate it very much if you keep an attribution where appropriate.

    The MIT License (MIT)

    Copyright (c) 2013 Daniel Cohen Gindi (danielgindi@gmail.com)

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
