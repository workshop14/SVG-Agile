describe('Viewer with single group and no compound transforms', function(){
  var agileGroup, agile, hammertime;

  beforeEach(function(){
    var SVGString = 
    '<svg id="test" width="500" viewBox="0 0 2000 1000">' +
      '<g id="A">' +
        '<path id="myPath"' +
      '<g>' +
      '<g id="B"><g>' +
    '</svg>';
    document.body.innerHTML += SVGString;
    agileGroup = document.getElementById('A');
    agile = new Viewer('A');
    hammertime = agile._test.hammertime;
  });

  afterEach(function(){
    var fix = document.getElementById('test');
    fix.parentElement.removeChild(fix);
    agile.kill();
  });

  it('should consolidate transfomrs and create a identity transform', function(){
    expect(agileGroup.getAttribute('transform')).toEqual('matrix(1 0 0 1 0 0)');
  });

  describe('Dragging the group', function(){
    beforeEach(function(){
      hammertime.trigger('touch', {target: agileGroup});
      hammertime.trigger('dragstart', {});
    });

    afterEach(function(){
      hammertime.trigger('release', {});
    });

    it('should drag horizontally', function(){
      hammertime.trigger('drag', {deltaX: 250, deltaY: 0});
      expect(agileGroup.getAttribute('transform')).toEqual('matrix(1 0 0 1 1000 0)');
    });

    it('should drag vertically', function(){
      hammertime.trigger('drag', {deltaX: 0, deltaY: 250});
      expect(agileGroup.getAttribute('transform')).toEqual('matrix(1 0 0 1 0 1000)');
    });

    it('should drag diagonally', function(){
      hammertime.trigger('drag', {deltaX: -250, deltaY: -250});
      expect(agileGroup.getAttribute('transform')).toEqual('matrix(1 0 0 1 -1000 -1000)');
    });

    it('should drag from the same anchor point', function(){
      hammertime.trigger('drag', {deltaX: 0, deltaY: 250});
      hammertime.trigger('drag', {deltaX: -250, deltaY: -250});
      expect(agileGroup.getAttribute('transform')).toEqual('matrix(1 0 0 1 -1000 -1000)');
    });

    it('should set a new anchor point on dragend events', function(){
      hammertime.trigger('dragend', {deltaX: -250, deltaY: -250});
      hammertime.trigger('drag', {deltaX: 250, deltaY: 0});
      expect(agileGroup.getAttribute('transform')).toEqual('matrix(1 0 0 1 0 -1000)');
    });
  });

describe('zooming on the group', function(){
  beforeEach(function(){
      hammertime.trigger('touch', {target: agileGroup});
      hammertime.trigger('transformstart', {});
    });

    afterEach(function(){
      hammertime.trigger('release', {});
    });

    it('should be able to zoom from the origin', function(){
      var test = document.getElementById('test');
      var fix = test.getScreenCTM();
      hammertime.trigger('pinch', {center:{pageX:fix.e,  pageY: fix.f}, scale: 2});
      expect(agileGroup.getAttribute('transform')).toEqual('matrix(2 0 0 2 0 0)');
    });

    it('should zoom from the same achor point', function(){
      var test = document.getElementById('test');
      var fix = test.getScreenCTM();
      hammertime.trigger('pinch', {center:{pageX:fix.e,  pageY: fix.f}, scale: 2});
      fix = test.getScreenCTM();
      hammertime.trigger('pinch', {center:{pageX:fix.e,  pageY: fix.f}, scale: 2});
      expect(agileGroup.getAttribute('transform')).toEqual('matrix(2 0 0 2 0 0)');
    });

    it('should set a new anchor point on transformend events',function(){
      var test = document.getElementById('test');
      var fix = test.getScreenCTM();
      hammertime.trigger('transformend', {center:{pageX:fix.e,  pageY: fix.f}, scale: 2});
      fix = test.getScreenCTM();
      hammertime.trigger('pinch', {center:{pageX:fix.e,  pageY: fix.f}, scale: 2});
      expect(agileGroup.getAttribute('transform')).toEqual('matrix(4 0 0 4 0 0)');
    });
  });
  
  describe('touch interation', function(){

    it('should move when the touch is on any child of the active element', function(){
      child = document.getElementById('myPath');
      hammertime.trigger('touch', {target: child});
      hammertime.trigger('dragstart', {});
      hammertime.trigger('dragend', {deltaX: -250, deltaY: -250});
      hammertime.trigger('release', {});
      expect(agileGroup.getAttribute('transform')).toEqual('matrix(1 0 0 1 -1000 -1000)');
    });
  });

});