class AppRequestController{
    constructor( API, $mdDialog, ToastService ){
        'ngInject';

        this.API = API;

        this.$mdDialog = $mdDialog;

        this.ToastService = ToastService;
    }

    $onInit(){
        this.query = {
            order   : 'id',
            limit   : 5,
            page    : 1,
        };

        this.requestList = {};

        this.fetchRequestList();

        this.filter = null;
    }

    filterTable( option = null ) {
        this.filter = option;
    }

    fetchRequestList() {
        this.API.all('request/list').post().then(function(response){
            this.requestList = response;
            this.filter = null;
        }.bind(this));
    }

    action( ev, data = null ) {
        this.$mdDialog.show({
            resolve : {
                getData : function(){
                    return data;
                }
            },  
            controller          : RequestDialogController,
            controllerAs        : 'requestDialogCtrl',
            templateUrl         : './views/app/components/app-request/form-dialog.html',
            parent              : angular.element(document.body),
            targetEvent         : ev,
            clickOutsideToClose : false,
            fullscreen          : true,
            escapeToClose       : false
        }).then(
            function(){
                this.fetchRequestList();
            }.bind(this),
            function(){
            }.bind(this)
        );
    }

    hide(){
        this.$mdDialog.hide();
    }
}

class RequestDialogController {

    constructor( getData, $mdDialog, API, ToastService, $q, $timeout ){
        'ngInject';

        this.selectedData = getData;

        this.API = API;

        this.formData = {};

        this.ToastService = ToastService;

        this.$mdDialog = $mdDialog;

        this.$q = $q;

        this.$timeout = $timeout;

        this.dialogTitle = this.selectedData === null? 'Book Request Form' : 'Book Request Information';

        this.formDisabled = this.selectedData === null? false : true;

        this.noCache = false;

        this.selectedItem = null;

        this.searchText = null;

        this.books = null;

        this.fetchBookList();

    }

    save(){
        this.formDisabled = true;

        this.API.all('/request/save').post(this.formData).then(
            function() {
                this.$mdDialog.hide();
                this.ToastService.show('Request successfully send.');
            }.bind(this),
            function() {
                this.$mdDialog.cancel();
                this.ToastService.error('Failed to send a request!');
            }.bind(this)
        );
    }

    createFilterFor( query ) {
        let lowercaseQuery = angular.lowercase( query );

        return function filterFn( books ) {
            return ( books.title.indexOf( lowercaseQuery ) === 0 );
        };
    }

    querySearch( query ) {
        let results = query? this.books.filter( this.createFilterFor( query ) ) : this.books;
        let deferred = this.$q.defer();

        this.$timeout(function(){
            deferred.resolve( results );
        }, Math.random() * 1000, false);

        return deferred.promise;
    }

    fetchBookList() {
        this.API.all('book/list/available').post().then(function( response ){
            let count = 0;
            angular.forEach(response.data, function( value ) {
                response.data[count].display = value.title;
                response.data[count].title = value.title.toLowerCase();
                count++;
            });
            
            this.books = response.data;
        }.bind(this));
    }

    hide(){
        this.$mdDialog.hide();
    }

    cancel(){
        this.$mdDialog.cancel();
    }

}

export const AppRequestComponent = {
    templateUrl: './views/app/components/app-request/app-request.component.html',
    controller: AppRequestController,
    controllerAs: 'requestCtrl',
    bindings: {}
}
