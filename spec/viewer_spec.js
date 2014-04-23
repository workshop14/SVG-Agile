describe('Viewer', function(){
  it('should raise and exception if not given an element id', function(){
    expect(function(){
      new Viewer('invalid');
    }).toThrow(new Error('No element found'));
  });
  it('should return the matrix', function(){
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    console.log(element.createSVGMatrix());
    console.log(element.transform);
    agile = new Viewer('mySVG');
  });
  it('should be able to access base transform', function(){
    affix('svg#test g#inner');
    var element = document.getElementById('inner');
    expect(element.transform).toBeDefined();
  });
});