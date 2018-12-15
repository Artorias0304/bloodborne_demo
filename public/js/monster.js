var monster = document.getElementsByClassName("monster-info")
for(var i=0;i<monster.length;i++){
	(function(i){
		monster[i].addEventListener("mouseover",function(){
			monster[i].className+=" monster-run"
		})
		monster[i].addEventListener("mouseout",function(){
			monster[i].className="monster-info"
		})
	})(i)
}
