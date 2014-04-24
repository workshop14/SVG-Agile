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

    var anchor = transform.matrix.scale(1);

    element.transform.baseVal.initialize(transform);

    this.readAnchor = function(){
      return anchor;
    };
    this.setAnchor = function(matrix){
      anchor = matrix;
    };
    this.setCurrent = function(matrix){
      transform.setMatrix(matrix);
      element.transform.baseVal.initialize(transform);
    };

    var screenCTM = svgContainer.getScreenCTM().inverse();

    this.drag = function(dX, dY, permanent){
      dX = screenCTM.a * dX;
      dY = screenCTM.d * dY;
      this.translate(dX, dY, permanent);
    };
  };
  Sprite.prototype.translate = function(dX, dY, permanent){
    var newMatrix = this.readAnchor().translate(dX, dY);
    this.setCurrent(newMatrix);
    if (permanent) { this.setAnchor(newMatrix); }
  };
}());