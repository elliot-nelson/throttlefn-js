# throttlefn

A collection of promise-based function throttling and guarding methods for nodejs.

Tested on node versions 0.10, 0.12, 4.x, 6.x.

## Installation

    npm install throttlefn --save

## Usage

The `throttlefn` function takes two arguments: a `condition` and a function. It
returns a new, wrapped version of the function, which behaves passed on the
chosen condition.

    throttlefn(<condition>, function () { /* my function */ })

Here's an example using the built-in condition `n`, which allows you to limit
the number of concurrent executions of an asynchronous function.

    var Promise = require("bluebird");
    var throttlefn = require('throttlefn');

    var perform = function () {
        // Some kind of asynchronous operation that returns a Promise
    };

    // This "wrapped" version of perform only allows 5 concurrent executions
    // of perform at once. Additional executions will queue up in the order
    // they were called.
    var wrappedPerform = throttlefn(throttlefn.n(5), perform);

    // Why would you want this? One possibility is a Promise map/join/all.
    Promise.map([ /* a large collection */ ], wrappedPerform);

### Conditions

#### concurrent / n

Prevents more than _n_ concurrent executions of the provided function.
Additional calls to the function will queue up behind the running calls and
execute in the order they were received.

This condition requires your function to return a Promise.

    throttlefn(throttlefn.concurrent(3), myFunction)
    throttlefn(throttlefn.n(3), myFunction)

#### delay / ms

Ensures that at least _ms_ milliseconds pass between each execution of the
provided function. Additional calls to the function will queue up and
execute in the order they were received.

Your function can return either a Promise or a raw value with this condition.
Note that if your function does not return a Promise, the value it returns
will automatically be wrapped in a Promise by throttlefn.

    throttlefn(throttlefn.delay(333), myFunction)
    throttlefn(throttlefn.ms(333), myFunction)

#### Roll your own

You can create your own custom conditions if you need more precise control
over when a function can execute. Here's an example of a custom condition
that rolls an n-sided die, and ignores your function call unless you roll a 1.

    function roll(n) {
        function enter () {
            return new Promise(function (resolve) {
                if (Math.rand() * n < 1) {
                    resolve(exit);
                } else {
                    resolve(); // don't execute
                }
            });
        }
        function exit () { }
    }

    var attack = throttlefn(roll(6), function () {
        console.log("This line only has a 1 in 6 chance of being printed!");
    });

    attack();

Take a look at the built-in conditions for more working examples.

### Reusing conditions

A condition can be created and then reused in multiple `throttlefn` calls. This
is useful if you want to ensure that multiple functions all respect the same
conditions (for example, if you're calling an external API and want to limit the
number of requests you'll make).

    // Limit to 4 requests per second
    var guard = throttlefn.ms(250);

    var MyAPI = {
        create: throttlefn(guard, function () {
            // make an API call
        }),
        update: throttlefn(guard, function () {
            // make an API call
        }),
        delete: throttlefn(guard, function () {
            // make an API call
        }),
        ping: throttlefn(throttlefn.ms(250), function () {
            // ping the API
        })
    };

    // create, update, and delete all respect the same condition -- any combination
    // of these functions is required to have a 250ms delay between calls, and they will
    // all queue up in the order executed.

    // ping created its own condition, so it also has a 250ms delay requirement, but is
    // independent of the other 3 functions.

### Collapsing the condition function

If you're going to reuse a guard many times, you can reduce boilerplate by collapsing it
into a single function using `bind`.

    var guard = throttlefn.bind(undefined, throttlefn.n(5));

    var functionA = guard(function () { /* ... */ }); 
    var functionB = guard(function () { /* ... */ }); 
    var functionC = guard(function () { /* ... */ }); 

### Use with classes (prototypes)

Throttled functions are totally safe as prototype methods.

    function Animal (name) {
        this.name = name; 
    }

    Animal.prototype.speak = throttlefn(throttlefn.delay(300), function () {
        console.log(this.name);
    });

    // All instances of Animal respect the same 300-ms delay.
    new Animal("bird").speak();
    new Animal("elephant").speak();
    new Animal("lion").speak();

If you want each instance of a class to have its _own_ condition, rather than a shared one,
you'll need to do a little more work. One approach would be to take each prototype method
and override it during initialization.

    function Animal(name) {
        this.name = name;
        this.throttle = throttlefn.ms(850);

        this.speak = throttlefn(this.throttle, Animal.prototype.speak);
    }

    Animal.prototype.speak = function () {
        console.log(this.name);
    }

    var bird = new Animal("bird");
    var lion = new Animal("lion");

    // Birds and lions can speak each 850ms, independently of each other.
    bird.speak();
    lion.speak();
    bird.speak();
    lion.speak();

## License

Licensed under MIT. [Full license here &raquo;](LICENSE.txt)

## Contributing

Pull requests are welcome. Make sure to include tests for any new or modified
functionality.

Feature requests and issue reports are also welcome. When reporting an issue be
sure to include operating system, node version, and any other information
required to reproduce the problem.

## References

Inspired by (and in some cases, a direct port of) the excellent `when/guard`
module in the [when](https://github.com/cujojs/when) Promise library.
