import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComp from './ErrorComp'
import CoinCard from './CoinCard'

const Coin = () => {
    const [coin, setCoin] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [page, setPage] = useState(1)
    const [currency, setCurrency] = useState("inr")

    const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"

    const changePage = (page) => {
        setPage(page)
        setLoading(true)
    }

    let btn = new Array(132).fill(1)



    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
                setCoin(data)
                console.log(data)
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }

        fetchCoin()
    }, [currency, page])

    if (error) return <ErrorComp msg={"Something went wrong"} />

    return (
        <Container maxW={"container.xl"}>
            {loading ? (<Loader />) :
                (<>

                    <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                        <HStack spacing={"4"}>
                            <Radio value={'inr'}>INR</Radio>
                            <Radio value={'usd'}>USD</Radio>
                            <Radio value={'eur'}>EUR</Radio>
                        </HStack>
                    </RadioGroup>

                    <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
                        {
                            coin.map((ele) =>
                                (<CoinCard id={ele.id} price={ele.current_price} key={ele.id} name={ele.name} symbol={ele.symbol} img={ele.image} currencySymbol={currencySymbol} />)
                            )
                        }
                    </HStack>

                    <HStack w={"full"} overflow={"auto"} p={"8"}>
                        {
                            btn.map((ele, ind) => {
                                return <Button key={ind} bgColor={"blackAlpha.900"} color={"white"} onClick={() => changePage(ind + 1)}>{ind + 1}</Button>
                            })
                        }
                    </HStack>
                </>)
            }
        </Container>
    )
}

export default Coin