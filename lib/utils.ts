export function category(post : any) {
    return post?.categories ? post?.categories?.nodes[0] : ''
}
export function permalink(post : any) {
    return '/' + category(post).slug + '/' + post.slug
}
export function subtitle(post : any) {
    return post?.extras?.subtitulo ? post?.extras?.subtitulo : ''
}
export function image(post : any) {
    return post?.featuredImage?.node?.sourceUrl ? post?.featuredImage?.node?.sourceUrl : ''
}
export function imageFeatured( post: any, size: string) {

    let src = ''
    post?.featuredImage?.node?.mediaDetails?.sizes.map(
        (sizeItem : any) => {
            if (sizeItem.name === size)
                src = sizeItem.sourceUrl
        }
    )
    return src ? imageSrcToWeb(src) : (post.featuredImage?.node?.sourceUrl ? post.featuredImage?.node?.sourceUrl : '')
}
export function imageFeaturedSource( post: any ) {
    const src = post?.featuredImage?.node?.sourceUrl
    return src ? imageSrcToWeb(src) : ''
}
export function imageSrcToWeb(imageSrc: string): string {
    
    imageSrc = imageSrcToCDN(imageSrc)

    if (!imageSrc.toLowerCase().endsWith('.webp')) {
        return `${imageSrc}.webp`;
    }
    return imageSrc;
}

export function imageSrcToCDN(imageSrc: string): string { 
    return imageSrc.replace('admin.', 'cdn.')
}
