(function(){
  function getElement(id){
    var element = document.getElementById(id);
    if (element) { return element; }
    throw 'No element found';
  }
  Viewer = function(id){
    var element = getElement(id);
    var matrix = element.transform.baseVal.consolidate() || element.ownerSVGElement.createSVGMatrix();
    var output = 'matrix('+ [matrix.a,matrix.b,matrix.c,matrix.d,matrix.e,matrix.f].join(' ') + ')';
    element.setAttribute('transform', output);
  };
}());