import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarService } from './service/rightsidebar.service';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './service/auth.service';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { DirectionService } from './service/direction.service';
import { ModalDialogModule } from './dialog/modal-dialog.module';
import { LoaderModule } from './loader/loader.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './loader/interceptor/loading.interceptor';
import { CONFIG_SNACKBAR } from './utils/snackbar.config';

@NgModule({
  declarations: [],
  imports: [CommonModule, ModalDialogModule, LoaderModule],
  exports: [ModalDialogModule, LoaderModule],
  providers: [
    RightSidebarService,
    AuthGuard,
    AuthService,
    DirectionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    CONFIG_SNACKBAR,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
