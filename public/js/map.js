var mapInfo = document.getElementsByClassName("map-info")
var specificInfo = document.getElementsByClassName("map-specific-info")[0]
for(var i = 0; i < mapInfo.length; i++){
	(function(i){		
		mapInfo[i].addEventListener("click",function(){
			specificInfo.children[0].src = this.children[1].src
			specificInfo.style.display = "block"
		})
	})(i)
}
specificInfo.addEventListener("click",function(){
	specificInfo.style.display="none"
})