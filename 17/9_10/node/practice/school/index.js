const klass = require('./klass')

klass.add('Scott', ['Tom', 'Jack', 'Lisa']);
klass.add('Chales', ['Lily', 'Lucy', 'Bob']);

function add(classes) {
    classes.forEach(function(element, index) {
        const _class = element,
            teachername = _class.teachername,
            students = _class.students;

        klass.add(teachername, students);
    });
}

exports.add = add;