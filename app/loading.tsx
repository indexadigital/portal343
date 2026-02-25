import CardSkeleton from '@/components/card-skeleton'

export default function Loading() {
  return (
    <section>
      <div className="container">
        <div className="row">
          {[1, 2, 3].map((i) => (
            <div key={i} className="col col-12 col-lg-4">
              <CardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
