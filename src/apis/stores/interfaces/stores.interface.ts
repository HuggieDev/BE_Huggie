import { FetchStoresInput } from '../dto/fetchStores.dto'

export interface IFindStores extends FetchStoresInput {
    userId: string
}
