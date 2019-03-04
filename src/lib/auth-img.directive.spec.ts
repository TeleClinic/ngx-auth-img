import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { authImgConfig } from './auth-img-config.default';
import { AUTH_IMG_CONFIG_TOKEN } from './auth-img-config.interface';
import { AuthImgDirective } from './auth-img.directive';


@Component({
    template: `
        <img ngxAuthImg [src]="'https://testsource.com/'" />
    `
})
class TestDummyComponent {}

describe('AuthImgDirective', () => {
    let fixture: ComponentFixture<TestDummyComponent>;
    let host: Array<DebugElement>;
    let fallbackSrc: string;
    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TestDummyComponent, AuthImgDirective],
            providers: [
                { provide: AUTH_IMG_CONFIG_TOKEN, useValue: authImgConfig }
            ]
        }).createComponent(TestDummyComponent);
        fixture.detectChanges();
        host = fixture.debugElement.queryAll(By.directive(AuthImgDirective));
        fallbackSrc = authImgConfig.defaultFallbackSrc;
    });

    it('should add the attribute directive', () => {
        expect(host.length).toBe(1);
    });

    it('should change its src', () => {
        const src = host[0].nativeElement.src;
        expect(src).toBe(
            'https://testsource.com/?access_token=null&thumbnail=true'
        );
    });

    it('should use a fallback on error', () => {
        host[0].triggerEventHandler('error', new ErrorEvent('mock'));
        fixture.detectChanges();
        const src = host[0].nativeElement.src;
        expect(src).toContain(fallbackSrc);
    });
});
