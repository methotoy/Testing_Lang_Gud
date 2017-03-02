class AppBookController{
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

        this.bookList = {};

        this.fetchBookList();
    }

    fetchBookList() {
        this.API.all('book/list').post().then(function(response){
            this.bookList = response;
        }.bind(this));
    }

    action(ev, data = null) {
        this.$mdDialog.show({
            resolve : {
                getData : function(){
                    return data;
                }
            },      
            controller          : BookDialogController,
            controllerAs        : 'bookDialogCtrl',
            templateUrl         : './views/app/components/app-book/form-dialog.html',
            parent              : angular.element(document.body),
            targetEvent         : ev,
            clickOutsideToClose : false,
            fullscreen          : true,
            escapeToClose       : false
        }).then(this.fetchBookList());
    }

    hide(){
        this.$mdDialog.hide();
    }

    cancel(){
        this.$mdDialog.cancel();
    }

    delete(ev, data = null) {
        let confirm = this.$mdDialog.confirm()
            .title('Attention!')
            .textContent('You are about to delete book \''+data.title+'\'')                
            .targetEvent(ev)
            .ok('Continue')
            .cancel('Cancel');

        this.$mdDialog.show(confirm).then(function() {
            this.API.all('/book/delete').post(data).then(
                function(){
                    this.fetchBookList();
                    this.hide();
                    this.ToastService.show('Delete book successfully.');
                }.bind(this),
                function(){
                    this.cancel();
                    this.ToastService.error('Delete book failed!');
                }.bind(this)
            );
        }.bind(this));
    }
}

class BookDialogController {

    constructor( getData, $mdDialog, API, ToastService, $filter ){
        'ngInject';

        this.API = API;

        this.ToastService = ToastService;

        this.$mdDialog = $mdDialog;

        this.$filter = $filter;

        this.selectedData = getData;

        this.dialogTitle = "Book Information";

        this.editMode = this.selectedData != null? true : false;

        this.formData = this.selectedData == null? {} : this.selectedData;

        this.formDisabled = false;

        this.updateData = false;
    }

    save() {
        this.formDisabled = true;

        console.log(this.updateData);

        this.toastMessageSuccess = this.updateData? 'Book successfully updated.' : 'Book successfully added.';

        this.toastMessageError = this.updateData? 'Failed to update book!' : 'Failed to add book!';

        this.API.all('/book/save').post(this.formData).then(
            function() {
                this.$mdDialog.hide();
                this.ToastService.show(this.toastMessageSuccess);
            }.bind(this),
            function() {
                this.$mdDialog.cancel();
                this.ToastService.error(this.toastMessageError);
            }.bind(this)
        );
    }

    edit() {
        this.editMode = false;

        this.updateData = true;
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
