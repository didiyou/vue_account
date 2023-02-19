import createId from "@/lib/idCreator"
const localStorageKeyName = 'tagList'
type Tag = {
    id:string
    name:string
}
type TagListModel = {
    data:Tag[]
    fetch:()=>Tag[]
    create:(name:string)=>'success' | 'duplicated'
    update:(id:string,name:string)=>'success'|'not found'|'duplicated'
    remove:(id:string) => boolean
    save:()=>void
}
const tagListModel:TagListModel = {
    data:[],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem('localStorageKeyName') || '[]') 
        return this.data
    },
    save() {
        window.localStorage.setItem('localStorageKeyName', JSON.stringify(this.data))
    },
    update(id,name){
        const idList = this.data.map(tag=>tag.id)
        if(idList.indexOf(id)>=0){
            const names = this.data.map(tag=>tag.name)
            if(names.indexOf(name)>=0){
                return 'duplicated'
            }else{
                const tag = this.data.filter(tag=>tag.id === id)[0]
                tag.name = name
                this.save
                return 'success'
            }
        }else{
            return 'not found'
        }
    },
    remove(id:string){
        let index = -1
        this.data.forEach((element,i) => {
            element.id === id ? index = i:0
        });
        this.data.splice(index,1)
        this.save()
        return true 
    },
    create(name:string){
        const id = createId().toString()
        const names = this.data.map(item=>item.name)
        if(names.indexOf(name) >= 0){return 'duplicated'}
        this.data.push({id,name:name})
        this.save()
        return 'success'
    }
}
export { tagListModel }