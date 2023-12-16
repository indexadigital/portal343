import Card from "./card"
export default function PostCardList({
    posts
  }) {
    return (
      <>
        { posts?.edges?.map((post: any, index: number) => (
            <div key={index} className="col col-12 col-lg-4 mb-4">
                <Card post={post.node} classImg="featured-3" classTitle="featured-3-title" />
            </div>
        ))}    
      </>
    )
}