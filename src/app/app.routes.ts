import { Routes } from '@angular/router';
import { FormConfigUpload } from './pages/form-config-upload/form-config-upload';
import { DynamicForm } from './pages/dynamic-form/dynamic-form';

export const routes: Routes = [
    {
        path: '',
        component: FormConfigUpload
    },
    {
        path: 'dynamic-form',
        component: DynamicForm
    }
];
