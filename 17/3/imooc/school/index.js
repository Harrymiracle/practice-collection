var klass = require('./class');

// klass.add('Scott', ['白富美', '高富帅']);

exports.add = function(classes){
	classes.forEach(function(item, index){
		var _klass = item;
		var teacherName = item.teacherName;
		var students = item.students;

		klass.add(teacherName, students);		//使用模块
	})
}
