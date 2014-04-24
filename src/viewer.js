(function(){
  function getElement(id){
    var element = document.getElementById(id);
    if (element) { return element; }
    throw 'No element found';
  }

  function touchHandler (event) {
    activityOn(hammertime);
  }

  function dragHandler(){
    element.setAttribute('transform', 'matrix(1 0 0 1 1000 0)');
  }

  Viewer = function(id){
    var element = getElement(id);
    var matrix = element.transform.baseVal.consolidate() || element.ownerSVGElement.createSVGMatrix();
    var output = 'matrix('+ [matrix.a,matrix.b,matrix.c,matrix.d,matrix.e,matrix.f].join(' ') + ')';
    var hammertime = Hammer(document).on('touch', touchHandler);
    element.setAttribute('transform', output);
    function touchHandler (event) {
      activityOn(hammertime);
    }

    function dragHandler(event){
      var ctm = element.parentNode.getScreenCTM().inverse();
      var deltaX = ctm.a * event.gesture.deltaX;
      var deltaY = ctm.a * event.gesture.deltaY;
      var newMatrix = matrix.translate(deltaX, deltaY);
      newTransform = element.transform.baseVal.createSVGTransformFromMatrix(newMatrix);
      element.transform.baseVal.initialize(newTransform);
    }

    function activityOn(instance){
      instance.on('drag', dragHandler);
      //instance.on('dragend', dragendHandler);
      //instance.on('pinch', pinchHandler);
      //instance.on('transformend', transformendHandler);
      //instance.on('release', releaseHandler);
    }

    function activityOff(instance){
      instance.off('drag', dragHandler);
      //instance.on('dragend', dragendHandler);
      //instance.on('pinch', pinchHandler);
      //instance.on('transformend', transformendHandler);
      //instance.on('release', releaseHandler);
    }

    this.kill = function(){
      activityOff(hammertime);
      hammertime.off('touch', touchHandler)
    };

    this._test = {
      hammertime: hammertime
    };
  };
}());