import {makeAutoObservable} from "mobx";

export default class DeviceStore{
    constructor(){
        this._types = []
        this._devices = []
        this._baskets = []
        this._selectedType={}
        makeAutoObservable(this)
        this._page=1
        this._totalCount=0
        this._limit=3
    }

    setTypes(types) {
        this._types = types
    }

    setDevices(devices){
        this._devices = devices
    }

    setSelectedType(type){
        this.setPage(1)
        this._selectedType = type
    }

    setPage(page){
        this._page = page
    }

    setTotalCount(count){
        this._totalCount = count
    }

    setBaskets(basket){
        this._baskets = basket
    }

    get types() {
        return this._types
    }

    get devices(){
        return this._devices
    }

    get selectedType (){
        return this._selectedType
    }

    get totalCount (){
        return this._totalCount
    }

    get page (){
        return this._page
    }

    get limit (){
        return this._limit
    }

    get basket() {
        return this._baskets
    }
}