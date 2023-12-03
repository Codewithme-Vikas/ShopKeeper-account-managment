export default function FilterItems({ searchItems, setSearchItems }) {

    async function filterItems(e){
        const searchKey = (e.target.value).toLowerCase();
        
        const filterItems = searchItems.filter( item => (

                (item.productName && item.productName.toLowerCase().includes( searchKey ) ) ||
                (item.name && item.name.toLowerCase().includes( searchKey ) )
                
        ) );
        setSearchItems(filterItems);
    }

    return (
        <div>

            <div className="flex w-[50%] flex-col gap-1">
                <label htmlFor="searchKey" >Name</label>
                <input
                    type="text"
                    name="searchKey"
                    required
                    className="p-[6px] rounded text-black outline-none"
                    placeholder="Enter product name"
                    onChange={ filterItems }
                />
            </div>

        </div>
    )
}