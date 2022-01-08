const klass = require('./class');

klass.add('Scott',['Jack','Rose']);
klass.add('Harry',['Tom','John']);

exports.add = function(classes){
	classes.forEach(function (item, index){
		const _class = item;
		const teachername = _class.teachername;
		const students = _class.students;

		klass.add(teachername, students);
	})
}