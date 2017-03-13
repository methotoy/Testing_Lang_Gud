class AppBookController{
    constructor( API, $mdDialog, ToastService, DialogService ){
        'ngInject';

        this.API = API;

        this.$mdDialog = $mdDialog;

        this.ToastService = ToastService;

        this.DialogService = DialogService;
    }

    $onInit(){
        this.query = {
            order   : 'id',
            limit   : 5,
            page    : 1,
        };

        this.bookList = {};

        this.fetchBookList();

        this.filter = '';
    }

    fetchBookList() {
        this.API.all('book/list').post().then(function(response){
            this.bookList = response;
        }.bind(this));
    }

    hide(){
        this.$mdDialog.hide();
    }

    cancel(){
        this.$mdDialog.cancel();
    }

    request(ev, data = null) {
        data.option = "request"
        let option = {
            resolve : { getData : function(){ return data; } },
            controller          : RequestDialogController,
            controllerAs        : 'requestDialogCtrl',
            parent              : angular.element(document.body),
            targetEvent         : ev,
            clickOutsideToClose : false,
            fullscreen          : true,
            escapeToClose       : false
        };

        this.DialogService.fromTemplate('book-request', option).then(
            function(){
                this.fetchBookList();
            }.bind(this),
            function(){
            }.bind(this)
        );
    }
}

class RequestDialogController {

    constructor( getData, $mdDialog, API, ToastService, $q, $timeout, $filter ){
        'ngInject';

        this.selectedData = getData;

        this.API = API;

        this.formData = {};

        this.ToastService = ToastService;

        this.$mdDialog = $mdDialog;

        this.$q = $q;

        this.$timeout = $timeout;

        this.$filter = $filter;

        this.dialogTitle = 'Book Request Form';

        this.noCache = false;

        this.selectedItem = null;

        this.searchText = null;

        this.books = null;

        this.cancelRequest = false;

        this.formDisabled = false;

        this.formData = this.selectedData;

    }

    save() {
        this.formDisabled = true;

        this.API.all('/request/save').post(this.formData).then(
            function() {
                this.hide();
                this.ToastService.show('Request successfully send.');
            }.bind(this),
            function() {
                this.cancel();
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

    hide(){
        this.$mdDialog.hide();
    }

    cancel(){
        this.$mdDialog.cancel();
    }

}

export const AppBookComponent = {
    templateUrl: './views/app/components/app-book/app-book.component.html',
    controller: AppBookController,
    controllerAs: 'bookCtrl',
    bindings: {}
}
