describe('homeControl',function(){
    var controller,scope;
    beforeEach(function() {
        module('elaMain');
        module('fileUpload');
        module('uploadApp');
    });
    beforeEach(inject(function($injector,_$controller_){
        scope=$injector.get('$rootScope').$new();
        controller=_$controller_('homeControl',{
            $scope:scope
        });
    }));
    it('should define controller',function(){
        expect(controller).toBeDefined();
        expect(typeof controller).toBe("object");
    });
    it('should initialize variables',function(){
       expect(typeof scope.todoList).toBe("object");
    });
});
describe('navCtrl',function(){
    var controller,scope,$location;
    beforeEach(function() {
        module('elaMain');
        module('fileUpload');
        module('uploadApp');
    });
    beforeEach(inject(function($injector,_$controller_,_$location_){
        scope=$injector.get('$rootScope').$new();
        $location=_$location_;
        controller=_$controller_('navCtrl',{
            $scope:scope,
            $location:$location
        });
    }));
    it('should define controller',function(){
        expect(controller).toBeDefined();
        expect(typeof controller).toBe("object");
    });
    it('should call navClass',function(){
        var result=scope.navClass('home');
       expect(result).toBe("active");
    });
    it('should call navClass unactive',function(){
        var result=scope.navClass('input');
       expect(result).toBe("");
    }); 
    it('should call selectList',function(){
        scope.selectList('input','home');
    });
});
describe('MyCtrl',function(){
    var controller,scope,httpBackend,Upload,timeout;
      beforeEach(function() {
        module('elaMain');
        module('fileUpload');
        module('uploadApp');
    });
    beforeEach(inject(function($injector,_Upload_,_$controller_,$httpBackend,_$timeout_){
        scope=$injector.get('$rootScope').$new();
        Upload = _Upload_;
        timeout=_$timeout_;
        httpBackend=$httpBackend;
        controller=_$controller_('MyCtrl',{
            $scope:scope,
            Upload:_Upload_,
            $timeout:timeout
        });
    }));
    it('should define controller',function(){
        expect(controller).toBeDefined();
        expect(typeof controller).toBe("object");
    });
    it('should define init variables',function(){
        expect(scope.errorMsg ).not.toBeDefined();
    });
    it('should call uploadFile with success',function(){
        var files=[{name:"test.png",size:1073741826}];
        httpBackend.whenPOST('https://angular-file-upload-cors-srv.appspot.com/upload').respond(200,{data:{}});
        spyOn(Upload,'upload').and.callFake(function(){
            return {
                then:function(callback){ return callback({data:"success",config:{data:{file:{name:"test.png"}}}})}
            };
        });      
        scope.uploadPic(files);
        timeout.flush();
        expect(Upload.upload).toHaveBeenCalled();
    });
    it('should call uploadFile with progress',function(){
        var files=[{name:"test.png",size:1073741826}];
        httpBackend.whenPOST('https://angular-file-upload-cors-srv.appspot.com/upload').respond(200,{data:{}});
        spyOn(Upload,'upload').and.callFake(function(){
            return {
                then:function(callback,callback2,callback3){ return callback3({data:"success",loaded:100,total:100,config:{data:{file:{name:"test.png"}}}})}
            };
        });      
        scope.uploadPic(files);
        expect(Upload.upload).toHaveBeenCalled();
    });
    it('should call uploadFile with error',function(){
        var files=[{name:"test.png",size:1073741826}];
        httpBackend.whenPOST('https://angular-file-upload-cors-srv.appspot.com/upload').respond(500,{data:{}});
        spyOn(Upload,'upload').and.callFake(function(){
            return {
                then:function(callback,callback2,callback3){ return callback2({status:2})}
            };
        });      
        scope.uploadPic(files);
        expect(Upload.upload).toHaveBeenCalled();
    });
});