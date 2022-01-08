<template>
	<div class="wrap">
		<ul>
			<li v-for="book in books" class="clearfix">	
				<div class="imgbox left">
					<img class="viewpic" :src="book.imgsrc" />
				</div>
				<div  class="bookdet right">
					<p class="top clearfix">
						<span class="bookname left">{{book.name}}</span>
						<span class="bookpublish right">{{book.publicationYear}}</span>
					</p>
					<p class="bot clearfix">
						<span class="bookauthor left">{{book.author}}</span>
						<span class="bookpri right">{{book.price}}</span>
					</p>
				</div>
				<p class="both bookIntr"><span>{{book.text}}</span></p>
			</li>
		</ul>
	</div>	
</template>

<script>
	import imgSrc from '@/assets/bookview.jpg'

	export default {
		data () {
			return {
				books: [
					{
						name: '红楼梦', author: '曹雪芹', imgsrc: imgSrc,
						text: '《红楼梦》，中国古典四大名著之首，清代作家曹雪芹创作的章回体长篇小说[1],又名《石头记》《金玉缘》。',
						price: '￥180.00', publicationYear: '2010年'
					},{
						name: '西游记', author: '吴承恩', imgsrc: imgSrc,
						text: '《西游记》是中国古代第一部浪漫主义章回体长篇神魔小说。该书以“唐僧取经”这一历史事件为蓝本，通过作者的艺术加工，深刻地描绘了当时的社会现实。',
						price: '￥130.00', publicationYear: '2012年'
					}, {
						name: '三国演义', author: '罗贯中', imgsrc: imgSrc,
						text: '《三国演义》是中国古典四大名著之一，是中国第一部长篇章回体历史演义小说，全名为《三国志通俗演义》（又称《三国志演义》），作者是元末明初的著名小说家罗贯中。',
						price: '￥150.00', publicationYear: '2011年'
					},{
						name: '水浒传', author: '施耐庵', imgsrc: imgSrc,
						text: '《水浒传》，是中国四大名著之一，全书描写北宋末年以宋江为首的108位好汉在梁山聚义，以及聚义之后接受招安、四处征战的故事。',
						price: '￥120.00', publicationYear: '2013年'
					}
				]
			}
			
		}
	}
</script>	

<style>
	.wrap li {
		display: block;
	}
	.imgbox {
		
	}
	img {
		width: 2rem;
	}
	.bookdet{
		width: 4.8rem;
		padding: 0 .1rem;
	}
	.top, .bot {
		height: 1rem;
		line-height: 1rem;
	}


	.bookIntr{
		text-indent: .43rem;
		text-align: left;
		padding: .1rem 0;
	}
</style>