import { getActive } from '@/pages/api/getActive'
import { getPopular } from '@/pages/api/getPopular'
import { getStation } from '@/pages/api/getStation'
import { getTrending } from '@/pages/api/getTrending'
import { searchStations } from "@/pages/api/searchStations"

export default {
    getActive: getActive,
    getPopular: getPopular,
    getStation: getStation,
    getTrending: getTrending,
    searchStations: searchStations,
}