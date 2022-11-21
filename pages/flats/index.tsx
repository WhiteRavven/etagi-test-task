// @ts-nocheck
import {Box, Dialog, Pagination, useMediaQuery} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import prisma from '../../lib/prisma';
import {NumericRange} from "../../components/NumericRangeSelect/NumericRangeSelect";
import FlatsFilterMenu, {FlatsFilter} from "../../components/FlatsFilterMenu/FlatsFilterMenu";
import {Flat} from "../../types/Flat";
import FlatsList from "../../components/FlatsList/FlatsList";
import useNextRouter from "../../hooks/useNextRouter";
import FlatInfo from "../../components/FlatInfo/FlatInfo";

const DEFAULT_PAGE_SIZE = 10;

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
    const matches720 = useMediaQuery('(min-width:720px)');

    const [openFlatModal, setOpenFlatModal] = useState<boolean>(false);
    const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null);

    useEffect(() => {
            filterSubmitHandler();
        },
        [filter, filterSubmitHandler]);

    const openFlatModalHandler = (event, flat) => {
        setOpenFlatModal(true);
        setSelectedFlat(flat);
    }

    const closeFlatModalHandler = () => {
        setOpenFlatModal(false);
        setSelectedFlat(null);
    }

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

    const itemShowClickHandler = (event, flat) => {
        event.stopPropagation();
        router.push(`/flats/${flat.id}`)
    }

    return (
        <>
            {openFlatModal && selectedFlat ? <Dialog
                open={openFlatModal}
                onClose={closeFlatModalHandler}
            >
                <Box minWidth={matches720 ? "600px" : "89vw"}>
                    <FlatInfo flat={selectedFlat}/>
                </Box>
            </Dialog> : null}
            <Box display="flex" flexDirection="column" gap="12px">
                <FlatsFilterMenu filter={filter} onChange={filterChangeHandler} onSubmit={filterSubmitHandler}
                                 onClear={filterClearHandler}/>
                <FlatsList onCardClick={openFlatModalHandler} onShowClick={itemShowClickHandler} flats={flatsData}/>
                <Pagination value={page} onChange={pageChangeHandler} count={Math.ceil(totalCount / pageSize)}
                            variant="outlined" shape="rounded"/>
            </Box>
        </>);
}
