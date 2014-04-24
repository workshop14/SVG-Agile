(function(){
  function compoundTransform(element){
    return element.transform.baseVal.consolidate();
  }

  function unitTransform(svg){
    return svg.createSVGTransform(svg.createSVGMatrix());
  }

  function setTransform(element, transform){
    element.transform.baseVal.initialize(transform);
  }


  Sprite = function(element){
    var inverseScreenCTM;
    var svgContainer = element.ownerSVGElement;
    if (!svgContainer) { throw 'Not an SVG element'; }

    var transform = compoundTransform(element) || unitTransform(svgContainer);
    var anchor = transform.matrix.scale(1);

    setTransform(element, transform);
    
    this.readAnchor = function(){
      return anchor;
    };
    this.setAnchor = function(matrix){
      anchor = matrix;
    };
    this.setCurrent = function(matrix){
      transform.setMatrix(matrix);
      setTransform(element, transform);
    };
    this.updateCTM = function(){
      inverseScreenCTM = svgContainer.getScreenCTM().inverse();
    };
    this.scaleTo = function(dX, dY){
      dX = inverseScreenCTM.a * dX;
      dY = inverseScreenCTM.d * dY;
      return {dX: dX, dY: dY};
    };
    this.updateCTM();

  };

  Sprite.prototype.drag = function(dX, dY, permanent){
    var vector = this.scaleTo(dX, dY);
    this.translate(vector.dX, vector.dY, permanent);
  };

  Sprite.prototype.translate = function(dX, dY, permanent){
    var newMatrix = this.readAnchor().translate(dX, dY);
    this.setCurrent(newMatrix);
    if (permanent) { this.setAnchor(newMatrix); }
  };
}());