(function(){
  function compoundTransform(element){
    return element.transform.baseVal.consolidate();
  }

  function unitTransform(svg){
    return svg.createSVGTransform(svg.createSVGMatrix());
  }

  function setTransform(element, transform){
    // element.transform.baseVal.initialize(transform);
    var m = transform.matrix;
    var str = 'matrix(' + [m.a,m.b,m.c,m.d,m.e,m.f].join(' ') + ')';
    element.setAttribute('transform', str);
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
      inverseScreenCTM = element.getScreenCTM().inverse();
    };
    this.scaleTo = function(dX, dY){
      dX = inverseScreenCTM.a * dX;
      dY = inverseScreenCTM.d * dY;
      return {dX: dX, dY: dY};
    };
    this.mapTo = function(x, y){
      x = inverseScreenCTM.a * x + inverseScreenCTM.e;
      y = inverseScreenCTM.d * y + inverseScreenCTM.f;
      return {x: x, y: y};
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

  Sprite.prototype.zoom = function(x, y, magnification, permanent){
    var vector = this.mapTo(x,y);
    this.scale(vector.x, vector.y, magnification, permanent);
    this.updateCTM();
  };

  Sprite.prototype.scale = function(x, y, magnification, permanent){
    var newMatrix = this.readAnchor().translate(x, y).scale(magnification).translate(-x, -y);
    this.setCurrent(newMatrix);
    if (permanent) { this.setAnchor(newMatrix); }
  };
}());