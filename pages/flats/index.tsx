// @ts-nocheck
import {Box, Pagination} from "@mui/material";
import {ChangeEvent, useState} from "react";
import prisma from '../../lib/prisma';
import {NumericRange} from "../../components/NumericRangeSelect";
import FlatsFilterMenu, {FlatsFilter} from "../../components/FlatsFilterMenu/FlatsFilterMenu";
import {Flat} from "../../types/Flat";
import FlatsList from "../../components/FlatsList/FlatsList";
import useNextRouter from "../../hooks/useNextRouter";

const DEFAULT_PAGE_SIZE = 4;

const defaultFlatsFilter = {
    price: {},
    floor: {},
    area_total: {},
    area_live: {},
    area_kitchen: {},
};

export async function getServerSideProps(context: any) {
    const page = context?.query?.page ?? 1;
    const pageSize = context?.query?.pageSize ?? DEFAULT_PAGE_SIZE;
    const filterEncoded = context?.query?.filter as string;
    let flatsFilter = filterEncoded ? JSON.parse(atob(filterEncoded)) : {};
    let whereClause: any = {};
    if (flatsFilter) {
        for (const [key, value] of Object.entries<FlatsFilter>(flatsFilter)) {
            let fieldWhere: any = {};
            if (value.min) {
                fieldWhere.gte = +value.min;
            }
            if (value.max) {
                fieldWhere.lte = +value.max;
            }
            whereClause[key] = fieldWhere;
        }
    }
    const [flatsData, totalCount] = await prisma.$transaction([
        prisma.flats.findMany({
            where: whereClause,
            skip: (page - 1) * pageSize,
            take: pageSize
        }),
        prisma.flats.count({
            where: whereClause
        }),
    ])
    return {
        props: {
            page,
            pageSize,
            flatsData,
            totalCount,
            flatsFilter: flatsFilter ?? defaultFlatsFilter
        },
    }
}

export default function Index({
                                  flatsFilter,
                                  flatsData,
                                  totalCount,
                                  page,
                                  pageSize,
                              }: { flatsFilter: FlatsFilter, flatsData: Flat[], totalCount: number, page: number, pageSize: number, }) {
    const [filter, setFilter] = useState<FlatsFilter>(flatsFilter);
    const {router, addQueryParam, removeQueryParam} = useNextRouter();

    const filterChangeHandler = (field: string, value: NumericRange | null) => {
        setFilter((prevValue: FlatsFilter) => {
            let newFilter = {...prevValue};
            if (value === null) {
                delete newFilter[field]
            } else {
                newFilter[field] = value;
            }
            return newFilter;
        });
    }

    const filterSubmitHandler = () => {
        if (Object.keys(filter).length > 0) {
            const filterEncoded = btoa(JSON.stringify(filter));
            addQueryParam('filter', filterEncoded);
        } else {
            removeQueryParam('filter');
        }
    }

    const filterClearHandler = () => {
        setFilter({});
        removeQueryParam('filter');
    }

    const pageChangeHandler = (event: ChangeEvent<unknown>, value: number) => {
        addQueryParam('page', value.toString());
    }

    const flatItemClickHandler = (id: number) => {
        router.push(`/flats/${id}`)
    }

    return <Box display="flex" flexDirection="column" gap="12px">
        <FlatsFilterMenu filter={filter} onChange={filterChangeHandler} onSubmit={filterSubmitHandler}
                         onClear={filterClearHandler}/>
        <FlatsList onItemClick={flatItemClickHandler} flats={flatsData}/>
        <Pagination value={page} onChange={pageChangeHandler} count={Math.ceil(totalCount / pageSize)}
                    variant="outlined" shape="rounded"/>
    </Box>;
}
