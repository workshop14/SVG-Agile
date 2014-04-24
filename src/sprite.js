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

    var matrix = transform.matrix.scale(1);

    element.transform.baseVal.initialize(transform);

    var screenCTM = svgContainer.getScreenCTM().inverse();

    this.translate = function(dX, dY, permanent){
      var newMatrix = matrix.translate(dX, dY);
      transform.setMatrix(newMatrix);
      element.transform.baseVal.initialize(transform);
      if (permanent) { matrix = newMatrix; }
    };
    this.drag = function(dX, dY, permanent){
      dX = screenCTM.a * dX;
      dY = screenCTM.d * dY;
      this.translate(dX, dY, permanent);
    };
  };
}());