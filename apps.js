function update(e){
	var value=it.value;
	if (value.search(/blob:/)>=0){
		ic.checked=true;
	}
	if (ic.checked){
		value="url("+value+")";
	}else{
		value="'"+value+"'";
	}
	document.styleSheets[0].insertRule("#output::before{ content: "+value+"!important;}",0);
	var output=document.querySelector('#output');
	output.style.border="solid 1px rgb(131, 131, 131)";
	output.style.background="";
	output.style.paddingLeft="10px";
	output.style.paddingRight="10px";
	output.style.maxWidth="400px";
	output.innerHTML = marked(document.querySelector("textarea.auto").value+"\n\n--------\n<p style='font-size: 0.7em'>本文由 archion.github.io/changweibo 在线生成<p>");
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
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
ta.addEventListener("keyup",update,false)
ta.addEventListener("focus",update,false)
ta.addEventListener("drop",update,false)
dropFile(ta,getURL);
dropFile(it,getURL);
it.addEventListener("keyup",update,false)
it.addEventListener("focus",update,false)
it.addEventListener("drop",update,false)
ic.addEventListener("change",update,false)
bt.addEventListener("click",function(e){
	document.querySelector('#output').style.border="none";
	document.querySelector('#output').style.background="white";
	html2canvas(document.querySelector('#output'),
			{
				onrendered: function(c){
					document.querySelector('#output').innerHTML='';
					document.querySelector('#output').appendChild(c);
					document.querySelector('#output').style.padding="0px";
					document.querySelector('#output').style.maxWidth="420px";
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
