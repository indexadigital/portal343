import Link from "next/link";

export default function Banner( { type='image', content='', link='#', target='_blank' } ) {
    return (
        <section>
            <div className="container">
                <Link href={link} target={target}>
                <div className="banner" dangerouslySetInnerHTML={{
                    __html: content,
                }} /> 
                </Link>                  
            </div>
        </section>
    )
}