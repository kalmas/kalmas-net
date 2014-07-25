'use strict';

describe('Controller: IndexCtrl', function () {

  // load the controller's module
  beforeEach(module('kalmasNetApp'));

  var IndexCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('content/blog/about.json').respond({interests: {}});
    scope = $rootScope.$new();
    IndexCtrl = $controller('IndexCtrl', {
      $scope: scope
    });
  }));

  it('should attach bio', function () {
    expect(scope.bio).toBeUndefined();
    $httpBackend.flush();
    expect(scope.bio).toBeUndefined();
  });
});
