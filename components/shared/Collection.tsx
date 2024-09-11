import { ITopic } from "@/lib/database/models/topic.model"
import { IService } from "@/lib/database/models/service.model"
import { IProduct } from "@/lib/database/models/product.model"
import Card from "./Card"
import Pagination from "./Pagination"

type CollectionProps = {
    topics?: ITopic[],
    services?: IService[],
    products?: IProduct[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
    collectionType: 'Events_Organized' | 'My_Tickets' | 'All_Events'
}

const Collection = ({
    topics,
    services,
    products,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    collectionType,
    urlParamName
}: CollectionProps) => {
    const hasOrderLink = collectionType === 'Events_Organized';
    const hidePrice = collectionType === 'My_Tickets';
    return (
        <>
            {topics || services || products ? (
                <div className="flex flex-col items-center gap-10">
                    <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                        {topics && topics.map((entity) => {
                            return (
                                <li key={entity._id} className="flex justify-center">
                                    {topics && <Card topic={entity} hidePrice={hidePrice} />}
                                </li>
                            )
                        })}

                        {services && services.map((entity) => {
                            return (
                                <li key={entity._id} className="flex justify-center">
                                    {services && <Card service={entity} hidePrice={hidePrice} />}
                                </li>
                            )
                        })}

                        {products && products.map((entity) => {
                            return (
                                <li key={entity._id} className="flex justify-center">
                                    {products && <Card product={entity} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />}
                                </li>
                            )
                        })}
                    </ul>

                    {totalPages > 1 && (
                        <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
                    )}
                </div>
            ) : (
                <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
                    <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
                    <p className="p-regular-14">{emptyStateSubtext}</p>
                </div>
            )}
        </>
    )
}

export default Collection