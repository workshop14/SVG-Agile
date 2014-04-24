(function(){

  function getElement(id){
    var element = document.getElementById(id);
    if (element) { return element; }
    throw 'No element found';
  }

  Viewer = function(id){
    var activeElement = getElement(id);
    var sprite = new Sprite(activeElement);
    var hammertime = Hammer(document).on('touch', touchHandler);
    
    function touchHandler (event) {
      activity('on');
    }

    function dragHandler(event){
      sprite.drag(event.gesture.deltaX, event.gesture.deltaY);
    }

    function dragendHandler(event){
      sprite.drag(event.gesture.deltaX, event.gesture.deltaY, true);
    }

    function releaseHandler(event){
      activity('off');
    }

    function activity(option){
      hammertime[option]('drag', dragHandler);
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