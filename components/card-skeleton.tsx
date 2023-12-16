export default function CardSkeleton ( { sizeImg = '205px' } ) {
    return (
        <div className="news">
            <div className="skeleton img" style={{ height: sizeImg }} />
            <div className="skeleton" style={{ height: '35px' }} />
            <div className="skeleton" style={{ height: '25px' }} />
            <div className="skeleton" style={{ height: '25px' }} />
        </div>
    )
}