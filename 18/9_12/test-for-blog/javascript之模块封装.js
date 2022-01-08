var myModules = (function creater() {
    var modules = {};

    function define(name, deps, impl) {
        for (var i = 0; i < deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl, deps)
    }

    function get(name) {
        return modules[name];
    }

    return {
        define: define,
        get: get
    }
})()

myModules.define("foo", [], function() {
    function say(name) {
        return "My name is " + name;
    }
    return {
        say: say
    };
})

myModules.define("bar", ["foo"], function() {
    var name = "Harry";

    function sayAnother() {
        console.log(foo.say(name).toUpperCase());
    }
    return {
        sayAnother: sayAnother
    };
})

var foo = myModules.get("foo");
var bar = myModules.get("bar");
console.log(foo.say("jack"));
bar.sayAnother();