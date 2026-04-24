
export default function TodoItems({todoItems}) {
    return (
        <div className="flex w-fit flex-col gap-5">
        {todoItems.length > 0 && todoItems.map((item, index) => 
            <div className="flex-1 border-2 rounded-md border-gray-300 w-sm p-1 shadow-gray-400 shadow-xs">
                <span>{item.description}</span>
            </div>
        )
    }
        
        </div>
    )
}