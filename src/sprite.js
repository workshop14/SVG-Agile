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

    var matrix = transform.matrix;

    element.transform.baseVal.initialize(transform);
    
    this.translate = function(dX, dY){
      var newMatrix = matrix.translate(dX, dY);
      transform.setMatrix(newMatrix);
      element.transform.baseVal.initialize(transform);
    };
  };
}());