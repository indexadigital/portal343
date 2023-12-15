import Link from "next/link"
import { category, permalink, subtitle } from "../lib/utils"
import Date from "./date"
export default function PostHeader({
  post
}) {
  return (
    <>
      <section className="pb-4">
        <div className="container text-center">
            <Link className="category" href={ '/' + category(post).slug }>{ category(post).name }</Link>
            <h1 className="featured-title featured-4-title">
                <Link href={ permalink(post) } title={post?.title}>{post?.title}</Link>
            </h1>
            <p className="featured-subtitle m-0 mt-3">{ subtitle(post) }</p>
        </div>
      </section>
      <section className="data">
        <div>
            <span>
              <Date dateString={post?.date} /> <span className="mx-1" />
              <i className="t-icon position-relative">
                  <svg className="style-scope yt-icon"
                  focusable="false" preserveAspectRatio="meet"
                  style={{ pointerEvents: "none", width: "15px", height: "15px" }} viewBox="0 0 24 24">
                  <g className="style-scope yt-icon">
                    <path
                        d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z">
                    </path>
                  </g>
                  </svg>
              </i>
              <Date dateString={post?.date} formato="H'h'mm" /> {( post?.date != post?.modified ) ? (<>- Atualizada <Date dateString={post?.modified} formato="dd/MM/yyyy - H'h'mm" /></>) : '' } por <strong dangerouslySetInnerHTML={{ __html: post?.author?.node.firstName }}  />
            </span>
        </div>
      </section>
    </>
  )
}
