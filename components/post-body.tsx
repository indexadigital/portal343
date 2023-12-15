export default function PostBody({ content }) {
  return (
    <div className="content pt-4" 
      dangerouslySetInnerHTML={{ __html: content }} />
  )
}
