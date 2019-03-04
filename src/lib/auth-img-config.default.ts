import { AuthImgConfigInterface } from './auth-img-config.interface';

export const authImgConfig: AuthImgConfigInterface = {
    tokenName: 'accessToken',
    tokenQueryName: 'access_token',
    thumbnailQueryName: 'thumbnail',
    defaultThumbnail: false,
    defaultFallbackSrc: 'assets/img/logos/TC.png'
};
