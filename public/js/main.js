/*
 * 轮播图
 */
var sowingStep = 1 , sowingTimer
var sowingUl = document.getElementsByClassName('sowing-ul')[0]
var sowingLeft = document.getElementsByClassName('sowing-left')[0]
var sowingRight = document.getElementsByClassName('sowing-right')[0]

sowing()
sowingLeft.addEventListener('click',function(){
	clearInterval(sowingTimer)
	sowingStep--
	if(sowingStep<=0){
		sowingStep=5
	}
	sowingUl.style.transform = "translateX("+(-16.6666*sowingStep)+"%)"
	sowing()
})
sowingRight.addEventListener('click',function(){
	clearInterval(sowingTimer)
	sowingStep++
	if(sowingStep>=6){
		sowingStep=1
	}
	sowingUl.style.transform = "translateX("+(-16.6666*sowingStep)+"%)"	
	sowing()
})
function sowing(){
	sowingTimer = setInterval(function(){
		if(sowingStep>=5 ){
			sowingStep=0
		}
		sowingStep++		
		sowingUl.style.transform = "translateX("+(-16.6666*sowingStep)+"%)"
		sowingUl.style.transition = "all 1s"
	},2000)
}

/*
 * 切换章节
 */
var loadStoryStep = 0, count
var loadStory = document.getElementsByClassName("index-story-loadall")[0]
var storyArticle = document.getElementsByClassName("index-story-article")[0]
var storyChapter = document.getElementsByClassName("index-story-chapter")
var storyBefore = document.getElementsByClassName("index-story-before")[0]
var storyAfter = document.getElementsByClassName("index-story-after")[0]
var storyNav = document.getElementsByClassName("index-story-nav")[0]
var storyTitle = document.getElementsByClassName("index-story-title")[0]
var titleList = document.getElementsByClassName("index-story-titleList")[0]
var chapterList = document.getElementsByClassName("chapterList")
var listTitle = document.getElementsByClassName("listTitle")[0]
var theTitle = document.getElementsByClassName("theTitle")
function stop(e) {
	if (e.stopPropagation){
		e.stopPropagation();
	}else{
		e.cancelBubble = true;
	}
}
function storyBtn(){
	if(loadStoryStep===0){
		storyBefore.style.display = "none"
	}else{
		storyBefore.style.display = "inline-block"
	}
	if(loadStoryStep>=storyChapter.length-1){
		storyAfter.style.display = "none"
	}else{
		storyAfter.style.display = "inline-block"
	}
}
function chapterMove(i){
	loadStoryStep = i
	storyBtn()
	chatperMain()
}
function chatperMain(){
	listTitle.innerText = theTitle[loadStoryStep].innerText
	if(window.getComputedStyle(storyChapter[count]).height=== "1000px"){
		storyArticle.style.marginLeft = (-100*loadStoryStep)+"%"
	}else{
		storyChapter[count].style.height = "1000px"
		setTimeout(function(){
			storyArticle.style.marginLeft = (-100*loadStoryStep)+"%"
			loadStory.innerHTML = '<i class="iconfont"></i>点击查看全部<i class="iconfont"></i>'
		},1000)
	}
}
function nextChapter(event){
	var theEvent = event|| window.event
	count = loadStoryStep
	loadStoryStep+=1
	chatperMain()
	setTimeout(function(){storyBtn()},1000)
	theEvent.name="nextChapter"
	lockBtn(this,theEvent)
}
function beforeChapter(event){
	var theEvent = event|| window.event
	count = loadStoryStep
	loadStoryStep-=1
	chatperMain()
	setTimeout(function(){storyBtn()},1000)
	event.name="beforeChapter"
	lockBtn(this,theEvent)
}
function lockBtn(btn,e){
	if(e.name==="nextChapter"){
		btn.removeEventListener("click",nextChapter,false)
		setTimeout(function(){
			btn.addEventListener("click",nextChapter,false)
		},1000)
	}
	if(e.name==="beforeChapter"){
		btn.removeEventListener("click",beforeChapter,false)
		setTimeout(function(){
			btn.addEventListener("click",beforeChapter,false)
		},1000)
	}
}

storyNav.addEventListener("click",function(event){
	var theEvent = event|| window.event
	stop(theEvent)
	if(titleList.className==="index-story-titleList"){
		titleList.className+=" titleList-state"
	}else{
		titleList.className="index-story-titleList"
	}
})
for(var i = 0; i<chapterList.length-1; i++){
	(function(i){
		chapterList[i].addEventListener("mouseover",function(event){
			var theEvent = event|| window.event
			stop(theEvent)
			chapterList[i].className += " chapter-focus"
		})
		chapterList[i].addEventListener("mouseout",function(event){
			var theEvent = event|| window.event
			stop(theEvent)
			chapterList[i].className = "chapterList"
		})
		chapterList[i].addEventListener("click",function(event){
			var theEvent = event|| window.event
			stop(theEvent)
			titleList.className="index-story-titleList"
			listTitle.innerText = chapterList[i].innerText
			count = loadStoryStep
			chapterMove(i)
		})
	})(i)	
}
document.body.addEventListener("click",function(){
	titleList.className="index-story-titleList"
})
loadStory.addEventListener('click',function(){
	if(window.getComputedStyle(storyChapter[loadStoryStep]).height===storyChapter[loadStoryStep].scrollHeight+"px" || window.getComputedStyle(storyChapter[loadStoryStep]).height===storyChapter[loadStoryStep].scrollHeight-12+"px"){
		storyChapter[loadStoryStep].style.height = "1000px"
		loadStory.innerHTML = '<i class="iconfont"></i>点击查看全部<i class="iconfont"></i>'
	}else{
		storyChapter[loadStoryStep].style.height = storyChapter[loadStoryStep].scrollHeight+"px"
		loadStory.innerHTML = "点击收回"	
		if(storyChapter[loadStoryStep].className.length<=20){					
			storyChapter[loadStoryStep].className += " index-story-move"
		}else{
			return
		}			
	}
})

storyBtn()
storyAfter.addEventListener("click",nextChapter,false)
storyBefore.addEventListener("click",beforeChapter,false)







