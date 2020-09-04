

//this = window;
//imports-loader@0.8.0
//imports-loader@1.1.0
window.showMe = ()=>{
  console.log('showMe',this);  
};

window.showMe2 = function(){
  console.log('showMe2',this);
};

function showMe3 (name){
  this.name=name;
  console.log(this.name);
}

window.showMe3 = showMe3;


console.log(arguments);

console.log(window);

console.log(this);


