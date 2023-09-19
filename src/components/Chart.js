import React from 'react'
import {Line} from "react-chartjs-2"
import {Chart as ChartJS,CategoryScale, LinearScale, PointElement,LineElement,Title,Tooltip,Legend} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement,LineElement,Title,Tooltip,Legend)


const Chart = ({arr=[] ,currency,days}) => {
    const price=[]
    const date=[]

    for (let i = 0; i < arr.length; i++) {
        if(days==="24h"){
            date.push(new Date(arr[i][0]).toLocaleTimeString())
            price.push(arr[i][1])
        }
        else{
            date.push(new Date(arr[i][0]).toLocaleDateString())
            price.push(arr[i][1])
        }
        
    }
    const data={
            labels:date,
            datasets:[{
                label:`Prices in ${currency}`,
                data:price,borderColor:"rgb(255,99,132)",
                backgroundColor:"rgba(255,99,132,0.4)"
            }]
        
    }
    return (
        <Line options={{
            responsive:true,
        }}
        data={data}
        />
    )
}

export default Chart