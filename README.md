[![License](https://img.shields.io/npm/l/@angular/cli.svg)](/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](https://badge.fury.io/js/ngx-auth-img.svg)](https://badge.fury.io/js/ngx-auth-img)
[![Build Status](https://travis-ci.org/TeleClinic/ngx-auth-img.svg?branch=master)](https://travis-ci.org/TeleClinic/ngx-auth-img)

# NGX-Auth-Img

Is an [Angular](https://angular.io/) attribute directive. It can do the following things for you:

-   Automatically append authorization information to each img request made from your templates
-   Show a fallback in case the asset is not available
-   Load a thumbnail first
-   Blur the thumbnail and unblur it once the request for the full-image succeeded

## Setup

1. Run `npm i --save ngx-auth-img`
2. Import `NgxAuthImgModule`
3. Create your config token, which implements `AuthImgConfigInterface` and add it to your module's providers array e.g.:

```typescript
{
            provide: AUTH_IMG_CONFIG_TOKEN,
            useValue: authImgConfig
}
```

4. Add the selector to any img tag such as:

```HTML
<img ngxAuthImg [src]="https://example.com/asset.png">
```

5. You can override e.g. a fallback source as attribute `fallbackSrc` for each usage

## Configure

The directive takes a configuration with the following properties according to `AuthImgConfigInterface`:

-   `tokenName`: string - Name of the authentication token in your local storage
-   `tokenQueryName`: string - The query parameter appended to each request
-   `thumbnailQueryName`: string - The query parameter used to request a thumbnail
-   `defaultThumbnail`: boolean - Wether the full image or only the thumbnail should be requested
-   `defaultFallbackSrc`: string - The source used if the request failed and no `fallbackSrc` attribute is set on the img element.
