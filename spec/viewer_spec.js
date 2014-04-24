describe('Viewer with single group and no compound transforms', function(){
  var agileGroup, agile, hammertime;

  beforeEach(function(){
    var SVGString = 
    '<svg id="test" width="500" viewBox="0 0 2000 1000">' +
      '<g id="testG"><g>' +
    '</svg>';
    document.body.innerHTML += SVGString;
    agileGroup = document.getElementById('testG');
    agile = new Viewer('testG');
    hammertime = agile._test.hammertime;
  });

  afterEach(function(){
    var fix = document.getElementById('test');
    fix.parentElement.removeChild(fix);
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

    it('should be possible to drag', function(){
      hammertime.trigger('drag', {deltaX: 500, deltaY: 250});
      expect(agileGroup.getAttribute('transform')).toEqual('matrix(1 0 0 1 1000 0)');
    });
  })

  // it('should raise and exception if not given an element id', function(){
  //   expect(function(){
  //     new Viewer('invalid');
  //   }).toThrow(new Error('No element found'));
  // });
  // it('should return the matrix', function(){
  //   var element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  //   console.log(element.createSVGMatrix());
  //   console.log(element.transform);
  //   agile = new Viewer('mySVG');
  // });
  // it('should be able to access base transform', function(){
  //   affix('svg#test g#inner');
  //   var element = document.getElementById('inner');
  //   expect(element.transform).toBeDefined();
  // });
  // it('should be possible to read svg stuff', function(){
  //   document.body.innerHTML += '<svg id="no-viewbox"><g id="testG" transform="matrix(1 0 0 1 -182.05128205128207 374.3589743589744)"></g></svg>';
  //   var group = document.getElementById('testG');
  //   console.log(group.transform.baseVal.consolidate());
  // });
});