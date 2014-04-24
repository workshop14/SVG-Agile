(function(){
  var SVGNS = 'http://www.w3.org/2000/svg';

  var dummySVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  function createSVGTransform(matrix){
    var transform = dummySVG.createSVGTransform();
    transform.setMatrix(matrix);
    return transform;
  }

  function setTransform(element, transform){
    element.transform.baseVal.initialize(transform);
  }

  function identityMatrix(){
    return dummySVG.createSVGMatrix();
  }

  function getElement(id){
    var element = document.getElementById(id);
    if (element) { return element; }
    throw 'No element found';
  }

  Viewer = function(id){
    var activeElement = getElement(id);
    var matrix = activeElement.transform.baseVal.consolidate() || identityMatrix();
    var hammertime = Hammer(document).on('touch', touchHandler);
    setTransform(activeElement, createSVGTransform(matrix));
    
    function touchHandler (event) {
      activityOn(hammertime);
    }

    function drag(deltaX, deltaY){
      var ctm = activeElement.parentNode.getScreenCTM().inverse();
      deltaX = ctm.a * deltaX;
      deltaY = ctm.a * deltaY;
      var newMatrix = matrix.translate(deltaX, deltaY);
      setTransform(activeElement, createSVGTransform(newMatrix));
      return newMatrix;
    }

    function dragHandler(event){
      drag(event.gesture.deltaX, event.gesture.deltaY);
    }

    function dragendHandler(event){
      matrix = drag(event.gesture.deltaX, event.gesture.deltaY);
    }

    function releaseHandler(event){
      activityOff(hammertime);
    }

    function activityOn(instance){
      instance.on('drag', dragHandler);
      instance.on('dragend', dragendHandler);
      instance.on('release', releaseHandler);
    }

    function activityOff(instance){
      instance.off('drag', dragHandler);
      instance.off('dragend', dragendHandler);
      instance.off('release', releaseHandler);
    }

    this.kill = function(){
      activityOff(hammertime);
      hammertime.off('touch', touchHandler);
    };

    this._test = {
      hammertime: hammertime
    };
  };
}());