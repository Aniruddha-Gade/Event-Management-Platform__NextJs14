'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode } from "react";
import { SearchEventData } from '@/types/index'



interface SearchEventContextProps {
    searchEventLoading: boolean;
    setSearchEventLoading: Dispatch<SetStateAction<boolean>>,
    searchEventData: SearchEventData;
    setSearchEventData: Dispatch<SetStateAction<SearchEventData>>
}

const SearchEventContext = createContext<SearchEventContextProps>({
    searchEventLoading: false,
    setSearchEventLoading: () => { },
    searchEventData: {
        events: [],
        page: 0,
        pageSize: 0,
        totalEvents: 0,
        totalPages: 0,
    },
    setSearchEventData: () => { }

})

type Props = {
    children: ReactNode;
};


export const GlobalContextProvider = ({ children }: Props) => {
    const [searchEventLoading, setSearchEventLoading] = useState(false);
    const [searchEventData, setSearchEventData] = useState<SearchEventData>({
        events: [],
        page: 0,
        pageSize: 0,
        totalEvents: 0,
        totalPages: 0
    });




    const value = {
        searchEventLoading, setSearchEventLoading,
        searchEventData, setSearchEventData
    }

    return (
        <SearchEventContext.Provider value={value}>
            {children}
        </SearchEventContext.Provider>
    )
};

export const useSearchEventContext = () => useContext(SearchEventContext);