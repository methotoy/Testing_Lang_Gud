class AppProfileController{
    constructor( API, ToastService, DialogService, $filter ){
        'ngInject';

        this.API = API;

        this.ToastService = ToastService;

        this.DialogService = DialogService;

        this.$filter = $filter;

        this.editMode = false;

        this.formData = {};

        this.course = {};

        this.department = {};

        this.myDate = new Date();

        this.minDate = new Date(
            this.myDate.getFullYear() - 100,
            this.myDate.getMonth(),
            this.myDate.getDate()
        );

        this.maxDate = new Date(
            this.myDate.getFullYear(),
            this.myDate.getMonth(),
            this.myDate.getDate()
        );
    }

    $onInit(){

        this.fetchUserProfile();

        this.loadCourses();

        this.loadDepartments();
    
    }

    save() {
        this.API.all('/profile/save').post(this.formData).then(
            function() {
                this.ToastService.show('Profile successfully updated.');
                this.editMode = false;
                this.formData.birthday = this.formData.birthday !== null? this.$filter('amCalendar')(this.formData.birthday) : null;
            }.bind(this),
            function() {
                this.ToastService.error('Failed to update your profile!');
            }.bind(this)
        );
    }

    loadDepartments() {
        this.API.all('department/list').post().then(function(response) {
            this.department = response.data;
        }.bind(this));
    }


    loadCourses() {
        this.API.all('course/list').post().then(function(response) {
            this.course = response.data;
        }.bind(this));
    }


    edit() {
        this.editMode = true;
        this.formData.birthday = this.formData.birthday !== null? new Date(this.formData.birthday) : null;
    }

    cancelEdit() {
        this.editMode = false;
        this.fetchUserProfile();

        this.formData.birthday = this.formData.birthday !== null? this.$filter('amCalendar')(this.formData.birthday) : null;
    }

    fetchUserProfile() {
        this.API.all('profile/details').post().then(function(response){
            response.data.birthday = this.$filter('amCalendar')(response.data.birthday);
            response.data.created_at = this.$filter('amCalendar')(response.data.created_at);
            response.data.last_activity = this.$filter('amCalendar')(response.data.last_activity)
            response.data.course = response.data.course[0];
            response.data.department = response.data.department[0];
            this.formData = response.data;
        }.bind(this));
    }
}

export const AppProfileComponent = {
    templateUrl: './views/app/components/app-profile/app-profile.component.html',
    controller: AppProfileController,
    controllerAs: 'profileCtrl',
    bindings: {}
}
