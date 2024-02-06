import Script from 'next/script'

export default function Analytic( { GTAG = "G-NVLJWGW01D" } ){
    return (
        <>
            <Script async strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GTAG}`} />
            <Script strategy="afterInteractive">
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