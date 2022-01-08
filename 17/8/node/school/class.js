const teacher = require('./teacher');
const student = require('./student');

exports.add = function(teachername, students){
	teacher.add(teachername);
	students.forEach(function (item, index){
		student.add(item);
	});
};