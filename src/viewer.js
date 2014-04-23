(function(){
  function getElement(id){
    var element = document.getElementById(id);
    if (element) { return element; }
    throw 'No element found';
  }
  Viewer = function(id){
    var element = getElement(id);
    console.log(Object.keys(element));
    this.transform = element.transform;
  };
}());