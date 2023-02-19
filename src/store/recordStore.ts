import clone from "@/lib/clone"

const localStorageKeyName = 'recordList'
let data: RecordItem[] | undefined = undefined

const recordStore = {
    recordList : data,
    fetchRecords(){
        data = JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]') 
        return data
    },
    saveRecords() {
        window.localStorage.setItem('localStorageKeyName', JSON.stringify(data))
    },
    createRecord : (record:RecordItem)=> {
        const recordCopy = clone(record)
        recordCopy.createdAt = new Date().toISOString()
        data?.push(recordCopy)
        recordStore.saveRecords()
    }
}

recordStore.fetchRecords()
export default recordStore