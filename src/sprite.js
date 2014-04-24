(function(){
  Sprite = function(element){
    if (!element.ownerSVGElement) {
      throw 'Not an SVG element';
    }

    var transform = element.transform.baseVal.consolidate();
    element.transform.baseVal.initialize(transform);
  };
}());