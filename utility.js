//add img link and make link open in new tab
var i=0;
var img=document.querySelectorAll("img")
for (i=0;i<img.length;i++){
	var aimg=document.createElement("a");
	aimg.href=img[i].src;
	img[i].parentNode.insertBefore(aimg, img[i]);
	aimg.appendChild(img[i])
}
var link=document.querySelectorAll("a");
for (i=0;i<link.length;i++){
	link[i].setAttribute("target","_blank")
}
//add back to top button
var af=document.createElement("link");
af.rel="stylesheet";
af.href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css";
document.head.appendChild(af);
var tp=document.createElement("span");
tp.className="fa fa-chevron-circle-up fa-2x top";
tp.setAttribute("style","cursor: pointer; opacity:0; position: fixed; right: 40px; bottom: 25px; transition: opacity 0.7s;");
document.body.appendChild(tp);
//var tp=document.querySelector("span.top")
tp.addEventListener('click',function(e){
	var sm=function(){
		if((document.body.scrollTop||document.documentElement.scrollTop)==0){
			return;
		}else{
			scroll(0,(document.body.scrollTop||document.documentElement.scrollTop)*0.9);
			setTimeout(sm,0.1);
		}
	};
	sm();
},false)
window.onscroll=function(){
	if((document.body.scrollTop||document.documentElement.scrollTop)==0){
		document.querySelector("div#h1").style.boxShadow="none";
		
	}else{
		document.querySelector("div#h1").style.boxShadow="0px 1px 10px";
	}
	if((document.body.scrollTop||document.documentElement.scrollTop)>window.innerHeight/2){
		document.querySelector("span.top").style.opacity=0.8;
		document.querySelector("span.top").style.cursor="pointer";
	}else{
		document.querySelector("span.top").style.opacity=0;
		document.querySelector("span.top").style.cursor="initial";
	}
}
//textarea auto height
var ta=document.querySelector("textarea.auto");
ta.addEventListener("keyup",function(e){
	//console.log(e.target)
	var target=e.target;
	//target.style.height=(target.scrollHeight-parseInt(window.getComputedStyle(target,null)["paddingTop"])-parseInt(window.getComputedStyle(target,null)["paddingBottom"]))+"px";
	document.querySelector('#output').style.border="solid 1px rgb(131, 131, 131)";
	document.querySelector('#output').style.background="";
	document.querySelector('#output').style.paddingLeft="10px";
	document.querySelector('#output').style.paddingRight="10px";
	document.querySelector('#output').style.maxWidth="400px";
	document.querySelector('#output').innerHTML = marked(document.querySelector("textarea.auto").value+"\n\n--------\n<p style='font-size: 0.5em'>本文由 archion.github.io/changweibo 在线生成<p>");
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
	MathJax.Hub.Typeset()
},false)
ta.addEventListener("focus",function(e){
	//console.log(e.target)
	var target=e.target;
	//target.style.height=(target.scrollHeight-parseInt(window.getComputedStyle(target,null)["paddingTop"])-parseInt(window.getComputedStyle(target,null)["paddingBottom"]))+"px";
	document.querySelector('#output').style.border="solid 1px rgb(131, 131, 131)";
	document.querySelector('#output').style.background="";
	document.querySelector('#output').style.paddingLeft="10px";
	document.querySelector('#output').style.paddingRight="10px";
	document.querySelector('#output').style.maxWidth="400px";
	document.querySelector('#output').innerHTML = marked(document.querySelector("textarea.auto").value+"\n\n--------\n<p style='font-size: 0.5em'>本文由 archion.github.io/changweibo 在线生成<p>");
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
	MathJax.Hub.Typeset()
},false)
var bt=document.querySelector("#gn");
bt.addEventListener("mousedown",function(e){
	document.querySelector('#output').style.border="none";
	html2canvas(document.querySelector('#output'),
			{
				onrendered: function(c){
					document.querySelector('#output').innerHTML='';
					document.querySelector('#output').appendChild(c);
					document.querySelector('#output').style.background="white";
					document.querySelector('#output').style.padding="0px";
					document.querySelector('#output').style.maxWidth="420px";
				},
				allowTaint: true, 
				taintTest: false,
			}
			);
},false)
ta.focus();
