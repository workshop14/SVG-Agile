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
});