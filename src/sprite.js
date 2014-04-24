(function(){
  Sprite = function(element){
    var svgContainer = element.ownerSVGElement;
    if (!svgContainer) {
      throw 'Not an SVG element';
    }

    var transform = element.transform.baseVal.consolidate();
    if (!transform) {
      transform = svgContainer.createSVGTransform();
      transform.setMatrix(svgContainer.createSVGMatrix());
    }

    element.transform.baseVal.initialize(transform);
  };
}());