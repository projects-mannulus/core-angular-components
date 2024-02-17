import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

interface ConfigSnackBar {
  provide: typeof MAT_SNACK_BAR_DEFAULT_OPTIONS;
  useValue: MatSnackBarConfig<any>;
}

export const CONFIG_SNACKBAR: ConfigSnackBar = {
  provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
  useValue: {
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  },
};
