function update(e){
	var value=it.value;
	document.querySelector("span#width").innerHTML=ir.value+"px"
	//document.styleSheets[0].insertRule("#output::after{ content: "+value+"!important;}",document.styleSheets[0].cssRules.length);
	output.style.border="solid 1px rgb(131, 131, 131)";
	output.style.background="";
	output.style.paddingLeft="10px";
	output.style.paddingRight="10px";
	output.style.maxWidth=ir.value+"px";
	output.innerHTML = marked(document.querySelector("textarea.auto").value+"\n\n--------\n<p style='font-size: 0.7em'>本文由 archion.github.io/changweibo 在线生成<p>");
	var sy=document.createElement("div");
	sy.id="sy"
	if (value.search(/blob:/)>=0){
		ic.checked=true;
	}
	if (ic.checked){
		value="url("+value+")";
		sy.style.backgroundImage=value;
	}else{
		sy.innerHTML=value;
	}
	sy.style.height=ir.value+"px";
	sy.style.width="800px";
	sy.style.lineHeight=ir.value+"px";
	sy.style.opacity=parseInt(io.value)/100.+"";
	sy.style.top=parseInt(getComputedStyle(output,null).getPropertyValue("height"))/2+"px";
	sy.style.transform="translateX(-"+(800-parseInt(ir.value))/2+"px"+") translateY(-50%) rotate(-60deg)"
	sy.style.webkitTransform="translateX(-"+(800-parseInt(ir.value))/2+"px"+") translateY(-50%) rotate(-60deg)"
	sy.style.msTransform="translateX(-"+(800-parseInt(ir.value))/2+"px"+") translateY(-50%) rotate(-60deg)"
	sy.style.mozTransform="translateX(-"+(800-parseInt(ir.value))/2+"px"+") translateY(-50%) rotate(-60deg)"
	output.appendChild(sy);
	hljs.highlightBlock(document.querySelector("pre code"));
	MathJax.Hub.Typeset();
}
function dropFile(el,handler){
	el.addEventListener("dragover", function(e) {
		e.preventDefault();
	},false)
	el.addEventListener("drop", function(e) {
		e.preventDefault();
		handler(e);
	},false)
};
function getURL(e){
	var target=e.target;
	if (target.tagName.toLowerCase()=="textarea"){
		target.value=target.value.substring(0,target.selectionStart)+"\n![]("+window.URL.createObjectURL(e.dataTransfer.files[0])+")\n"+target.value.substring(target.selectionEnd);
	}else{
		target.value=target.value.substring(0,target.selectionStart)+window.URL.createObjectURL(e.dataTransfer.files[0])+target.value.substring(target.selectionEnd);
	}
}
var ta=document.querySelector("textarea");
var bt=document.querySelector("#gn");
var it=document.querySelector("input[type=text]")
var ic=document.querySelector("input[type=checkbox]")
var io=document.querySelector("input[type=range]")
var ir=document.querySelector("input[type=range]#wth")
var output=document.querySelector('#output');
ta.addEventListener("keyup",update,false)
ta.addEventListener("focus",update,false)
ta.addEventListener("drop",update,false)
dropFile(ta,getURL);
dropFile(it,getURL);
it.addEventListener("keyup",update,false)
it.addEventListener("focus",update,false)
it.addEventListener("drop",update,false)
ic.addEventListener("change",update,false)
ir.addEventListener("input",update,false)
io.addEventListener("input",update,false)
bt.addEventListener("click",function(e){
	output.style.border="none";
	output.style.background="white";
	html2canvas(output,
			{
				onrendered: function(c){
					//document.styleSheets[0].insertRule("#output::after{ content: ''!important;}",document.styleSheets[0].cssRules.length);
					output.innerHTML='';
					output.appendChild(c);
					output.style.padding="0px";
					output.style.maxWidth=(parseInt(ir.value)+20)+"px";
					document.querySelector('#tip').style.visibility="visible";
					document.querySelector('#tip').style.opacity="0.9";
					setTimeout(function(){document.querySelector('#tip').style.opacity="0";document.querySelector('#tip').style.visibility="hidden";},2000);
				},
				allowTaint: true, 
				taintTest: false,
			}
			);
},false)
ta.focus()
