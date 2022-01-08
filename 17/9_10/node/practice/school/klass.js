const teacher = require('./teacher')
const student = require('./student')

function add(teachername, students) {
    teacher.add(teachername);
    students.forEach(function(element, index) {
        student.add(element);
    });
}

exports.add = add;