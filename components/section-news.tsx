import Link from "next/link";
import Card from "./card";
import { useEffect } from "react";

export default function SectionNews({posts, title, slug}) {
   
    return (
        <section className="sections">
            <div className="container">
                <h2 className="featured-1-title featured-2-title blue"><Link href={ '/' + slug } title={ title }>{ title }</Link></h2>
                <div className="row">
                    { posts?.edges && posts?.edges.map((post: any, index: number) => (        
                    <div className="col col-12 col-lg-4" key={index}>
                        <Card post={post?.node} classImg="featured-3" classTitle="featured-3-title" />
                    </div>
                    ))}  
                </div><Link className="button-featured blue d-flex align-items-center" href={ '/' + slug }>VEJA MAIS NOTÍCIAS<span className="space" /><svg
                        xmlns="http://www.w3.org/2000/svg" height="1em"
                        viewBox="0 0 448 512">
                        <path
                            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                            fill="#fff" />
                    </svg></Link>
            </div>
        </section>
    )
}