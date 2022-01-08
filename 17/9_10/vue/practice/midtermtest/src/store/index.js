import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
	stage: '初级课程',
	itemNum: 1,
	alltime: 0,
	timer: '',
	itemDetail: [{
		questionid: 1,		//C
		question: '关于经纬线的说法，正确的是:',
		testAnswer: [{
			question_answer_id: 1,
			question_answer: '所有纬线长度相等'
		},{
			question_answer_id: 2,
			question_answer: '每条经线都自成一个圆'
		},{
			question_answer_id: 3,
			question_answer: '纬线指示东西方向'
		},{
			question_answer_id: 4,
			question_answer: '地球仪上经线有360条'
		}]
	  },{
	  	questionid: 2,		//D
		question: '关于等高线地形图的读法正确的是:',
		testAnswer: [{
			question_answer_id: 5,
			question_answer: '等高线闭合表示山峰'
		},{
			question_answer_id: 6,
			question_answer: '等高线弯曲部分表示山谷'
		},{
			question_answer_id: 7,
			question_answer: '等高线重叠表示山脊'
		},{
			question_answer_id: 8,
			question_answer: '坡陡的地方，等高线密集'
		}]
	  },{
	  	questionid: 3,		//C
		question: '世界上面积最大的岛屿是格陵兰岛，其位于:',
		testAnswer: [{
			question_answer_id: 9,
			question_answer: '亚洲'
		},{
			question_answer_id: 10,
			question_answer: '非洲'
		},{
			question_answer_id: 11,
			question_answer: '北美洲'
		},{
			question_answer_id: 12,
			question_answer: '南极洲'
		}]
	  },{
	  	questionid: 4,		//D
		question: '板块构造学说认为:',
		testAnswer: [{
			question_answer_id: 13,
			question_answer: '地球表层是由岩石组成的整体一块'
		},{
			question_answer_id: 14,
			question_answer: '板块是静止不动的'
		},{
			question_answer_id: 15,
			question_answer: '板块与板块交界的地带，地壳比较稳定'
		},{
			question_answer_id: 16,
			question_answer: '板块内部地壳比较定'
		}]
	  },{
	  	questionid: 5,		//B
		question: '当我们放寒假过春节时，澳大利亚的小朋友在:',
		testAnswer: [{
			question_answer_id: 17,
			question_answer: '放寒假'
		},{
			question_answer_id: 18,
			question_answer: '放暑假'
		},{
			question_answer_id: 19,
			question_answer: '放春假'
		},{
			question_answer_id: 20,
			question_answer: '放秋假'
		}]
	  },{
	  	questionid: 6,		//D
		question: '青藏高原纬度较低，但气候寒冷，其最主要的影响因素是:',
		testAnswer: [{
			question_answer_id: 21,
			question_answer: '纬度位置'
		},{
			question_answer_id: 22,
			question_answer: '海陆位置'
		},{
			question_answer_id: 23,
			question_answer: '洋流因素'
		},{
			question_answer_id: 24,
			question_answer: '地形因素'
		}]
	  },{
	  	questionid: 7,		//B
		question: '下列说法表明天气状况的:',
		testAnswer: [{
			question_answer_id: 25,
			question_answer: '昆明四季如春'
		},{
			question_answer_id: 26,
			question_answer: '夜来风雨声'
		},{
			question_answer_id: 27,
			question_answer: '鞍山四季分明'
		},{
			question_answer_id: 28,
			question_answer: '三亚长夏无冬'
		}]
	  },{
	  	questionid: 8,		//C
		question: '决定人口自然增长率的是:',
		testAnswer: [{
			question_answer_id: 29,
			question_answer: '出生人数和死亡人数'
		},{
			question_answer_id: 30,
			question_answer: '死亡率'
		},{
			question_answer_id: 31,
			question_answer: '出生率和死亡率'
		},{
			question_answer_id: 32,
			question_answer: '出生率'
		}]
	  },{
	  	questionid: 9,		//A
		question: '下列建筑中，属于伊斯兰教的是:',
		testAnswer: [{
			question_answer_id: 33,
			question_answer: '清真寺'
		},{
			question_answer_id: 34,
			question_answer: '布达拉宫'
		},{
			question_answer_id: 35,
			question_answer: '龙泉寺'
		},{
			question_answer_id: 36,
			question_answer: '巴黎圣母院'
		}]
	  },{
	  	questionid: 10,		//C
		question: '2001年12月11日，中国加入的重要国际组织（WTO）是:',
		testAnswer: [{
			question_answer_id: 37,
			question_answer: '石油输出国组织'
		},{
			question_answer_id: 38,
			question_answer: '联合国'
		},{
			question_answer_id: 39,
			question_answer: '世界贸易组织'
		},{
			question_answer_id: 40,
			question_answer: '亚洲太平洋经济合作组织（APEC）'
		}]
	}],
	answerid: []
}

export default new Vuex.Store({		//-S要大写
	state,
	actions,
	mutations,
})