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
      activityOn(hammertime);
    }

    function dragHandler(event){
      sprite.drag(event.gesture.deltaX, event.gesture.deltaY);
    }

    function dragendHandler(event){
      sprite.drag(event.gesture.deltaX, event.gesture.deltaY, true);
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