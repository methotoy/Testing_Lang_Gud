import {AppRequestComponent} from './app/components/app-request/app-request.component';
import {AppProfileComponent} from './app/components/app-profile/app-profile.component';
import {AppBookComponent} from './app/components/app-book/app-book.component';
import {AppSideNavComponent} from './app/components/app-side-nav/app-side-nav.component';
import {AppBodyComponent} from './app/components/app-body/app-body.component';
import {AppHeaderComponent} from './app/components/app-header/app-header.component';
import {AppRootComponent} from './app/components/app-root/app-root.component';
import {AppShellComponent} from './app/components/app-shell/app-shell.component';
import {ResetPasswordComponent} from './app/components/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './app/components/forgot-password/forgot-password.component';
import {LoginFormComponent} from './app/components/login-form/login-form.component';
import {RegisterFormComponent} from './app/components/register-form/register-form.component';

angular.module('app.components')
	.component('appRequest', AppRequestComponent)
	.component('appProfile', AppProfileComponent)
	.component('appBook', AppBookComponent)
	.component('appSideNav', AppSideNavComponent)
	.component('appBody', AppBodyComponent)
	.component('appHeader', AppHeaderComponent)
	.component('appRoot', AppRootComponent)
	.component('appShell', AppShellComponent)
	.component('resetPassword', ResetPasswordComponent)
	.component('forgotPassword', ForgotPasswordComponent)
	.component('loginForm', LoginFormComponent)
	.component('registerForm', RegisterFormComponent);

