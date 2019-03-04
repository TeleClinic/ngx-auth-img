import {
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Subject, Subscription } from 'rxjs/';

import { AUTH_IMG_CONFIG_TOKEN, AuthImgConfigInterface } from './auth-img-config.interface';

@Directive({
    selector: 'img[ngxAuthImg]'
})
export class AuthImgDirective implements OnInit, OnChanges, OnDestroy {
    @HostBinding('src') @Input() src: string;
    @Input() fallbackSrc: string;
    @Input() thumbnailOnly: boolean;
    @Input() debug = false;

    private accessToken: string;
    private baseSrc: string;
    private sourceChange: Subject<string> = new Subject();
    private sub = new Subscription();

    constructor(
        private host: ElementRef,
        @Inject(AUTH_IMG_CONFIG_TOKEN)
        private authImgConfig: AuthImgConfigInterface,
        private logger: NGXLogger
    ) {
        this.sub.add(
            this.sourceChange.subscribe((imgUrl: string) => {
                if (this.debug) {
                    this.logger.debug('[AuthImgDirective] src attribute changed to: ', imgUrl);
                }
                this.src = imgUrl;
            })
        );
    }

    ngOnInit() {
        this.thumbnailOnly = this.thumbnailOnly || this.authImgConfig.defaultThumbnail;
        this.fallbackSrc = this.fallbackSrc || this.authImgConfig.defaultFallbackSrc;

        this.setToken();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes.src.currentValue) {
            if (!this.accessToken) {
                this.setToken();
            }
            if (!changes.src.currentValue.includes(`${this.authImgConfig.tokenQueryName}`)) {
                this.baseSrc = `${changes.src.currentValue}?${this.authImgConfig.tokenQueryName}=${this.accessToken}`;
                this.sourceChange.next(`${this.baseSrc}&${this.authImgConfig.thumbnailQueryName}=true`);
                if (!this.thumbnailOnly) {
                    this.host.nativeElement.style.filter = 'blur(0.05rem)';
                    this.host.nativeElement.style.transition = 'filter 200ms';
                }
            }
        }
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Depending on thumbnailOnly Input:
     * Fires a request for the full image once the thumbnail is done loading.
     */
    @HostListener('load')
    setImgSrc() {
        if (this.src.includes(`${this.authImgConfig.thumbnailQueryName}`) && !this.thumbnailOnly) {
            this.sourceChange.next(this.baseSrc);
        } else if (!this.thumbnailOnly) {
            this.host.nativeElement.style.filter = '';
        }
    }

    /**
     * Sets the fallback src when an error event occurs
     */
    @HostListener('error')
    useFallback() {
        this.sourceChange.next(this.fallbackSrc);
    }

    private setToken() {
        this.accessToken = localStorage.getItem(`${this.authImgConfig.tokenName}`);
    }
}
