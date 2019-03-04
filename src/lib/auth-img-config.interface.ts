import { InjectionToken } from '@angular/core';

export interface AuthImgConfigInterface {
    tokenName: string;
    tokenQueryName: string;
    thumbnailQueryName: string;
    defaultThumbnail?: boolean;
    defaultFallbackSrc?: string;
}
export const AUTH_IMG_CONFIG_TOKEN = new InjectionToken<AuthImgConfigInterface>('authImg.config');
