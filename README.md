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

## Configure

The directive takes a configuration with the following properties according to `AuthImgConfigInterface`:

-   `tokenName`: string - Name of the authentication token in your local storage
-   `tokenQueryName`: string - The query parameter appended to each request
-   `thumbnailQueryName`: string - The query parameter used to request a thumbnail
-   `defaultThumbnail`: boolean - Wether the full image or only the thumbnail should be requested
-   `defaultFallbackSrc`: string - The source used if the request failed and no `fallbackSrc` attribute is set on the img element.
