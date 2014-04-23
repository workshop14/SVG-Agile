(function(){
  Viewer = function(id){
    var element = document.getElementById(id);
    if (element) { return element; }
    throw 'No element found';
  };
}());