(function(){

  function isChild(node, container) {
    while (node) {
      if (node === container) return true;
      node = node.parentNode;
    }
  }

  Agile = function(id){
    var activeElement = document.getElementById(id);
    if (!activeElement) { throw 'No element found'; }
    var sprite = new Sprite(activeElement);
    var hammertime = Hammer(document).on('touch', touchHandler);
    
    function touchHandler (event) {
      if (isChild(event.target, activeElement)) {
        activity('on');
      }
    }

    function dragHandler(event){
      sprite.drag(event.gesture.deltaX, event.gesture.deltaY);
    }

    function dragendHandler(event){
      sprite.drag(event.gesture.deltaX, event.gesture.deltaY, true);
    }

    function pinchHandler(event){
      sprite.zoom(event.gesture.center.pageX, event.gesture.center.pageY, event.gesture.scale);
    }

    function transformendHandler(event){
      sprite.zoom(event.gesture.center.pageX, event.gesture.center.pageY, event.gesture.scale, true);
    }

    function releaseHandler(event){
      activity('off');
    }

    function activity(option){
      hammertime[option]('drag', dragHandler);
      hammertime[option]('pinch', pinchHandler);
      hammertime[option]('transformend', transformendHandler);
      hammertime[option]('dragend', dragendHandler);
      hammertime[option]('release', releaseHandler);
    }

    this.kill = function(){
      activity('off');
      hammertime.off('touch', touchHandler);
    };

    this._test = {
      hammertime: hammertime
    };
  };
}());