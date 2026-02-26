import Link from "next/link"
import { permalink, category, subtitle } from "../lib/utils";
import Card from "./card";

export default function Featured( { posts } ) {

    return ( posts ?
        <>
            <section className="pb-5 google-auto-ads-ignore">
                { posts?.destaque1 ? (
                    <div className="container text-center featured-banner">
                        <Link className="category" href={ '/' + category(posts?.destaque1).slug }>{ category(posts?.destaque1).name }</Link>
                        <h2 className="featured-title">
                            <Link href={ permalink(posts?.destaque1) } title={posts?.destaque1?.title}>{posts?.destaque1?.title}</Link>
                        </h2>
                        <p className="featured-subtitle m-0 mt-3">{ subtitle(posts?.destaque1) }</p>
                    </div>
                ) : '' }                
            </section>
            <section className="google-auto-ads-ignore">
                <div className="container">
                    <div className="row">
                        <div className="col col-12 col-lg-6">
                        { posts?.destaque2 ? (
                            <Card post={posts?.destaque2} />
                        ) : '' } 
                        </div> 
                        <div className="col col-12 col-lg-6">
                            { posts?.destaque3 ? (
                                <Card post={posts?.destaque3} classImg="featured-2" classTitle="featured-2-title" />
                            ) : '' }
                            { posts?.destaque4 ? (
                                <Card post={posts?.destaque4} classImg="featured-2" classTitle="featured-2-title" />
                            ) : '' }   
                        </div>
                    </div>
                </div>
            </section>
        </> : <></>
    )
}