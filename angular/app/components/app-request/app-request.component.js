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

    action( ev ) {
        this.$mdDialog.show({
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

    constructor( $mdDialog, API, ToastService, $q, $timeout ){
        'ngInject';

        this.API = API;

        this.formData = {};

        this.ToastService = ToastService;

        this.$mdDialog = $mdDialog;

        this.$q = $q;

        this.$timeout = $timeout;

        this.dialogTitle = 'Book Request Form';

        this.formDisabled = false;

        this.noCache = true;

        this.selectedItem = null;

        this.searchText = null;

        this.books = null;

        this.fetchBookList();

    }

    save(){
        // this.formDisabled = true;

        console.log( this.formData );

        // this.API.all('/request/save').post(this.formData).then(
        //     function() {
        //         this.$mdDialog.hide();
        //         this.ToastService.show(this.toastMessageSuccess);
        //     }.bind(this),
        //     function() {
        //         this.$mdDialog.cancel();
        //         this.ToastService.error(this.toastMessageError);
        //     }.bind(this)
        // );
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
        this.API.all('book/list/available').post().then(function(response){
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
