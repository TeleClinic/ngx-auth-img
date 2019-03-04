import { NgModule } from '@angular/core';

import { AuthImgDirective } from './auth-img.directive';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

@NgModule({
    declarations: [AuthImgDirective],
    imports: [LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG })],
    exports: [AuthImgDirective]
})
export class NgxAuthImgModule {}
