import * as func from '../function.js'
import * as types from './mutations_types.js'

export default {
	[types.ADDEVENT](states, obj){
		states.count ++;
		obj.items.id = states.count;
		states.event.unshift(obj.items);
		func.local.set(states);
	},
	[types.EVENTDONE](states, obj){
		//forEach（）无法在所有元素都传递给调用的函数之前终止遍历。也就是说，没有像for循环中使用的相应的break语句。
		//如果要提前终止，必须把forEach（）方法放在一个try块中，并能抛出一个异常。
		//如果forEach（）调用的函数抛出foreach.break异常，循环会提前终止。
		for(let i=0,l=states.event.length; i<l; i++){
			if(states.event[i].id === obj.id){
				states.event[i].type = 2;
				states.event[i].time = func.getDate();
				var item = states.event[i];
				states.event.splice(i,1);
				break;
			}
		}
		states.event.unshift(item);
		func.local.set(states);
	},
	[types.EVENTTODO](states, obj){
		for(let i=0,l=states.event.length; i<l; i++){
			if(states.event[i].id === obj.id){
				states.event[i].type = 1;
				var item = states.event[i];
				states.event.splice(i,1);
				break;
			}
		}
		states.event.unshift(item);
		func.local.set(states);
	},
	[types.EVENTCANCEL](states, obj){
		for(let i=0,l=states.event.length; i<l; i++){
			if(states.event[i].id = obj.id){
				states.event[i].type = 3;
				var item = states.event[i];
				states.event.splice(i,1);
				break;
			}
		}
		states.event.unshift(item);
		func.local.set(states);
	},
	[types.CLEAREVENT](states){
		states.event = [];
		func.local.clear();
	},
	[types.DELEVENT](states, info){
		if(states.event[info.index].id = info.id){
			states.event.splice(info.index, 1);
		}else{
			states.event.filter(function(el,i){
				if(el.id === info.id){
					states.event.splice(i, 1);
				}
			})
		}
		func.local.set(states);
	},
	[types.EDITEVENT](states, info){
		if(states.event[info.index].id === info.id){
			states.event[info.index].content = info.content;
		}else{
			states.event.filter(function(el){
				if(el.id === info.id){
					el.content = info.content;
				}
			})
		}
		func.local.set(states);
	},
    [types.UPLOADDATA](states, data){
        data = JSON.parse(data);
        states.event = data.event.event;
        states.count = data.event.count;
        func.local.set(states);
    }
}