import Link from "next/link";
import { subtitle, permalink, image } from "../lib/utils";

export default function Card( { post, classImg = 'featured-1', classTitle = '' }) {

    return (
        <div className="news">
            <Link className={ 'featured ' + classImg } href={ permalink(post) } title={ post.title }>
                <img src={ image(post) } alt={ post.title }  />
            </Link>
            <h3 className={ 'featured-1-title ' + classTitle }>
                <Link href={ permalink(post) } title={ post.title }>{ post.title }</Link>
            </h3>
            <p className="featured-1-subtitle featured-2-subtitle">{ subtitle(post) }</p>
        </div>
    )
}