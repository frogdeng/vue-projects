const app = new Vue({
    el : '#app',
    data:{
        data:[],
        currentPage: 0,
        locations: [],
        currentLocation: '',
    },
    methods: {
        getUniqueList(){
            const vm = this;
            const locations = new Set();
            vm.data.forEach((item, i)=>{
                locations.add(item.Zone)
            })
            vm.locations = Array.from(locations)
            
        }
    },
    computed: {
        filterData(){
            const vm = this;           
            const newData = [];
            console.log(vm.currentLocation)
            
            // 過濾行政區
            let items = [];
            if(vm.currentLocation !==''){
                items = vm.data.filter((item, i)=>{
                    return item.Zone == vm.currentLocation
                })
            }else{
              items = vm.data  
            }

            items.forEach((item, i) => {
                if( i % 10 === 0){
                    newData.push([])
                }
                const page = parseInt(i/10)
                newData[page].push(item)
                // console.log(newData)
            });
            return newData;
        },
    },
    created() {
        const vm = this;
        const url = 'http://127.0.0.1:5500/data.json';
        axios.get(url).then((response)=>{
            vm.data = response.data.data.result.records;
            // console.log(response.data.data.result.records)
            vm.getUniqueList()
        })
        
    },

})