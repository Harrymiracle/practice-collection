const localEvent = function(item){
	this.get = function(){
		let loc = localStorage.getItem(item);
		return loc ? JSON.parse(loc) : '';
	},
	this.set = function(obj){
		localStorage.setItem(item, JSON.stringify(obj));
	},
	this.clear = function(){
		localStorage.removeItem(item);
	}
}

export const local = new localEvent('do_just');
export const getDate = () => {
	let now = new Date(), 
		month = now.getMonth()+1;
	return now.getFullYear() + '年' + month + '月' + now.getDate();
}