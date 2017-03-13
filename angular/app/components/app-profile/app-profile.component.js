class AppProfileController{
    constructor( API, ToastService, DialogService, $filter ){
        'ngInject';

        this.API = API;

        this.ToastService = ToastService;

        this.DialogService = DialogService;

        this.$filter = $filter;

        this.editMode = false;

        this.formData = {};
    }

    $onInit(){

        this.fetchUserProfile();
    }

    cancelEdit() {
        this.editMode = false;
        this.fetchUserProfile();
    }

    fetchUserProfile() {
        this.API.all('profile/details').post().then(function(response){
            response.data[0].birthday = this.$filter('amCalendar')(response.data[0].birthday);
            response.data[0].created_at = this.$filter('amCalendar')(response.data[0].created_at);
            response.data[0].last_activity = this.$filter('amCalendar')(response.data[0].last_activity);
            this.formData = response.data[0];
        }.bind(this));
    }
}

export const AppProfileComponent = {
    templateUrl: './views/app/components/app-profile/app-profile.component.html',
    controller: AppProfileController,
    controllerAs: 'profileCtrl',
    bindings: {}
}
