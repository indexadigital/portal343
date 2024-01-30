import Script from 'next/script'

export default function Analytics( { GTAG = "G-NVLJWGW01D" } ){
    return (
        <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GTAG}`} />
            <Script id="google-analytics">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GTAG}');
            `}
            </Script>
        </>
    )
}