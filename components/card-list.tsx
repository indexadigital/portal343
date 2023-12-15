import Link from "next/link";
import { subtitle, permalink, imageFeatured, category } from "../lib/utils";

export default function CardList( { post, classImg = 'featured-1', classTitle = 'featured-2-title' }) {

    return (
        <div className="news list py-3">
            <div className="row">
                <div className="col col-12 col-lg-4">
                    <Link className={ 'featured ' + classImg } href={ permalink(post) } title={ post.title }>
                        <img src={imageFeatured(post, classImg)} alt={ post.title }  />
                    </Link>
                </div>
                <div className="col col-12 col-lg-8">
                    <Link className="category" href={ category(post).slug }>{ category(post).name }</Link>
                    <h3 className={ 'featured-1-title ' + classTitle }>
                        <Link href={ permalink(post) } title={ post.title }>{ post.title }</Link>
                    </h3>
                    <p className="featured-1-subtitle featured-2-subtitle m-0">{ subtitle(post) }</p>
                </div>
            </div>
        </div>
    )
}