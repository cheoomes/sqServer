'use client'

const handleClick = () => {
    console.log("yyyyyyy");
};

export default function B(){
    return (
        <button onClick={handleClick} style={{backgroundColor: 'blue', color: 'white'}}>Click</button>
    )
}

