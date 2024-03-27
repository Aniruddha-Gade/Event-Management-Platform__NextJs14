'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode } from "react";
import { EventData } from '@/types/index'



interface SearchEventContextProps {
    searchEventLoading: boolean;
    setSearchEventLoading: Dispatch<SetStateAction<boolean>>,
    searchEventData: EventData[];
    setSearchEventData: Dispatch<SetStateAction<EventData[]>>
}

const SearchEventContext = createContext<SearchEventContextProps>({
    searchEventLoading: false,
    setSearchEventLoading: () => { },
    searchEventData: [],
    setSearchEventData: (): EventData[] => []
})

type Props = {
    children: ReactNode;
};


export const GlobalContextProvider = ({ children }: Props) => {
    const [searchEventLoading, setSearchEventLoading] = useState(false);
    const [searchEventData, setSearchEventData] = useState<[] | EventData[]>([]);


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