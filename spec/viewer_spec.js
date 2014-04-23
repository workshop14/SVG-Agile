describe('Viewer', function(){
  it('should raise and exception if not given an element id', function(){
    expect(function(){
      new Viewer('invalid');
    }).toThrow(new Error('No element found'));
  });
});