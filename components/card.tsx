import Link from "next/link"
import Image from 'next/image'
import { subtitle, permalink, imageFeatured } from "../lib/utils"

export default function Card( { post, classImg = 'featured-1', classTitle = '' }) {

    return (

        <div className="news">
            <Link className={ 'featured ' + classImg } href={ permalink(post) } title={ post.title }>
                <Image 
                    src={imageFeatured(post, classImg)} 
                    alt={ post.title } 
                    loading="lazy"
                    fill
                    style={{
                        objectFit: 'cover'
                    }}
                />
            </Link>
            <h3 className={ 'featured-1-title ' + classTitle }>
                <Link href={ permalink(post) } title={ post.title }>{ post.title }</Link>
            </h3>
            <p className="featured-1-subtitle featured-2-subtitle">{ subtitle(post) }</p>
        </div>
    )
}