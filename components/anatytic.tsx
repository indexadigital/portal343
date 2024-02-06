export default function Analytic( { GTAG = "G-NVLJWGW01D" } ){
    return (
        <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GTAG}`} />
            <script
                dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GTAG}');
            `,
                }}
            />
        </>
    )
}