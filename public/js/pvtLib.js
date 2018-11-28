pvtLib=function(selector){
	return new pvtLib.fn.init(selector)
}
pvtLib.fn = pvtLib.prototype = {
	constructor: pvtLib,
	init:function(selector){
		return this
	}
}
pvtLib.fn.init.prototype=pvtLib.fn
 