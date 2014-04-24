describe('sprite with simple screen CTM', function(){
  var groupA, groupB, groupC, divD;
  beforeEach(function(){
    var SVGString = 
    '<svg id="test" width="500" viewBox="0 0 2000 1000">' +
      '<g id="A"><g>' +
      '<g id="B" transform="scale(2) translate(30,40)"><g>' +
      '<g id="C" transform="translate(30,40)"><g>' +
    '</svg>' +
    '<p id="D"></p>'
    ;
    document.body.innerHTML += SVGString;
    groupA = document.getElementById('A');
    groupB = document.getElementById('B');
    groupC = document.getElementById('C');
    divD = document.getElementById('D');
  });

  afterEach(function(){
    var fix = document.getElementById('test');
    fix.parentElement.removeChild(fix);
  });

  describe('initialising', function (){
    it('should raise an error if element does not belong to SVG', function(){
      expect(function(){
        var sprite = new Sprite(divD);
      }).toThrow(new Error('Not an SVG element'));
    });

    it('should replace translations with matrices', function(){
      var sprite = new Sprite(groupC);
      expect(groupC.getAttribute('transform')).toEqual('matrix(1 0 0 1 30 40)');
    });

    it('should consolidate multiple transforms', function(){
      var sprite = new Sprite(groupB);
      expect(groupB.getAttribute('transform')).toEqual('matrix(2 0 0 2 60 80)');
    });

    it('should create an identity transform when none provided', function(){
      var sprite = new Sprite(groupA);
      expect(groupA.getAttribute('transform')).toEqual('matrix(1 0 0 1 0 0)');
    });
  });

  describe('transformation', function(){
    var sprite;
    beforeEach(function(){
      sprite = new Sprite(groupA);
    });

    it('should translate in svg pixels', function(){
      sprite.translate(100, 200);
      expect(groupA.getAttribute('transform')).toEqual('matrix(1 0 0 1 100 200)');
    });

    it('should translate from the same origin', function(){
      sprite.translate(100, 200);
      sprite.translate(100, 200);
      expect(groupA.getAttribute('transform')).toEqual('matrix(1 0 0 1 100 200)');
    });

    it('should optionally fix the transformation', function(){
      sprite.translate(100, 200, true);
      sprite.translate(100, 200);
      expect(groupA.getAttribute('transform')).toEqual('matrix(1 0 0 1 200 400)');
    });
  });

  describe('drag', function(){
    var sprite;
    beforeEach(function(){
      sprite = new Sprite(groupA);
    });

    it('should drag in screen pixels', function(){
      sprite.drag(100, 200);
      expect(groupA.getAttribute('transform')).toEqual('matrix(1 0 0 1 400 800)');
    });

    it('should drag from the same origin', function(){
      sprite.drag(100, 200);
      sprite.drag(100, 200);
      expect(groupA.getAttribute('transform')).toEqual('matrix(1 0 0 1 400 800)');
    });

    it('should optionally fix the translation', function(){
      sprite.drag(100, 200, true);
      sprite.drag(100, 200);
      expect(groupA.getAttribute('transform')).toEqual('matrix(1 0 0 1 800 1600)');
    });
  });

  describe('scale', function(){
    var sprite;
    beforeEach(function(){
      sprite = new Sprite(groupA);
    });

    it('it should scale in SVG pixels', function(){
      sprite.scale(0, 0, 2);
      expect(groupA.getAttribute('transform')).toEqual('matrix(2 0 0 2 0 0)');
    });

    it('should scale from the same origin', function(){
      sprite.scale(0, 0, 2);
      sprite.scale(0, 0, 2);
      expect(groupA.getAttribute('transform')).toEqual('matrix(2 0 0 2 0 0)');
    });

    it('should optionally fix the scaling', function(){
      sprite.scale(0, 0, 2, true);
      sprite.scale(0, 0, 2);
      expect(groupA.getAttribute('transform')).toEqual('matrix(4 0 0 4 0 0)');
    });

    it('should scale from a central point', function(){
      sprite.scale(1000, 500, 2);
      expect(groupA.getAttribute('transform')).toEqual('matrix(2 0 0 2 -1000 -500)');
    });
  });

  describe('scale', function(){
    var sprite;
    beforeEach(function(){
      sprite = new Sprite(groupA);
    });

    it('should zoom in screen pixels', function(){
      var test = document.getElementById('test');
      var fix = test.getScreenCTM();
      sprite.zoom(fix.e, fix.f, 2);
      expect(groupA.getAttribute('transform')).toEqual('matrix(2 0 0 2 0 0)');
    });
  });
});