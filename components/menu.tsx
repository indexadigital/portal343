export default function Menu( { menu, classMenu='list-inline m-0 menu d-none d-lg-flex', classLi = '' } ) {
    let html = ''
    menu.forEach(function(link, i) {
        html += `<li class="${ classLi }"><a href="${'/' + Object.keys(link)[0]}" title="${ Object.values(link)[0] }">${ Object.values(link)[0] }</a></li>`
    })
    return (
        <ul className={ classMenu } dangerouslySetInnerHTML={{
            __html: html,
        }} />      
    )
}