var student = require('./student');   //加载模块
var teacher = require('./teacher');

function add(teacherName, students) {
	teacher.add(teacherName);		//使用模块

	students.forEach( function(item, index){
		student.add(item);		//使用模块
	})
}

exports.add = add;

